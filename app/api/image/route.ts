
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    return NextResponse.json({ success: true, message:'get route success'});
}
