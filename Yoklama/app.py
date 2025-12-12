from flask import Flask, render_template, request, redirect, session, jsonify, send_file
import io
import sqlite3
import pandas as pd
import re
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'okul-yoklama-2024-secret-key'  # Güvenli bir secret key

def init_db():
    """Veritabanını başlat"""
    conn = sqlite3.connect('yoklama.db')
    c = conn.cursor()
    
    # Öğrenciler tablosu
    c.execute('''CREATE TABLE IF NOT EXISTS students
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  okul_no TEXT UNIQUE NOT NULL,
                  ad_soyad TEXT NOT NULL,
                  sinif TEXT NOT NULL,
                  veli_tel TEXT NOT NULL)''')
    
    # Yoklama tablosu
    c.execute('''CREATE TABLE IF NOT EXISTS yoklama
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  tarih TEXT NOT NULL,
                  okul_no TEXT NOT NULL,
                  durum TEXT NOT NULL,
                  FOREIGN KEY (okul_no) REFERENCES students (okul_no))''')
    
    conn.commit()
    conn.close()

def clean_phone(phone):
    """Telefon numarasını temizle - sadece rakamlar"""
    if not phone:
        return ""
    # Tüm boşlukları, parantezleri, tireleri kaldır
    cleaned = re.sub(r'[^\d]', '', str(phone))
    # Başındaki 0'ı kaldır (varsa)
    if cleaned.startswith('0'):
        cleaned = cleaned[1:]
    return cleaned

@app.route('/')
def index():
    """Ana sayfa - Login"""
    if 'logged_in' in session:
        return redirect('/dashboard')
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    """Giriş kontrolü"""
    password = request.form.get('password')
    if password == '270295':
        session['logged_in'] = True
        return redirect('/dashboard')
    return redirect('/')

@app.route('/logout')
def logout():
    """Çıkış yap"""
    session.pop('logged_in', None)
    return redirect('/')

@app.route('/dashboard')
def dashboard():
    """Ana panel"""
    if 'logged_in' not in session:
        return redirect('/')
    
    # Tüm sınıfları getir
    conn = sqlite3.connect('yoklama.db')
    c = conn.cursor()
    c.execute('SELECT DISTINCT sinif FROM students ORDER BY sinif')
    siniflar = [row[0] for row in c.fetchall()]
    conn.close()
    
    return render_template('dashboard.html', siniflar=siniflar)

@app.route('/add_student', methods=['POST'])
def add_student():
    """Tek öğrenci ekle"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        ad_soyad = request.form.get('ad_soyad')
        okul_no = request.form.get('okul_no')
        sinif = request.form.get('sinif')
        veli_tel = clean_phone(request.form.get('veli_tel'))
        
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        # Aynı numara varsa güncelle, yoksa ekle
        c.execute('SELECT id FROM students WHERE okul_no = ?', (okul_no,))
        existing = c.fetchone()
        
        if existing:
            c.execute('''UPDATE students SET ad_soyad=?, sinif=?, veli_tel=?
                        WHERE okul_no=?''', (ad_soyad, sinif, veli_tel, okul_no))
            message = 'Öğrenci güncellendi'
        else:
            c.execute('''INSERT INTO students (okul_no, ad_soyad, sinif, veli_tel)
                        VALUES (?, ?, ?, ?)''', (okul_no, ad_soyad, sinif, veli_tel))
            message = 'Öğrenci eklendi'
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': message})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/get_all_students')
def get_all_students():
    """Tüm öğrencileri getir"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        c.execute('SELECT id, okul_no, ad_soyad, sinif, veli_tel FROM students ORDER BY sinif, ad_soyad')
        
        students = []
        for row in c.fetchall():
            students.append({
                'id': row[0],
                'okul_no': row[1],
                'ad_soyad': row[2],
                'sinif': row[3],
                'veli_tel': row[4]
            })
        
        conn.close()
        return jsonify({'success': True, 'students': students})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/update_student', methods=['POST'])
def update_student():
    """Öğrenci güncelle"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        student_id = request.form.get('id')
        ad_soyad = request.form.get('ad_soyad')
        okul_no = request.form.get('okul_no')
        sinif = request.form.get('sinif')
        veli_tel = clean_phone(request.form.get('veli_tel'))
        
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        c.execute('''UPDATE students SET okul_no=?, ad_soyad=?, sinif=?, veli_tel=?
                    WHERE id=?''', (okul_no, ad_soyad, sinif, veli_tel, student_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Öğrenci güncellendi'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/delete_student', methods=['POST'])
def delete_student():
    """Öğrenci sil"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        student_id = request.form.get('id')
        
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        # Önce yoklama kayıtlarını sil
        c.execute('SELECT okul_no FROM students WHERE id = ?', (student_id,))
        result = c.fetchone()
        if result:
            okul_no = result[0]
            c.execute('DELETE FROM yoklama WHERE okul_no = ?', (okul_no,))
        
        # Sonra öğrenciyi sil
        c.execute('DELETE FROM students WHERE id = ?', (student_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Öğrenci silindi'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/upload_excel', methods=['POST'])
def upload_excel():
    """Excel dosyasından öğrenci yükle"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        file = request.files['file']
        if not file:
            return jsonify({'success': False, 'message': 'Dosya seçilmedi'})
        
        # Excel'i oku
        df = pd.read_excel(file)
        
        # Sütun isimlerini kontrol et
        required_cols = ['Sinif', 'Okul_No', 'Ad_Soyad', 'Veli_Tel']
        for col in required_cols:
            if col not in df.columns:
                return jsonify({'success': False, 'message': f'{col} sütunu bulunamadı'})
        
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        added = 0
        updated = 0
        
        for _, row in df.iterrows():
            sinif = str(row['Sinif'])
            okul_no = str(row['Okul_No'])
            ad_soyad = str(row['Ad_Soyad'])
            veli_tel = clean_phone(row['Veli_Tel'])
            
            # Aynı numara varsa güncelle
            c.execute('SELECT id FROM students WHERE okul_no = ?', (okul_no,))
            existing = c.fetchone()
            
            if existing:
                c.execute('''UPDATE students SET ad_soyad=?, sinif=?, veli_tel=?
                            WHERE okul_no=?''', (ad_soyad, sinif, veli_tel, okul_no))
                updated += 1
            else:
                c.execute('''INSERT INTO students (okul_no, ad_soyad, sinif, veli_tel)
                            VALUES (?, ?, ?, ?)''', (okul_no, ad_soyad, sinif, veli_tel))
                added += 1
        
        conn.commit()
        conn.close()
        
        message = f'{added} öğrenci eklendi, {updated} öğrenci güncellendi'
        return jsonify({'success': True, 'message': message})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/download_template')
def download_template():
    """Boş Excel şablonu indir"""
    try:
        # Boş dataframe oluştur
        df = pd.DataFrame(columns=['Sinif', 'Okul_No', 'Ad_Soyad', 'Veli_Tel'])
        
        # BytesIO buffer'a kaydet
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False)
            
        output.seek(0)
        
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='ogrenci_yukleme_sablonu.xlsx'
        )
    except Exception as e:
        return str(e), 500

@app.route('/students')
def get_students():
    """Sınıfa göre öğrencileri getir"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    sinif = request.args.get('sinif')
    tarih = request.args.get('tarih')
    
    conn = sqlite3.connect('yoklama.db')
    c = conn.cursor()
    
    attendance_exists = False
    if tarih:
        # Önce bu tarih ve sınıf için kayıt var mı kontrol et
        if sinif == 'TUMU':
            c.execute('SELECT 1 FROM yoklama WHERE tarih = ? LIMIT 1', (tarih,))
        else:
            c.execute('''SELECT 1 FROM yoklama y 
                        JOIN students s ON y.okul_no = s.okul_no 
                        WHERE y.tarih = ? AND s.sinif = ? LIMIT 1''', (tarih, sinif))
        
        if c.fetchone():
            attendance_exists = True

        # "TUMU" seçilirse tüm sınıfları getir
        if sinif == 'TUMU':
            c.execute('''SELECT s.okul_no, s.ad_soyad, s.sinif, s.veli_tel, COALESCE(y.durum, 'GELDİ') as durum
                        FROM students s
                        LEFT JOIN yoklama y ON s.okul_no = y.okul_no AND y.tarih = ?
                        ORDER BY s.sinif, s.ad_soyad''', (tarih,))
        else:
            # Yoklama kaydı varsa getir
            c.execute('''SELECT s.okul_no, s.ad_soyad, s.sinif, s.veli_tel, COALESCE(y.durum, 'GELDİ') as durum
                        FROM students s
                        LEFT JOIN yoklama y ON s.okul_no = y.okul_no AND y.tarih = ?
                        WHERE s.sinif = ?
                        ORDER BY s.ad_soyad''', (tarih, sinif))
    else:
        if sinif == 'TUMU':
            c.execute('''SELECT okul_no, ad_soyad, sinif, veli_tel, 'GELDİ' as durum
                        FROM students ORDER BY sinif, ad_soyad''')
        else:
            c.execute('''SELECT okul_no, ad_soyad, sinif, veli_tel, 'GELDİ' as durum
                        FROM students WHERE sinif = ? ORDER BY ad_soyad''', (sinif,))
    
    students = []
    for row in c.fetchall():
        students.append({
            'okul_no': row[0],
            'ad_soyad': row[1],
            'sinif': row[2],
            'veli_tel': row[3],
            'durum': row[4]
        })
    
    conn.close()
    return jsonify({'success': True, 'students': students, 'attendance_exists': attendance_exists})

@app.route('/delete_attendance', methods=['POST'])
def delete_attendance():
    """Yoklama sil"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        tarih = request.form.get('tarih')
        sinif = request.form.get('sinif')
        
        print(f"DEBUG: Delete requested for Date: {tarih}, Class: {sinif}") # DEBUG LOG
        
        if not tarih or not sinif:
            return jsonify({'success': False, 'message': 'Tarih ve sınıf gerekli'})
            
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        if sinif == 'TUMU':
            c.execute('DELETE FROM yoklama WHERE tarih = ?', (tarih,))
            deleted_count = c.rowcount
            print(f"DEBUG: Deleted {deleted_count} rows for TUMU") # DEBUG LOG
        else:
            # Check target students first
            c.execute('SELECT okul_no FROM students WHERE sinif = ?', (sinif,))
            students_in_class = [row[0] for row in c.fetchall()]
            print(f"DEBUG: Found {len(students_in_class)} students in class {sinif}") # DEBUG LOG
            
            c.execute('''DELETE FROM yoklama 
                        WHERE tarih = ? AND okul_no IN 
                        (SELECT okul_no FROM students WHERE sinif = ?)''', (tarih, sinif))
            deleted_count = c.rowcount
            print(f"DEBUG: Deleted {deleted_count} rows for class {sinif}") # DEBUG LOG
            
        conn.commit()
        conn.close()
        
        if deleted_count > 0:
            return jsonify({'success': True, 'message': 'Yoklama kaydı silindi'})
        else:
            print("DEBUG: No rows deleted") # DEBUG LOG
            return jsonify({'success': False, 'message': 'Silinecek kayıt bulunamadı'})
            
    except Exception as e:
        print(f"DEBUG: Error in delete: {str(e)}") # DEBUG LOG
        return jsonify({'success': False, 'message': str(e)})

@app.route('/get_attendance_dates')
def get_attendance_dates():
    """Yoklama alınan tarihleri getir"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        c.execute('SELECT DISTINCT tarih FROM yoklama ORDER BY tarih DESC')
        
        dates = [row[0] for row in c.fetchall()]
        conn.close()
        
        return jsonify({'success': True, 'dates': dates})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/save_attendance', methods=['POST'])
def save_attendance():
    """Yoklama kaydet"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    try:
        data = request.json
        tarih = data.get('tarih')
        records = data.get('records', [])
        
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        # Önce o tarih için kayıtları sil
        okul_nos = [r['okul_no'] for r in records]
        if okul_nos:
            placeholders = ','.join('?' * len(okul_nos))
            c.execute(f'DELETE FROM yoklama WHERE tarih = ? AND okul_no IN ({placeholders})',
                     [tarih] + okul_nos)
        
        # Yeni kayıtları ekle
        for record in records:
            c.execute('''INSERT INTO yoklama (tarih, okul_no, durum)
                        VALUES (?, ?, ?)''',
                     (tarih, record['okul_no'], record['durum']))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Yoklama kaydedildi'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/report')
def get_report():
    """Rapor getir"""
    if 'logged_in' not in session:
        return jsonify({'success': False, 'message': 'Giriş yapmanız gerekiyor'})
    
    tarih = request.args.get('tarih')
    
    conn = sqlite3.connect('yoklama.db')
    c = conn.cursor()
    
    # İstatistikler
    c.execute('SELECT COUNT(*) FROM yoklama WHERE tarih = ? AND durum = "GELDİ"', (tarih,))
    geldi = c.fetchone()[0]
    
    c.execute('SELECT COUNT(*) FROM yoklama WHERE tarih = ? AND durum = "GELMEDİ"', (tarih,))
    gelmedi = c.fetchone()[0]
    
    c.execute('SELECT COUNT(*) FROM yoklama WHERE tarih = ? AND durum = "GEÇ"', (tarih,))
    gec = c.fetchone()[0]
    
    # Gelmeyenler ve geç kalanlar (WhatsApp için ikisi de lazım)
    c.execute('''SELECT s.ad_soyad, s.sinif, s.veli_tel, y.durum
                FROM students s
                JOIN yoklama y ON s.okul_no = y.okul_no
                WHERE y.tarih = ? AND (y.durum = "GELMEDİ" OR y.durum = "GEÇ")
                ORDER BY s.sinif, s.ad_soyad''', (tarih,))
    
    absences = []
    for row in c.fetchall():
        absences.append({
            'ad_soyad': row[0],
            'sinif': row[1],
            'veli_tel': row[2],
            'durum': row[3]
        })
    
    conn.close()
    
    return jsonify({
        'success': True,
        'absences': absences,
        'stats': {
            'geldi': geldi,
            'gelmedi': gelmedi,
            'gec': gec
        }
    })

@app.route('/get_general_summary')
def get_general_summary():
    """Tarih bazlı genel yoklama özeti"""
    try:
        conn = sqlite3.connect('yoklama.db')
        c = conn.cursor()
        
        # Tarihlere göre gruplayıp durum sayılarını al
        query = '''
            SELECT 
                y.tarih,
                SUM(CASE WHEN y.durum = 'GELDİ' THEN 1 ELSE 0 END) as geldi,
                SUM(CASE WHEN y.durum = 'GELMEDİ' THEN 1 ELSE 0 END) as gelmedi,
                SUM(CASE WHEN y.durum = 'GEÇ' THEN 1 ELSE 0 END) as gec,
                COUNT(y.okul_no) as toplam
            FROM yoklama y
            GROUP BY y.tarih
            ORDER BY y.tarih DESC
        '''
        
        c.execute(query)
        rows = c.fetchall()
        conn.close()
        
        summary = []
        for row in rows:
            summary.append({
                'tarih': row[0],
                'geldi': row[1],
                'gelmedi': row[2],
                'gec': row[3],
                'toplam': row[4]
            })
            
        return jsonify({'success': True, 'summary': summary})
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})






if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5001)
