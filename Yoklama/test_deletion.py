import sqlite3
import requests

def test_delete_logic():
    conn = sqlite3.connect('yoklama.db')
    c = conn.cursor()
    
    # 1. Setup: Create a student and an attendance record
    print("Setting up test data...")
    c.execute("INSERT OR IGNORE INTO students (okul_no, ad_soyad, sinif, veli_tel) VALUES ('99999', 'Test Student', '12-A', '5555555555')")
    c.execute("DELETE FROM yoklama WHERE okul_no = '99999'") # Clean start
    conn.commit()
    
    # 2. Add attendance
    tarih = '2025-01-01'
    okul_no = '99999'
    sinif = '12-A'
    c.execute("INSERT INTO yoklama (tarih, okul_no, durum) VALUES (?, ?, ?)", (tarih, okul_no, 'GELMEDİ'))
    conn.commit()
    
    print("Attendance record created.")
    
    # 3. Verify existence before delete
    c.execute("SELECT count(*) FROM yoklama WHERE tarih = ? AND okul_no = ?", (tarih, okul_no))
    count = c.fetchone()[0]
    print(f"Rows before delete: {count}")
    
    if count == 0:
        print("Error: Setup failed, no record found.")
        return

    # 4. Perform Delete Logic (matching app.py exactly)
    print("Executing delete logic...")
    c.execute('''DELETE FROM yoklama 
                WHERE tarih = ? AND okul_no IN 
                (SELECT okul_no FROM students WHERE sinif = ?)''', (tarih, sinif))
    deleted_count = c.rowcount
    conn.commit()
    
    print(f"Rows deleted: {deleted_count}")
    
    # 5. Verify existence after delete
    c.execute("SELECT count(*) FROM yoklama WHERE tarih = ? AND okul_no = ?", (tarih, okul_no))
    count_after = c.fetchone()[0]
    print(f"Rows after delete: {count_after}")
    
    if count_after == 0:
        print("SUCCESS: Record deleted.")
    else:
        print("FAILURE: Record still exists.")
        
    conn.close()

if __name__ == "__main__":
    test_delete_logic()
