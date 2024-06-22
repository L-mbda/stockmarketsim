import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(request: any) {
    let data = await request.json();
    console.log(data);
    let ticker = data.ticker;
    let response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&interval=5min&apikey=${process.env.AV_Code}`);
    let stock_information = response.data['Global Quote'];
    console.log(response)
    return NextResponse.json({ stock_information: stock_information });
}