# Dokumentasi API - Mini Project Express.js

## Base URL
```
http://localhost:5000
```

## Daftar Endpoint

### User Authentication

#### 1. Register User Baru
- **Endpoint:** `POST /users/register`
- **Deskripsi:** Mendaftarkan user baru ke sistem
- **Header:** `Content-Type: application/json`
- **Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6 chars)"
}
```

- **Response Success:**
```json
{
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "userId": 1
  }
}
```

- **Response Error:**
```json
{
  "status": 400,
  "message": "Username or email already exists"
}
```

#### 2. Login User
- **Endpoint:** `POST /users/login`
- **Deskripsi:** Login user dan mendapatkan JWT token
- **Header:** `Content-Type: application/json`
- **Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

- **Response Success:**
```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "JWT token",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

- **Response Error:**
```json
{
  "status": 401,
  "message": "Invalid credentials"
}
```

### Produk Management (Memerlukan JWT Token)

#### 3. Mendapatkan Semua Produk
- **Endpoint:** `GET /products`
- **Deskripsi:** Mendapatkan semua produk yang aktif
- **Header:** `Authorization: Bearer <token>`
- **Response Success:**
```json
{
  "status": 200,
  "message": "Products retrieved successfully",
  "data": [
    {
      "product_id": 1,
      "product_code": "ELEC001",
      "product_name": "Smartphone X",
      "description": "Latest smartphone with advanced features",
      "category": "Electronics",
      "price": "599.99",
      "stock_quantity": 50,
      "weight": 0.2,
      "release_date": "2023-01-15T00:00:00.000Z",
      "is_active": 1,
      "created_at": "2023-12-01T00:00:00.000Z",
      "updated_at": "2023-12-01T00:00:00.000Z"
    }
  ]
}
```

#### 4. Mendapatkan Produk Berdasarkan ID
- **Endpoint:** `GET /products/:id`
- **Deskripsi:** Mendapatkan produk berdasarkan ID
- **Header:** `Authorization: Bearer <token>`
- **Params:** `id` (required)
- **Response Success:**
```json
{
  "status": 200,
  "message": "Product retrieved successfully",
  "data": {
    "product_id": 1,
    "product_code": "ELEC001",
    "product_name": "Smartphone X",
    "description": "Latest smartphone with advanced features",
    "category": "Electronics",
    "price": "599.99",
    "stock_quantity": 50,
    "weight": 0.2,
    "release_date": "2023-01-15T00:00:00.000Z",
    "is_active": 1,
    "created_at": "2023-12-01T00:00:00.000Z",
    "updated_at": "2023-12-01T00:00:00.000Z"
  }
}
```

- **Response Error:**
```json
{
  "status": 404,
  "message": "Product not found"
}
```

#### 5. Menambahkan Produk Baru
- **Endpoint:** `POST /products`
- **Deskripsi:** Menambahkan produk baru
- **Header:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "product_code": "string (required, unique)",
  "product_name": "string (required)",
  "description": "string (optional)",
  "category": "string (enum: Electronics, Food, Clothing, Other)",
  "price": "number (required)",
  "stock_quantity": "number (optional)",
  "weight": "number (optional)",
  "release_date": "string (date format: YYYY-MM-DD, optional)",
  "is_active": "number (1 or 0, optional, default: 1)"
}
```

- **Response Success:**
```json
{
  "status": 201,
  "message": "Product created successfully",
  "data": {
    "product": {
      "product_id": 6,
      "product_code": "NEW001",
      "product_name": "New Product",
      "description": null,
      "category": "Other",
      "price": "29.99",
      "stock_quantity": 10,
      "weight": 0.5,
      "release_date": "2023-12-01T00:00:00.000Z",
      "is_active": 1,
      "created_at": "2023-12-01T00:00:00.000Z",
      "updated_at": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

#### 6. Mengupdate Produk
- **Endpoint:** `PUT /products/:id`
- **Deskripsi:** Mengupdate informasi produk
- **Header:** `Authorization: Bearer <token>`
- **Params:** `id` (required)
- **Body:** (semua field opsional)
```json
{
  "product_code": "string",
  "product_name": "string",
  "description": "string",
  "category": "string",
  "price": "number",
  "stock_quantity": "number",
  "weight": "number",
  "release_date": "string (YYYY-MM-DD)",
  "is_active": "number (1 or 0)"
}
```

- **Response Success:**
```json
{
  "status": 200,
  "message": "Product updated successfully",
  "data": {
    "product": {
      "product_id": 1,
      "product_code": "ELEC001",
      "product_name": "Updated Smartphone X",
      "description": "Updated description",
      "category": "Electronics",
      "price": "599.99",
      "stock_quantity": 50,
      "weight": 0.2,
      "release_date": "2023-01-15T00:00:00.000Z",
      "is_active": 1,
      "created_at": "2023-12-01T00:00:00.000Z",
      "updated_at": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

#### 7. Menghapus Produk (Soft Delete)
- **Endpoint:** `DELETE /products/:id`
- **Deskripsi:** Menghapus produk (soft delete dengan mengubah is_active menjadi 0)
- **Header:** `Authorization: Bearer <token>`
- **Params:** `id` (required)
- **Response Success:**
```json
{
  "status": 200,
  "message": "Product deleted successfully"
}
```

- **Response Error:**
```json
{
  "status": 404,
  "message": "Product not found"
}
```

## Cara Menggunakan di Postman

### 1. Setup Collection
- Buat collection baru bernama "Mini Project API"
- Set base URL di collection: `http://localhost:5000`

### 2. Setup Environment
- Buat environment baru bernama "Local Development"
- Tambahkan variable `base_url` = `http://localhost:5000`
- Tambahkan variable `jwt_token` yang akan diisi setelah login

### 3. Setup Request

#### Register User
- Method: `POST`
- URL: `{{base_url}}/users/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON): 
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login User
- Method: `POST`
- URL: `{{base_url}}/users/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- Di tab Tests, tambahkan script untuk menyimpan token:
```javascript
var responseJson = pm.response.json();
if(responseJson.data && responseJson.data.token) {
    pm.environment.set("jwt_token", responseJson.data.token);
}
```

#### Request dengan Autentikasi
- Untuk semua request produk, tambahkan header:
  - `Authorization: Bearer {{jwt_token}}`

### 4. Testing Flow
1. Register user baru (opsional)
2. Login untuk mendapatkan token
3. Gunakan token untuk request produk

## Response Format Umum

Semua response mengikuti format:
```json
{
  "status": "HTTP status code",
  "message": "pesan deskriptif",
  "data": "data yang dikembalikan (opsional)"
}
```

## Error Handling
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error