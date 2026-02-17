'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HomeworkModeSelectionProps {
    onClose: () => void;
    onTeacherLogin: () => void;
    onStudentLogin: () => void;
    onAnonymousLogin: () => void;
}

export default function HomeworkModeSelection({
    onClose,
    onTeacherLogin,
    onStudentLogin,
    onAnonymousLogin,
}: HomeworkModeSelectionProps) {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="text-5xl mb-4"
                        >
                            📚
                        </motion.div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                            Ödev Sistemi
                        </h2>
                        <p className="text-white/60 text-sm">
                            Giriş tipini seçin
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                        {/* Teacher Login */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onTeacherLogin}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                        >
                            <span className="text-3xl">👨‍🏫</span>
                            <span className="text-lg flex-1 text-center">Öğretmen Girişi</span>
                            <span className="text-white/0 group-hover:text-white/100 transition-all">→</span>
                        </motion.button>

                        {/* Student Login */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onStudentLogin}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                        >
                            <span className="text-3xl">👨‍🎓</span>
                            <span className="text-lg flex-1 text-center">Öğrenci Girişi</span>
                            <span className="text-white/0 group-hover:text-white/100 transition-all">→</span>
                        </motion.button>

                        {/* Anonymous Login */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onAnonymousLogin}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                        >
                            <span className="text-3xl">🎭</span>
                            <span className="text-lg flex-1 text-center">Anonim Giriş</span>
                            <span className="text-white/0 group-hover:text-white/100 transition-all">→</span>
                        </motion.button>
                    </div>

                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="mt-6 w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-all border border-white/10"
                    >
                        İptal
                    </motion.button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
