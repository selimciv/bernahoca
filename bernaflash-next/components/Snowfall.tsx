'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface Snowflake {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    drift: number;
}

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [showGyroButton, setShowGyroButton] = useState(false);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const tiltRef = useRef(tilt);

    // Keep tiltRef in sync with tilt
    useEffect(() => {
        tiltRef.current = tilt;
    }, [tilt]);

    const activateGyroscope = useCallback(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            const gamma = event.gamma || 0;
            const normalizedX = Math.max(-30, Math.min(30, gamma));
            setTilt({ x: normalizedX, y: 0 });
        };

        window.addEventListener('deviceorientation', handleOrientation);
        setShowGyroButton(false);
    }, []);

    useEffect(() => {
        // Generate 15 snowflakes with random properties (minimal for subtle effect)
        const flakes: Snowflake[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * -100, // Start above screen
            size: 2 + Math.random() * 6,
            speed: 0.2 + Math.random() * 0.8, // Slower: 0.2 to 1.0
            drift: (Math.random() - 0.5) * 0.5,
        }));
        setSnowflakes(flakes);

        // Animation loop
        const animate = () => {
            setSnowflakes((prevFlakes) =>
                prevFlakes.map((flake) => {
                    let newY = flake.y + flake.speed;
                    let newX = flake.x + flake.drift;

                    // Apply gyroscope tilt using ref to avoid dependency
                    newX += tiltRef.current.x * 0.05;

                    // Reset when snowflake goes off screen
                    if (newY > 110) {
                        newY = -10;
                        newX = Math.random() * 100;
                    }
                    if (newX < -5) newX = 105;
                    if (newX > 105) newX = -5;

                    return { ...flake, x: newX, y: newY };
                })
            );
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // Check if device orientation is available
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setShowGyroButton(true);
        } else if (typeof DeviceOrientationEvent !== 'undefined') {
            activateGyroscope();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [activateGyroscope]);

    const requestGyroPermission = async () => {
        try {
            const permissionState = await (DeviceOrientationEvent as any).requestPermission();
            if (permissionState === 'granted') {
                activateGyroscope();
            } else {
                setShowGyroButton(false);
            }
        } catch (error) {
            console.error('Error requesting gyroscope permission:', error);
            setShowGyroButton(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="absolute"
                        style={{
                            left: `${flake.x}%`,
                            top: `${flake.y}%`,
                            width: `${flake.size}px`,
                            height: `${flake.size}px`,
                            background: 'white',
                            borderRadius: '50%',
                            opacity: 0.8,
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        }}
                    />
                ))}
            </div>

            {showGyroButton && (
                <button
                    onClick={requestGyroPermission}
                    className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 pointer-events-auto font-bold text-sm flex items-center gap-2"
                >
                    <span>📱</span>
                    <span>Enable Gyroscope</span>
                </button>
            )}
        </>
    );
}
