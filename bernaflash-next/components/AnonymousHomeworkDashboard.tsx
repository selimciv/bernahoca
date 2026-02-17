'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllHomework, canAnonymousAccess, startHomework } from '@/lib/homeworkService';
import { Homework } from '@/types/homework';
import HomeworkTestInterface from './HomeworkTestInterface';

interface AnonymousHomeworkDashboardProps {
    onClose: () => void;
    name: string;
    sessionId: string;
}

export default function AnonymousHomeworkDashboard({
    onClose,
    name,
    sessionId,
}: AnonymousHomeworkDashboardProps) {
    const [homework, setHomework] = useState<Homework[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeHomework, setActiveHomework] = useState<Homework | null>(null);

    useEffect(() => {
        loadHomework();
    }, []);

    const loadHomework = async () => {
        setIsLoading(true);
        try {
            const allHomework = await getAllHomework();
            setHomework(allHomework);
        } catch (error) {
            console.error('Error loading homework:', error);
        }
        setIsLoading(false);
    };

    const handleStartHomework = async (hw: Homework) => {
        try {
            await startHomework(hw.id, sessionId, true, name);
            setActiveHomework(hw);
        } catch (error) {
            console.error('Error starting homework:', error);
        }
    };

    const expiredHomework = homework.filter(hw => canAnonymousAccess(hw));
    const activeHomeworkList = homework.filter(hw => !canAnonymousAccess(hw));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-green-900/98 to-emerald-900/98 backdrop-blur-xl rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/10 shadow-2xl"
            >
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            Anonim Ödevler
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-white/60 text-sm">
                        Hoş geldin, {name} 🎭
                    </p>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="text-center py-12 text-white/60">Yükleniyor...</div>
                ) : (
                    <>
                        {/* Expired Homework (Can Access) */}
                        {expiredHomework.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="text-green-400">✅</span>
                                    Çözebileceğin Ödevler ({expiredHomework.length})
                                </h3>
                                <div className="space-y-3">
                                    {expiredHomework.map((hw) => {
                                        const dueDate = new Date(hw.dueDate);
                                        return (
                                            <motion.div
                                                key={hw.id}
                                                whileHover={{ scale: 1.01 }}
                                                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-white font-bold">{hw.topic}</h4>
                                                        <p className="text-white/50 text-sm">
                                                            {hw.questionCount} soru • {hw.targetClass} sınıfı
                                                        </p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
                                                        Süresi Doldu
                                                    </span>
                                                </div>

                                                <div className="text-sm text-white/40 mb-3">
                                                    Son tarih: {dueDate.toLocaleDateString('tr-TR')}
                                                </div>

                                                <button
                                                    onClick={() => handleStartHomework(hw)}
                                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
                                                >
                                                    Başla
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Active Homework (Cannot Access) */}
                        {activeHomeworkList.length > 0 && (
                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="text-yellow-400">⏰</span>
                                    Aktif Ödevler ({activeHomeworkList.length})
                                </h3>
                                <div className="space-y-3">
                                    {activeHomeworkList.map((hw) => {
                                        const dueDate = new Date(hw.dueDate);
                                        return (
                                            <motion.div
                                                key={hw.id}
                                                className="bg-white/5 border border-white/10 rounded-xl p-4 opacity-60"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-white font-bold">{hw.topic}</h4>
                                                        <p className="text-white/50 text-sm">
                                                            {hw.questionCount} soru • {hw.targetClass} sınıfı
                                                        </p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                                                        Aktif
                                                    </span>
                                                </div>

                                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-sm text-yellow-300">
                                                    ⏰ Bu ödevi {dueDate.toLocaleDateString('tr-TR')} tarihinden sonra çözebilirsin
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* No Homework */}
                        {homework.length === 0 && (
                            <div className="text-center py-12 text-white/40">
                                <div className="text-5xl mb-4">📚</div>
                                <p>Henüz ödev yok</p>
                            </div>
                        )}

                        {/* Info */}
                        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-white/60 text-xs text-center">
                                ℹ️ Anonim kullanıcılar sadece son tarihi geçmiş ödevleri çözebilir. Aktif ödevler için öğrenci girişi yapmalısınız.
                            </p>
                        </div>
                    </>
                )}
            </motion.div>

            {/* Test Interface */}
            {activeHomework && (
                <HomeworkTestInterface
                    onClose={() => {
                        setActiveHomework(null);
                        loadHomework();
                    }}
                    homework={activeHomework}
                    studentId={sessionId}
                    studentName={name}
                    isAnonymous={true}
                />
            )}
        </div>
    );
}
