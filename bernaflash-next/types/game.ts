// Type definitions for vocabulary data
export interface VocabularyWord {
    answer: string;
    pronunciation: string;
    question: string;
    example: string;
    exampleTR: string;
    points?: number;
}

export interface Category {
    name: string;
    pool: VocabularyWord[];
    fixedPoints?: number;
    questions?: VocabularyWord[];
}

export interface GameData {
    title: string;
    preparedBy: string;
    answerTime: number;
    defaultGroup: number;
    groupNames: string[];
    levelData: {
        [key: string]: Category[];
    };
    categories?: Category[];
}

export interface Student {
    no: number;
    name: string;
}

export interface StudentData {
    [className: string]: Student[];
}

export interface HomeworkResult {
    [studentId: string]: 'done' | 'pending' | 'missing' | 'half';
}

export interface Homework {
    name: string;
    date: string;
    results?: HomeworkResult;
    createdAt?: number;
    updatedAt?: number;
}

export interface HomeworkData {
    [className: string]: {
        [homeworkId: string]: Homework;
    };
}

export type GameMode = 'standard' | 'grade9' | 'ydt';
export type PlayMode = 'team' | 'wheel' | 'millionaire' | 'hangman' | 'taboo';
export type PlayType = 'team' | 'individual';
