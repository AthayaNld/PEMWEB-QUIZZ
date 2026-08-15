# Quiz Cerdas SMA

Website quiz statis (HTML, CSS, JavaScript murni — tanpa framework/build step) untuk latihan soal siswa SMA.

## Struktur folder
```
quiz-sma/
├── index.html        # Beranda: hero, fitur, kartu pilihan mata pelajaran, tabel jadwal
├── materi.html        # Panduan pengerjaan, contoh video & audio, tabel jadwal ujian
├── quiz.html           # Halaman quiz (lembar jawaban bulatan / LJK, timer, penilaian otomatis)
├── kontak.html         # Formulir kontak + tabel tim pengembang
├── css/style.css       # Custom CSS (tema "lembar jawaban ujian")
├── js/quiz-data.js     # Bank soal per mata pelajaran
├── js/script.js        # Logika navbar, mesin quiz, validasi form
├── assets/*.svg         # Ilustrasi (hero, ikon, gambar meja belajar)
└── vercel.json          # Konfigurasi Vercel (static site)
```

Tidak ada dependency, package.json, atau proses build — semua file langsung bisa dibuka di browser (`index.html`) atau di-deploy apa adanya.

---

## Cara Deploy ke Vercel (akun Vercel sudah ada)

Ada dua cara: **lewat website Vercel (drag & drop)** atau **lewat Vercel CLI**. Pilih salah satu.

### Opsi A — Lewat Dashboard Vercel (paling mudah, tanpa terminal)
1. Buka https://vercel.com/new dan login ke akunmu.
2. Pada bagian **"Import Project"**, pilih tab **Deploy without Git** / seret folder (drag & drop) — unggah seluruh folder `quiz-sma` (atau file ZIP-nya lalu extract dulu di komputer sebelum upload, tergantung opsi yang muncul di dashboard-mu).
3. Vercel akan mendeteksi ini sebagai **static site** (tidak perlu Build Command atau Output Directory khusus — biarkan default/kosong).
4. Klik **Deploy**. Tunggu beberapa detik, lalu Vercel memberi URL publik seperti `https://quiz-cerdas-sma.vercel.app`.

> Jika folder di-zip terlebih dahulu, pastikan `index.html` berada tepat di root ZIP, bukan di dalam subfolder tambahan.

### Opsi B — Lewat Vercel CLI (direkomendasikan bila sudah punya folder ini di komputer)
1. Install Vercel CLI (sekali saja):
   ```bash
   npm install -g vercel
   ```
2. Masuk ke folder proyek:
   ```bash
   cd quiz-sma
   ```
3. Login (akan membuka browser untuk autentikasi):
   ```bash
   vercel login
   ```
4. Jalankan deploy pertama kali (mode interaktif akan bertanya nama project, dsb — jawab sesuai keinginan, atau tekan Enter untuk default):
   ```bash
   vercel
   ```
5. Setelah deploy preview berhasil dan sudah dicek hasilnya, deploy ke **production** dengan domain `*.vercel.app` resmi:
   ```bash
   vercel --prod
   ```
6. Untuk deploy ulang di kemudian hari (setelah mengedit file), cukup ulangi langkah 6 (`vercel --prod`) dari dalam folder proyek.

### Opsi C — Lewat GitHub (otomatis re-deploy tiap push)
1. Buat repository baru di GitHub, lalu push folder `quiz-sma` ke repo tersebut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Quiz Cerdas SMA"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Di dashboard Vercel, klik **Add New → Project**, lalu pilih **Import Git Repository** dan cari repo tersebut.
3. Biarkan **Framework Preset** = *Other* (situs statis biasa), **Build Command** dan **Output Directory** dikosongkan/default.
4. Klik **Deploy**. Setiap kali kamu `git push` lagi ke `main`, Vercel otomatis mem-build ulang dan mem-publish versi terbaru.

---

## Menambahkan Domain Sendiri (opsional)
Jika kamu punya domain sendiri (misalnya `quizsma.com`):
1. Buka project di dashboard Vercel → tab **Settings → Domains**.
2. Masukkan nama domainmu, lalu ikuti instruksi Vercel untuk mengarahkan **DNS** (biasanya menambahkan record `A` atau `CNAME`) di panel penyedia domainmu (Niagahoster, Domainesia, GoDaddy, dll).
3. Tunggu propagasi DNS (beberapa menit hingga beberapa jam), lalu domain akan otomatis terhubung dengan SSL (HTTPS) gratis dari Vercel.

---

## Menjalankan secara lokal (opsional, sebelum deploy)
Karena situs ini murni statis, kamu bisa langsung membuka `index.html` di browser. Atau jalankan server lokal sederhana agar path relatif (`css/`, `js/`, `assets/`) pasti termuat dengan benar:
```bash
cd quiz-sma
python3 -m http.server 8080
# lalu buka http://localhost:8080 di browser
```

## Komponen yang sudah ada di website ini
- **Heading** (`h1`–`h3`) di setiap halaman
- **Paragraph** & **text formatting** (`<strong>`, `<em>`, `<u>`, `<mark>`, `<code>`)
- **Image** (ilustrasi SVG custom di `assets/`)
- **Link** (navigasi antar halaman, tautan `mailto:`, tautan jangkar `#mapel`)
- **Table** (jadwal, tabel pembahasan hasil quiz, tabel tim)
- **List** (`<ul>`, `<ol>` bergaya langkah bernomor)
- **Form** (form quiz dengan `<input type="radio">` bergaya LJK, form kontak dengan validasi)
- **Video** (`<video>` dengan `controls`)
- **Audio** (`<audio>` dengan `controls`)
- **CSS** custom penuh (`css/style.css`) dengan tema "lembar jawaban ujian"
- **JavaScript**: toggle menu mobile, timer mundur, render soal dinamis, penilaian otomatis + pembahasan, validasi form kontak
