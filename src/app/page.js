"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

export default function Component() {
  const [formValues, setFormValues] = useState({
    businessName: "",
    brandName: "",
    businessType: "",
    ein: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSelectChange = (value) => {
    setFormValues({ ...formValues, businessType: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8" style={{ backgroundColor: "#121C2D" }}>
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
              <Label htmlFor="business-name" className="text-[#C9CCD7]">
                Business Name
              </Label>
              <Input id="business-name" placeholder="e.g. Twilio Inc." className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-website" className="text-[#C9CCD7]">
                Business Website
              </Label>
              <Input id="business-website" placeholder="Enter business website" className="bg-[#F4F4F6]" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Business Address</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="street-address-1" className="text-[#C9CCD7]">
                Street Address 1
              </Label>
              <Input id="street-address-1" placeholder="Enter street address 1" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street-address-2" className="text-[#C9CCD7]">
                Street Address 2
              </Label>
              <Input id="street-address-2" placeholder="Enter street address 2" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-[#C9CCD7]">
                City
              </Label>
              <Input id="city" placeholder="Enter city" className="bg-[#F4F4F6]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-[#C9CCD7]">
                State
              </Label>
              <Select id="state">
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="AR">Arkansas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="DE">Delaware</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="ID">Idaho</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="IN">Indiana</SelectItem>
                  <SelectItem value="IA">Iowa</SelectItem>
                  <SelectItem value="KS">Kansas</SelectItem>
                  <SelectItem value="KY">Kentucky</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                  <SelectItem value="ME">Maine</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="MI">Michigan</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MS">Mississippi</SelectItem>
                  <SelectItem value="MO">Missouri</SelectItem>
                  <SelectItem value="MT">Montana</SelectItem>
                  <SelectItem value="NE">Nebraska</SelectItem>
                  <SelectItem value="NV">Nevada</SelectItem>
                  <SelectItem value="NH">New Hampshire</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="NM">New Mexico</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                  <SelectItem value="ND">North Dakota</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="RI">Rhode Island</SelectItem>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="SD">South Dakota</SelectItem>
                  <SelectItem value="TN">Tennessee</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="UT">Utah</SelectItem>
                  <SelectItem value="VT">Vermont</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="WV">West Virginia</SelectItem>
                  <SelectItem value="WI">Wisconsin</SelectItem>
                  <SelectItem value="WY">Wyoming</SelectItem>
                  <SelectItem value="AS">American Samoa</SelectItem>
                  <SelectItem value="GU">Guam</SelectItem>
                  <SelectItem value="MP">Northern Mariana Islands</SelectItem>
                  <SelectItem value="PR">Puerto Rico</SelectItem>
                  <SelectItem value="VI">Virgin Islands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip-code" className="text-[#C9CCD7]">
                Zip Code
              </Label>
              <Input id="zip-code" placeholder="Enter zip code" className="bg-[#F4F4F6]" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Business Contact</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-[#C9CCD7]">
                  First Name
                </Label>
                <Input id="first-name" placeholder="Enter first name" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-[#C9CCD7]">
                  Last Name
                </Label>
                <Input id="last-name" placeholder="Enter last name" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#C9CCD7]">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter email" className="bg-[#F4F4F6]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number" className="text-[#C9CCD7]">
                  Phone Number
                </Label>
                <Input id="phone-number" placeholder="Enter phone number" className="bg-[#F4F4F6]" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Use Case</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="use-case-category" className="text-[#C9CCD7]">
                Use Case Category
              </Label>
              <Select id="use-case-category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="notifications">Notifications</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="use-case-summary" className="text-[#C9CCD7]">
              Use Case Summary
            </Label>
            <Textarea
              id="use-case-summary"
              placeholder="Enter a summary of your use case"
              rows={4}
              className="bg-[#F4F4F6]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message-sample" className="text-[#C9CCD7]">
              Message Sample
            </Label>
            <Textarea id="message-sample" placeholder="Enter a sample message" rows={4} className="bg-[#F4F4F6]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opt-in-type" className="text-[#C9CCD7]">
              Opt-In Type
            </Label>
            <Select id="opt-in-type">
              <SelectTrigger>
                <SelectValue placeholder="Select an opt-in type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="voice">Voice</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="opt-in-image-url" className="text-[#C9CCD7]">
              Opt-In Image URL
            </Label>
            <Input id="opt-in-image-url" placeholder="Enter an image URL" className="bg-[#F4F4F6]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly-messaging-volume" className="text-[#C9CCD7]">
              Monthly Messaging Volume
            </Label>
            <Select id="monthly-messaging-volume">
              <SelectTrigger>
                <SelectValue placeholder="Select a monthly volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-100k">Less than 100,000</SelectItem>
                <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                <SelectItem value="500k-1m">500,000 - 1,000,000</SelectItem>
                <SelectItem value="more-than-1m">More than 1,000,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional-information" className="text-[#C9CCD7]">
              Additional Information
            </Label>
            <Textarea
              id="additional-information"
              placeholder="Enter any additional information"
              rows={4}
              className="bg-[#F4F4F6]"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#C9CCD7]">Select Phone Number to Register</h2>
          <div className="space-y-2">
            <Label htmlFor="phone-numbers" className="text-[#C9CCD7]">
              Phone Numbers
            </Label>
            <Select id="phone-numbers" multiple>
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
            <Label htmlFor="notifications-email" className="text-[#C9CCD7]">
              Notifications Email
            </Label>
            <Input
              id="notifications-email"
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
    </div>
  );
}
