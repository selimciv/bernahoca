import { Question, ParsedQuestions } from '@/types/homework';

/**
 * Parses copy-pasted question text into structured Question objects
 * Expected format:
 * 1. Question text here?
 * A) Option A
 * B) Option B
 * C) Option C
 * D) Option D
 */
export function parseQuestions(text: string): Question[] {
    const questions: Question[] = [];

    // Split by question numbers (1., 2., 3., etc.) - allowing for markdown **1.
    const questionBlocks = text.split(/\n(?=[\*]*\d+\.)/);

    for (const block of questionBlocks) {
        const trimmed = block.trim();
        if (!trimmed) continue;

        // Extract question number and text
        // Match optional asterisks, then number, then dot
        const questionNumberMatch = trimmed.match(/^[\*]*(\d+)\./);
        if (!questionNumberMatch) continue;

        const questionNumber = parseInt(questionNumberMatch[1]);

        // Find matches for options A), B), C), D)
        // Using regex to ensure we match "A)" at start of line or preceded by whitespace
        const matchA = trimmed.match(/(?:^|\s)A\)/);
        const matchB = trimmed.match(/(?:^|\s)B\)/);
        const matchC = trimmed.match(/(?:^|\s)C\)/);
        const matchD = trimmed.match(/(?:^|\s)D\)/);

        if (matchA && matchB && matchC && matchD) {
            // Calculate actual indices of "A)", "B)", etc.
            const idxA = matchA.index! + matchA[0].indexOf('A)');
            const idxB = matchB.index! + matchB[0].indexOf('B)');
            const idxC = matchC.index! + matchC[0].indexOf('C)');
            const idxD = matchD.index! + matchD[0].indexOf('D)');

            // Verify order
            if (idxA < idxB && idxB < idxC && idxC < idxD) {
                // Extract question text
                let questionText = trimmed.substring(questionNumberMatch[0].length, idxA).trim();
                questionText = questionText.replace(/\*\*/g, '');

                // Extract options
                const optA = trimmed.substring(idxA + 2, idxB).trim();
                const optB = trimmed.substring(idxB + 2, idxC).trim();
                const optC = trimmed.substring(idxC + 2, idxD).trim();
                const optD = trimmed.substring(idxD + 2).trim();

                questions.push({
                    number: questionNumber,
                    text: questionText,
                    options: {
                        A: optA,
                        B: optB,
                        C: optC,
                        D: optD,
                    },
                });
            }
        }
    }

    return questions;
}

/**
 * Parses copy-pasted answer key text
 * Expected format:
 * 1. A
 * 2. C
 * 3. B
 */
export function parseAnswerKey(text: string): Record<number, string> {
    const answerKey: Record<number, string> = {};

    const lines = text.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Match pattern: "1. A" or "1.A" or "1 A"
        const match = trimmed.match(/^(\d+)[\.\s]+([A-D])$/i);
        if (match) {
            const questionNumber = parseInt(match[1]);
            const answer = match[2].toUpperCase();
            answerKey[questionNumber] = answer;
        }
    }

    return answerKey;
}

/**
 * Validates that questions and answer key match
 */
export function validateHomework(questionsText: string, answerKeyText: string): ParsedQuestions {
    const questions = parseQuestions(questionsText);
    const answerKey = parseAnswerKey(answerKeyText);
    const errors: string[] = [];

    // Check if we have questions
    if (questions.length === 0) {
        errors.push('Soru bulunamadı. Lütfen format kontrol edin.');
    }

    // Check if we have answers
    if (Object.keys(answerKey).length === 0) {
        errors.push('Cevap anahtarı bulunamadı.');
    }

    // Check if question count matches answer count
    if (questions.length !== Object.keys(answerKey).length) {
        errors.push(`Soru sayısı (${questions.length}) ile cevap sayısı (${Object.keys(answerKey).length}) eşleşmiyor.`);
    }

    // Check if all questions have answers
    for (const question of questions) {
        if (!answerKey[question.number]) {
            errors.push(`Soru ${question.number} için cevap bulunamadı.`);
        } else if (!['A', 'B', 'C', 'D'].includes(answerKey[question.number])) {
            errors.push(`Soru ${question.number} için geçersiz cevap: ${answerKey[question.number]}`);
        }
    }

    // Check for duplicate question numbers
    const questionNumbers = questions.map(q => q.number);
    const duplicates = questionNumbers.filter((num, index) => questionNumbers.indexOf(num) !== index);
    if (duplicates.length > 0) {
        errors.push(`Tekrarlanan soru numaraları: ${duplicates.join(', ')}`);
    }

    return {
        questions,
        answerKey,
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Calculate score for a submission
 */
export function calculateScore(
    answers: Record<number, string>,
    answerKey: Record<number, string>,
    totalQuestions: number
) {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const studentAnswer = answers[i];
        const correctAnswer = answerKey[i];

        if (!studentAnswer) {
            empty++;
        } else if (studentAnswer === correctAnswer) {
            correct++;
        } else {
            wrong++;
        }
    }

    const percentage = Math.round((correct / totalQuestions) * 100);

    return { correct, wrong, empty, percentage };
}
