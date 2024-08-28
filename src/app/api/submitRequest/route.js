// app/api/submitRequest/route.js
import { NextResponse } from "next/server";
import twilio from 'twilio';

import 'dotenv/config';
require('dotenv').config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const tollFreeNumbers = {}; // All toll free numbers in the account regardless of status

export async function POST(request) { 
  try {
    const req = await request.json()

    return NextResponse.json({ success: true, error: false}, { status: 200 });

    // TODO: Make request to Twilo KYC API to submit


    // Make the Twilio API call
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message}, { status: 500 });
  }
}

// Returns a list of Toll Free numbers without a verification
export async function GET(request) {

  const incomingPhoneNumbers = await client.incomingPhoneNumbers.list({
    limit: 1000,
    phoneNumber: '+18' // Only US numbers starting with '8'
  });

  incomingPhoneNumbers.forEach((i) => {
    // Match only toll free numbers
    const regex = new RegExp(/^\+18(00|88|77|66|55|44|33|22)[0-9]+$/, 'gmi');
    if (i.phoneNumber.match(regex)) {
      tollFreeNumbers[i.sid] = i.phoneNumber;
    }
  });

  const tollFreeRegistrations = await client.messaging.v1.tollfreeVerifications.list(
    // TODO: Implement a pagination mechanism to support 50+ verifications
    { limit: 50 }
  );

  tollFreeRegistrations.forEach((i) => {
    if (tollFreeNumbers[i.tollfreePhoneNumberSid]) {
      delete tollFreeNumbers[i.tollfreePhoneNumberSid];
    }
  });

  // Displays all toll free numbers
  console.log(tollFreeNumbers);

  return NextResponse.json({message: tollFreeNumbers, success: true, error: false}, { status: 200 });
}