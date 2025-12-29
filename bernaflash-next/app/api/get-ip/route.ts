import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Try to get IP from headers
        const forwarded = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');

        let ip = forwarded?.split(',')[0] || realIp || 'Unknown';

        // Clean up IP
        if (ip.includes(':')) {
            ip = ip.split(':')[0];
        }

        // Get location info from IP
        let city = '-';
        let country = 'TR';

        if (ip && ip !== 'Unknown' && ip !== '127.0.0.1' && ip !== '::1') {
            try {
                // Use ip-api.com for free geolocation
                const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
                const geoData = await geoResponse.json();

                if (geoData.status === 'success') {
                    city = geoData.city || '-';
                    country = geoData.countryCode || 'TR';
                }
            } catch (error) {
                console.error('Geolocation error:', error);
            }
        }

        return NextResponse.json({ ip, city, country });
    } catch (error) {
        console.error('Error getting IP:', error);
        return NextResponse.json({ ip: 'Unknown', city: '-', country: 'TR' });
    }
}
