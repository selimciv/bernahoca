'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Activity {
    type: string;
    timestamp: number;
    duration?: number;
    details?: string;
}

export function useActivityTracker() {
    const activities = useRef<Activity[]>([]);
    const pathname = usePathname();
    const currentPageStart = useRef<number>(Date.now());
    const lastPage = useRef<string>('');

    // Track page changes and time spent
    useEffect(() => {
        // Initialize last page on first mount
        if (!lastPage.current) {
            lastPage.current = pathname || '/';
            currentPageStart.current = Date.now();
            console.log('Initial page:', lastPage.current); // Debug
            return;
        }

        // Log previous page with duration when pathname changes
        if (lastPage.current !== pathname) {
            const duration = Date.now() - currentPageStart.current;
            console.log(`Logging page visit: ${lastPage.current}, duration: ${duration}ms`); // Debug
            logActivity('page_visit', lastPage.current, duration);

            // Start tracking new page
            currentPageStart.current = Date.now();
            lastPage.current = pathname || '/';
            console.log('New page:', lastPage.current); // Debug
        }
    }, [pathname]); // Add logActivity to dependencies

    const logActivity = (type: string, details?: string, duration?: number) => {
        // Always read from sessionStorage to preserve game activities
        const stored = sessionStorage.getItem('bernahoca_activities');
        const activitiesArray = stored ? JSON.parse(stored) : [];

        const activity: Activity = {
            type,
            timestamp: Date.now(),
            details,
        };

        if (duration !== undefined) {
            activity.duration = duration;
        }

        activitiesArray.push(activity);

        // Write back to sessionStorage
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('bernahoca_activities', JSON.stringify(activitiesArray));
            activities.current = activitiesArray; // Sync ref
        }
    };

    const getActivities = () => {
        // Always load from sessionStorage to get both page visits AND game activities
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('bernahoca_activities');
            if (stored) {
                try {
                    activities.current = JSON.parse(stored);
                } catch (e) {
                    console.error('Failed to parse activities:', e);
                    activities.current = [];
                }
            }
        }
        return activities.current;
    };

    const clearActivities = () => {
        activities.current = [];
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('bernahoca_activities');
        }
    };

    const getActivitySummary = () => {
        // FORCE fresh read from sessionStorage (don't use cached ref)
        const stored = sessionStorage.getItem('bernahoca_activities');
        const acts = stored ? JSON.parse(stored) : [];

        console.log('Getting activity summary, total activities:', acts.length); // Debug
        console.log('Activities:', acts); // Debug

        if (acts.length === 0) {
            return 'Henüz bir aktivite yok.';
        }

        const summary: string[] = [];

        // Group activities by page/game
        const pageVisits = new Map<string, number>();
        const gameActivities = new Map<string, { count: number; totalTime: number }>();

        acts.forEach((act: Activity) => {
            console.log('Processing activity:', act); // Debug
            if (act.type === 'page_visit') {
                const page = act.details || 'Unknown';
                const duration = act.duration || 0;
                pageVisits.set(page, (pageVisits.get(page) || 0) + duration);
            } else if (act.type === 'game_played') {
                const game = act.details || 'Unknown';
                console.log('Found game activity:', game); // Debug
                const current = gameActivities.get(game) || { count: 0, totalTime: 0 };
                gameActivities.set(game, {
                    count: current.count + 1,
                    totalTime: current.totalTime + (act.duration || 0),
                });
            }
        });

        // Format game activities FIRST (main priority)
        if (gameActivities.size > 0) {
            gameActivities.forEach(({ count, totalTime }, game) => {
                const minutes = Math.floor(totalTime / 60000);
                const seconds = Math.floor((totalTime % 60000) / 1000);
                summary.push(`🎮 ${game}: ${count} kez ${minutes > 0 ? `(${minutes} dk ${seconds} sn)` : `(${seconds} sn)`}`);
            });
        }

        // Format page visits (skip game selection pages if games were played)
        if (pageVisits.size > 0) {
            pageVisits.forEach((duration, page) => {
                const minutes = Math.floor(duration / 60000);
                const seconds = Math.floor((duration % 60000) / 1000);
                let pageName = page;

                // Format page names
                if (page === '/') {
                    pageName = 'Ana Sayfa';
                } else if (page.includes('/game/')) {
                    // Skip game selection pages if games were played
                    if (gameActivities.size > 0) return;

                    if (page.includes('/game/standard')) pageName = 'Standart Kelime Oyunları';
                    else if (page.includes('/game/grade9')) pageName = '9. Sınıf Oyunları';
                    else if (page.includes('/game/ydt')) pageName = '11. Sınıf (YDT) Oyunları';
                }

                if (minutes > 0 || seconds > 0) {
                    summary.push(`📍 ${pageName}: ${minutes > 0 ? `${minutes} dk ` : ''}${seconds} sn`);
                }
            });
        }

        return summary.length > 0 ? summary.join('\n') : 'Henüz bir aktivite yok.';
    };

    return { logActivity, getActivities, getActivitySummary, clearActivities };
}
