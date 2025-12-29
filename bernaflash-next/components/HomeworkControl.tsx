import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, get, set, push, remove } from 'firebase/database';
import { studentData as students } from '@/data/students';

interface HomeworkControlProps {
    onClose: () => void;
}

interface Student {
    id: string;
    name: string;
    no: number;
    status: 'yapildi' | 'yapilmadi' | 'yarim' | 'kontrol_edilemedi';
}

export default function HomeworkControl({ onClose }: HomeworkControlProps) {
    const [step, setStep] = useState<'class' | 'homework'>('class');
    const [selectedClass, setSelectedClass] = useState('');
    const [homeworkName, setHomeworkName] = useState('');
    const [studentList, setStudentList] = useState<Student[]>([]);
    const [previousHomeworks, setPreviousHomeworks] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Password Protection State
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ type: 'edit' | 'delete', item: any } | null>(null);

    const classes = Object.keys(students);

    const selectClass = async (className: string) => {
        setSelectedClass(className);
        setStep('homework');
        resetForm();

        const classStudents = students[className] || [];
        const initialList: Student[] = classStudents.map((s: any) => ({
            id: s.no.toString(),
            name: s.name,
            no: s.no,
            status: 'kontrol_edilemedi' as const
        }));
        setStudentList(initialList);

        loadPreviousHomeworks(className);
    };

    const loadPreviousHomeworks = async (className: string) => {
        try {
            const hwRef = ref(database, `homeworks/${className}/homeworks`);
            const snapshot = await get(hwRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const hwList = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    name: value.name,
                    date: value.date,
                    studentCount: value.students ? Object.keys(value.students).length : 0,
                    students: value.students
                }));
                setPreviousHomeworks(hwList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            } else {
                setPreviousHomeworks([]);
            }
        } catch (error) {
            console.error('Error loading homeworks:', error);
        }
    };

    const resetForm = () => {
        setHomeworkName('');
        setEditingId(null);
        if (selectedClass) {
            const classStudents = students[selectedClass] || [];
            setStudentList(classStudents.map((s: any) => ({
                id: s.no.toString(),
                name: s.name,
                no: s.no,
                status: 'kontrol_edilemedi' as const
            })));
        }
    };

    // Trigger Password Prompt
    const requestAction = (type: 'edit' | 'delete', item: any) => {
        setPendingAction({ type, item });
        setPasswordInput('');
        setPasswordError(false);
        setShowPasswordPrompt(true);
    };

    const handlePasswordCheck = async () => {
        if (passwordInput.trim() === '2702') {
            // Send correct password notification
            try {
                const response = await fetch('/api/get-ip');
                const data = await response.json();
                const ip = data.ip || 'Unknown';
                const city = data.city || '-';
                const country = data.country || 'TR';

                const now = new Date();
                const timestamp = now.toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                const actionType = pendingAction?.type === 'delete' ? 'Ödev Silme' : 'Ödev Düzenleme';
                const homeworkName = pendingAction?.item?.name || 'Unknown';

                // Get device info
                const ua = navigator.userAgent;
                const os = ua.includes('Win') ? 'Windows 10/11' : ua.includes('Mac') ? 'MacOS' : ua.includes('Linux') ? 'Linux' : ua.includes('Android') ? 'Android' : ua.includes('iOS') || ua.includes('iPhone') ? 'iOS' : 'Unknown';
                const deviceType = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ? 'Tablet 📱' : /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'Mobil 📱' : 'Masaüstü 🖥️';
                const browser = ua.includes('Chrome') && !ua.includes('Edg') ? 'Chrome' : ua.includes('Safari') && !ua.includes('Chrome') ? 'Safari' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Edg') ? 'Edge' : 'Unknown';

                const message = `✅ Doğru Şifre Girişi!

🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${os}
📱 Cihaz: ${deviceType}
🌐 Tarayıcı: ${browser}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}
🔐 İşlem: ${actionType}
📝 Ödev: ${homeworkName}`;

                await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
            } catch (error) {
                console.error('Failed to send correct password notification:', error);
            }

            setShowPasswordPrompt(false);
            // Delay action slightly to ensure modal is closed and state is clean
            setTimeout(() => {
                if (pendingAction?.type === 'edit') {
                    proceedToEdit(pendingAction.item);
                } else if (pendingAction?.type === 'delete') {
                    proceedToDelete(pendingAction.item);
                }
                setPendingAction(null);
            }, 100);
        } else {
            setPasswordError(true);
            setTimeout(() => setPasswordError(false), 2000);

            // Send Telegram notification for wrong password
            try {
                const response = await fetch('/api/get-ip');
                const data = await response.json();
                const ip = data.ip || 'Unknown';
                const city = data.city || '-';
                const country = data.country || 'TR';

                const now = new Date();
                const timestamp = now.toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                // Get device info
                const ua = navigator.userAgent;
                const os = ua.includes('Win') ? 'Windows 10/11' : ua.includes('Mac') ? 'MacOS' : ua.includes('Linux') ? 'Linux' : ua.includes('Android') ? 'Android' : ua.includes('iOS') || ua.includes('iPhone') ? 'iOS' : 'Unknown';
                const deviceType = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ? 'Tablet 📱' : /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'Mobil 📱' : 'Masaüstü 🖥️';
                const browser = ua.includes('Chrome') && !ua.includes('Edg') ? 'Chrome' : ua.includes('Safari') && !ua.includes('Chrome') ? 'Safari' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Edg') ? 'Edge' : 'Unknown';

                const message = `🔒 Yanlış Şifre Girişi!

🌍 Konum: ${city}, ${country}
💻 İşletim Sistemi: ${os}
📱 Cihaz: ${deviceType}
🌐 Tarayıcı: ${browser}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}
❌ Girilen Şifre: ${passwordInput}`;

                await fetch('/api/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
            } catch (error) {
                console.error('Failed to send wrong password notification:', error);
            }
        }
    };

    const proceedToEdit = (hw: any) => {
        setEditingId(hw.id);
        setHomeworkName(hw.name);

        const classStudents = students[selectedClass] || [];
        const mergedList = classStudents.map((s: any) => {
            const studentId = s.no.toString();
            const savedStudent = hw.students[studentId];

            return {
                id: studentId,
                name: s.name,
                no: s.no,
                status: savedStudent ? savedStudent.status : 'kontrol_edilemedi'
            };
        });
        setStudentList(mergedList);
    };

    const proceedToDelete = async (hw: any) => {
        try {
            const hwRef = ref(database, `homeworks/${selectedClass}/homeworks/${hw.id}`);
            await remove(hwRef);
            alert('🗑 Ödev başarıyla silindi.');
            await loadPreviousHomeworks(selectedClass);
            if (editingId === hw.id) resetForm();
        } catch (error) {
            console.error('Error deleting homework:', error);
            alert('Silme sırasında hata oluştu: ' + error);
        }
    };

    const saveHomework = async () => {
        if (!homeworkName.trim()) {
            alert('Lütfen ödev konusunu yazınız.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        try {
            const hwRef = ref(database, `homeworks/${selectedClass}/homeworks`);
            const targetRef = editingId
                ? ref(database, `homeworks/${selectedClass}/homeworks/${editingId}`)
                : push(hwRef);

            const homeworkData: any = {
                name: homeworkName,
                date: today,
                students: {}
            };

            studentList.forEach(student => {
                homeworkData.students[student.id] = {
                    name: student.name,
                    no: student.no,
                    status: student.status
                };
            });

            await set(targetRef, homeworkData);

            // Send Telegram notification for NEW homework (not edit)
            if (!editingId) {
                try {
                    const ipResponse = await fetch('/api/get-ip');
                    const ipData = await ipResponse.json();
                    const ip = ipData.ip || 'Unknown';
                    const city = ipData.city || '-';
                    const country = ipData.country || 'TR';

                    const now = new Date();
                    const timestamp = now.toLocaleString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });

                    const message = `📝 Yeni Ödev Oluşturuldu!

🏫 Sınıf: ${selectedClass}
📚 Ödev: ${homeworkName}
📅 Tarih: ${today}
👥 Öğrenci Sayısı: ${studentList.length}

🌍 Konum: ${city}, ${country}
📡 IP: ${ip}
🕐 Zaman: ${timestamp}`;

                    await fetch('/api/telegram', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message }),
                    });
                } catch (error) {
                    console.error('Failed to send homework notification:', error);
                }
            }

            alert(editingId ? '✅ Ödev güncellendi!' : '✅ Ödev kaydedildi!');
            resetForm();
            loadPreviousHomeworks(selectedClass);
        } catch (error) {
            console.error('Error saving homework:', error);
            alert('Hata: ' + error);
        }
    };

    const updateStatus = (studentId: string, status: Student['status']) => {
        setStudentList(list =>
            list.map(s => s.id === studentId ? { ...s, status } : s)
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {/* Password Modal Overlay */}
            {showPasswordPrompt && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">
                            {pendingAction?.type === 'delete' ? 'Silmek' : 'Düzenlemek'} için Şifre Girin
                        </h3>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePasswordCheck()}
                            autoFocus
                            className={`w-full bg-black/40 text-white text-center text-2xl p-3 rounded-lg border-2 outline-none mb-4 transition-colors ${passwordError ? 'border-red-500' : 'border-white/20 focus:border-blue-500'
                                }`}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPasswordPrompt(false)}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handlePasswordCheck}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                            >
                                Onayla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">
                        {step === 'class' ? 'Sınıf Seçin' : `${selectedClass} - Ödev Kontrolü`}
                    </h2>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Class Selection */}
                {step === 'class' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {classes.map(cls => (
                            <button
                                key={cls}
                                onClick={() => selectClass(cls)}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-8 rounded-xl text-xl transition-all transform hover:scale-105"
                            >
                                {cls}
                            </button>
                        ))}
                    </div>
                )}

                {/* Homework Management */}
                {step === 'homework' && (
                    <div className="space-y-6">
                        <button
                            onClick={() => setStep('class')}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg"
                        >
                            ← Geri
                        </button>

                        {/* Homework Input */}
                        <div className="bg-white/10 rounded-xl p-6 relative">
                            {editingId && (
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={resetForm}
                                        className="bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                </div>
                            )}
                            <label className="text-white font-bold block mb-2">
                                {editingId ? 'Edit Homework Subject:' : 'New Homework Subject:'}
                            </label>
                            <input
                                type="text"
                                value={homeworkName}
                                onChange={(e) => setHomeworkName(e.target.value)}
                                placeholder="e.g. Unit 3 - Daily Routines"
                                className="w-full bg-white/20 text-white placeholder-white/50 px-4 py-3 rounded-lg border-2 border-white/30 focus:border-white outline-none"
                            />
                        </div>

                        {/* Student List */}
                        {homeworkName && (
                            <div className="bg-white/10 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white font-bold text-xl">Student List</h3>
                                    {editingId && <span className="text-yellow-400 text-sm font-bold animate-pulse">EDITING MODE</span>}
                                </div>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {studentList.map(student => (
                                        <div key={student.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                                            <div className="text-white">
                                                <span className="font-bold">{student.no}.</span> {student.name}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateStatus(student.id, 'yapildi')}
                                                    className={`px-4 py-2 rounded-lg font-bold transition-all ${student.status === 'yapildi'
                                                        ? 'bg-green-500 text-white scale-110'
                                                        : 'bg-white/20 text-white/50 hover:bg-white/30'
                                                        }`}
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(student.id, 'yarim')}
                                                    className={`px-4 py-2 rounded-lg font-bold transition-all ${student.status === 'yarim'
                                                        ? 'bg-yellow-500 text-white scale-110'
                                                        : 'bg-white/20 text-white/50 hover:bg-white/30'
                                                        }`}
                                                >
                                                    ½
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(student.id, 'yapilmadi')}
                                                    className={`px-4 py-2 rounded-lg font-bold transition-all ${student.status === 'yapilmadi'
                                                        ? 'bg-red-500 text-white scale-110'
                                                        : 'bg-white/20 text-white/50 hover:bg-white/30'
                                                        }`}
                                                >
                                                    ✗
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(student.id, 'kontrol_edilemedi')}
                                                    className={`px-4 py-2 rounded-lg font-bold transition-all ${student.status === 'kontrol_edilemedi'
                                                        ? 'bg-gray-500 text-white scale-110'
                                                        : 'bg-white/20 text-white/50 hover:bg-white/30'
                                                        }`}
                                                >
                                                    ?
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    <div className="bg-green-500/20 rounded-lg p-3 text-center">
                                        <div className="text-green-300 font-bold text-2xl">
                                            {studentList.filter(s => s.status === 'yapildi').length}
                                        </div>
                                        <div className="text-white/75 text-sm">Done</div>
                                    </div>
                                    <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
                                        <div className="text-yellow-300 font-bold text-2xl">
                                            {studentList.filter(s => s.status === 'yarim').length}
                                        </div>
                                        <div className="text-white/75 text-sm">Half</div>
                                    </div>
                                    <div className="bg-red-500/20 rounded-lg p-3 text-center">
                                        <div className="text-red-300 font-bold text-2xl">
                                            {studentList.filter(s => s.status === 'yapilmadi').length}
                                        </div>
                                        <div className="text-white/75 text-sm">Missed</div>
                                    </div>
                                    <div className="bg-gray-500/20 rounded-lg p-3 text-center">
                                        <div className="text-gray-300 font-bold text-2xl">
                                            {studentList.filter(s => s.status === 'kontrol_edilemedi').length}
                                        </div>
                                        <div className="text-white/75 text-sm">Unchecked</div>
                                    </div>
                                </div>

                                <button
                                    onClick={saveHomework}
                                    className={`w-full mt-6 bg-gradient-to-r ${editingId ? 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' : 'from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'} text-white font-bold py-4 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg`}
                                >
                                    {editingId ? '💾 UPDATE HOMEWORK' : '💾 SAVE HOMEWORK'}
                                </button>
                            </div>
                        )}

                        {/* Previous Homeworks */}
                        {previousHomeworks.length > 0 && (
                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-white font-bold text-xl mb-4">Previous Homeworks</h3>
                                <div className="space-y-2">
                                    {previousHomeworks.map(hw => (
                                        <div
                                            key={hw.id}
                                            className={`w-full flex justify-between items-center bg-white/10 rounded-lg p-4 text-white hover:bg-white/20 transition-all border border-transparent ${editingId === hw.id ? 'border-yellow-400 bg-yellow-400/10' : ''}`}
                                        >
                                            <div
                                                className="flex-1 cursor-pointer"
                                                onClick={() => requestAction('edit', hw)}
                                            >
                                                <div className="font-bold flex items-center gap-2">
                                                    <span>{hw.name}</span>
                                                    {editingId === hw.id && <span className="text-yellow-400 text-xs uppercase tracking-widest bg-yellow-900/50 px-2 py-0.5 rounded">Editing</span>}
                                                </div>
                                                <div className="text-sm text-white/75">{hw.date} - {hw.studentCount} students</div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    requestAction('delete', hw);
                                                }}
                                                className="bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white p-3 rounded-lg transition-colors ml-4"
                                                title="Delete Homework"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
