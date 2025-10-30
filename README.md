🧩 Mini Project — Express.js CRUD with JWT Authentication
📘 Deskripsi Proyek

Mini project ini adalah aplikasi RESTful API berbasis Node.js (Express.js) dengan struktur MVC dan ORM Sequelize.
Proyek ini memiliki dua entitas utama:

Users — digunakan untuk register dan login menggunakan JWT (JSON Web Token).

Products — menyediakan fitur CRUD (Create, Read, Update, Delete) untuk data produk.

Proyek ini cocok digunakan sebagai dasar untuk pengembangan aplikasi berbasis autentikasi token dengan manajemen data produk.

⚙️ Teknologi yang Digunakan

Node.js & Express.js — Backend framework

Sequelize ORM — Manajemen database MySQL

MySQL / MariaDB — Database

JWT (jsonwebtoken) — Autentikasi berbasis token

bcryptjs — Enkripsi password

dotenv — Konfigurasi environment variable

🗂 Struktur Folder (MVC)
├── config/
│   └── config.json           # Konfigurasi database Sequelize
├── controllers/
│   ├── userController.js     # Register dan Login
│   └── productController.js  # CRUD Produk
├── models/
│   ├── index.js              # Inisialisasi Sequelize
│   ├── user.js               # Model User
│   └── product.js            # Model Product
├── routes/
│   ├── userRoutes.js         # Endpoint /users
│   └── productRoutes.js      # Endpoint /products
├── middlewares/
│   └── authMiddleware.js     # Middleware verifikasi JWT
├── .env                      # Konfigurasi environment (DB, JWT_SECRET, dll)
├── server.js                 # Entry point utama
└── README.md

🧱 Struktur Database
Tabel users
Kolom	Tipe Data	Keterangan
user_id	INT (PK, AI)	Primary Key
username	VARCHAR(50)	Unik, wajib diisi
email	VARCHAR(100)	Unik, wajib diisi
password	VARCHAR(255)	Disimpan dalam bentuk hash
role	ENUM('admin','user')	Default: user
created_at	TIMESTAMP	Otomatis diisi
updated_at	TIMESTAMP	Otomatis diupdate
Tabel product
Kolom	Tipe Data	Keterangan
product_id	INT (PK, AI)	Primary Key
product_code	VARCHAR(20)	Kode produk unik
product_name	VARCHAR(100)	Nama produk
description	TEXT, NULLABLE	Deskripsi produk
category	ENUM('Electronics','Food','Clothing','Other')	Kategori
price	DECIMAL(10,2)	Harga
stock_quantity	SMALLINT(8), NULLABLE	Jumlah stok
weight	FLOAT, NULLABLE	Berat produk
release_date	DATE, NULLABLE	Tanggal rilis
is_active	TINYINT(1), NULLABLE	Status aktif
created_at	TIMESTAMP	Waktu dibuat
updated_at	TIMESTAMP	Waktu diperbarui
🔑 Fitur Utama
🔐 Autentikasi User

Register (POST /users/register)

Login (POST /users/login)

Mendapatkan token JWT untuk akses endpoint lain

📦 Manajemen Produk (CRUD)

GET /products → Menampilkan semua produk

GET /products/:id → Menampilkan detail produk

POST /products → Menambahkan produk baru (Hanya user dengan token valid)

PUT /products/:id → Mengupdate data produk

DELETE /products/:id → Menghapus produk

 Migration & Seeder

Migrasi tersedia untuk membuat struktur tabel di database:
- Tabel users: untuk menyimpan data pengguna
- Tabel products: untuk menyimpan data produk

Seeder tersedia untuk mengisi data awal ke database:
- User admin: username "admin", password "admin123", role "admin"
- Contoh produk dalam berbagai kategori

Untuk menjalankan migrasi: npm run migrate
Untuk menjalankan seeder: npm run seed

 Menjalankan Aplikasi

- Development: npm run dev (menggunakan nodemon untuk auto-reload)
- Production: npm start
- Port default: 5000

 Dokumentasi API

Lengkapnya dokumentasi API dan cara penggunaan di Postman dapat ditemukan di file:
- API_Documentation.md