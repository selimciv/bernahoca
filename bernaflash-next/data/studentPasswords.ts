// Auto-generated 4-digit passwords for students
// Please share these credentials with your students

export const studentPasswords: Record<number, string> = {
    // 9-B Class
    375: "2847",
    420: "5193",
    438: "7264",
    519: "3851",
    529: "9417",
    534: "6285",
    562: "1749",
    563: "8436",
    585: "4927",
    615: "3158",
    737: "7592",
    743: "2684",
    748: "9137",
    752: "4763",
    755: "6241",
    760: "8915",
    776: "3528",
    835: "7194",
    888: "5673",
    962: "2948",
    976: "8251",
    1000: "4586",
    1037: "9374",
    1039: "6129",
    1040: "3865",
    1048: "7418",
    1049: "2596",
    1053: "5842",

    // 9-E Class
    121: "9157",
    169: "4723",
    180: "6381",
    306: "2954",
    325: "8176",
    353: "5429",
    471: "7638",
    532: "3914",
    549: "6285",
    591: "1847",
    733: "9562",
    774: "4218",
    845: "7394",
    853: "2651",
    859: "5983",
    879: "8427",
    914: "3759",
    919: "6142",
    924: "9586",
    957: "4271",
    974: "7835",
    975: "2469",
    1002: "5917",
    1035: "8354",
    1044: "3682",
    1050: "7149",
    1051: "4926",
    1072: "6573",

    // 11-C Class
    112: "5842",
    405: "9374",
    423: "2617",
    440: "7159",
    557: "4283",
    764: "8946",
    788: "3571",
    862: "6285",
    935: "1749",
    1034: "9428",
    1022: "5163"
};

// Helper function to get student class from school number
export function getStudentClass(schoolNumber: number): '9-B' | '9-E' | '11-C' | null {
    const class9B = [375, 420, 438, 519, 529, 534, 562, 563, 585, 615, 737, 743, 748, 752, 755, 760, 776, 835, 888, 962, 976, 1000, 1037, 1039, 1040, 1048, 1049, 1053];
    const class9E = [121, 169, 180, 306, 325, 353, 471, 532, 549, 591, 733, 774, 845, 853, 859, 879, 914, 919, 924, 957, 974, 975, 1002, 1035, 1044, 1050, 1051, 1072];
    const class11C = [112, 405, 423, 440, 557, 764, 788, 862, 935, 1022, 1034];

    if (class9B.includes(schoolNumber)) return '9-B';
    if (class9E.includes(schoolNumber)) return '9-E';
    if (class11C.includes(schoolNumber)) return '11-C';
    return null;
}

// Get student name from students.ts
export function getStudentName(schoolNumber: number): string | null {
    // This will be populated from students.ts data
    return null; // Will be implemented in the login component
}
