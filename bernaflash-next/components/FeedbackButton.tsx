'use client';

import { useState } from 'react';

export default function FeedbackButton() {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [sending, setSending] = useState(false);

    const sendFeedback = async () => {
        if (!feedback.trim()) {
            alert('Lütfen geri bildiriminizi yazın.');
            return;
        }

        setSending(true);
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

            const message = `💬 Geri Bildirim!

🌍 Konum: ${city}, ${country}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}

📝 Mesaj:
${feedback}`;

            await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            alert('✅ Geri bildiriminiz gönderildi! Teşekkür ederiz.');
            setFeedback('');
            setShowModal(false);
        } catch (error) {
            console.error('Failed to send feedback:', error);
            alert('❌ Geri bildirim gönderilemedi. Lütfen tekrar deneyin.');
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            {/* Feedback Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 font-bold flex items-center gap-2"
            >
                <span>💬</span>
                <span>Geri Bildirim</span>
            </button>

            {/* Feedback Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-md w-full">
                        <h2 className="text-3xl font-bold text-white mb-4">Geri Bildirim</h2>
                        <p className="text-white/80 mb-6">Düşüncelerinizi bizimle paylaşın!</p>

                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Geri bildiriminizi buraya yazın..."
                            rows={6}
                            className="w-full bg-white/10 text-white placeholder-white/50 p-4 rounded-xl border-2 border-white/20 focus:border-white outline-none resize-none mb-6"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={sending}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                            >
                                İptal
                            </button>
                            <button
                                onClick={sendFeedback}
                                disabled={sending}
                                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50"
                            >
                                {sending ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
