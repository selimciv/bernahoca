'use client';

import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { logGameActivity } from '@/lib/gameActivityLogger';

interface HomeworkReportProps {
    onClose: () => void;
}

export default function HomeworkReport({ onClose }: HomeworkReportProps) {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<any>(null);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    // Abbreviate name: "Selim Civelek" -> "S. C."
    const abbreviateName = (fullName: string) => {
        if (!fullName) return '';
        return fullName
            .split(' ')
            .map(part => part.charAt(0) + '.')
            .join(' ');
    };

    useEffect(() => {
        // Log activity on mount
        logGameActivity('Homework Report', 'Öğretmen');

        const fetchData = async () => {
            setLoading(true);
            try {
                const hwRef = ref(database, 'homeworks');
                const snapshot = await get(hwRef);

                if (snapshot.exists()) {
                    setReportData(snapshot.val());
                    // Default to 'ALL' (Tüm Sınıflar)
                    setSelectedClass('ALL');
                }
            } catch (error) {
                console.error('Error fetching report:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const processClassData = (targetClass: string) => {
        if (!reportData) return [];

        let classesToProcess = [];
        if (targetClass === 'ALL') {
            classesToProcess = Object.keys(reportData);
        } else {
            classesToProcess = [targetClass];
        }

        let allStudents: any[] = [];

        classesToProcess.forEach(className => {
            const classData = reportData[className];
            if (!classData || !classData.homeworks) return;

            const homeworks = classData.homeworks;
            const studentStats: any = {};

            Object.values(homeworks).forEach((hw: any) => {
                if (hw.students) {
                    Object.values(hw.students).forEach((student: any) => {
                        const id = student.no;
                        if (!studentStats[id]) {
                            studentStats[id] = {
                                uniqueId: `${className}-${student.no}`,
                                className: className,
                                name: abbreviateName(student.name),
                                no: student.no,
                                total: 0,
                                yapildi: 0,
                                yapilmadi: 0,
                                yarim: 0,
                                kontrol_edilemedi: 0,
                                history: []
                            };
                        }
                        studentStats[id].total++;
                        studentStats[id][student.status || 'kontrol_edilemedi']++;
                        studentStats[id].history.push({
                            hwName: hw.name,
                            date: hw.date,
                            status: student.status
                        });
                    });
                }
            });

            allStudents = [...allStudents, ...Object.values(studentStats)];
        });

        // Sort by "Yapmadı" (Missed) descending, then Class Name, then Student Number
        return allStudents.sort((a, b) => {
            if (b.yapilmadi !== a.yapilmadi) return b.yapilmadi - a.yapilmadi; // Most missed first
            if (a.className !== b.className) return a.className.localeCompare(b.className);
            return a.no - b.no;
        });
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6">
            <div className="bg-[#0f172a] rounded-3xl w-full max-w-7xl h-[95vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1e293b]">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Homework Report</h2>
                        <p className="text-white/50 text-sm">Student Progress Summary (Public View)</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
                    >
                        ×
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center text-white">
                        <div className="animate-spin text-4xl mr-3">↻</div> Loading...
                    </div>
                ) : !reportData ? (
                    <div className="flex-1 flex items-center justify-center text-white/50">
                        No Data Found
                    </div>
                ) : (
                    <div className="flex-1 flex min-h-0">
                        {/* Sidebar: Classes */}
                        <div className="w-1/4 md:w-64 bg-[#0f172a] border-r border-white/5 overflow-y-auto p-4 flex flex-col gap-2">
                            <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Classes</h3>

                            {/* ALL Classes Option */}
                            <button
                                onClick={() => setSelectedClass('ALL')}
                                className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${selectedClass === 'ALL'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                            >
                                Tüm Sınıflar
                            </button>

                            <div className="h-px bg-white/10 my-1"></div>

                            {Object.keys(reportData).map(cls => (
                                <button
                                    key={cls}
                                    onClick={() => setSelectedClass(cls)}
                                    className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${selectedClass === cls
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    {cls}
                                </button>
                            ))}
                        </div>

                        {/* Main Content: List View */}
                        <div className="flex-1 overflow-auto bg-[#1e293b]/50 p-0 md:p-0">
                            {selectedClass && (
                                <div className="min-w-full inline-block align-middle">
                                    <div className="border-b border-white/10 bg-[#1e293b] sticky top-0 z-10 p-4 shadow-md">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-white">
                                                {selectedClass === 'ALL' ? 'Tüm Sınıflar' : selectedClass} Raporu
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Table View */}
                                    <table className="min-w-full divide-y divide-white/10">
                                        <thead className="bg-[#0f172a] sticky top-[60px] z-10">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Sınıf</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">No</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Ad Soyad</th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white bg-red-500/10 text-red-300">Yapmadı</th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white bg-green-500/10 text-green-300">Yaptı</th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white bg-yellow-500/10 text-yellow-300">Yarım</th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white text-gray-400">?</th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Toplam</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 bg-[#1e293b]/30">
                                            {processClassData(selectedClass).map((student: any) => (
                                                <tr key={student.uniqueId} className="hover:bg-white/5 transition-colors">
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-blue-400 sm:pl-6">{student.className}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white/60 font-mono">{student.no}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">{student.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-red-400 bg-red-500/5">{student.yapilmadi}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-green-400 bg-green-500/5">{student.yapildi}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-yellow-400 bg-yellow-500/5">{student.yarim}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{student.kontrol_edilemedi}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-white">{student.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
