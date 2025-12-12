# Okul Yoklama ve WhatsApp Otomasyon Sistemi

Bu sistem, okul yoklamalarını yönetmek ve velilere otomatik WhatsApp mesajı göndermek için geliştirilmiş bir Flask web uygulamasıdır.

## 🚀 Kurulum

### 1. Gerekli Kütüphaneleri Yükleyin

```bash
pip3 install Flask pandas openpyxl selenium
```

### 2. Chrome WebDriver Kurulumu

WhatsApp otomasyonu için Chrome tarayıcısı ve ChromeDriver gereklidir:

- **MacOS**: 
  ```bash
  brew install chromedriver
  ```

- **Manuel Kurulum**: [ChromeDriver Download](https://chromedriver.chromium.org/downloads) adresinden sisteminize uygun sürümü indirin.

## 📁 Proje Yapısı

```
Yoklama/
├── app.py                  # Flask backend
├── yoklama.db             # SQLite veritabanı (otomatik oluşur)
├── requirements.txt       # Python bağımlılıkları
├── templates/
│   ├── login.html        # Giriş sayfası
│   └── dashboard.html    # Ana panel
└── ornek_ogrenciler.xlsx # Örnek Excel dosyası
```

## 🎯 Kullanım

### 1. Uygulamayı Başlatın

```bash
python3 app.py
```

Uygulama `http://localhost:5000` adresinde çalışmaya başlayacaktır.

### 2. Giriş Yapın

- **Şifre**: `270295`

### 3. Öğrenci Yönetimi

#### Manuel Ekleme:
- "Öğrenci Yönetimi" sekmesinden tek tek öğrenci ekleyin
- Telefon numaraları otomatik olarak temizlenir (boşluklar ve parantezler kaldırılır)

#### Excel İle Toplu Yükleme:
Excel dosyanız şu sütunları içermelidir:

| Sinif | okul_no | Ad_Soyad | Veli_Tel |
|-------|---------|----------|----------|
| 9-A   | 1001    | Ahmet Yılmaz | 555 123 4567 |
| 9-A   | 1002    | Ayşe Demir | (555) 234-5678 |

- `ornek_ogrenciler.xlsx` dosyasını referans olarak kullanabilirsiniz
- Aynı okul numarası varsa güncellenir, yoksa yeni kayıt eklenir
- Telefon numaraları otomatik temizlenir

### 4. Yoklama Al

1. "Yoklama Al" sekmesine gidin
2. Tarih ve sınıf seçin
3. Her öğrenci için durumu işaretleyin:
   - ✅ **GELDİ** (Varsayılan)
   - ❌ **GELMEDİ**
   - ⏰ **GEÇ KALDI**
4. "Yoklamayı Kaydet" butonuna tıklayın

### 5. Rapor ve WhatsApp Gönderimi

1. "Rapor ve WhatsApp" sekmesine gidin
2. Rapor almak istediğiniz tarihi seçin
3. "Raporu Getir" butonuna tıklayın
4. İstatistikleri ve gelmeyen/geç kalan öğrencileri görün

#### WhatsApp Mesajı Göndermek İçin:

1. **"WhatsApp Başlat"** butonuna tıklayın
   - Chrome tarayıcısı açılacak
   - WhatsApp Web QR kodunu telefonunuzla okutun
2. **"Mesajları Gönder"** butonuna tıklayın
   - Sistem her veliye otomatik mesaj gönderecektir
   - İlerlemeyi takip edebilirsiniz

#### Mesaj Formatları:

**Gelmeyen için:**
```
Sayın Veli, 2025-12-12 tarihli yoklamada öğrencimiz Ahmet Yılmaz okula gelmemiştir. Bilginize.
```

**Geç Kalan için:**
```
Sayın Veli, 2025-12-12 tarihli yoklamada öğrencimiz Ayşe Demir okula geç kalmıştır. Bilginize.
```

## ⚙️ Özellikler

✅ Güvenli giriş sistemi (şifre: 270295)
✅ Manuel ve toplu öğrenci ekleme
✅ Excel dosyası desteği (.xlsx)
✅ Telefon numarası otomatik temizleme
✅ Günlük yoklama takibi
✅ Detaylı raporlama ve istatistikler
✅ WhatsApp Web entegrasyonu
✅ Otomatik veli bilgilendirme
✅ Modern ve kullanıcı dostu arayüz
✅ SQLite veritabanı (kurulum gerektirmez)

## 🔐 Güvenlik

- Tüm işlemler için giriş gereklidir
- Session tabanlı kimlik doğrulama
- Şifreyi değiştirmek için `app.py` dosyasındaki `login()` fonksiyonunu düzenleyin

## 🛠️ Teknik Detaylar

- **Backend**: Python Flask 3.0
- **Frontend**: HTML5, Bootstrap 5, JavaScript (jQuery)
- **Veritabanı**: SQLite
- **Excel İşleme**: pandas, openpyxl
- **WhatsApp Otomasyon**: Selenium WebDriver

## ❗ Önemli Notlar

1. **Chrome Tarayıcı**: WhatsApp otomasyonu için Chrome yüklü olmalıdır
2. **İnternet Bağlantısı**: WhatsApp Web için internet gereklidir
3. **QR Kod**: Her oturumda QR kod okutmanız gerekebilir
4. **Telefon Formatı**: Telefon numaraları "+90" olmadan, sadece 10 haneli olarak kaydedilir (örn: 5551234567)
5. **Veri Yedekleme**: `yoklama.db` dosyasını düzenli olarak yedekleyin

## 🐛 Sorun Giderme

**ChromeDriver Hatası:**
```bash
# MacOS için:
brew install chromedriver
brew reinstall chromedriver

# PATH'e ekleyin (gerekirse):
export PATH="$PATH:/usr/local/bin"
```

**ImportError:**
```bash
pip3 install --upgrade Flask pandas openpyxl selenium
```

**Veritabanı Hatası:**
- `yoklama.db` dosyasını silin ve uygulamayı yeniden başlatın (veri kaybı olur!)

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Terminal çıktısını kontrol edin
2. Tarayıcı konsolunu inceleyin (F12)
3. `yoklama.db` dosyasının erişilebilir olduğundan emin olun

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**Geliştirici Notu**: Üretim ortamında kullanmadan önce güvenlik önlemlerini artırın ve şifreyi güçlendirin.
