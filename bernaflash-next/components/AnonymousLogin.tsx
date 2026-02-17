'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AnonymousLoginProps {
    onClose: () => void;
    onSuccess: (name: string, sessionId: string) => void;
}

export default function AnonymousLogin({ onClose, onSuccess }: AnonymousLoginProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Lütfen isminizi girin');
            return;
        }

        if (trimmedName.length < 2) {
            setError('İsim en az 2 karakter olmalıdır');
            return;
        }

        // Generate a unique session ID
        const sessionId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        onSuccess(trimmedName, sessionId);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-green-900/95 to-emerald-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="text-5xl mb-4"
                        >
                            🎭
                        </motion.div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                            Anonim Giriş
                        </h2>
                        <p className="text-white/60 text-sm">
                            Son tarihi geçmiş ödevleri çözebilirsiniz
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                İsminiz
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Örn: Ahmet Yılmaz"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                autoFocus
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-200 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={!name.trim()}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all"
                        >
                            Devam Et
                        </motion.button>

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-all border border-white/10"
                        >
                            İptal
                        </motion.button>
                    </div>

                    {/* Info Text */}
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/60 text-xs text-center">
                            ℹ️ Sadece son tarihi geçmiş ödevleri çözebilirsiniz. Aktif ödevler için öğrenci girişi yapmalısınız.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
