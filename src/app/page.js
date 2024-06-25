"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

export default function Component() {
  // Create state object to store form information in
  // prior to submitting to Twilio API
  const [formValues, setFormValues] = useState({
    businessName: "",
    businessWebsite: "",
    businessAddress1: "",
    businessAddress2: "",
    businessCity: "",
    businessState: "",
    businessZipCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    useCaseCategory: "",
    useCaseSummary: "",
    messageSample: "",
    optInType: "",
    optInImageUrl: "",
    monthlyMessagingVolume: "",
    additionalInformation: "",
    selectedPhoneNumber: "",
    notificationsEmail: ""
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
  const monthlyMessagingVolumes = ["10", "1,000", "10,000", "100,000", "250,000", "500,000", "750,000", "1,000,000", "5,000,000", "10,000,000+"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSelectChange = (field) => (value) => {
    console.log(field, value);
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8" style={{ backgroundColor: "#121C2D" }}>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-8 text-3xl font-bold text-[#C9CCD7]">Register your Business for Messaging and Voice</h1>
        <p className="mb-8 text-[#C9CCD7]">
          We are proud to offer advanced voice and messaging capabilites to our customers. Submit your business
          information below to register for Verified Toll-Free messaging as well as advanced voice calling features such
          as Shaken/STIR.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Business Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-[#C9CCD7]">
                  Business Name
                </Label>
                <Input onChange={handleChange} id="businessName" placeholder="e.g. Twilio Inc." className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessWebsite" className="text-[#C9CCD7]">
                  Business Website
                </Label>
                <Input onChange={handleChange} id="businessWebsite" placeholder="Enter business website" className="bg-[#F4F4F6]" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Business Address</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="businessAddress1" className="text-[#C9CCD7]">
                  Street Address 1
                </Label>
                <Input onChange={handleChange} id="businessAddress1"  placeholder="Enter street address 1" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress2" className="text-[#C9CCD7]">
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
                <Label htmlFor="businessCity" className="text-[#C9CCD7]">
                  City
                </Label>
                <Input onChange={handleChange} id="businessCity"  placeholder="Enter city" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessState" className="text-[#C9CCD7]">
                  State
                </Label>
                <Select
                  id="businessState"
                  name="businessState"
                  value={formValues.businessState}
                  onValueChange={handleSelectChange('businessState')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                    <SelectContent>
                      {Object.entries(states).map(([key, value]) => (
                        <SelectItem key={key} value={value}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessZipCode" className="text-[#C9CCD7]">
                  Zip Code
                </Label>
                <Input 
                  id="businessZipCode"
                  name="businessZipCode"
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  className="bg-[#F4F4F6]"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Business Contact</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#C9CCD7]">
                    First Name
                  </Label>
                  <Input onChange={handleChange} id="firstName" placeholder="Enter first name" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#C9CCD7]">
                    Last Name
                  </Label>
                  <Input onChange={handleChange} id="lastName" placeholder="Enter last name" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#C9CCD7]">
                    Email
                  </Label>
                  <Input onChange={handleChange} id="email" type="email" placeholder="Enter email" className="bg-[#F4F4F6]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-[#C9CCD7]">
                    Phone Number
                  </Label>
                  <Input onChange={handleChange} id="phoneNumber" placeholder="Enter phone number" className="bg-[#F4F4F6]" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Use Case</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="useCaseCategory" className="text-[#C9CCD7]">
                  Use Case Category
                </Label>
                <Select 
                  id="useCaseCategory"
                  name="useCaseCategory"
                  value={formValues.useCaseCategory}
                  onValueChange={handleSelectChange('useCaseCategory')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
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
              <Label htmlFor="useCaseSummary" className="text-[#C9CCD7]">
                Use Case Summary
              </Label>
              <Textarea
                id="useCaseSummary"
                name="useCaseSummary"
                onChange={handleChange}
                placeholder="Enter a summary of your use case"
                rows={4}
                className="bg-[#F4F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageSample" className="text-[#C9CCD7]">
                Message Sample
              </Label>
              <Textarea onChange={handleChange} id="messageSample" name="messageSample" placeholder="Enter a sample message" rows={4} className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opt-in-type" className="text-[#C9CCD7]">
                Opt-In Type
              </Label>
              <Select 
                id="optInType" 
                name="optInType"
                value={formValues.optInType} 
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
              <Label htmlFor="optInImageUrl" className="text-[#C9CCD7]">
                Opt-In Image URL
              </Label>
              <Input onChange={handleChange} id="optInImageUrl" name="optInImageUrl" placeholder="Enter an image URL" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyMessagingVolume" className="text-[#C9CCD7]">
                Monthly Messaging Volume
              </Label>
              <Select id="monthlyMessagingVolume" name="monthlyMessagingVolume" onValueChange={handleSelectChange('monthlyMessagingVolume')} value={formValues.monthlyMessagingVolume}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a monthly volume" />
                </SelectTrigger>
                <SelectContent>
                  {monthlyMessagingVolumes.map((volume) => (
                      <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInformation" className="text-[#C9CCD7]">
                Additional Information
              </Label>
              <Textarea
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
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Select Phone Number to Register</h2>
            <div className="space-y-2">
              <Label htmlFor="phoneNumbers" className="text-[#C9CCD7]">
                Phone Numbers
              </Label>
              <Select id="phoneNumbers" multiple>
                <SelectTrigger>
                  <SelectValue placeholder="Select phone numbers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1234567890">+1 (234) 567-890</SelectItem>
                  <SelectItem value="+1987654321">+1 (987) 654-321</SelectItem>
                  <SelectItem value="+1555123456">+1 (555) 123-456</SelectItem>
                  <SelectItem value="+1888999888">+1 (888) 999-888</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Notifications</h2>
            <div className="space-y-2">
              <Label htmlFor="notificationsEmail" className="text-[#C9CCD7]">
                Notifications Email
              </Label>
              <Input
                onChange={handleChange}
                id="notificationsEmail"
                name="notificationsEmail"
                type="email"
                placeholder="Enter email for notifications"
                className="bg-[#F4F4F6]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#51A9E3] hover:bg-[#51A9E3]/90">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
