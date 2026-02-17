/**
 * Word Selector
 * Intelligent word selection algorithm that prioritizes new and less-played words
 */

import { VocabularyWord } from '@/types/game';
import { getPlayCount } from './wordPlayTracker';

/**
 * Select words with priority for new and less-played words
 * 
 * Algorithm:
 * - 80% chance: Select from new words (isNew: true)
 * - 15% chance: Select from less-played words (timesPlayed < 3)
 * - 5% chance: Select from other words
 * 
 * @param allWords - All available words
 * @param count - Number of words to select
 * @param usedWordIds - Set of already used word IDs (optional)
 * @returns Array of selected words
 */
export function selectWords(
    allWords: VocabularyWord[],
    count: number = 1,
    usedWordIds?: Set<string>
): VocabularyWord[] {
    if (!allWords.length) return [];

    // Filter out already used words if provided
    let availableWords = usedWordIds
        ? allWords.filter(w => !usedWordIds.has(w.answer))
        : allWords;

    // If no available words, reset and use all words
    if (availableWords.length === 0) {
        availableWords = allWords;
    }

    // Enrich words with play counts from localStorage
    const enrichedWords = availableWords.map(word => ({
        ...word,
        timesPlayed: getPlayCount(word.answer)
    }));

    // Categorize words
    const newWords = enrichedWords.filter(w => w.isNew === true);
    const lessPlayedWords = enrichedWords.filter(w => !w.isNew && (w.timesPlayed || 0) < 3);
    const otherWords = enrichedWords.filter(w => !w.isNew && (w.timesPlayed || 0) >= 3);

    const selectedWords: VocabularyWord[] = [];

    for (let i = 0; i < count; i++) {
        const random = Math.random();
        let selectedWord: VocabularyWord | null = null;

        // 80% chance for new words
        if (random < 0.8 && newWords.length > 0) {
            const index = Math.floor(Math.random() * newWords.length);
            selectedWord = newWords.splice(index, 1)[0];
        }
        // 15% chance for less-played words
        else if (random < 0.95 && lessPlayedWords.length > 0) {
            const index = Math.floor(Math.random() * lessPlayedWords.length);
            selectedWord = lessPlayedWords.splice(index, 1)[0];
        }
        // 5% chance for other words (or fallback if previous categories are empty)
        else if (otherWords.length > 0) {
            const index = Math.floor(Math.random() * otherWords.length);
            selectedWord = otherWords.splice(index, 1)[0];
        }
        // Fallback to any available category
        else if (lessPlayedWords.length > 0) {
            const index = Math.floor(Math.random() * lessPlayedWords.length);
            selectedWord = lessPlayedWords.splice(index, 1)[0];
        }
        else if (newWords.length > 0) {
            const index = Math.floor(Math.random() * newWords.length);
            selectedWord = newWords.splice(index, 1)[0];
        }

        if (selectedWord) {
            selectedWords.push(selectedWord);
        } else {
            // If we run out of words, break
            break;
        }
    }

    return selectedWords;
}

/**
 * Select a single word (convenience wrapper)
 */
export function selectWord(
    allWords: VocabularyWord[],
    usedWordIds?: Set<string>
): VocabularyWord | null {
    const selected = selectWords(allWords, 1, usedWordIds);
    return selected.length > 0 ? selected[0] : null;
}
