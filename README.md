# Sentimter: Analisis Sentimen Tweet 

Aplikasi ini merupakan implementasi data mining untuk analisis sentimen . Sistem terdiri dari backend (Flask) untuk crawling, preprocessing, dan klasifikasi, serta frontend (React) untuk visualisasi pipeline data.

---

## Fitur Utama

- **Crawling Data Twitter**: Mengambil tweet dari file CSV hasil crawling berdasarkan hashtag/kata kunci.
- **Preprocessing**: Membersihkan dan menormalisasi tweet (case folding, stopword removal, normalisasi, stemming).
- **Ekstraksi Fitur**: Menghitung frekuensi dan probabilitas kata dari tweet yang sudah diproses.
- **Klasifikasi Sentimen**: Menggunakan Naive Bayes untuk menentukan sentimen (positif, negatif, netral) pada setiap tweet.
- **Visualisasi Probabilitas**: Menampilkan detail probabilitas dan bobot tiap kelas sentimen.
- **Highlight Tweet dengan Probabilitas Sentimen Tertinggi**.

---

## Struktur Folder

```
backend/
  app.py
  model.py
  data_tweet.csv
  requirements.txt
frontend/
  src/
    App.js
    CrawlingPage.js
    PreprocessingPage.js
    EkstraksiFiturPage.js
    KlasifikasiPage.js
    PilihSentimenPage.js
    DataPipelineContext.js
    ...
  public/
    index.html
package.json
```

---

## Alur Sistem

1. **Crawling Data**
   - Pengguna memasukkan hashtag/kata kunci dan jumlah tweet.
   - Backend mengambil data dari `data_tweet.csv` dan mengirim tweet yang relevan ke frontend.

2. **Preprocessing**
   - Tweet yang diambil diproses: case folding, hapus URL/mention/angka, stopword removal, normalisasi kata, dan stemming.
   - Hasil preprocessing (token bersih) ditampilkan.

3. **Ekstraksi Fitur**
   - Dari seluruh token tweet, dihitung frekuensi dan probabilitas kata (dengan Laplace smoothing).
   - Ditampilkan dalam bentuk tabel.

4. **Klasifikasi**
   - Setiap tweet diklasifikasikan menggunakan Naive Bayes berdasarkan model sederhana di backend.
   - Ditampilkan hasil sentimen, probabilitas tiap kelas, dan bobotnya.

5. **Pilih Sentimen Tertinggi**
   - Sistem mencari tweet dengan probabilitas sentimen tertinggi dari seluruh data.
   - Ditampilkan tweet dan detail probabilitasnya.

---

## Cara Menjalankan

### 1. Backend (Flask)

```sh
cd backend
pip install -r requirements.txt
python app.py
```
- Server berjalan di `http://localhost:5000`

### 2. Frontend (React)

```sh
cd frontend
npm install
npm start
```
- Akses aplikasi di `http://localhost:3000`

---

## Dependensi

- **Backend**: Flask, flask-cors, pandas, snscrape (opsional jika ingin crawling langsung dari Twitter)
- **Frontend**: React, react-router-dom, react-icons, @testing-library, dll.

---

## Penjelasan File Penting

- [`backend/app.py`](backend/app.py): API utama untuk crawling, preprocessing, dan klasifikasi.
- [`backend/model.py`](backend/model.py): Fungsi preprocessing dan model Naive Bayes sederhana.
- [`backend/data_tweet.csv`](backend/data_tweet.csv): Dataset tweet hasil crawling.
- [`frontend/src/App.js`](frontend/src/App.js): Routing dan layout utama aplikasi.
- [`frontend/src/CrawlingPage.js`](frontend/src/CrawlingPage.js): Halaman crawling data.
- [`frontend/src/PreprocessingPage.js`](frontend/src/PreprocessingPage.js): Halaman preprocessing.
- [`frontend/src/EkstraksiFiturPage.js`](frontend/src/EkstraksiFiturPage.js): Halaman ekstraksi fitur.
- [`frontend/src/KlasifikasiPage.js`](frontend/src/KlasifikasiPage.js): Halaman klasifikasi sentimen.
- [`frontend/src/PilihSentimenPage.js`](frontend/src/PilihSentimenPage.js): Halaman menampilkan tweet dengan probabilitas sentimen tertinggi.

---

## Catatan

- Model Naive Bayes pada backend masih sederhana dan hanya contoh, bisa dikembangkan dengan dataset lebih besar.
- Untuk crawling langsung dari Twitter, bisa gunakan snscrape dan modifikasi backend.
- Pastikan backend dan frontend berjalan bersamaan.

---

