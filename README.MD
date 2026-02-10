# 📇 Contacts Management API

Node.js, Express ve MongoDB kullanılarak geliştirilmiş tam özellikli bir kişi yönetim sistemi. Kimlik doğrulama, şifre sıfırlama ve görsel yükleme özellikleri içerir.

## 🚀 Özellikler

- ✅ **Kullanıcı Yönetimi**: Kayıt, giriş ve oturum yönetimi
- 🔐 **Güvenli Kimlik Doğrulama**: JWT token tabanlı kimlik doğrulama sistemi
- 📧 **Şifre Sıfırlama**: E-posta ile güvenli şifre sıfırlama
- 🖼️ **Görsel Yükleme**: Cloudinary entegrasyonu ile kişi fotoğrafı yükleme
- 🔍 **Gelişmiş Filtreleme**: Sayfalama, sıralama ve filtreleme desteği
- 🛡️ **Hata Yönetimi**: Kapsamlı hata işleme ve validasyon

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM

### Güvenlik & Kimlik Doğrulama
- **bcrypt** - Şifre hashleme
- **jsonwebtoken** - JWT token oluşturma
- **cookie-parser** - Cookie yönetimi

### Dış Servisler
- **Brevo (SMTP)** - E-posta gönderimi
- **Cloudinary** - Görsel depolama ve yönetimi

### Validasyon & Middleware
- **Joi** - Şema validasyonu
- **http-errors** - HTTP hata oluşturma
- **multer** - Multipart form data işleme

### Diğer
- **pino-http** - HTTP loglama
- **cors** - Cross-origin resource sharing
- **dotenv** - Ortam değişkenleri yönetimi

## 📁 Proje Yapısı
```
src/
├── controllers/        # İstek işleyiciler
│   ├── auth.js
│   └── contacts.js
├── db/                # Veritabanı yapılandırması
│   ├── models/        # Mongoose modelleri
│   │   ├── contact.js
│   │   ├── session.js
│   │   └── user.js
│   └── initMongoConnection.js
├── middlewares/       # Express middleware'ler
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── isValidId.js
│   ├── notFoundHandler.js
│   ├── upload.js
│   └── validateBody.js
├── routers/           # API rotaları
│   ├── auth.js
│   └── contacts.js
├── services/          # İş mantığı katmanı
│   ├── auth.js
│   └── contacts.js
├── utils/             # Yardımcı fonksiyonlar
│   ├── calculatePaginationData.js
│   ├── cloudinary.js
│   ├── ctrlWrapper.js
│   ├── env.js
│   ├── parseFilterParams.js
│   ├── parsePaginationParams.js
│   ├── parseSortParams.js
│   └── sendMail.js
├── index.js           # Uygulama başlangıç noktası
└── server.js          # Express sunucu yapılandırması
```

## 🔧 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB hesabı (MongoDB Atlas)
- Brevo hesabı (E-posta servisi)
- Cloudinary hesabı (Görsel depolama)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/Emre-Urun/nodejs-hw-mongodb.git
cd contacts-api
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**

`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```env
# Sunucu Ayarları
PORT=3000

# MongoDB Ayarları
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=your_database_name

# JWT Ayarları
JWT_SECRET=your_secret_key_here

# Brevo SMTP Ayarları
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_login
SMTP_PASSWORD=your_brevo_password
SMTP_FROM=your_verified_email@example.com

# Cloudinary Ayarları
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend Ayarları
APP_DOMAIN=http://localhost:3000
```

4. **Uygulamayı başlatın**

Geliştirme modu:
```bash
npm run dev
```

Üretim modu:
```bash
npm start
```

## 📚 API Endpoints

### Kimlik Doğrulama

#### Kullanıcı Kaydı
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Kullanıcı Girişi
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Oturum Yenileme
```http
POST /auth/refresh
Cookie: refreshToken=xxx; sessionId=xxx
```

#### Şifre Sıfırlama İsteği
```http
POST /auth/send-reset-email
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Şifre Sıfırlama
```http
POST /auth/reset-pwd
Content-Type: application/json

{
  "token": "jwt_token_here",
  "password": "newpassword123"
}
```

#### Çıkış
```http
POST /auth/logout
Cookie: sessionId=xxx
```

### Kişiler

Tüm kişi endpoint'leri kimlik doğrulama gerektirir:
```
Authorization: Bearer <access_token>
```

#### Tüm Kişileri Listele
```http
GET /contacts?page=1&perPage=10&sortBy=name&sortOrder=asc&type=work&isFavourite=true
```

#### Kişi Detayı
```http
GET /contacts/:contactId
```

#### Yeni Kişi Oluştur
```http
POST /contacts
Content-Type: multipart/form-data

name: John Doe
phoneNumber: +905551234567
email: john@example.com
isFavourite: false
contactType: personal
photo: [file]
```

#### Kişi Güncelle
```http
PATCH /contacts/:contactId
Content-Type: multipart/form-data

name: Jane Doe
photo: [file]
```

#### Kişi Sil
```http
DELETE /contacts/:contactId
```

## 📊 Veri Modelleri

### User (Kullanıcı)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact (Kişi)
```javascript
{
  name: String,
  phoneNumber: String,
  email: String (optional),
  isFavourite: Boolean,
  contactType: ['work', 'home', 'personal'],
  photo: String (URL),
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Session (Oturum)
```javascript
{
  userId: ObjectId,
  accessToken: String,
  refreshToken: String,
  accessTokenValidUntil: Date,
  refreshTokenValidUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Güvenlik

- Şifreler bcrypt ile hashlenmiş olarak saklanır
- JWT token tabanlı kimlik doğrulama
- Access token geçerlilik süresi: 15 dakika
- Refresh token geçerlilik süresi: 30 gün
- HTTP-only cookie kullanımı
- CORS koruması
- Input validasyonu (Joi)

## 🌐 Deployment

Proje Render.com üzerinde deploy edilmiştir.

### Deployment Adımları

1. Render.com hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Web Service oluşturun
4. Environment variables ekleyin
5. Deploy edin

## 🧪 Test
```bash
# Test komutları eklenecek
npm test
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👤 Geliştirici

**İsminiz**
- GitHub: [@Emre-Urun]
- Email: emrern268@gmail.com

## 🙏 Teşekkürler

Bu proje GoIT Node.js Fullstack Developer kursu kapsamında geliştirilmiştir.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
