# 📇 Contact Management API

Modern ve güvenli bir **Rehber Yönetim Sistemi** REST API'si. Node.js, Express ve MongoDB ile geliştirilmiş, JWT tabanlı kimlik doğrulama, görsel yükleme ve kapsamlı API dokümantasyonuna sahip profesyonel bir backend projesi.

## ✨ Özellikler

- 🔐 **Güvenli Kimlik Doğrulama**: JWT token tabanlı authentication ve authorization
- 👤 **Kullanıcı Yönetimi**: Kayıt, giriş, çıkış ve şifre sıfırlama
- 📱 **Rehber İşlemleri**: CRUD operasyonları (Oluşturma, Okuma, Güncelleme, Silme)
- 🔍 **Gelişmiş Filtreleme**: İsme göre arama, favorilere göre filtreleme, kontak tipine göre ayırma
- 📄 **Sayfalama ve Sıralama**: Verimli veri yönetimi için pagination ve sorting
- 📸 **Görsel Yükleme**: Cloudinary entegrasyonu ile profil fotoğrafı desteği
- 📧 **Email Servisi**: Şifre sıfırlama için otomatik email gönderimi
- 📚 **API Dokümantasyonu**: Swagger/OpenAPI ile interaktif API dokümantasyonu
- 🛡️ **Hata Yönetimi**: Merkezi hata yakalama ve tutarlı yanıt formatı
- 🔒 **Güvenlik**: bcrypt ile şifre hashleme, HTTP-only cookie'ler

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM

### Güvenlik & Kimlik Doğrulama
- **bcrypt** - Şifre hashleme
- **jsonwebtoken** - JWT token yönetimi
- **cookie-parser** - Cookie işlemleri

### Dosya İşleme
- **Multer** - Dosya yükleme middleware
- **Cloudinary** - Cloud storage servisi

### Email
- **Nodemailer** - Email gönderimi
- **Handlebars** - Email template engine

### Dokümantasyon
- **Swagger/OpenAPI 3.1** - API spesifikasyonu
- **Redocly** - Dokümantasyon oluşturma
- **swagger-ui-express** - Swagger UI görüntüleme

### Validasyon & Loglama
- **Joi** - Veri validasyonu
- **pino-http** - HTTP request logging

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB hesabı (Atlas veya local)
- Cloudinary hesabı
- Gmail hesabı (SMTP için)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/Emre-Urun/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**

Proje kökünde `.env` dosyası oluşturun:

```env
# Server
PORT=3000

# MongoDB
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=your_database_name

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Gmail SMTP)
SMTP_USER=your_gmail_address
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM=your_gmail_address

# App
APP_DOMAIN=http://localhost:3000
```

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

5. **Swagger dokümantasyonunu oluşturun**
```bash
npm run build-docs
```

## 🚀 Kullanım

### API Endpoints

#### 🔐 Kimlik Doğrulama
```
POST   /auth/register        - Yeni kullanıcı kaydı
POST   /auth/login           - Kullanıcı girişi
POST   /auth/refresh         - Token yenileme
POST   /auth/logout          - Kullanıcı çıkışı
POST   /auth/send-reset-email - Şifre sıfırlama emaili
POST   /auth/reset-pwd       - Şifre sıfırlama
```

#### 📇 Rehber İşlemleri (Kimlik doğrulama gerekli)
```
GET    /contacts             - Tüm kontakları listele
GET    /contacts/:contactId  - Belirli bir kontağı getir
POST   /contacts             - Yeni kontak oluştur
PATCH  /contacts/:contactId  - Kontak güncelle
DELETE /contacts/:contactId  - Kontak sil
```

### Query Parametreleri (GET /contacts)

```
page=1              - Sayfa numarası (varsayılan: 1)
perPage=10          - Sayfa başına kayıt (varsayılan: 10)
sortBy=name         - Sıralama alanı (_id, name, createdAt, updatedAt)
sortOrder=asc       - Sıralama yönü (asc, desc)
type=work           - Kontak tipi filtresi (work, home, personal)
isFavourite=true    - Favori filtresi (true, false)
name=John           - İsme göre arama
```

### Örnek İstekler

#### Kullanıcı Kaydı
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Kullanıcı Girişi
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Kontak Oluşturma (Authentication gerekli)
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "phoneNumber": "+905551234567",
    "email": "jane@example.com",
    "contactType": "work",
    "isFavourite": true
  }'
```

#### Fotoğraf ile Kontak Oluşturma
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "name=Jane Smith" \
  -F "phoneNumber=+905551234567" \
  -F "email=jane@example.com" \
  -F "photo=@/path/to/photo.jpg"
```

## 📖 API Dokümantasyonu

API dokümantasyonuna erişim için:

### Yerel Geliştirme
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Preview Mode**: `npm run preview-docs`

### Canlı Dokümantasyon
- **Swagger UI**: `https://contacts-app-bdrd.onrender.com/api-docs/`

Swagger UI üzerinden tüm endpoint'leri test edebilir, request/response örneklerini görebilir ve interaktif olarak API'yi keşfedebilirsiniz.

## 📁 Proje Yapısı

```
├── docs/                       # Swagger/OpenAPI dokümantasyonu
│   ├── index.html             # Redocly HTML template
│   ├── openapi.yaml           # Ana OpenAPI spesifikasyonu
│   └── swagger.json           # Build edilmiş Swagger JSON
├── swagger/                    # Swagger bileşenleri
│   ├── components/            # Yeniden kullanılabilir bileşenler
│   │   ├── responses/         # API yanıt şemaları
│   │   └── schemas/           # Veri modeli şemaları
│   └── paths/                 # API endpoint dokümantasyonları
│       ├── auth/              # Kimlik doğrulama rotaları
│       └── contacts/          # Kontak rotaları
├── src/
│   ├── controllers/           # İstek işleyiciler
│   ├── db/                    # Veritabanı konfigürasyonu
│   │   └── model/            # Mongoose modelleri
│   ├── middlewares/           # Express middleware'ler
│   ├── routers/               # API rotaları
│   ├── services/              # İş mantığı katmanı
│   ├── templates/             # Email templates (Handlebars)
│   ├── utils/                 # Yardımcı fonksiyonlar
│   ├── constants/             # Sabit değerler
│   ├── index.js               # Uygulama giriş noktası
│   └── server.js              # Express server konfigürasyonu
├── temp/                       # Geçici dosya yükleme dizini
├── .env                        # Ortam değişkenleri
├── .gitignore
├── package.json
├── redocly.yaml               # Redocly konfigürasyonu
└── README.md
```

## 🔒 Güvenlik

- ✅ Şifreler bcrypt ile hashlenmiş olarak saklanır
- ✅ JWT token'lar ile stateless authentication
- ✅ HTTP-only cookie'ler ile XSS koruması
- ✅ Kullanıcılar sadece kendi verilerine erişebilir
- ✅ Request validasyonu (Joi ile)
- ✅ MongoDB injection koruması
- ✅ CORS politikaları

## 🌐 Deployment

### Render.com'da Yayınlama

1. **GitHub Repo Bağlantısı**: Render.com'da yeni bir Web Service oluşturun
2. **Build Command**: `npm install && npm run build-docs`
3. **Start Command**: `npm start`
4. **Environment Variables**: Tüm `.env` değişkenlerini ekleyin
5. **Branch**: `hw7-swagger` (veya main/master)

### Ortam Değişkenleri
Render.com dashboard'unda tüm environment variable'ları ekleyin:
- `APP_DOMAIN` değerini Render URL'iniz ile güncelleyin

## 📝 Geliştirme Komutları

```bash
# Geliştirme modunda çalıştır (nodemon)
npm run dev

# Production modunda çalıştır
npm start

# Swagger dokümantasyonunu oluştur
npm run build-docs

# Swagger dokümantasyonunu önizle
npm run preview-docs

# Tüm build işlemlerini çalıştır
npm run build
```

## 🧪 API Response Format

### Başarılı Yanıt
```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": {
    "data": [...],
    "page": 1,
    "perPage": 10,
    "totalItems": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Hata Yanıtı
```json
{
  "status": 404,
  "message": "Contact not found",
  "data": "Contact not found"
}
```

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 👨‍💻 Geliştirici

**[Emre Ürün]**
- GitHub: [@Emre-Urun](https://github.com/Emre-Urun)
- Email: emrern268@gmail.com

## 🙏 Teşekkürler

Bu proje, Node.js Fullstack Developer kursu kapsamında geliştirilmiştir.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
