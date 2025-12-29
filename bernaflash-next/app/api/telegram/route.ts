import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8516232789:AAHq85UmZDajIJp8sVrFOkPP7FKzlB0E0cE';
const TELEGRAM_CHAT_ID = '-5209429265';

// In-memory storage for IP to student ID mapping
const ipStudentMap = new Map<string, number>();
let nextStudentId = 1;

export function getStudentIdForIP(ip: string): number {
    if (ipStudentMap.has(ip)) {
        return ipStudentMap.get(ip)!;
    }

    const studentId = nextStudentId++;
    ipStudentMap.set(ip, studentId);
    console.log(`Assigned student ID ${studentId} to IP ${ip}`);

    return studentId;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message } = body;

        console.log('Telegram POST received:', { message: message?.substring(0, 50) }); // Debug

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        const responseData = await response.json();
        console.log('Telegram API response:', responseData); // Debug

        if (!response.ok) {
            console.error('Telegram API error:', responseData);
            return NextResponse.json({ error: 'Failed to send message', details: responseData }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: responseData });
    } catch (error) {
        console.error('Error in Telegram POST:', error);
        return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
    }
}

// GET endpoint to fetch student ID for an IP
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const ip = url.searchParams.get('ip');

        if (!ip) {
            return NextResponse.json({ error: 'IP is required' }, { status: 400 });
        }

        const studentId = getStudentIdForIP(ip);
        return NextResponse.json({ studentId });
    } catch (error) {
        console.error('Error getting student ID:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
