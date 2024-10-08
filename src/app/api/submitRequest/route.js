// app/api/submitRequest/route.js
import { NextResponse } from "next/server";
import twilio from 'twilio';

import 'dotenv/config';
require('dotenv').config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// Instantiating Twilio Client SDK
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(request) { 
  try {
    const req = await request.json()
    
    console.log(req);
    
    // TODO: Make request to Twilo KYC API to submit
    const tollFreeVerification = await client.messaging.v1.tollfreeVerifications.create(req);
    console.log(tollFreeVerification);
    
    // route user to new page
    return NextResponse.json({ success: true, error: false}, { status: 200 });
  
  
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message}, { status: 500 });
  }
}

// Returns a list of Toll Free numbers without a verification
export async function GET(request) {
  const tollFreeNumbers = {}; // All toll free numbers in the account regardless of status

  const incomingPhoneNumbers = await client.incomingPhoneNumbers.list({
    limit: 1000,
    phoneNumber: '+18' // Only US numbers starting with '8'
  });

  incomingPhoneNumbers.forEach((i) => {
    const regex = new RegExp(/^\+18(00|88|77|66|55|44|33|22)[0-9]+$/, 'gmi'); // Matches only toll free numbers
    if (i.phoneNumber.match(regex)) { tollFreeNumbers[i.sid] = i.phoneNumber; } 
  });

  const tollFreeRegistrations = await client.messaging.v1.tollfreeVerifications.list(
    // TODO: Implement a pagination mechanism to support 50+ verifications
    { limit: 50 }
  );

  // This removes those numbers to display if they're currently associated
  // with a verification request. This includes 'pending' or 'rejected' states.
  tollFreeRegistrations.forEach((i) => {
    if (tollFreeNumbers[i.tollfreePhoneNumberSid]) {
      delete tollFreeNumbers[i.tollfreePhoneNumberSid];
    }
  });

  return NextResponse.json({message: tollFreeNumbers, success: true, error: false}, { status: 200 });
}