# Belajar Node.js - REST API untuk Pemula

---

Project ini adalah **kumpulan mini project** untuk belajar membuat REST API dari nol menggunakan **Node.js** dan **Express**.

**Target:** Cocok untuk yang baru pertama kali belajar backend / server-side.

---

## Guna nya Apa?

### 1. Belajar Dasar Backend

- Cara bikin web server di Node.js
- Routing (atur URL mana yang jalankan apa)
- HTTP Methods (GET, POST, PUT, DELETE)
- Request & Response

### 2. Belajar Manipulasi Data

- Simpan data di array (in-memory / di RAM)
- Simpan data di file JSON (persistent / tersimpan walau server mati)
- CRUD = Create, Read, Update, Delete

### 3. Basis untuk Project Lebih Besar

- Setelah paham ini, lanjut ke database (MongoDB, PostgreSQL)
- Lanjut ke authentication (login/logout)
- Lanjut ke deployment (hosting server)

---

## Inti yang Dipelajari (Core Concepts)

### 1. Apa itu Node.js?

Node.js adalah **runtime JavaScript yang bisa jalan di server**, bukan cuma di browser.

**Sebelum Node.js:**

- JavaScript cuma bisa jalan di browser (Chrome, Firefox)
- Backend pakai bahasa lain (PHP, Java, Python)

**Sesudah Node.js:**

- JavaScript bisa jalan di server
- Satu bahasa untuk frontend DAN backend
- Contoh penggunaan: REST API, real-time chat, streaming

### 2. Apa itu Express?

Express adalah **framework** yang mempermembuat web server di Node.js.

**Tanpa Express (vanilla Node.js):**

```javascript
const http = require("http");
const server = http.createServer((req, res) => {
  // Ribet, harus handle sendiri
});
```

**Dengan Express:**

```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.json({ hello: "world" }));
```

### 3. HTTP Methods (Metode Request)

| Method     | Fungsi               | Contoh Penggunaan                |
| ---------- | -------------------- | -------------------------------- |
| **GET**    | Ambil data           | Lihat daftar todo, lihat catatan |
| **POST**   | Kirim data baru      | Tambah todo baru, buat catatan   |
| **PUT**    | Update data yang ada | Edit todo, ubah isi catatan      |
| **DELETE** | Hapus data           | Hapus todo, hapus catatan        |

### 4. Routing (Mengatur URL)

Routing = **atur URL mana yang menjalankan fungsi apa**.

```javascript
// GET /todos → ambil semua todos
app.get('/todos', (req, res) => { ... });

// GET /todos/1 → ambil todo dengan id 1
app.get('/todos/:id', (req, res) => { ... });

// POST /todos → buat todo baru
app.post('/todos', (req, res) => { ... });
```

### 5. Request & Response

**Request (permintaan dari client):**

- `req.params` → data dari URL (contoh: `/todos/1` → id = 1)
- `req.query` → data dari URL parameter (contoh: `?search=belajar`)
- `req.body` → data yang dikirim dalam JSON

**Response (jawaban dari server):**

- `res.json()` → kirim data dalam format JSON
- `res.status(201)` → set status code (201 = created)
- `res.redirect()` → alihkan ke URL lain

### 6. Status Code

| Code    | Arti         | Kapan Dipakai              |
| ------- | ------------ | -------------------------- |
| **200** | OK           | Berhasil ambil/update data |
| **201** | Created      | Berhasil buat data baru    |
| **400** | Bad Request  | Input tidak valid          |
| **404** | Not Found    | Data tidak ditemukan       |
| **500** | Server Error | Error di server            |

### 7. Data Storage

**In-Memory (Array):**

- Data disimpan di RAM
- Cepat tapi hilang kalau server mati
- Contoh: `let todos = [];`

**File JSON:**

- Data disimpan di file
- Lambat tapi permanen
- Contoh: `notes.json`, `urls.json`
- Pakai module `fs` untuk baca/tulis file

### 8. Module System

Node.js pakai **CommonJS** untuk import module:

```javascript
// Import module
const express = require("express");
const fs = require("fs");
const path = require("path");

// Module built-in (sudah ada di Node.js):
// - fs → baca/tulis file
// - path → manipulasi path folder
// - crypto → generate random string
// - http → buat web server
```

---

## Simulasi Apa Saja?

### Simulasi 1: To-Do List API

> **Port 3001** | Data di array (hilang kalau server mati)

**Apa yang disimulasikan:**

- CRUD sederhana seperti aplikasi to-do pada umumnya
- Tambah todo baru
- Lihat semua todo
- Tandai todo selesai/belum
- Hapus todo

**Kapan pakai simulasi ini?**

- Belajar dasar CRUD
- Belajar POST/GET/PUT/DELETE
- Belajar validasi input

---

### Simulasi 2: Simple Notes App

> **Port 3002** | Data di file JSON (tersimpan permanen)

**Apa yang disimulasikan:**

- Aplikasi catatan sederhana
- Tambah catatan dengan judul, isi, dan kategori
- Cari catatan berdasarkan kata kunci
- Filter catatan berdasarkan kategori (umum, kerja, belajar, pribadi)
- Edit dan hapus catatan

**Kapan pakai simulasi ini?**

- Belajar baca/tulis file JSON
- Belajar query parameter (?search=xxx&category=xxx)
- Belajar search & filter data

---

### Simulasi 3: URL Shortener

> **Port 3003** | Data di file JSON

**Apa yang disimulasikan:**

- Layanan pemendek URL seperti bit.ly / t.co
- Input URL panjang → dapat URL pendek
- Redirect otomatis ke URL asli
- Hitung berapa kali URL diklik (statistik)
- Generate string random untuk short code

**Kapan pakai simulasi ini?**

- Belajar generate random string (crypto)
- Belajar redirect (302)
- Belajar menyimpan mapping data
- Belajar counter / statistik sederhana

---

## Teknologi yang Digunakan

| Teknologi                     | Kegunaan                                     |
| ----------------------------- | -------------------------------------------- |
| **Node.js**                   | Runtime JavaScript untuk menjalankan server  |
| **Express.js**                | Framework untuk membuat web server & routing |
| **fs (built-in Node.js)**     | Baca & tulis file JSON                       |
| **crypto (built-in Node.js)** | Generate string random                       |

> **Catatan:** Tidak perlu install database! Data disimpan di array dan file JSON.

---

## Cara Install & Jalankan

### Prasyarat

- [Node.js](https://nodejs.org/) minimal versi 18 terinstall
- Terminal / Command Prompt
- Browser (Chrome / Firefox / Edge)

### Install

```bash
# 1. Masuk ke folder project
cd BelajarNode-JS

# 2. Install dependencies
npm install
```

### Jalankan

**Semua server sekaligus:**

```bash
npm start
```

**Atau satu-satu:**

```bash
npm run todo       # To-Do List (port 3001)
npm run notes      # Notes App (port 3002)
npm run shortener  # URL Shortener (port 3003)
```

### Akses Frontend

Buka browser, lalu kunjungi:

| Project       | URL                   |
| ------------- | --------------------- |
| To-Do List    | http://localhost:3001 |
| Notes App     | http://localhost:3002 |
| URL Shortener | http://localhost:3003 |

> Tinggal pakai langsung dari browser, ga perlu install Postman!

**Tool Alternatif untuk Testing API:**

- [Postman](https://www.postman.com/) - Desktop app untuk test API
- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) - Extension VS Code
- [curl](https://curl.se/) - Sudah ada di terminal (Windows/Linux/Mac)

---

## Struktur Folder

```
BelajarNode-JS/
├── package.json
├── start.js                 # Jalankan semua server
├── Day1/
│   ├── todo-api/
│   │   ├── server.js        # Backend API
│   │   └── index.html       # Frontend (buka di browser)
│   ├── notes-api/
│   │   ├── server.js        # Backend API
│   │   ├── index.html       # Frontend
│   │   └── notes.json       # Database (otomatis dibuat)
│   └── url-shortener/
│       ├── server.js        # Backend API
│       ├── index.html       # Frontend
│       └── urls.json        # Database (otomatis dibuat)
```

---

## Alur Belajar yang Disarankan

```
1. Mulai dari To-Do List API
   → Pahami dasar CRUD, HTTP methods, routing

2. Lanjut ke Notes App API
   → Tambah fitur search, filter, file JSON

3. Terakhir URL Shortener
   → Tambah konsep redirect, random string, statistik
```

---

## Cara Memastikan Backend Berinteraksi

Setelah server jalan, ada beberapa cara test apakah backend sudah bekerja dengan benar:

### 1. Test dari Browser (Frontend)

Buka URL di atas, lalu lakukan operasi CRUD lewat form yang ada. Jika berhasil, data akan muncul di halaman.

### 2. Test dengan curl (Terminal)

**To-Do List API (Port 3001):**

```bash
# Ambil semua todos
curl http://localhost:3001/todos

# Tambah todo baru
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Belajar Node.js","description":"Hari pertama"}'

# Tandai todo selesai
curl -X PUT http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Hapus todo
curl -X DELETE http://localhost:3001/todos/1
```

**Notes API (Port 3002):**

```bash
# Ambil semua notes
curl http://localhost:3002/notes

# Tambah note baru
curl -X POST http://localhost:3002/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Catatan Pertama","content":"Isi catatan","category":"belajar"}'

# Cari note
curl "http://localhost:3002/notes?search=node"

# Filter by kategori
curl "http://localhost:3002/notes?category=belajar"
```

**URL Shortener (Port 3003):**

```bash
# Buat URL pendek
curl -X POST http://localhost:3003/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'

# Lihat semua shortened URLs
curl http://localhost:3003/urls

# Lihat statistik
curl http://localhost:3003/stats/{shortCode}
```

### 3. Cek Output yang Benar

Jika backend berinteraksi dengan benar, response akan selalu dalam format JSON:

```json
{
  "success": true,
  "data": { ... },
  "total": 0
}
```

**Tanda backend berhasil:**

- Response `success: true` → operasi berhasil
- Response status `201` → data baru berhasil dibuat
- Response status `400` → input tidak valid (validasi jalan)
- Response status `404` → data tidak ditemukan
- Data persist di file JSON (notes.json / urls.json) → data tersimpan permanen

**Tanda backend bermasalah:**

- Tidak ada response / connection refused → server belum jalan
- Response `success: false` → ada error di request
- Status code `500` → error di server

### 4. Cara Cek Data Tersimpan

Untuk Notes API dan URL Shortener, data disimpan di file JSON. Buka file-nya langsung:

```bash
# Cek data notes
cat Day1/notes-api/notes.json

# Cek data URLs
cat Day1/url-shortener/urls.json
```

Jika data muncul di file JSON, berarti backend sudah bekerja dan menyimpan data dengan benar.

---

## Referensi

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
