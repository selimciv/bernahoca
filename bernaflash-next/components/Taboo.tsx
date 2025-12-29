'use client';

import { useState, useEffect } from 'react';
import { logGameActivity } from '@/lib/gameActivityLogger';

interface TabooProps {
    vocabulary: any;
    level: string;
    onBack: () => void;
}

export default function Taboo({ vocabulary, level, onBack }: TabooProps) {
    const [currentWord, setCurrentWord] = useState<any>(null);
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const [activeTeam, setActiveTeam] = useState<'A' | 'B'>('A');
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wordsGuessed, setWordsGuessed] = useState(0);

    const categories = vocabulary?.levelData?.[level] || [];
    const allWords = categories.flatMap((cat: any) => cat.pool || []);

    const [passesLeft, setPassesLeft] = useState(5);

    // Log game activity on mount
    useEffect(() => {
        logGameActivity('Taboo', level);
    }, []);

    const startRound = () => {
        if (!allWords.length) return;
        const word = allWords[Math.floor(Math.random() * allWords.length)];
        setCurrentWord(word);
        setTimeLeft(60);
        setIsPlaying(true);
        setWordsGuessed(0);
        setPassesLeft(5);
    };

    const nextWord = () => {
        if (!allWords.length) return;
        const word = allWords[Math.floor(Math.random() * allWords.length)];
        setCurrentWord(word);
    };

    const handleCorrect = () => {
        setWordsGuessed(wordsGuessed + 1);
        if (activeTeam === 'A') {
            setTeamAScore(teamAScore + 1);
        } else {
            setTeamBScore(teamBScore + 1);
        }
        nextWord();
    };

    const handleWrong = () => {
        if (activeTeam === 'A') {
            setTeamAScore(teamAScore - 1);
        } else {
            setTeamBScore(teamBScore - 1);
        }
        nextWord();
    };

    const handleSkip = () => {
        if (passesLeft > 0) {
            setPassesLeft(passesLeft - 1);
            nextWord();
        }
    };

    const endRound = () => {
        setIsPlaying(false);
        setActiveTeam(activeTeam === 'A' ? 'B' : 'A');
    };

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endRound();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying]);

    const generateHelperWords = (word: any) => {
        if (!word) return [];

        const stopWords = new Set(['the', 'is', 'a', 'an', 'to', 'in', 'on', 'at', 'of', 'for', 'with', 'by', 'my', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'it', 'be', 'are', 'was', 'were', 'will', 'would', 'can', 'could', 'should', 'i', 'you', 'he', 'she', 'we', 'they', 'do', 'does', 'did', 'have', 'has', 'had']);

        const helpers: string[] = [];

        // 1. Add Turkish Meaning (Strongest Hint)
        if (word.question) helpers.push(word.question);

        // 2. Extract words from Example Sentence
        if (word.example) {
            const cleanSentence = word.example.toLocaleLowerCase('en-US').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
            const words = cleanSentence.split(/\s+/);
            const targetWord = word.answer.toLocaleLowerCase('en-US');

            words.forEach((w: string) => {
                if (!stopWords.has(w) && w !== targetWord && !w.includes(targetWord) && w.length > 2) {
                    // Capitalize first letter
                    const capitalized = w.charAt(0).toLocaleUpperCase('en-US') + w.slice(1);
                    if (!helpers.includes(capitalized)) {
                        helpers.push(capitalized);
                    }
                }
            });
        }

        // 3. Fill with placeholders if empty (should represent missing context)
        if (helpers.length === 0) return ['Synonym', 'Context', 'Definition'];

        // Return top 5 unique helpers
        return [...new Set(helpers)].slice(0, 5);
    };

    const helperWords = generateHelperWords(currentWord);

    return (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Scores & Timer Row */}
            <div className="flex-shrink-0 grid grid-cols-3 gap-3">
                <div className={`rounded-xl p-2 md:p-3 text-center transition-all backdrop-blur-md border border-white/20 flex flex-col justify-center ${activeTeam === 'A'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10'
                    : 'bg-blue-900/40 opacity-80'
                    }`}>
                    <div className="text-white text-[10px] opacity-75">Team A</div>
                    <div className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">{teamAScore}</div>
                </div>

                {/* Timer Center */}
                <div className="flex items-center justify-center">
                    {isPlaying ? (
                        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-lg ${timeLeft <= 10
                            ? 'bg-red-600 border-red-400 animate-pulse'
                            : 'bg-black/40 border-white/20 backdrop-blur-md'
                            }`}>
                            <div className="text-2xl font-bold text-white">{timeLeft}</div>
                            <div className="text-[9px] text-white/70">SEC</div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-white/50 text-xs font-bold">READY?</div>
                        </div>
                    )}
                </div>

                <div className={`rounded-xl p-2 md:p-3 text-center transition-all backdrop-blur-md border border-white/20 flex flex-col justify-center ${activeTeam === 'B'
                    ? 'bg-gradient-to-br from-red-500 to-red-700 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.5)] z-10'
                    : 'bg-red-900/40 opacity-80'
                    }`}>
                    <div className="text-white text-[10px] opacity-75">Team B</div>
                    <div className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">{teamBScore}</div>
                </div>
            </div>

            {/* Game Area */}
            <div className="flex-1 min-h-0 flex flex-col">
                {!isPlaying && (
                    <div className="flex-1 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                        <div className="text-white text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">
                            Team {activeTeam}'s Turn
                        </div>
                        <div className="text-white/60 mb-8 max-w-md text-center">
                            Describe the word! You can use the helper words below to assist the student. Good luck!
                        </div>
                        <button
                            onClick={startRound}
                            className="px-16 py-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold text-2xl rounded-2xl transition-all transform hover:scale-105 shadow-xl hover:shadow-green-500/30"
                        >
                            Start Round ►
                        </button>
                    </div>
                )}

                {isPlaying && currentWord && (
                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                        {/* Word Card */}
                        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-2xl flex flex-col relative overflow-hidden group">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                            <div className="text-center mb-1 relative z-10 flex-shrink-0">
                                <div className="text-white/60 text--[10px] tracking-widest mb-0.5">DESCRIBE THIS</div>
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                                    <div className="text-3xl md:text-5xl font-bold text-white drop-shadow-md leading-tight">
                                        {currentWord.answer.toLocaleUpperCase('en-US')}
                                    </div>
                                    <div className="text-white/60 text-sm font-serif italic">[{currentWord.pronunciation}]</div>
                                </div>
                            </div>

                            {/* Helper Words List */}
                            <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-xl p-2 relative z-10 min-h-0 flex flex-col overflow-hidden">
                                <div className="text-blue-400 font-bold text-sm mb-1 text-center flex items-center justify-center gap-2 flex-shrink-0">
                                    <span>💡</span> HELPER WORDS
                                </div>
                                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                                    {helperWords.map((word, idx) => (
                                        <div key={idx} className="bg-blue-950/40 rounded-lg p-1.5 text-center border border-blue-500/10 flex-shrink-0">
                                            <div className="text-blue-200 font-bold text-base md:text-lg leading-none">
                                                {word}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-black/20 p-2 rounded-2xl flex gap-3 h-16 flex-shrink-0 mx-2 mb-2">
                            <button
                                onClick={handleWrong}
                                className="flex-1 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 border border-white/10 active:scale-95"
                            >
                                <span className="text-sm md:text-base">❌ WRONG</span>
                                <span className="text-[9px] opacity-60">-1 Point</span>
                            </button>
                            <button
                                onClick={handleSkip}
                                disabled={passesLeft <= 0}
                                className={`flex-1 bg-gradient-to-br ${passesLeft > 0 ? 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600' : 'from-gray-800 to-gray-900 opacity-50 cursor-not-allowed'} text-white font-bold text-base rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 border border-white/10 active:scale-95`}
                            >
                                <span className="text-sm md:text-base">⏭️ PASS</span>
                                <span className="text-[9px] opacity-60">
                                    {passesLeft > 0 ? `${passesLeft} Left` : 'No Passes'}
                                </span>
                            </button>
                            <button
                                onClick={handleCorrect}
                                className="flex-[1.5] bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-xl rounded-xl transition-all shadow-lg hover:shadow-green-500/30 flex flex-col items-center justify-center gap-0.5 border border-white/10 active:scale-95"
                            >
                                <span className="text-lg md:text-xl">✓ CORRECT</span>
                                <span className="text-[10px] opacity-80 font-normal">+1 Point</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
