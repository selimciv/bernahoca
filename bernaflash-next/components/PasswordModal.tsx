'use client';

import { useState } from 'react';

interface PasswordModalProps {
    title: string;
    onSuccess: () => void;
    onClose: () => void;
}

export default function PasswordModal({ title, onSuccess, onClose }: PasswordModalProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const checkPassword = async () => {
        if (password === '2702') {
            // Send correct password notification
            try {
                const ipResponse = await fetch('/api/get-ip');
                const ipData = await ipResponse.json();
                const ip = ipData.ip || 'Unknown';
                const city = ipData.city || '-';
                const country = ipData.country || 'TR';

                const now = new Date();
                const timestamp = now.toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                // Get device info
                const ua = navigator.userAgent;
                const os = ua.includes('Win') ? 'Windows 10/11' : ua.includes('Mac') ? 'MacOS' : ua.includes('Linux') ? 'Linux' : ua.includes('Android') ? 'Android' : ua.includes('iOS') || ua.includes('iPhone') ? 'iOS' : 'Unknown';
                const deviceType = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ? 'Tablet 📱' : /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'Mobil 📱' : 'Masaüstü 🖥️';
                const browser = ua.includes('Chrome') && !ua.includes('Edg') ? 'Chrome' : ua.includes('Safari') && !ua.includes('Chrome') ? 'Safari' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Edg') ? 'Edge' : 'Unknown';

                const message = `✅ Doğru Şifre Girişi!

🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${os}
📱 Cihaz: ${deviceType}
🌐 Tarayıcı: ${browser}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}
🔐 İşlem: ${title}`;

                await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
            } catch (error) {
                console.error('Failed to send correct password notification:', error);
            }

            onSuccess();
        } else {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 2000);

            // Send wrong password notification
            try {
                const ipResponse = await fetch('/api/get-ip');
                const ipData = await ipResponse.json();
                const ip = ipData.ip || 'Unknown';
                const city = ipData.city || '-';
                const country = ipData.country || 'TR';

                const now = new Date();
                const timestamp = now.toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                // Get device info
                const ua = navigator.userAgent;
                const os = ua.includes('Win') ? 'Windows 10/11' : ua.includes('Mac') ? 'MacOS' : ua.includes('Linux') ? 'Linux' : ua.includes('Android') ? 'Android' : ua.includes('iOS') || ua.includes('iPhone') ? 'iOS' : 'Unknown';
                const deviceType = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ? 'Tablet 📱' : /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'Mobil 📱' : 'Masaüstü 🖥️';
                const browser = ua.includes('Chrome') && !ua.includes('Edg') ? 'Chrome' : ua.includes('Safari') && !ua.includes('Chrome') ? 'Safari' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Edg') ? 'Edge' : 'Unknown';

                const message = `🔒 Yanlış Şifre Girişi!

🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${os}
📱 Cihaz: ${deviceType}
🌐 Tarayıcı: ${browser}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}
🔐 İşlem: ${title}
❌ Girilen Şifre: ${password}`;

                await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
            } catch (error) {
                console.error('Failed to send wrong password notification:', error);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') checkPassword();
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-md w-full mx-4">
                <h3 className="text-white text-2xl font-bold mb-6 text-center">{title}</h3>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    placeholder="Öğretmen Şifresi"
                    className={`w-full bg-white/20 text-white placeholder-white/50 px-6 py-4 rounded-xl border-2 outline-none transition-all text-center text-2xl ${error
                        ? 'border-red-500 shake'
                        : 'border-white/30 focus:border-white'
                        }`}
                />

                {error && (
                    <div className="text-red-400 text-center mt-4 font-bold animate-pulse">
                        ❌ Hatalı Şifre!
                    </div>
                )}

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        İptal
                    </button>
                    <button
                        onClick={checkPassword}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        Giriş
                    </button>
                </div>
            </div>
        </div>
    );
}
