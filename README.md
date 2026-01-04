# 🚀 Proyek P10: Simulasi Keamanan API Key & OAuth 2.0 (JWT)

## 📌 Deskripsi Proyek

Proyek ini mengimplementasikan backend API menggunakan **Node.js**,
**Express.js**, dan **MongoDB** untuk mensimulasikan dua mekanisme
keamanan API:

### 🔐 1. API Key --- Akses Publik (Read-Only)

Digunakan untuk endpoint publik yang hanya memberikan akses membaca
tanpa otentikasi penuh.

### 🔑 2. JSON Web Tokens (JWT) --- Simulasi OAuth 2.0 (Token Grant)

Digunakan untuk endpoint privat yang membutuhkan **login**, **token**,
dan **role-based authorization** (admin vs user).

Proyek ini bertujuan mempraktikkan penggunaan **middleware berlapis**
untuk: - Validasi API Key\
- Verifikasi JWT\
- Pemeriksaan role (admin/user)

------------------------------------------------------------------------

## ⚙️ Persiapan dan Instalasi

### 🔧 Prasyarat

Pastikan telah menginstal: - Node.js (LTS) - npm - MongoDB Atlas -
Postman / Insomnia

------------------------------------------------------------------------

## 1. Kloning Repositori & Instalasi Dependencies

``` bash
cd p10-oauth2-api-key-230104040126
npm install
```

------------------------------------------------------------------------

## 2. Konfigurasi Environment (.env)

``` toml
PORT=3000
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
JWT_SECRET=rahasia-super-aman-simulasi-jwt-praktikum-wse
```

------------------------------------------------------------------------

## 3. Seeding Data Awal

``` bash
node seeders/seed.js
```

------------------------------------------------------------------------

## 4. Menjalankan Server

``` bash
npm start
```

------------------------------------------------------------------------

# 🧭 Panduan Pengujian Endpoint (Postman)

## A. Login (Token Grant)

| No | Metode | URL                 | Body                                               | User  | Hasil        |
|----|--------|---------------------|----------------------------------------------------|-------|--------------|
| 1  | POST   | /api/v1/auth/token  | {"username":"admin","password":"password123"}     | Admin | TOKEN ADMIN  |
| 2  | POST   | /api/v1/auth/token  | {"username":"userbiasa","password":"userpass"}    | User  | TOKEN USER   |

---

## B. Endpoint Publik (API Key)

Endpoint: `GET /api/v1/products/public`

| Skenario | API Key                          | Hasil |
|----------|----------------------------------|--------|
| Valid    | PRACTICUM_API_KEY_A_1234567890   | 200    |
| No Key   | -                                | 401    |
| Invalid  | KEY_SALAH_12345                  | 401    |

---

## C. Endpoint Privat (CRUD - JWT)

### Admin:
- CREATE: POST → 201  
- UPDATE: PUT → 200  
- DELETE: DELETE → 200  

### User Biasa:
- Semua operasi → **403 Forbidden**

---
------------------------------------------

# 🗂️ Struktur Proyek

    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── seeders/
    ├── utils/
    ├── .env
    ├── package.json
    └── server.js
