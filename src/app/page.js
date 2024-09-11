"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

// Custom Components
import { TooltipWithIcon } from "../components/custom/TooltipWithIcon"

// App Router
import { useRouter } from "next/navigation"; // App router

// Icons
import { Info } from 'lucide-react';

export default function Component() {
  // Create state object to store form information in
  // prior to submitting to Twilio API
  const [tollFreeNumbers, setTollFreeNumbers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {

    fetch('/api/submitRequest')
      .then((res) => res.json())
      .then((data) => {
        setTollFreeNumbers(data.message);
        setLoading(false);
        console.log(data);
      })

  }, []);

  const [formValues, setFormValues] = useState({
    businessName: "",
    businessWebsite: "",
    businessAddress1: "",
    businessAddress2: "",
    businessCity: "",
    businessState: "",
    businessPostalCode: "",
    businessContactFirstName: "",
    businessContactLastName: "",
    businessContactEmail: "",
    phoneNumber: "",
    useCaseCategories: "",
    useCaseSummary: "",
    productionMessageSample: "",
    optInType: "",
    optInImageUrls: "",
    messageVolume: "",
    additionalInformation: "",
    tollfreePhoneNumberSid: "",
    notificationEmail: ""
  });

  // U.S. states and territories to populate the form with
  const states = { 
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", 
    GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", 
    MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", 
    NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", 
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", 
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", AS: "American Samoa", 
    GU: "Guam", MP: "Northern Mariana Islands", PR: "Puerto Rico", VI: "Virgin Islands"
  };

// Valid Use Case Categories
  const useCaseCategories = {
    TWO_FACTOR_AUTHENTICATION: "2FA", ACCOUNT_NOTIFICATIONS: "Account Notifications", CUSTOMER_CARE: "Customer Care", CHARITY_NONPROFIT: "Charity / Non-Profit",
    DELIVERY_NOTIFICATIONS: "Delivery Notifications", FRAUD_ALERT_MESSAGING: "Fraud Alert Messaging", EVENTS: "Events", HIGHER_EDUCATION: "Higher Education", K12: "K12",
    MARKETING: "Marketing", POLLING_AND_VOTING_NON_POLITICAL: "Non-Political Polling and Voting", POLITICAL_ELECTION_CAMPAIGNS: "Political Election Campaigns", 
    PUBLIC_SERVICE_ANNOUNCEMENT: "Public Service Announcement", SECURITY_ALERT: "Security Alert"
  };

  // Valid Opt-in Types
  const optInTypes = { VERBAL: "Verbal", WEB_FORM: "Web Form", PAPER_FORM: "Paper Form", VIA_TEXT: "Via Text Message", MOBILE_QR_CODE: "Mobile QR Code" };
  const messageVolumes = ["10", "1,000", "10,000", "100,000", "250,000", "500,000", "750,000", "1,000,000", "5,000,000", "10,000,000+"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSelectChange = (field) => (value) => {
    console.log(field, value);
    setFormValues({ ...formValues, [field]: value });
  };

  const handleReset = () => {
    document.getElementById('tollFreeForm').reset();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/submitRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    // Routing to success or error page
    response.status == 200 ? router.push('/submission/success') : router.push('/submission/error')
  }

  return (
    <div className="container my-10 border-2 rounded-md border-slate-100 mx-auto max-w-4xl px-4 py-6 md:px-6 lg:px-8">
      <form id="tollFreeForm" onSubmit={handleSubmit} onReset={handleReset}>
        <h1 className="mb-8 text-3xl font-bold">Register your Business for Toll-Free Messaging</h1>
        <p className="mb-8">
          Submit your business information below to register for Verified Toll-Free messaging. We are actively working on
          supporting additional Twilio products in the future.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold">Business Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="">
                  Business Name
                  <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
                </Label>
                <Input required onChange={handleChange} id="businessName" placeholder="e.g. Twilio Inc." className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessWebsite" className="">
                  Business Website
                  <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
                </Label>
                <Input required onChange={handleChange} id="businessWebsite" placeholder="Enter business website" className="bg-[#F4F4F6]" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Business Address
              <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="businessAddress1" className="">
                  Street Address 1
                </Label>
                <Input required onChange={handleChange} id="businessAddress1"  placeholder="Enter street address 1" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress2" className="">
                  Street Address 2
                </Label>
                <Input 
                  id="businessAddress2"
                  name="businessAddress2" 
                  onChange={handleChange} 
                  placeholder="Enter street address 2" 
                  className="bg-[#F4F4F6]" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCity" className="">
                  City
                </Label>
                <Input required onChange={handleChange} id="businessCity"  placeholder="Enter city" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessState" className="">
                  State
                </Label>
                <Select required
                  id="businessState"
                  name="businessState"
                  onValueChange={handleSelectChange('businessState')}
                >
                  <SelectTrigger>
                    <SelectValue  placeholder="Select state" />
                  </SelectTrigger>
                    <SelectContent>
                      {Object.entries(states).map(([key, value]) => (
                        <SelectItem key={key} value={value}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPostalCode" className="">
                  Zip Code
                </Label>
                <Input required
                  id="businessPostalCode"
                  name="businessPostalCode"
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  className="bg-[#F4F4F6]"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Business Contact
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="businessContactFirstName" className="">
                    First Name
                  </Label>
                  <Input required onChange={handleChange} id="businessContactFirstName" placeholder="Enter first name" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessContactLastName" className="">
                    Last Name
                  </Label>
                  <Input required onChange={handleChange} id="businessContactLastName" placeholder="Enter last name" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessContactEmail" className="">
                    Business Contact Email
                  </Label>
                  <Input required onChange={handleChange} id="businessContactEmail" type="email" placeholder="Enter email" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="]">
                    Phone Number
                  </Label>
                  <Input required onChange={handleChange} id="phoneNumber" placeholder="Enter phone number" className="bg-[#F4F4F6]" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Use Case
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="useCaseCategories" className="">
                  Use Case Category
                  <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
                </Label>
                <Select required
                  id="useCaseCategories"
                  name="useCaseCategories"
                  onValueChange={handleSelectChange('useCaseCategories')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" className="bg-[#F4F4F6]" />
                  </SelectTrigger>
                  <SelectContent>
                  {Object.entries(useCaseCategories).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="useCaseSummary" className="">
                Use Case Summary
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Textarea required
                id="useCaseSummary"
                name="useCaseSummary"
                onChange={handleChange}
                placeholder="Enter a summary of your use case"
                rows={4}
                className="bg-[#F4F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productionMessageSample" className="">
                Message Sample
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Textarea required 
                id="productionMessageSample" 
                name="productionMessageSample"
                onChange={handleChange} 
                placeholder="Enter a sample message"
                rows={4} 
                className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opt-in-type" className="">
                Opt-In Type
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Select required
                id="optInType" 
                name="optInType"
                onValueChange={handleSelectChange('optInType')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an opt-in type" />
                </SelectTrigger>
                <SelectContent>
                {Object.entries(optInTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="optInImageUrls" className="">
                Opt-In Image URL
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Input required onChange={handleChange} id="optInImageUrls" name="optInImageUrls" placeholder="Enter an image URL" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageVolume" className="">
                Monthly Messaging Volume
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Select required
                id="messageVolume" 
                name="messageVolume" 
                onValueChange={handleSelectChange('messageVolume')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a monthly volume" />
                </SelectTrigger>
                <SelectContent>
                  {messageVolumes.map((volume) => (
                      <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInformation" className="">
                Additional Information
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Textarea required
                onChange={handleChange}
                id="additionalInformation"
                name="additionalInformation"
                placeholder="Enter any additional information"
                rows={4}
                className="bg-[#F4F4F6]"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Select Phone Number to Register</h2>
            <div className="space-y-2">
              <Label htmlFor="phoneNumbers" className="">
                Phone Numbers
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Select required
                id="phoneNumbers" 
                name="tollfreePhoneNumberSid" 
                onValueChange={handleSelectChange('tollfreePhoneNumberSid')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select phone numbers" />
                </SelectTrigger>
                  <SelectContent>
                    { isLoading ? <SelectItem key="test" value="test">Still Loading...</SelectItem> : (
                      Object.entries(tollFreeNumbers).map(([key, value]) => (
                        <SelectItem value={key} key={key}>{value}</SelectItem>
                      ))
                    )}
                  </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 max-w-xl">
                <b>Note:</b> If a toll-free number is currently associated with a pending or rejected registration it will not populate here.
                You will first have to delete the verification request in the Twilio console.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Notifications</h2>
            <div className="space-y-2">
              <Label htmlFor="notificationEmail" className="">
                Notifications Email
                <TooltipWithIcon message="This is an info icon tooltip" icon={Info} />
              </Label>
              <Input required
                onChange={handleChange}
                id="notificationEmail"
                name="notificationEmail"
                type="email"
                placeholder="Enter email for notifications"
                className="bg-[#F4F4F6]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="reset" className="bg-[#99CDFF] hover:bg-[#121C2D]/90 px-6 mx-4">
              Clear Form
            </Button>
            <Button type="submit" className="bg-[#121C2D] hover:bg-[#121C2D]/90 px-6">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
