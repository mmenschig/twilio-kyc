"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
    businessStreetAddress: "",
    businessStreetAddress2: "",
    businessCity: "",
    businessStateProvinceRegion: "",
    businessPostalCode: "",
    businessContactFirstName: "",
    businessContactLastName: "",
    businessContactEmail: "",
    businessContactPhone: "",
    businessCountry: "US",
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
                  <TooltipWithIcon message="The end business the customer (end user) is engaging with." icon={Info} />
                </Label>
                <Input required onChange={handleChange} id="businessName" placeholder="e.g. Twilio Inc." className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessWebsite" className="">
                  Business Website
                  <TooltipWithIcon message="The website of the end business or the website the consumer is engaging with." icon={Info} />
                </Label>
                <Input required onChange={handleChange} id="businessWebsite" placeholder="Enter business website" className="bg-[#F4F4F6]" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Business Address
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="businessStreetAddress" className="">
                  Street Address 1
                </Label>
                <Input required 
                  onChange={handleChange} 
                  id="businessStreetAddress" 
                  name="businessStreetAddress"
                  placeholder="Enter street address 1"
                  className="bg-[#F4F4F6]" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessStreetAddress2" className="">
                  Street Address 2
                </Label>
                <Input 
                  id="businessStreetAddress2"
                  name="businessStreetAddress2" 
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
                <Label htmlFor="businessStateProvinceRegion" className="">
                  State
                </Label>
                <Select required
                  id="businessStateProvinceRegion"
                  name="businessStateProvinceRegion"
                  onValueChange={handleSelectChange('businessStateProvinceRegion')}
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
                  <Label htmlFor="businessContactPhone" className="]">
                    Business Contact Phone Number
                  </Label>
                  <Input required onChange={handleChange} id="businessContactPhone" placeholder="Enter phone number" className="bg-[#F4F4F6]" />
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
                  <TooltipWithIcon message="This should be the use case that best fits the types of messages being sent by this toll-free phone number." icon={Info} />
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
                <TooltipWithIcon message="The explanation on how messaging is used on this toll-free phone number by the business or organization. The more detailed information you provide for the use case/summary the better." icon={Info} />
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
                <TooltipWithIcon message="Refers to the production level sample message(s) that the end-business will be sending to the end-user/mobile handset." icon={Info} />
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
                <TooltipWithIcon message="Opt-in refers to the process of getting end-user permission to send them text messages. According to TCPA law, businesses must have 'express written consent' from the end-user before texting them." icon={Info} />
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
                <TooltipWithIcon message="You must demonstrate how consent to receive messaging is collected from the consumer. You must provide proof of consent collection via this OptInImageUrls parameter, which can contain a link to the web form, a hosted image file, or a link to a document that tells the story of the opt-in." icon={Info} />
              </Label>
              <Input required onChange={handleChange} id="optInImageUrls" name="optInImageUrls" placeholder="Enter an image URL" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageVolume" className="">
                Monthly Messaging Volume
                <TooltipWithIcon message="The estimated monthly volume on the toll-free phone number referenced in the submission. Choose the closest value and if it increases, use the value of where you expect to be in 6 months." icon={Info} />
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
                <TooltipWithIcon message="Any additional details (i.e., privacy policies, onboarding controls, etc…) that you want to add or that you believe will help with the verification such as privacy policies, AUPs, additional onboarding controls you have, links, etc." icon={Info} />
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
              <Label htmlFor="businessContactPhones" className="">
                Phone Numbers
                <TooltipWithIcon message="Select the Toll-Free from your account's available inventory that you would like to have verified with this request." icon={Info} />
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
                <TooltipWithIcon message="A status update of your Toll-Free phone number verification request will be sent via an email notification to this email address." icon={Info} />
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
