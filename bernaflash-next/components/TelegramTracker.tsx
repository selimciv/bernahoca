'use client';

import { useEffect, useRef, useState } from 'react';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { updateAllGameDurations } from '@/lib/gameActivityLogger';

export default function TelegramTracker() {
    const { getActivitySummary, clearActivities, logActivity } = useActivityTracker();
    const [studentId, setStudentId] = useState<number>(0);
    const [userIp, setUserIp] = useState<string>('');
    const [city, setCity] = useState<string>('-');
    const [country, setCountry] = useState<string>('TR');
    const entryTimeRef = useRef<number>(0);
    const hasNotifiedEntry = useRef(false);

    useEffect(() => {
        // Get IP, city, and student ID from server
        const initializeStudent = async () => {
            try {
                // Get IP and location
                const ipResponse = await fetch('/api/get-ip');
                const ipData = await ipResponse.json();
                const ip = ipData.ip || 'Unknown';
                const cityName = ipData.city || '-';
                const countryCode = ipData.country || 'TR';

                console.log('IP Data:', { ip, city: cityName, country: countryCode }); // Debug

                setUserIp(ip);
                setCity(cityName);
                setCountry(countryCode);

                // Get student ID from server
                const studentResponse = await fetch(`/api/telegram?ip=${encodeURIComponent(ip)}`);
                const studentData = await studentResponse.json();
                const id = studentData.studentId || 1;

                console.log(`Student ID for IP ${ip}:`, id); // Debug
                setStudentId(id);

                // Log entry activity
                logActivity('site_entry', `Site Entry from ${ip}`);
            } catch (error) {
                console.error('Failed to initialize student:', error);
                setUserIp('Unknown');
                setCity('-');
                setCountry('TR');
                setStudentId(1);
            }
        };

        initializeStudent();
    }, [logActivity]);

    useEffect(() => {
        if (studentId === 0 || !userIp) return;

        // Get device info
        const getDeviceType = () => {
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                return 'Tablet 📱';
            }
            if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                return 'Mobil 📱';
            }
            return 'Masaüstü 🖥️';
        };

        const getOS = () => {
            const ua = navigator.userAgent;
            if (ua.includes('Win')) return 'Windows 10/11';
            if (ua.includes('Mac')) return 'MacOS';
            if (ua.includes('Linux')) return 'Linux';
            if (ua.includes('Android')) return 'Android';
            if (ua.includes('iOS') || ua.includes('iPhone')) return 'iOS';
            return 'Unknown';
        };

        const getBrowser = () => {
            const ua = navigator.userAgent;
            if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
            if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
            if (ua.includes('Firefox')) return 'Firefox';
            if (ua.includes('Edg')) return 'Edge';
            return 'Unknown';
        };

        const sendTelegramMessage = async (message: string) => {
            try {
                await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
            } catch (error) {
                console.error('Failed to send Telegram message:', error);
            }
        };

        const sendEntryNotification = async () => {
            if (hasNotifiedEntry.current) return;
            hasNotifiedEntry.current = true;

            entryTimeRef.current = Date.now();
            const now = new Date();
            const timestamp = now.toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const message = `🚀 Öğrenci ${studentId} Siteye Girdi.

🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${getOS()}
📱 Cihaz: ${getDeviceType()}
🌐 Tarayıcı: ${getBrowser()}
📡 IP: ${userIp}
🕐 Giriş: ${timestamp}`;

            await sendTelegramMessage(message);
        };

        // Send entry notification
        sendEntryNotification();

        // Handle exit
        const handleBeforeUnload = () => {
            const exitTime = Date.now();
            const duration = Math.floor((exitTime - entryTimeRef.current) / 1000);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;

            const entryDate = new Date(entryTimeRef.current);
            const exitDate = new Date(exitTime);

            const entryTimestamp = entryDate.toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const exitTimestamp = exitDate.toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            // Update all game durations before getting summary
            updateAllGameDurations();

            const activitySummary = getActivitySummary();

            const message = `👋 Öğrenci ${studentId} Siteden Ayrıldı.

⏱️ Geçirilen Süre: ${minutes} dk ${seconds} sn
🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${getOS()}
📱 Cihaz: ${getDeviceType()}
🌐 Tarayıcı: ${getBrowser()}
📡 IP: ${userIp}
🕐 Giriş: ${entryTimestamp}
🕐 Çıkış: ${exitTimestamp}

📊 Aktivite Özeti:
${activitySummary}`;

            // Use sendBeacon for more reliable delivery on page unload
            const blob = new Blob([JSON.stringify({ message })], { type: 'application/json' });
            navigator.sendBeacon('/api/telegram', blob);

            clearActivities();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [studentId, userIp, city, country, getActivitySummary, clearActivities]);

    return null; // This is a tracking component, no UI
}
