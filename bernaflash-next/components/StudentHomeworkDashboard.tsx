'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getStudentHomeworkHistory, isHomeworkExpired, startHomework } from '@/lib/homeworkService';
import { Homework, StudentSubmission, ClassType } from '@/types/homework';
import HomeworkTestInterface from './HomeworkTestInterface';

interface StudentHomeworkDashboardProps {
    onClose: () => void;
    studentId: string;
    studentName: string;
    studentClass: ClassType;
}

export default function StudentHomeworkDashboard({
    onClose,
    studentId,
    studentName,
    studentClass,
}: StudentHomeworkDashboardProps) {
    const [homework, setHomework] = useState<Array<{ homework: Homework; submission?: StudentSubmission }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeHomework, setActiveHomework] = useState<{ homework: Homework; isReadOnly: boolean } | null>(null);

    useEffect(() => {
        loadHomework();
    }, []);

    const loadHomework = async () => {
        setIsLoading(true);
        try {
            const data = await getStudentHomeworkHistory(studentId, studentClass);
            // Sort by creation time (descending) - Newest first
            data.sort((a, b) => b.homework.createdAt - a.homework.createdAt);
            setHomework(data);
        } catch (error) {
            console.error('Error loading homework:', error);
        }
        setIsLoading(false);
    };

    const getStatus = (hw: Homework, submission?: StudentSubmission) => {
        if (!submission) {
            return isHomeworkExpired(hw) ? 'expired' : 'not-started';
        }
        if (submission.isCompleted) {
            return 'completed';
        }
        return 'in-progress';
    };

    const handleStartHomework = async (hw: Homework) => {
        try {
            await startHomework(hw.id, studentId, false, studentName, studentClass);
            setActiveHomework({ homework: hw, isReadOnly: false });
        } catch (error) {
            console.error('Error starting homework:', error);
        }
    };

    const handleContinueHomework = (hw: Homework) => {
        setActiveHomework({ homework: hw, isReadOnly: false });
    };

    const handleViewHomework = (hw: Homework) => {
        setActiveHomework({ homework: hw, isReadOnly: true });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'not-started':
                return <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">⏳ Başlanmadı</span>;
            case 'in-progress':
                return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">📝 Devam Ediyor</span>;
            case 'completed':
                return <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">✅ Tamamlandı</span>;
            case 'expired':
                return <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">⏰ Süresi Doldu</span>;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/10 shadow-2xl"
            >
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Ödevlerim
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-white/60 text-sm">
                        Hoş geldin, {studentName} ({studentClass})
                    </p>
                </div>

                {/* Homework List */}
                {isLoading ? (
                    <div className="text-center py-12 text-white/60">Yükleniyor...</div>
                ) : homework.length === 0 ? (
                    <div className="text-center py-12 text-white/40">
                        <div className="text-5xl mb-4">📚</div>
                        <p>Henüz ödev yok</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {homework.map(({ homework: hw, submission }) => {
                            const status = getStatus(hw, submission);
                            const dueDate = new Date(hw.dueDate);

                            return (
                                <motion.div
                                    key={hw.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{hw.topic}</h3>
                                            <p className="text-white/50 text-sm">{hw.questionCount} soru</p>
                                        </div>
                                        {getStatusBadge(status)}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                        <div>
                                            <span className="text-white/40">Son Tarih:</span>
                                            <p className="text-white">{dueDate.toLocaleDateString('tr-TR')}</p>
                                        </div>
                                        {submission?.score && (
                                            <div>
                                                <span className="text-white/40">Sonuç:</span>
                                                <p className="text-white">
                                                    {submission.score.correct} doğru, {submission.score.wrong} yanlış, {submission.score.empty} boş
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    {status === 'not-started' && (
                                        <button
                                            onClick={() => handleStartHomework(hw)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all"
                                        >
                                            Başla
                                        </button>
                                    )}
                                    {status === 'in-progress' && (
                                        <button
                                            onClick={() => handleContinueHomework(hw)}
                                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all"
                                        >
                                            Devam Et
                                        </button>
                                    )}
                                    {status === 'completed' && (
                                        <button
                                            onClick={() => handleViewHomework(hw)}
                                            className="w-full bg-white/10 hover:bg-white/20 text-white/80 font-medium py-3 rounded-xl transition-all"
                                        >
                                            Cevapları Görüntüle
                                        </button>
                                    )}
                                    {status === 'expired' && (
                                        <div className="w-full bg-red-500/20 text-red-300 font-medium py-3 rounded-xl text-center">
                                            Ödevin süresi doldu
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            {/* Homework Test Interface */}
            {activeHomework && (
                <HomeworkTestInterface
                    onClose={() => {
                        setActiveHomework(null);
                        loadHomework(); // Reload to get updated status
                    }}
                    homework={activeHomework.homework}
                    studentId={studentId}
                    studentName={studentName}
                    isReadOnly={activeHomework.isReadOnly}
                />
            )}
        </div>
    );
}
