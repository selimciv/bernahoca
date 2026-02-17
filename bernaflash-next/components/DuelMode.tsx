'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logGameActivity } from '@/lib/gameActivityLogger';
import { speak } from '@/lib/textToSpeech';
import { soundGenerator } from '@/lib/soundGenerator';
import confetti from 'canvas-confetti';
import { selectWord } from '@/lib/wordSelector';
import { incrementPlayCount } from '@/lib/wordPlayTracker';

interface DuelModeProps {
    vocabulary: any;
    level: string;
    onBack: () => void;
}

interface Question {
    word: any;
    options: any[];
}

export default function DuelMode({ vocabulary, level, onBack }: DuelModeProps) {
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [phase, setPhase] = useState<'countdown' | 'active' | 'result' | 'gameOver'>('countdown');
    const [countdown, setCountdown] = useState(3);
    const [lockout, setLockout] = useState<{ A: boolean; B: boolean }>({ A: false, B: false });
    const [winner, setWinner] = useState<'A' | 'B' | null>(null);
    const [roundMessage, setRoundMessage] = useState<string>('');
    const [optionsOrder, setOptionsOrder] = useState<number[]>([]); // To ensure same order for both
    const [gameWinner, setGameWinner] = useState<'A' | 'B' | null>(null);
    const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());

    const [roundNumber, setRoundNumber] = useState(1);
    const MAX_ROUNDS = 10;

    const categories = vocabulary?.levelData?.[level] || [];
    const allWords = categories.flatMap((cat: any) => cat.pool || []);



    // Initial setup
    useEffect(() => {
        logGameActivity('Duel Mode', level);
        startNewRound();
    }, []);

    const startNewRound = () => {
        if (!allWords || allWords.length === 0) return;

        // Reset Round State
        setPhase('countdown');
        setCountdown(3);
        setLockout({ A: false, B: false });
        setWinner(null);
        setRoundMessage('');
        soundGenerator.playCountdown();

        // Use smart word selection
        const word = selectWord(allWords, usedWordIds);

        if (!word) {
            setUsedWordIds(new Set());
            const resetWord = selectWord(allWords);
            if (!resetWord) return;
            setUsedWordIds(new Set([resetWord.answer]));
            generateQuestionFromWord(resetWord);
            return;
        }

        setUsedWordIds(prev => new Set(prev).add(word.answer));
        generateQuestionFromWord(word);
    };

    const generateQuestionFromWord = (word: any) => {

        // Generate options (1 correct + 3 distractors)
        const distractors = allWords
            .filter((w: any) => w.answer !== word.answer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((w: any) => ({ text: w.question, correct: false }));

        const correctOption = { text: word.question, correct: true };
        const allOptions = [correctOption, ...distractors].sort(() => Math.random() - 0.5);

        setCurrentQuestion({ word, options: allOptions });

        // Start Countdown
        let count = 3;
        const timer = setInterval(() => {
            count--;
            setCountdown(count);
            if (count === 0) {
                clearInterval(timer);
                setPhase('active');
                // Speak the word on reveal
                speak(word.answer);
            }
        }, 1000);
    };

    const celebrateWinner = (winningTeam: 'A' | 'B') => {
        const teamColor = winningTeam === 'A' ? '#60A5FA' : '#F87171'; // blue-400 or red-400
        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Konfeti patlaması (soldan)
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: [teamColor, '#FFD700', '#FFF'],
            }));

            // Konfeti patlaması (sağdan)
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: [teamColor, '#FFD700', '#FFF'],
            }));
        }, 250);

        // Havai fişek efekti
        setTimeout(() => {
            const count = 200;
            const defaults2 = {
                origin: { y: 0.7 },
                zIndex: 9999
            };

            function fire(particleRatio: number, opts: any) {
                confetti(Object.assign({}, defaults2, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
                colors: [teamColor],
            });
            fire(0.2, {
                spread: 60,
                colors: ['#FFD700'],
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
                colors: ['#FFF'],
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
                colors: [teamColor],
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
                colors: ['#FFD700'],
            });
        }, 500);
    };

    const handleAnswer = (team: 'A' | 'B', isCorrect: boolean) => {
        if (phase !== 'active' || lockout[team]) return;

        // Track word play
        if (currentQuestion && isCorrect) {
            incrementPlayCount(currentQuestion.word.answer);
        }

        if (isCorrect) {
            // WIN CASE
            let newScore = 0;
            if (team === 'A') {
                newScore = teamAScore + 1;
                setTeamAScore(newScore);
            } else {
                newScore = teamBScore + 1;
                setTeamBScore(newScore);
            }

            setWinner(team);
            setWinner(team);
            setRoundMessage(`${team === 'A' ? 'TEAM A' : 'TEAM B'} WINS!`);
            setPhase('result');
            soundGenerator.playCorrect();

            // Check if game over (MAX_ROUNDS reached)
            if (roundNumber >= MAX_ROUNDS) {
                // Determine Winner
                let finalWinner: 'A' | 'B' | null = null;
                if (newScore > (team === 'A' ? teamBScore : teamAScore)) {
                    finalWinner = team;
                } else if ((team === 'A' ? teamBScore : teamAScore) > newScore) {
                    finalWinner = team === 'A' ? 'B' : 'A';
                }

                // If draw, maybe extra round? For now just show draw or simple logic
                // Let's assume high score wins, if equal it's a draw (handled by UI)

                if (newScore === (team === 'A' ? teamBScore : teamAScore)) {
                    // Draw case - maybe add one more round? 
                    // OR just show DRAW. User asked for "winner determined".
                    // Let's implement simple Tie-Breaker: Continue until someone wins a point
                    setRoundNumber(prev => prev + 1); // Extra round
                    setTimeout(startNewRound, 2000);
                    return;
                }

                setGameWinner(finalWinner);
                setPhase('gameOver');
                if (finalWinner) celebrateWinner(finalWinner);
                soundGenerator.playWin();

            } else {
                // Next Round
                setRoundNumber(prev => prev + 1);
                setTimeout(startNewRound, 2000);
            }
        } else {
            // LOSE CASE (Lockout)
            setLockout(prev => ({ ...prev, [team]: true }));

            // Check if BOTH are locked out
            if (lockout[team === 'A' ? 'B' : 'A']) {
                if (lockout[team === 'A' ? 'B' : 'A']) {
                    setRoundMessage('NO POINTS!');
                    setPhase('result');
                    soundGenerator.playWrong();

                    // Even nicely, if no one gets points, we still move to next round or repeat?
                    // Let's move to next round but don't increment score.
                    if (roundNumber >= MAX_ROUNDS) {
                        // Check scores for game over
                        let finalWinner: 'A' | 'B' | null = null;
                        if (teamAScore > teamBScore) finalWinner = 'A';
                        else if (teamBScore > teamAScore) finalWinner = 'B';

                        if (teamAScore === teamBScore) {
                            // Draw - Extra Round
                            setRoundNumber(prev => prev + 1);
                            setTimeout(startNewRound, 2000);
                            return;
                        }

                        setGameWinner(finalWinner);
                        setPhase('gameOver');
                        if (finalWinner) celebrateWinner(finalWinner);
                        soundGenerator.playWin();
                    } else {
                        setRoundNumber(prev => prev + 1);
                        setTimeout(startNewRound, 2000);
                    }
                }
            }
        }
    };

    if (!currentQuestion) return <div className="text-white text-center">Loading...</div>;

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Countdown Overlay */}
            <AnimatePresence>
                {phase === 'countdown' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
                    >
                        <div className="text-[150px] font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-pulse">
                            {countdown}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Result Overlay */}
            <AnimatePresence>
                {phase === 'result' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md pointer-events-none"
                    >
                        <div className={`text-6xl font-bold mb-4 drop-shadow-lg ${winner === 'A' ? 'text-blue-400' : winner === 'B' ? 'text-red-400' : 'text-gray-400'
                            }`}>
                            {roundMessage}
                        </div>
                        <div className="text-white text-2xl bg-white/10 px-6 py-2 rounded-xl border border-white/20">
                            {currentQuestion.word.answer} = {currentQuestion.word.question}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Over Overlay */}
            <AnimatePresence>
                {phase === 'gameOver' && gameWinner && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className={`text-9xl font-black mb-8 drop-shadow-[0_0_50px_rgba(255,255,255,0.5)] ${gameWinner === 'A' ? 'text-blue-400' : 'text-red-400'
                                }`}
                        >
                            🏆
                        </motion.div>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`text-7xl font-bold mb-4 drop-shadow-lg ${gameWinner === 'A' ? 'text-blue-400' : 'text-red-400'
                                }`}
                        >
                            TEAM {gameWinner} KAZANDI!
                        </motion.div>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white text-4xl font-bold mt-4"
                        >
                            Final Skor: Team A ({teamAScore}) - Team B ({teamBScore})
                        </motion.div>


                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2, type: "spring" }}
                            onClick={() => {
                                setTeamAScore(0);
                                setTeamBScore(0);
                                setGameWinner(null);
                                setRoundNumber(1);
                                startNewRound();
                            }}
                            className="mt-8 px-12 py-4 bg-white text-black font-black text-2xl rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] z-50 pointer-events-auto cursor-pointer"
                        >
                            YENİ OYUN
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Game Area (Split Screen) */}
            <div className="flex-1 flex w-full h-full relative">

                {/* --- TEAM A (LEFT) --- */}
                <div className={`flex-1 border-r border-white/10 flex flex-col p-4 transition-all duration-300 ${lockout.A ? 'opacity-50 grayscale' : 'bg-gradient-to-br from-blue-900/40 to-blue-800/20'
                    } ${winner === 'A' ? 'bg-blue-600/30' : ''}`}>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-blue-500/30 pb-2">
                        <h2 className="text-3xl font-bold text-blue-400">TEAM A</h2>
                        <div className="text-5xl font-bold text-white">{teamAScore}</div>
                    </div>

                    {/* Word Display */}
                    <div className="flex-1 flex flex-col justify-center items-center mb-6">
                        {phase !== 'countdown' ? (
                            <div className="text-center">
                                <div className="text-blue-200 text-sm mb-2 font-bold tracking-widest">TRANSLATE THIS</div>
                                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                                    {currentQuestion.word.answer}
                                </div>
                                <div className="text-white/50 italic text-lg">/{currentQuestion.word.pronunciation}/</div>
                            </div>
                        ) : (
                            <div className="text-white/20 text-xl animate-pulse">Get Ready...</div>
                        )}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={`A-${idx}`}
                                onClick={() => handleAnswer('A', opt.correct)}
                                disabled={phase !== 'active' || lockout.A}
                                className={`h-24 rounded-xl text-xl font-bold transition-all border-2 ${lockout.A
                                    ? 'border-gray-600 bg-gray-800/50 text-gray-500 cursor-not-allowed'
                                    : 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/30 hover:border-blue-400 hover:scale-[1.02] active:scale-95 text-white'
                                    }`}
                            >
                                {phase === 'active' || phase === 'result' ? opt.text : '???'}
                            </button>
                        ))}
                    </div>
                </div>


                {/* --- TEAM B (RIGHT) --- */}
                <div className={`flex-1 border-l border-white/10 flex flex-col p-4 transition-all duration-300 ${lockout.B ? 'opacity-50 grayscale' : 'bg-gradient-to-bl from-red-900/40 to-red-800/20'
                    } ${winner === 'B' ? 'bg-red-600/30' : ''}`}>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-red-500/30 pb-2">
                        <div className="text-5xl font-bold text-white">{teamBScore}</div>
                        <h2 className="text-3xl font-bold text-red-400">TEAM B</h2>
                    </div>

                    {/* Word Display */}
                    <div className="flex-1 flex flex-col justify-center items-center mb-6">
                        {phase !== 'countdown' ? (
                            <div className="text-center">
                                <div className="text-red-200 text-sm mb-2 font-bold tracking-widest">TRANSLATE THIS</div>
                                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                                    {currentQuestion.word.answer}
                                </div>
                                <div className="text-white/50 italic text-lg">/{currentQuestion.word.pronunciation}/</div>
                            </div>
                        ) : (
                            <div className="text-white/20 text-xl animate-pulse">Get Ready...</div>
                        )}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={`B-${idx}`}
                                onClick={() => handleAnswer('B', opt.correct)}
                                disabled={phase !== 'active' || lockout.B}
                                className={`h-24 rounded-xl text-xl font-bold transition-all border-2 ${lockout.B
                                    ? 'border-gray-600 bg-gray-800/50 text-gray-500 cursor-not-allowed'
                                    : 'border-red-500/30 bg-red-500/10 hover:bg-red-500/30 hover:border-red-400 hover:scale-[1.02] active:scale-95 text-white'
                                    }`}
                            >
                                {phase === 'active' || phase === 'result' ? opt.text : '???'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* VS Badge Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10 pointer-events-none">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 text-white/80 text-sm font-bold shadow-lg">
                        ROUND {Math.min(roundNumber, 10)} / 10
                    </div>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-black text-2xl text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                        VS
                    </div>
                </div>
            </div>
        </div>

    );
}
