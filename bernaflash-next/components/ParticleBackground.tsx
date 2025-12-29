'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
}

interface ParticleBackgroundProps {
    theme?: 'gaming' | 'space' | 'neon';
}

export default function ParticleBackground({ theme = 'gaming' }: ParticleBackgroundProps) {
    // Theme-specific colors
    const themeColors = {
        gaming: ['#00d9ff', '#ff0080', '#00ff88', '#9d4edd'],
        space: ['#ff6ec7', '#a78bfa', '#60a5fa', '#0f4c81'],
        neon: ['#ff10f0', '#ffff00', '#00ff41', '#9d00ff']
    };

    const colors = themeColors[theme];

    // Generate particles with random properties
    const particles = useMemo<Particle[]>(() => {
        const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 50;
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
    }, [theme]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
}
