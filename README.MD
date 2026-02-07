# 📇 Contact Management API

Modern kimlik doğrulama ve yetkilendirme sistemine sahip, güvenli bir kişi yönetim API'si. Bu proje, kullanıcıların kendi kişi listelerini oluşturmalarına, yönetmelerine ve güvenli bir şekilde erişmelerine olanak tanır.

## ✨ Özellikler

- 🔐 **Güvenli Kimlik Doğrulama**: JWT tabanlı access ve refresh token sistemi
- 👤 **Kullanıcı Yönetimi**: Kayıt olma, giriş yapma ve oturum yönetimi
- 📱 **Kişi Yönetimi**: CRUD işlemleriyle tam kişi kontrolü
- 🔒 **Veri Gizliliği**: Her kullanıcı sadece kendi kişilerine erişebilir
- 🔍 **Gelişmiş Filtreleme**: Kişi tipi, favori durumu ve isme göre filtreleme
- 📄 **Sayfalama ve Sıralama**: Büyük veri setleri için optimize edilmiş listeleme
- ✅ **Veri Doğrulama**: Joi ile kapsamlı input validasyonu
- 🍪 **Cookie Tabanlı Oturum**: Güvenli refresh token yönetimi

## 🛠️ Teknolojiler

- **Runtime**: Node.js
- **Framework**: Express.js
- **Veritabanı**: MongoDB (Mongoose ODM)
- **Kimlik Doğrulama**: JWT (jsonwebtoken)
- **Şifreleme**: bcrypt
- **Validasyon**: Joi
- **Loglama**: Pino
- **HTTP İstekleri**: CORS destekli
- **Deployment**: Render.com

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB hesabı (Atlas önerilir)
- npm veya yarn

## 🚀 Kurulum

### 1. Projeyi klonlayın
```bash
git clone https://github.com/kullaniciadi/contact-management-api.git
cd contact-management-api
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
```

### 3. Çevre değişkenlerini ayarlayın

Proje kök dizininde `.env` dosyası oluşturun:
```env
# MongoDB Bağlantı Bilgileri
MONGODB_USER=kullanici_adiniz
MONGODB_PASSWORD=sifreniz
MONGODB_URL=cluster.mongodb.net
MONGODB_DB=veritabani_adi

# Sunucu Ayarları
PORT=3000

# JWT Secret (Güçlü bir secret key kullanın)
JWT_SECRET=super_guclu_secret_key_buraya
```

### 4. Uygulamayı başlatın

**Geliştirme ortamı:**
```bash
npm run dev
```

**Production ortamı:**
```bash
npm start
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## 📚 API Endpoints

### 🔓 Kimlik Doğrulama Endpoints

#### Kayıt Ol
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "password": "guvenli123"
}
```

**Başarılı Yanıt (201):**
```json
{
  "status": 201,
  "message": "Successfully registered a user!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "createdAt": "2024-02-07T10:00:00.000Z"
  }
}
```

#### Giriş Yap
```http
POST /auth/login
Content-Type: application/json

{
  "email": "ahmet@example.com",
  "password": "guvenli123"
}
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully logged in an user!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
*Not: Refresh token otomatik olarak cookie'ye kaydedilir.*

#### Oturumu Yenile
```http
POST /auth/refresh
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully refreshed a session!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Çıkış Yap
```http
POST /auth/logout
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Başarılı Yanıt (204):** *No Content*

---

### 📇 Kişi Yönetimi Endpoints

*Tüm kişi endpoints'leri kimlik doğrulama gerektirir. Authorization header'ında Bearer token gönderilmelidir.*

#### Tüm Kişileri Listele
```http
GET /contacts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parametreleri:**
- `page` (varsayılan: 1) - Sayfa numarası
- `perPage` (varsayılan: 10) - Sayfa başına kayıt
- `sortBy` (varsayılan: _id) - Sıralama alanı (_id, name, createdAt, updatedAt)
- `sortOrder` (varsayılan: asc) - Sıralama yönü (asc, desc)
- `type` - Kişi tipi filtresi (work, home, personal)
- `isFavourite` - Favori durumu (true, false)
- `name` - İsim araması

**Örnek İstek:**
```http
GET /contacts?page=1&perPage=5&sortBy=name&sortOrder=asc&type=work&isFavourite=true
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": {
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Mehmet Demir",
        "phoneNumber": "+905551234567",
        "email": "mehmet@work.com",
        "isFavourite": true,
        "contactType": "work",
        "userId": "507f191e810c19729de860ea",
        "createdAt": "2024-02-07T10:00:00.000Z",
        "updatedAt": "2024-02-07T10:00:00.000Z"
      }
    ],
    "page": 1,
    "perPage": 5,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### ID'ye Göre Kişi Getir
```http
GET /contacts/:contactId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully found contact with id: 507f1f77bcf86cd799439011!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Mehmet Demir",
    "phoneNumber": "+905551234567",
    "email": "mehmet@work.com",
    "isFavourite": true,
    "contactType": "work",
    "userId": "507f191e810c19729de860ea",
    "createdAt": "2024-02-07T10:00:00.000Z",
    "updatedAt": "2024-02-07T10:00:00.000Z"
  }
}
```

#### Yeni Kişi Oluştur
```http
POST /contacts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Ayşe Kaya",
  "phoneNumber": "+905559876543",
  "email": "ayse@example.com",
  "isFavourite": false,
  "contactType": "personal"
}
```

**Başarılı Yanıt (201):**
```json
{
  "status": 201,
  "message": "Successfully created a contact!",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ayşe Kaya",
    "phoneNumber": "+905559876543",
    "email": "ayse@example.com",
    "isFavourite": false,
    "contactType": "personal",
    "userId": "507f191e810c19729de860ea",
    "createdAt": "2024-02-07T11:00:00.000Z",
    "updatedAt": "2024-02-07T11:00:00.000Z"
  }
}
```

#### Kişiyi Güncelle
```http
PATCH /contacts/:contactId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Ayşe Kaya Yılmaz",
  "isFavourite": true
}
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully patched a contact!",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ayşe Kaya Yılmaz",
    "phoneNumber": "+905559876543",
    "email": "ayse@example.com",
    "isFavourite": true,
    "contactType": "personal",
    "userId": "507f191e810c19729de860ea",
    "createdAt": "2024-02-07T11:00:00.000Z",
    "updatedAt": "2024-02-07T12:00:00.000Z"
  }
}
```

#### Kişiyi Sil
```http
DELETE /contacts/:contactId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Başarılı Yanıt (204):** *No Content*

## 🔒 Güvenlik

### Kimlik Doğrulama Akışı

1. **Kayıt**: Kullanıcı `/auth/register` endpoint'ine kayıt olur, şifre bcrypt ile hashlenir
2. **Giriş**: Kullanıcı `/auth/login` ile giriş yapar
   - Access Token (15 dakika geçerli) response body'de döner
   - Refresh Token (30 gün geçerli) HTTP-only cookie olarak ayarlanır
3. **API İstekleri**: Her korumalı endpoint isteği `Authorization: Bearer <accessToken>` header'ı gerektirir
4. **Token Yenileme**: Access token süresi dolduğunda, `/auth/refresh` ile yeni token alınır
5. **Çıkış**: `/auth/logout` ile oturum sonlandırılır ve refresh token geçersiz kılınır

### Veri Gizliliği

- Her kullanıcı sadece kendi kişilerine erişebilir
- Tüm kişi işlemleri `userId` ile filtrelenir
- Şifreler hiçbir zaman plain text olarak saklanmaz veya döndürülmez

## 📁 Proje Yapısı
```
contact-management-api/
├── src/
│   ├── controllers/
│   │   ├── auth.js          # Kimlik doğrulama kontrolörleri
│   │   └── contacts.js      # Kişi kontrolörleri
│   ├── db/
│   │   ├── model/
│   │   │   ├── contact.js   # Contact modeli ve validasyonları
│   │   │   ├── user.js      # User modeli ve validasyonları
│   │   │   └── session.js   # Session modeli
│   │   └── initMongoConnection.js
│   ├── middlewares/
│   │   ├── authenticate.js  # JWT doğrulama middleware
│   │   ├── errorHandler.js
│   │   ├── isValidId.js
│   │   ├── notFoundHandler.js
│   │   └── validateBody.js
│   ├── routers/
│   │   ├── auth.js          # Kimlik doğrulama rotaları
│   │   └── contacts.js      # Kişi rotaları
│   ├── services/
│   │   ├── auth.js          # Kimlik doğrulama servisleri
│   │   └── contacts.js      # Kişi servisleri
│   ├── utils/
│   │   ├── calculatePaginationData.js
│   │   ├── ctrlWrapper.js
│   │   ├── env.js
│   │   ├── parseFilterParams.js
│   │   ├── parsePaginationParams.js
│   │   └── parseSortParams.js
│   ├── index.js             # Uygulama giriş noktası
│   └── server.js            # Express server yapılandırması
├── .env                      # Çevre değişkenleri (git'e eklenmez)
├── .gitignore
├── package.json
└── README.md
```

## ⚠️ Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | İstek başarılı |
| 201 | Kaynak oluşturuldu |
| 204 | Başarılı, içerik yok |
| 400 | Hatalı istek (validasyon hatası) |
| 401 | Yetkisiz (kimlik doğrulama gerekli veya başarısız) |
| 404 | Kaynak bulunamadı |
| 409 | Çakışma (örn: email zaten kullanımda) |
| 500 | Sunucu hatası |

## 🧪 Test Etme

Postman veya Thunder Client kullanarak API'yi test edebilirsiniz:

1. Önce `/auth/register` ile kullanıcı oluşturun
2. `/auth/login` ile giriş yapın ve access token'ı alın
3. Access token'ı diğer isteklerde `Authorization: Bearer <token>` olarak kullanın
4. Token süresi dolduğunda `/auth/refresh` ile yenileyin

## 🌐 Deployment

Proje Render.com üzerinde deploy edilmiştir. Deploy etmek için:

1. Render.com hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Web Service oluşturun
4. Environment variables'ları ekleyin
5. Deploy edin

**Önemli**: `.env` dosyasındaki tüm değişkenleri Render'da tanımlamayı unutmayın!

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun


## 📧 İletişim

Proje Sahibi - [@Emre-Urun](https://github.com/Emre-Urun)

Proje Linki: https://github.com/Emre-Urun/nodejs-hw-mongodb.git

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
