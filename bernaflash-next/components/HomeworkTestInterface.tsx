'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Homework, StudentSubmission } from '@/types/homework';
import { saveAnswer, submitHomework, getSubmission } from '@/lib/homeworkService';

interface HomeworkTestInterfaceProps {
    onClose: () => void;
    homework: Homework;
    studentId: string;
    studentName: string;
    isAnonymous?: boolean;
    isReadOnly?: boolean;
}

export default function HomeworkTestInterface({
    onClose,
    homework,
    studentId,
    studentName,
    isAnonymous = false,
    isReadOnly = false,
}: HomeworkTestInterfaceProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    const currentQuestion = homework.questions[currentQuestionIndex];
    const totalQuestions = homework.questions.length;
    const hasNext = currentQuestionIndex < totalQuestions - 1;
    const hasPrev = currentQuestionIndex > 0;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    // Load existing answers if resuming
    useEffect(() => {
        loadExistingAnswers();
    }, []);

    const loadExistingAnswers = async () => {
        try {
            const submission = await getSubmission(homework.id, studentId, isAnonymous);
            if (submission && submission.answers) {
                setAnswers(submission.answers);
                if (submission.isCompleted) {
                    setIsCompleted(true);
                    setScore(submission.score);
                }
            }
        } catch (error) {
            console.error('Error loading answers:', error);
        }
    };

    const handleAnswerSelect = async (option: string) => {
        if (isReadOnly) return;

        const newAnswers = { ...answers, [currentQuestion.number]: option };
        setAnswers(newAnswers);

        // Auto-save to Firebase
        setIsSaving(true);
        try {
            await saveAnswer(homework.id, studentId, isAnonymous, currentQuestion.number, option);
        } catch (error) {
            console.error('Error saving answer:', error);
        }
        setIsSaving(false);
    };

    const handleNext = () => {
        if (hasNext) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (hasPrev) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const getUnansweredQuestions = () => {
        return homework.questions.filter(q => !answers[q.number]);
    };

    const handleGoToUnanswered = () => {
        const unanswered = getUnansweredQuestions();
        if (unanswered.length > 0) {
            const firstUnansweredIndex = homework.questions.findIndex(
                q => q.number === unanswered[0].number
            );
            setCurrentQuestionIndex(firstUnansweredIndex);
        }
    };

    const handleComplete = async () => {
        if (window.confirm('Sınavı tamamlamak istediğinize emin misiniz?')) {
            try {
                await submitHomework(homework.id, studentId, isAnonymous);

                // Reload to get the score
                const submission = await getSubmission(homework.id, studentId, isAnonymous);
                if (submission?.score) {
                    setScore(submission.score);
                    setIsCompleted(true);
                }
            } catch (error) {
                console.error('Error submitting homework:', error);
                alert('Ödev gönderilirken hata oluştu');
            }
        }
    };

    const unansweredCount = getUnansweredQuestions().length;

    if (isCompleted && score) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-green-900/95 to-emerald-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                >
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-3xl font-bold text-white mb-2">Tebrikler!</h2>
                        <p className="text-white/60 mb-6">Ödevi tamamladınız</p>

                        <div className="bg-white/10 rounded-2xl p-6 mb-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-green-400">{score.correct}</div>
                                    <div className="text-xs text-white/60">Doğru</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-red-400">{score.wrong}</div>
                                    <div className="text-xs text-white/60">Yanlış</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-400">{score.empty}</div>
                                    <div className="text-xs text-white/60">Boş</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="text-4xl font-bold text-white">{score.percentage}%</div>
                                <div className="text-sm text-white/60">Başarı Oranı</div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Kapat
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-auto border border-white/10 shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white">{homework.topic}</h2>
                        <p className="text-white/60 text-sm">{studentName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm">
                            Soru {currentQuestionIndex + 1} / {totalQuestions}
                        </span>
                        <span className="text-white/60 text-sm">
                            {totalQuestions - Object.keys(answers).length} boş
                        </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.number}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="mb-6"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                            <p className="text-white text-lg font-medium mb-4">
                                {currentQuestion.number}. {currentQuestion.text}
                            </p>

                            <div className="space-y-3">
                                {(['A', 'B', 'C', 'D'] as const).map((option) => {
                                    const isSelected = answers[currentQuestion.number] === option;
                                    const isCorrect = isReadOnly && homework.answerKey[currentQuestion.number] === option;
                                    const isWrong = isReadOnly && isSelected && !isCorrect;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswerSelect(option)}
                                            disabled={isReadOnly}
                                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${isCorrect
                                                    ? 'bg-green-500/20 border-green-500 text-green-300'
                                                    : isWrong
                                                        ? 'bg-red-500/20 border-red-500 text-red-300'
                                                        : isSelected
                                                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                                                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                                                } ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}`}
                                        >
                                            <span className="font-bold">{option})</span> {currentQuestion.options[option]}
                                        </button>
                                    );
                                })}
                            </div>

                            {isSaving && (
                                <p className="text-white/40 text-xs mt-3 text-center">Kaydediliyor...</p>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrev}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white rounded-xl transition-all disabled:cursor-not-allowed"
                    >
                        ← Önceki
                    </button>

                    {isLastQuestion ? (
                        <div className="flex-1 flex gap-3">
                            {unansweredCount > 0 && !isReadOnly && (
                                <button
                                    onClick={handleGoToUnanswered}
                                    className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl transition-all font-medium"
                                >
                                    Boş Sorulara Dön ({unansweredCount})
                                </button>
                            )}
                            {!isReadOnly && (
                                <button
                                    onClick={handleComplete}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl transition-all font-bold"
                                >
                                    Sınavı Tamamla
                                </button>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={!hasNext}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all font-medium disabled:cursor-not-allowed"
                        >
                            Sonraki →
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
