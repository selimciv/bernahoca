import { ref, set, get, push, update, remove } from 'firebase/database';
import { database } from './firebase';
import { Homework, StudentSubmission, AnonymousSubmission, ClassType } from '@/types/homework';
import { calculateScore } from './homeworkParser';

// Helper to send Telegram notification
// Helper to send Telegram notification
async function sendTelegramNotification(message: string) {
    try {
        await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
}

// Helper to get detailed device info
async function getDeviceInfo(): Promise<string> {
    if (typeof window === 'undefined') return '';

    try {
        const ipResponse = await fetch('/api/get-ip');
        const ipData = await ipResponse.json();
        const ip = ipData.ip || 'Unknown';
        const city = ipData.city || '-';
        const country = ipData.country || 'TR';

        const ua = navigator.userAgent;
        let os = 'Unknown';
        if (ua.includes('Win')) os = 'Windows 10/11';
        else if (ua.includes('Mac')) os = 'MacOS';
        else if (ua.includes('Linux')) os = 'Linux';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';

        let device = 'Masaüstü 🖥️';
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) device = 'Tablet 📱';
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) device = 'Mobil 📱';

        let browser = 'Unknown';
        if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
        else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Edg')) browser = 'Edge';

        const timestamp = new Date().toLocaleString('tr-TR');

        return `\n\n🌍 Konum: ${city}, ${country}\n💻 İşletim Sistemi: ${os}\n📱 Cihaz: ${device}\n🌐 Tarayıcı: ${browser}\n📡 IP: ${ip}\n🕐 Zaman: ${timestamp}`;
    } catch (e) {
        console.error('Error getting device info:', e);
        return '';
    }
}

// Create new homework assignment
export async function createHomework(homework: Omit<Homework, 'id' | 'createdAt'>): Promise<string> {
    const homeworkRef = push(ref(database, 'homework/assignments'));
    const homeworkId = homeworkRef.key!;

    const homeworkData: Homework = {
        ...homework,
        id: homeworkId,
        createdAt: Date.now(),
    };

    await set(homeworkRef, homeworkData);

    // Send Telegram Notification
    const dateStr = new Date(homework.dueDate).toLocaleString('tr-TR');
    await sendTelegramNotification(
        `📢 **Yeni Ödev Eklendi!**\n\n📌 **Konu:** ${homework.topic}\n📚 **Sınıf:** ${homework.targetClass}\n❓ **Soru Sayısı:** ${homework.questionCount}\n📅 **Son Tarih:** ${dateStr}`
    );

    return homeworkId;
}

// Update homework assignment
export async function updateHomework(homeworkId: string, updates: Partial<Homework>): Promise<void> {
    const homeworkRef = ref(database, `homework/assignments/${homeworkId}`);
    await update(homeworkRef, updates);
}

// Delete homework assignment
export async function deleteHomework(homeworkId: string): Promise<void> {
    // Delete assignment
    await remove(ref(database, `homework/assignments/${homeworkId}`));
    // Delete associated submissions
    await remove(ref(database, `homework/submissions/${homeworkId}`));
}

// Get all homework assignments
export async function getAllHomework(): Promise<Homework[]> {
    const snapshot = await get(ref(database, 'homework/assignments'));
    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    return Object.values(data) as Homework[];
}

// Get homework by class
export async function getHomeworkByClass(targetClass: ClassType): Promise<Homework[]> {
    const allHomework = await getAllHomework();
    return allHomework.filter(hw => hw.targetClass === targetClass);
}

// Get single homework
export async function getHomework(homeworkId: string): Promise<Homework | null> {
    const snapshot = await get(ref(database, `homework/assignments/${homeworkId}`));
    if (!snapshot.exists()) return null;
    return snapshot.val() as Homework;
}

// Start homework (student or anonymous)
export async function startHomework(
    homeworkId: string,
    userId: string,
    isAnonymous: boolean,
    userName: string,
    userClass?: ClassType
): Promise<void> {
    const path = isAnonymous
        ? `homework/submissions/${homeworkId}/anonymous/${userId}`
        : `homework/submissions/${homeworkId}/students/${userId}`;

    const submission = {
        homeworkId,
        [isAnonymous ? 'sessionId' : 'studentId']: userId,
        [isAnonymous ? 'name' : 'studentName']: userName,
        ...(userClass && !isAnonymous ? { studentClass: userClass } : {}),
        answers: {},
        startTime: Date.now(),
        duration: 0,
        isCompleted: false,
    };

    await set(ref(database, path), submission);

    // Send Telegram Notification
    const homework = await getHomework(homeworkId);
    if (homework) {
        const deviceInfo = await getDeviceInfo();
        const message = isAnonymous
            ? `▶️ **Anonim Ödev Başladı**\n\n👤 **Kullanıcı:** ${userName}\n📚 **Ödev:** ${homework.topic}${deviceInfo}`
            : `▶️ **Ödev Başladı**\n\n👤 **Öğrenci:** ${userName} (${userClass})\n📚 **Ödev:** ${homework.topic}${deviceInfo}`;
        await sendTelegramNotification(message);
    }
}

// Get student's submission
export async function getSubmission(
    homeworkId: string,
    userId: string,
    isAnonymous: boolean
): Promise<StudentSubmission | AnonymousSubmission | null> {
    const path = isAnonymous
        ? `homework/submissions/${homeworkId}/anonymous/${userId}`
        : `homework/submissions/${homeworkId}/students/${userId}`;

    const snapshot = await get(ref(database, path));
    if (!snapshot.exists()) return null;
    return snapshot.val();
}

// Save answer
export async function saveAnswer(
    homeworkId: string,
    userId: string,
    isAnonymous: boolean,
    questionNumber: number,
    answer: string
): Promise<void> {
    const path = isAnonymous
        ? `homework/submissions/${homeworkId}/anonymous/${userId}/answers/${questionNumber}`
        : `homework/submissions/${homeworkId}/students/${userId}/answers/${questionNumber}`;

    await set(ref(database, path), answer);
}

// Submit homework (complete)
export async function submitHomework(
    homeworkId: string,
    userId: string,
    isAnonymous: boolean
): Promise<void> {
    const submission = await getSubmission(homeworkId, userId, isAnonymous);
    if (!submission) throw new Error('Submission not found');

    const homework = await getHomework(homeworkId);
    if (!homework) throw new Error('Homework not found');

    const duration = Math.floor((Date.now() - submission.startTime) / 1000 / 60); // minutes
    const score = calculateScore(submission.answers, homework.answerKey, homework.questionCount);

    const path = isAnonymous
        ? `homework/submissions/${homeworkId}/anonymous/${userId}`
        : `homework/submissions/${homeworkId}/students/${userId}`;

    await update(ref(database, path), {
        completionTime: Date.now(),
        duration,
        isCompleted: true,
        score,
    });

    // Send Telegram Notification
    const userName = isAnonymous ? (submission as AnonymousSubmission).name : (submission as StudentSubmission).studentName;
    const title = isAnonymous ? '✅ **Anonim Ödev Tamamlandı**' : '✅ **Ödev Tamamlandı**';
    const deviceInfo = await getDeviceInfo();

    await sendTelegramNotification(
        `${title}\n\n👤 **Kullanıcı:** ${userName}\n📚 **Ödev:** ${homework.topic}\n⏱️ **Süre:** ${duration} dk\n\n📊 **Sonuç:**\n✅ Doğru: ${score.correct}\n❌ Yanlış: ${score.wrong}\n⭕ Boş: ${score.empty}\n💯 Puan: ${score.percentage}${deviceInfo}`
    );
}

// Get all submissions for a homework (for teacher reports)
export async function getHomeworkSubmissions(homeworkId: string): Promise<{
    students: StudentSubmission[];
    anonymous: AnonymousSubmission[];
}> {
    const studentsSnapshot = await get(ref(database, `homework/submissions/${homeworkId}/students`));
    const anonymousSnapshot = await get(ref(database, `homework/submissions/${homeworkId}/anonymous`));

    const students = studentsSnapshot.exists() ? Object.values(studentsSnapshot.val()) : [];
    const anonymous = anonymousSnapshot.exists() ? Object.values(anonymousSnapshot.val()) : [];

    return {
        students: students as StudentSubmission[],
        anonymous: anonymous as AnonymousSubmission[],
    };
}

// Get student's homework history
export async function getStudentHomeworkHistory(
    studentId: string,
    studentClass: ClassType
): Promise<Array<{ homework: Homework; submission?: StudentSubmission }>> {
    const homework = await getHomeworkByClass(studentClass);

    const results = await Promise.all(
        homework.map(async (hw) => {
            const submission = await getSubmission(hw.id, studentId, false);
            return {
                homework: hw,
                submission: submission as StudentSubmission | undefined,
            };
        })
    );

    return results;
}

// Check if homework is expired
export function isHomeworkExpired(homework: Homework): boolean {
    return Date.now() > homework.dueDate;
}

// Check if homework is accessible for anonymous users
export function canAnonymousAccess(homework: Homework): boolean {
    return isHomeworkExpired(homework);
}

// Delete single submission (student or anonymous)
export async function deleteSubmission(
    homeworkId: string,
    userId: string,
    isAnonymous: boolean
): Promise<void> {
    const path = isAnonymous
        ? `homework/submissions/${homeworkId}/anonymous/${userId}`
        : `homework/submissions/${homeworkId}/students/${userId}`;
    await remove(ref(database, path));
}
