export type ClassType = '9-B' | '9-E' | '11-C';

export interface Question {
    number: number;
    text: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
}

export interface Homework {
    id: string;
    topic: string;
    targetClass: ClassType;
    dueDate: number; // timestamp
    questions: Question[];
    answerKey: Record<number, string>; // { 1: "A", 2: "C", ... }
    createdAt: number; // timestamp
    questionCount: number;
}

export interface StudentSubmission {
    homeworkId: string;
    studentId: string; // school number
    studentName: string;
    studentClass: ClassType;
    answers: Record<number, string>; // { 1: "A", 2: "B", ... }
    startTime: number; // timestamp
    completionTime?: number; // timestamp
    duration: number; // minutes
    isCompleted: boolean;
    score?: {
        correct: number;
        wrong: number;
        empty: number;
        percentage: number;
    };
}

export interface AnonymousSubmission {
    homeworkId: string;
    sessionId: string;
    name: string;
    answers: Record<number, string>;
    startTime: number;
    completionTime?: number;
    duration: number;
    isCompleted: boolean;
    score?: {
        correct: number;
        wrong: number;
        empty: number;
        percentage: number;
    };
}

export interface HomeworkReport {
    homework: Homework;
    studentSubmissions: StudentSubmission[];
    anonymousSubmissions: AnonymousSubmission[];
}

export interface ParsedQuestions {
    questions: Question[];
    answerKey: Record<number, string>;
    isValid: boolean;
    errors: string[];
}
