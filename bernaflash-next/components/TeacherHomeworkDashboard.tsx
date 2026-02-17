'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PasswordModal from '@/components/PasswordModal';
import { createHomework, getAllHomework, deleteHomework, updateHomework, getHomeworkSubmissions, deleteSubmission } from '@/lib/homeworkService';
import { validateHomework } from '@/lib/homeworkParser';
import { ClassType, Homework, StudentSubmission, AnonymousSubmission } from '@/types/homework';
import { studentData } from '@/data/students';

interface TeacherHomeworkDashboardProps {
    onClose: () => void;
}

export default function TeacherHomeworkDashboard({ onClose }: TeacherHomeworkDashboardProps) {
    const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'reports'>('create');

    // Form State
    const [topic, setTopic] = useState('');
    const [targetClass, setTargetClass] = useState<ClassType>('9-B');
    const [dueDate, setDueDate] = useState('');
    const [questionsText, setQuestionsText] = useState('');
    const [answerKeyText, setAnswerKeyText] = useState('');
    const [preview, setPreview] = useState<any>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);

    // Manage State
    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [isLoadingList, setIsLoadingList] = useState(false);

    // Reports State
    const [selectedHomeworkForReport, setSelectedHomeworkForReport] = useState<string | null>(null);
    const [reportType, setReportType] = useState<'student' | 'anonymous'>('student');
    const [studentSubmissions, setStudentSubmissions] = useState<StudentSubmission[]>([]);
    const [anonymousSubmissions, setAnonymousSubmissions] = useState<AnonymousSubmission[]>([]);
    const [isLoadingReports, setIsLoadingReports] = useState(false);
    const [submissionStats, setSubmissionStats] = useState<Record<string, { completed: number, total: number }>>({});

    const loadStats = async () => {
        const stats: Record<string, { completed: number, total: number }> = {};

        await Promise.all(homeworkList.map(async (hw) => {
            try {
                const submissions = await getHomeworkSubmissions(hw.id);
                const studentSubmissions = submissions.students ? submissions.students.filter((s: any) => s.isCompleted).length : 0;
                const totalStudents = studentData[hw.targetClass]?.length || 0;
                stats[hw.id] = { completed: studentSubmissions, total: totalStudents };
            } catch (e) {
                console.error(e);
            }
        }));

        setSubmissionStats(stats);
    };

    useEffect(() => {
        if (activeTab === 'manage' || activeTab === 'reports') {
            loadHomeworks();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'reports' && homeworkList.length > 0) {
            loadStats();
        }
    }, [activeTab, homeworkList]);

    useEffect(() => {
        if (selectedHomeworkForReport) {
            loadReports();
        }
    }, [selectedHomeworkForReport]);

    const loadHomeworks = async () => {
        setIsLoadingList(true);
        try {
            const data = await getAllHomework();
            // Sort by createdAt desc
            data.sort((a, b) => b.createdAt - a.createdAt);
            setHomeworkList(data);
        } catch (error) {
            console.error('Error loading homeworks:', error);
        }
        setIsLoadingList(false);
    };

    const loadReports = async () => {
        if (!selectedHomeworkForReport) return;

        setIsLoadingReports(true);
        try {
            const data = await getHomeworkSubmissions(selectedHomeworkForReport);
            setStudentSubmissions(data.students);
            setAnonymousSubmissions(data.anonymous);
        } catch (error) {
            console.error('Error loading reports:', error);
        }
        setIsLoadingReports(false);
    };

    const handleDeleteSubmission = async (userId: string, isAnonymous: boolean) => {
        if (!selectedHomeworkForReport) return;

        if (window.confirm('Bu gönderimi silmek istediğinize emin misiniz? Kullanıcı ödevi tekrar yapabilecek.')) {
            try {
                await deleteSubmission(selectedHomeworkForReport, userId, isAnonymous);
                loadReports();
            } catch (error) {
                console.error('Error deleting submission:', error);
                alert('Silme işlemi başarısız oldu.');
            }
        }
    };

    const handlePreview = () => {
        setError('');
        const result = validateHomework(questionsText, answerKeyText);

        if (!result.isValid) {
            setError(result.errors.join('\n'));
            setPreview(null);
            return;
        }

        setPreview(result);
    };

    const handleEdit = (hw: Homework) => {
        setEditingId(hw.id);
        setTopic(hw.topic);
        setTargetClass(hw.targetClass);
        // Date format for input type="datetime-local" is YYYY-MM-DDThh:mm
        const date = new Date(hw.dueDate);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .slice(0, 16);
        setDueDate(dateString);

        // Reconstruct questions text
        const qText = hw.questions.map(q =>
            `${q.number}. ${q.text}\nA) ${q.options.A}\nB) ${q.options.B}\nC) ${q.options.C}\nD) ${q.options.D}`
        ).join('\n\n');
        setQuestionsText(qText);

        // Reconstruct answer key
        const aText = Object.entries(hw.answerKey)
            .map(([num, ans]) => `${num}. ${ans}`)
            .join('\n');
        setAnswerKeyText(aText);

        setPreview({
            questions: hw.questions,
            answerKey: hw.answerKey,
            isValid: true
        });

        setActiveTab('create');
        setError('');
        setSuccess('');
    };

    const handleDelete = async (id: string, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent card click
        if (window.confirm('Bu ödevi ve tüm öğrenci gönderimlerini silmek istediğinize emin misiniz?')) {
            try {
                await deleteHomework(id);
                loadHomeworks();
            } catch (error) {
                console.error('Delete error:', error);
                alert('Silme işleminde hata oluştu.');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTopic('');
        setQuestionsText('');
        setAnswerKeyText('');
        setPreview(null);
        setDueDate('');
        setError('');
        setSuccess('');
    };

    const handleSubmit = async () => {
        if (!topic || !dueDate || !preview) {
            setError('Lütfen tüm alanları doldurun ve önizleme yapın');
            return;
        }

        setIsSubmitting(true);
        try {
            const dueDateTimestamp = new Date(dueDate).getTime();

            const homeworkData = {
                topic,
                targetClass,
                dueDate: dueDateTimestamp,
                questions: preview.questions,
                answerKey: preview.answerKey,
                questionCount: preview.questions.length,
            };

            if (editingId) {
                await updateHomework(editingId, homeworkData);
                setSuccess('Ödev başarıyla güncellendi!');
                setTimeout(() => {
                    handleCancelEdit();
                    setActiveTab('manage');
                }, 1500);
            } else {
                await createHomework(homeworkData);
                setSuccess('Ödev başarıyla oluşturuldu!');
                // Reset form
                handleCancelEdit();
            }
        } catch (err) {
            setError('İşlem sırasında hata oluştu');
            console.error(err);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-auto">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-purple-900/98 to-pink-900/98 backdrop-blur-xl rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-auto border border-white/10 shadow-2xl my-8"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Öğretmen Paneli
                    </h2>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">✕</button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => {
                            if (editingId && activeTab === 'create') handleCancelEdit();
                            setActiveTab('create');
                        }}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'create'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        {editingId ? '✏️ Ödevi Düzenle' : '📝 Ödev Ekle'}
                    </button>
                    <button
                        onClick={() => {
                            if (editingId) handleCancelEdit();
                            setActiveTab('manage');
                        }}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'manage'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        📋 Ödevleri Yönet
                    </button>
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'reports'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        📊 Öğrenci Raporları
                    </button>
                </div>

                {/* Create/Edit Homework Tab */}
                {activeTab === 'create' && (
                    <div className="space-y-4">
                        {editingId && (
                            <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-4">
                                <span className="text-yellow-200">Şu anda bir ödevi düzenliyorsunuz</span>
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-white transaction-all"
                                >
                                    İptal Et
                                </button>
                            </div>
                        )}

                        {/* Class Selection */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Sınıf</label>
                            <select
                                value={targetClass}
                                onChange={(e) => setTargetClass(e.target.value as ClassType)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="9-B">9-B</option>
                                <option value="9-E">9-E</option>
                                <option value="11-C">11-C</option>
                            </select>
                        </div>

                        {/* Topic */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Ödev Konusu</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Örn: İngilizce Kelime Testi - Unit 3"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Son Tarih</label>
                            <input
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Questions */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Sorular (Kopyala-Yapıştır)</label>
                            <textarea
                                value={questionsText}
                                onChange={(e) => setQuestionsText(e.target.value)}
                                placeholder={`1. Soru metni?\nA) Şık A\nB) Şık B\nC) Şık C\nD) Şık D\n\n2. İkinci soru?\nA) Şık A\nB) Şık B\nC) Şık C\nD) Şık D`}
                                rows={10}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                            />
                        </div>

                        {/* Answer Key */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Cevap Anahtarı</label>
                            <textarea
                                value={answerKeyText}
                                onChange={(e) => setAnswerKeyText(e.target.value)}
                                placeholder="1. A\n2. C\n3. B\n4. D"
                                rows={5}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                            />
                        </div>

                        {/* Preview Button */}
                        <button
                            onClick={handlePreview}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Önizleme
                        </button>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-200 text-sm whitespace-pre-line">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-3 text-green-200 text-sm">
                                {success}
                            </div>
                        )}

                        {/* Preview */}
                        {preview && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <h3 className="text-white font-bold mb-2">Önizleme: {preview.questions.length} soru</h3>
                                <div className="space-y-3 max-h-[500px] overflow-auto pr-2 custom-scrollbar">
                                    {preview.questions.map((q: any) => (
                                        <div key={q.number} className="text-sm border-b border-white/5 pb-3">
                                            <p className="text-white font-medium">{q.number}. {q.text}</p>
                                            <div className="ml-4 text-white/60 text-xs mt-1">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                    <p>A) {q.options.A}</p>
                                                    <p>B) {q.options.B}</p>
                                                    <p>C) {q.options.C}</p>
                                                    <p>D) {q.options.D}</p>
                                                </div>
                                                <p className="text-green-400 mt-2 font-bold">✓ Doğru cevap: {preview.answerKey[q.number]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    {isSubmitting ? 'İşleniyor...' : (editingId ? '✓ Ödevi Güncelle' : '✓ Ödevi Kaydet')}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Manage Homework Tab */}
                {activeTab === 'manage' && (
                    <div className="space-y-4">
                        {isLoadingList ? (
                            <div className="text-center py-12 text-white/60">Yükleniyor...</div>
                        ) : homeworkList.length === 0 ? (
                            <div className="text-center py-12 text-white/40">
                                <p>Henüz kayıtlı ödev yok</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {homeworkList.map((hw) => (
                                    <div key={hw.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-all">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{hw.topic}</h3>
                                            <div className="flex gap-4 text-sm text-white/60 mt-1">
                                                <span>📚 {hw.targetClass}</span>
                                                <span>❓ {hw.questionCount} Soru</span>
                                                <span>📅 {new Date(hw.dueDate).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(hw)}
                                                className="px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors font-medium"
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(hw.id, e)}
                                                className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors font-medium"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                    <div className="space-y-4">
                        {/* Homework Selection */}
                        {!selectedHomeworkForReport ? (
                            <div>
                                <h3 className="text-white font-bold mb-4">Rapor için ödev seçin:</h3>
                                {isLoadingList ? (
                                    <div className="text-center py-12 text-white/60">Yükleniyor...</div>
                                ) : homeworkList.length === 0 ? (
                                    <div className="text-center py-12 text-white/40">
                                        <p>Henüz kayıtlı ödev yok</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        {homeworkList.map((hw) => (
                                            <button
                                                key={hw.id}
                                                onClick={() => setSelectedHomeworkForReport(hw.id)}
                                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:bg-white/10 transition-all group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-white font-bold">{hw.topic}</h4>
                                                        <div className="flex gap-4 text-sm text-white/60 mt-1">
                                                            <span>📚 {hw.targetClass}</span>
                                                            <span>❓ {hw.questionCount} Soru</span>
                                                            <span>📅 {new Date(hw.dueDate).toLocaleDateString('tr-TR')}</span>
                                                        </div>
                                                    </div>
                                                    {submissionStats[hw.id] && (
                                                        <div className="text-right text-sm">
                                                            <div className="text-green-400 font-bold mb-1">
                                                                ✅ {submissionStats[hw.id].completed} Öğrenci Yaptı
                                                            </div>
                                                            <div className="text-red-400 font-bold">
                                                                ❌ {submissionStats[hw.id].total - submissionStats[hw.id].completed} Öğrenci Yapmadı
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {/* Back Button */}
                                <button
                                    onClick={() => {
                                        setSelectedHomeworkForReport(null);
                                        setStudentSubmissions([]);
                                        setAnonymousSubmissions([]);
                                    }}
                                    className="mb-4 text-white/60 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    ← Geri
                                </button>

                                {/* Report Type Tabs */}
                                <div className="flex gap-2 mb-4">
                                    <button
                                        onClick={() => setReportType('student')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${reportType === 'student'
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        Öğrenci Raporları ({studentSubmissions.length})
                                    </button>
                                    <button
                                        onClick={() => setReportType('anonymous')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${reportType === 'anonymous'
                                            ? 'bg-green-500/20 text-green-300'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        Anonim Raporları ({anonymousSubmissions.length})
                                    </button>
                                </div>

                                {/* Reports Content */}
                                {isLoadingReports ? (
                                    <div className="text-center py-12 text-white/60">Yükleniyor...</div>
                                ) : reportType === 'student' ? (
                                    studentSubmissions.length === 0 ? (
                                        <div className="text-center py-12 text-white/40">
                                            <p>Henüz öğrenci gönderimi yok</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {studentSubmissions.map((sub) => (
                                                <div
                                                    key={sub.studentId}
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h4 className="text-white font-bold">{sub.studentName}</h4>
                                                            <p className="text-white/60 text-sm">
                                                                Okul No: {sub.studentId} • {sub.studentClass}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteSubmission(sub.studentId.toString(), false);
                                                                }}
                                                                className="p-2 text-white/40 hover:text-red-400 transition-colors"
                                                                title="Gönderimi Sil"
                                                            >
                                                                🗑️
                                                            </button>
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs ${sub.isCompleted
                                                                    ? 'bg-green-500/20 text-green-300'
                                                                    : 'bg-yellow-500/20 text-yellow-300'
                                                                    }`}
                                                            >
                                                                {sub.isCompleted ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-white/40">Başlangıç:</span>
                                                            <p className="text-white">
                                                                {new Date(sub.startTime).toLocaleString('tr-TR')}
                                                            </p>
                                                        </div>
                                                        {sub.isCompleted ? (
                                                            <>
                                                                {sub.completionTime && (
                                                                    <div>
                                                                        <span className="text-white/40">Bitiş:</span>
                                                                        <p className="text-white">
                                                                            {new Date(sub.completionTime).toLocaleString('tr-TR')}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <span className="text-white/40">Süre:</span>
                                                                    <p className="text-white">{sub.duration} dakika</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div>
                                                                <span className="text-white/40">Geçen Süre:</span>
                                                                <p className="text-yellow-200">
                                                                    {Math.floor((Date.now() - sub.startTime) / 1000 / 60)} dakika (Devam Ediyor)
                                                                </p>
                                                            </div>
                                                        )}
                                                        {sub.score && (
                                                            <div>
                                                                <span className="text-white/40">Sonuç:</span>
                                                                <p className="text-white">
                                                                    <span className="text-green-400">{sub.score.correct}D</span> /{' '}
                                                                    <span className="text-red-400">{sub.score.wrong}Y</span> /{' '}
                                                                    <span className="text-gray-400">{sub.score.empty}B</span>
                                                                    {' • '}
                                                                    <span className="font-bold">{sub.score.percentage}%</span>
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    anonymousSubmissions.length === 0 ? (
                                        <div className="text-center py-12 text-white/40">
                                            <p>Henüz anonim gönderim yok</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {anonymousSubmissions.map((sub, idx) => (
                                                <div
                                                    key={sub.sessionId || idx}
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h4 className="text-white font-bold">{sub.name}</h4>
                                                            <p className="text-white/60 text-sm">Anonim Kullanıcı</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteSubmission(sub.sessionId, true);
                                                                }}
                                                                className="p-2 text-white/40 hover:text-red-400 transition-colors"
                                                                title="Gönderimi Sil"
                                                            >
                                                                🗑️
                                                            </button>
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs ${sub.isCompleted
                                                                    ? 'bg-green-500/20 text-green-300'
                                                                    : 'bg-yellow-500/20 text-yellow-300'
                                                                    }`}
                                                            >
                                                                {sub.isCompleted ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-white/40">Başlangıç:</span>
                                                            <p className="text-white">
                                                                {new Date(sub.startTime).toLocaleString('tr-TR')}
                                                            </p>
                                                        </div>
                                                        {sub.isCompleted ? (
                                                            <>
                                                                {sub.completionTime && (
                                                                    <div>
                                                                        <span className="text-white/40">Bitiş:</span>
                                                                        <p className="text-white">
                                                                            {new Date(sub.completionTime).toLocaleString('tr-TR')}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <span className="text-white/40">Süre:</span>
                                                                    <p className="text-white">{sub.duration} dakika</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div>
                                                                <span className="text-white/40">Geçen Süre:</span>
                                                                <p className="text-yellow-200">
                                                                    {Math.floor((Date.now() - sub.startTime) / 1000 / 60)} dakika (Devam Ediyor)
                                                                </p>
                                                            </div>
                                                        )}
                                                        {sub.score && (
                                                            <div>
                                                                <span className="text-white/40">Sonuç:</span>
                                                                <p className="text-white">
                                                                    <span className="text-green-400">{sub.score.correct}D</span> /{' '}
                                                                    <span className="text-red-400">{sub.score.wrong}Y</span> /{' '}
                                                                    <span className="text-gray-400">{sub.score.empty}B</span>
                                                                    {' • '}
                                                                    <span className="font-bold">{sub.score.percentage}%</span>
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
