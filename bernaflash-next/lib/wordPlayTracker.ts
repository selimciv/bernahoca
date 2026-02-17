/**
 * Word Play Tracker
 * Tracks how many times each word has been played across all games
 * Uses localStorage to persist data between sessions
 */

const STORAGE_KEY = 'wordPlayCounts';

interface PlayCounts {
    [word: string]: number;
}

/**
 * Get the play count for a specific word
 */
export function getPlayCount(word: string): number {
    if (typeof window === 'undefined') return 0;

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return 0;

        const counts: PlayCounts = JSON.parse(data);
        return counts[word] || 0;
    } catch (error) {
        console.error('Error reading play counts:', error);
        return 0;
    }
}

/**
 * Increment the play count for a specific word
 */
export function incrementPlayCount(word: string): void {
    if (typeof window === 'undefined') return;

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const counts: PlayCounts = data ? JSON.parse(data) : {};

        counts[word] = (counts[word] || 0) + 1;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (error) {
        console.error('Error updating play count:', error);
    }
}

/**
 * Reset all play counts (for admin use)
 */
export function resetPlayCounts(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error resetting play counts:', error);
    }
}

/**
 * Get all play counts
 */
export function getAllPlayCounts(): PlayCounts {
    if (typeof window === 'undefined') return {};

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error reading all play counts:', error);
        return {};
    }
}
