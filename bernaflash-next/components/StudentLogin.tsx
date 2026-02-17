'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { studentData } from '@/data/students';
import { studentPasswords, getStudentClass } from '@/data/studentPasswords';

interface StudentLoginProps {
    onClose: () => void;
    onSuccess: (schoolNumber: number, studentName: string, studentClass: '9-B' | '9-E' | '11-C') => void;
}

export default function StudentLogin({ onClose, onSuccess }: StudentLoginProps) {
    const [schoolNumber, setSchoolNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError('');
        setIsLoading(true);

        try {
            const schoolNo = parseInt(schoolNumber);

            // Validate school number exists
            const studentClass = getStudentClass(schoolNo);
            if (!studentClass) {
                setError('Geçersiz okul numarası!');
                setIsLoading(false);
                return;
            }

            // Find student in class data
            const classStudents = studentData[studentClass];
            const student = classStudents?.find(s => s.no === schoolNo);

            if (!student) {
                setError('Öğrenci bulunamadı!');
                setIsLoading(false);
                return;
            }

            // Validate password
            const correctPassword = studentPasswords[schoolNo];
            if (password !== correctPassword) {
                setError('Yanlış şifre!');
                setIsLoading(false);
                return;
            }

            // Success!
            onSuccess(schoolNo, student.name, studentClass);
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="text-5xl mb-4"
                        >
                            👨‍🎓
                        </motion.div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                            Öğrenci Girişi
                        </h2>
                        <p className="text-white/60 text-sm">
                            Okul numaranız ve şifreniz ile giriş yapın
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* School Number Input */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Okul Numarası
                            </label>
                            <input
                                type="number"
                                value={schoolNumber}
                                onChange={(e) => setSchoolNumber(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Örn: 112"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Şifre (4 haneli)
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="••••"
                                maxLength={4}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogin}
                            disabled={isLoading || !schoolNumber || password.length !== 4}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all"
                        >
                            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
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

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-white/40 text-xs">
                            Şifrenizi öğretmeninizden alabilirsiniz
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
