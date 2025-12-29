'use client';

import { useState, useEffect } from 'react';
import { logGameActivity } from '@/lib/gameActivityLogger';

interface MillionaireQuizProps {
    vocabulary: any;
    level: string;
    onBack: () => void;
}

export default function MillionaireQuiz({ vocabulary, level, onBack }: MillionaireQuizProps) {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [lifelines, setLifelines] = useState({
        fiftyFifty: true,
        askAudience: true,
        phoneAFriend: true
    });
    const [winnings, setWinnings] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const moneyLadder = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];

    const categories = vocabulary?.levelData?.[level] || [];
    const allWords = categories.flatMap((cat: any) => cat.pool || []);

    // Log game activity on mount
    useEffect(() => {
        logGameActivity('Millionaire Quiz', level);
    }, []);

    const startQuestion = () => {
        if (!allWords.length) return;
        const correctWord = allWords[Math.floor(Math.random() * allWords.length)];

        // Generate 3 unique wrong answers (Turkish meanings)
        const distractors = [];
        const usedIndices = new Set();

        while (distractors.length < 3) {
            const idx = Math.floor(Math.random() * allWords.length);
            const randomWord = allWords[idx];
            if (randomWord.answer !== correctWord.answer && !usedIndices.has(idx)) {
                distractors.push({ text: randomWord.question, correct: false });
                usedIndices.add(idx);
            }
        }

        const options = [
            { text: correctWord.question, correct: true },
            ...distractors
        ].sort(() => Math.random() - 0.5);

        setCurrentQuestion({ ...correctWord, options });
    };

    const handleAnswer = (correct: boolean) => {
        if (correct) {
            const newWinnings = moneyLadder[currentLevel - 1] || 0;
            setWinnings(newWinnings);

            if (currentLevel >= 15) {
                setGameOver(true);
            } else {
                setCurrentLevel(currentLevel + 1);
                setCurrentQuestion(null);
            }
        } else {
            setGameOver(true);
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="flex gap-4 h-full min-h-0">
                {/* Left Side: Question & Lifelines */}
                <div className="flex-[3] flex flex-col gap-2 min-h-0">
                    {/* Lifelines - Compact */}
                    <div className="flex justify-center gap-2 flex-shrink-0 h-10">
                        <button
                            disabled={!lifelines.fiftyFifty}
                            className={`flex-1 rounded-lg font-bold text-xs md:text-sm transition-all shadow-sm ${lifelines.fiftyFifty
                                ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            50:50
                        </button>
                        <button
                            disabled={!lifelines.askAudience}
                            className={`flex-1 rounded-lg font-bold text-xs md:text-sm transition-all shadow-sm ${lifelines.askAudience
                                ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            👥 Audience
                        </button>
                        <button
                            disabled={!lifelines.phoneAFriend}
                            className={`flex-1 rounded-lg font-bold text-xs md:text-sm transition-all shadow-sm ${lifelines.phoneAFriend
                                ? 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105'
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            📞 Friend
                        </button>
                    </div>

                    {/* Question Area - Maximize Space */}
                    <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col justify-center items-center border border-white/10 shadow-xl overflow-hidden relative">
                        {!currentQuestion && !gameOver && (
                            <button
                                onClick={startQuestion}
                                className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl rounded-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.4)]"
                            >
                                Start Level {currentLevel}
                            </button>
                        )}

                        {currentQuestion && !gameOver && (
                            <div className="w-full flex flex-col items-center h-full justify-between gap-4">
                                <div className="text-center flex-1 flex flex-col justify-center">
                                    <div className="text-white/60 text-sm mb-1 tracking-widest">ENGLISH WORD</div>
                                    <div className="text-yellow-400 text-3xl md:text-5xl font-bold drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] leading-tight">
                                        {currentQuestion.answer}
                                    </div>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-3 mt-auto flex-shrink-0">
                                    {currentQuestion.options.map((opt: any, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(opt.correct)}
                                            className="relative bg-gradient-to-r from-blue-900/80 to-blue-800/80 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg text-base md:text-lg transition-all border border-blue-400/20 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] text-left group"
                                        >
                                            <span className="text-yellow-400 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">{String.fromCharCode(65 + idx)}:</span>
                                            {opt.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {gameOver && (
                            <div className="bg-black/50 rounded-2xl p-8 text-center border border-white/20 shadow-2xl backdrop-blur-xl animate-scaleIn">
                                <div className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
                                    {winnings >= 1000000 ? '🎉 YOU WON!' : 'Game Over'}
                                </div>
                                <div className="text-white text-2xl mb-6">
                                    You won: <span className="text-yellow-400 font-bold">{winnings.toLocaleString()} Pts</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setGameOver(false);
                                        setCurrentLevel(1);
                                        setWinnings(0);
                                        setCurrentQuestion(null);
                                    }}
                                    className="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Money Ladder - Compact List */}
                <div className="hidden md:flex w-48 bg-black/40 backdrop-blur-md rounded-xl p-2 overflow-y-auto border border-white/5 custom-scrollbar flex-col">
                    <div className="flex flex-col h-full justify-between">
                        {moneyLadder.slice().reverse().map((amount, idx) => {
                            const level = 15 - idx;
                            const isCurrent = level === currentLevel;
                            const isPassed = level < currentLevel;

                            return (
                                <div
                                    key={level}
                                    className={`text-center py-1 px-2 rounded font-bold text-xs md:text-sm transition-all flex justify-between items-center ${isCurrent
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black scale-105 shadow-[0_0_10px_rgba(234,179,8,0.4)] z-10'
                                        : isPassed
                                            ? 'bg-green-600/10 text-green-400/80 border border-green-500/10'
                                            : 'text-white/20'
                                        }`}
                                >
                                    <span className="opacity-50 text-[10px] w-4 text-left">{level}</span>
                                    <span>{amount.toLocaleString()} Pts</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
