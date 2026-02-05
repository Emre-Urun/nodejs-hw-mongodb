# 📇 Contacts API - Node.js Backend Uygulaması

Modern ve ölçeklenebilir bir kişi yönetim sistemi API'si. MongoDB, Express.js ve Node.js kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- ✅ **CRUD İşlemleri**: Kişi oluşturma, okuma, güncelleme ve silme
- 🔍 **Gelişmiş Filtreleme**: Kişi tipi ve favori durumuna göre filtreleme
- 📄 **Sayfalama (Pagination)**: Büyük veri setlerini verimli yönetme
- 🔀 **Sıralama**: İsme göre artan/azalan sıralama
- ✔️ **Veri Doğrulama**: Joi ile güçlü input validasyonu
- 🛡️ **Hata Yönetimi**: Merkezi hata yakalama ve işleme
- 📝 **Loglama**: Pino ile detaylı istek loglama
- 🌐 **CORS Desteği**: Cross-origin isteklere izin
- ☁️ **Cloud Ready**: Render.com üzerinde deploy edilebilir

## 🛠️ Teknolojiler

- **Runtime**: Node.js
- **Framework**: Express.js
- **Veritabanı**: MongoDB (Mongoose ODM)
- **Doğrulama**: Joi
- **Loglama**: Pino & Pino-HTTP
- **Hata Yönetimi**: http-errors
- **Diğer**: CORS, dotenv

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB Atlas hesabı veya yerel MongoDB kurulumu
- npm veya yarn paket yöneticisi

## 🔧 Kurulum

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

Proje kök dizininde `.env` dosyası oluşturun:

```env
PORT=3000
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_cluster_url
MONGODB_DB=contacts_db
```

4. **Uygulamayı başlatın**
```bash
# Geliştirme modu
npm run dev

# Üretim modu
npm start
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## 📚 API Dokümantasyonu

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Tüm Kişileri Getir
```http
GET /contacts
```

**Query Parametreleri:**
| Parametre | Tip | Varsayılan | Açıklama |
|-----------|-----|------------|----------|
| page | number | 1 | Sayfa numarası |
| perPage | number | 10 | Sayfa başına kayıt |
| sortBy | string | _id | Sıralama alanı (name, email vb.) |
| sortOrder | string | asc | Sıralama düzeni (asc/desc) |
| type | string | - | Kişi tipi filtresi (work/home/personal) |
| isFavourite | boolean | - | Favori durumu filtresi |

**Örnek İstek:**
```bash
GET /contacts?page=1&perPage=5&sortBy=name&sortOrder=asc&type=work
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
        "name": "Ahmet Yılmaz",
        "phoneNumber": "+905551234567",
        "email": "ahmet@example.com",
        "isFavourite": false,
        "contactType": "work",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "page": 1,
    "perPage": 5,
    "totalItems": 25,
    "totalPages": 5,
    "hasPreviousPage": false,
    "hasNextPage": true
  }
}
```

#### 2. ID'ye Göre Kişi Getir
```http
GET /contacts/:contactId
```

**Örnek İstek:**
```bash
GET /contacts/507f1f77bcf86cd799439011
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully found contact with id: 507f1f77bcf86cd799439011!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ahmet Yılmaz",
    "phoneNumber": "+905551234567",
    "email": "ahmet@example.com",
    "isFavourite": false,
    "contactType": "work"
  }
}
```

**Hata Yanıtı (404):**
```json
{
  "status": 404,
  "message": "Contact not found"
}
```

#### 3. Yeni Kişi Oluştur
```http
POST /contacts
```

**Request Body:**
```json
{
  "name": "Mehmet Demir",
  "phoneNumber": "+905559876543",
  "email": "mehmet@example.com",
  "isFavourite": true,
  "contactType": "personal"
}
```

**Validasyon Kuralları:**
- `name`: Zorunlu, string, 3-20 karakter
- `phoneNumber`: Zorunlu, string, 3-20 karakter
- `email`: Opsiyonel, geçerli email formatı
- `isFavourite`: Opsiyonel, boolean
- `contactType`: Opsiyonel, enum: ['work', 'home', 'personal']

**Başarılı Yanıt (201):**
```json
{
  "status": 201,
  "message": "Successfully created a contact!",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mehmet Demir",
    "phoneNumber": "+905559876543",
    "email": "mehmet@example.com",
    "isFavourite": true,
    "contactType": "personal",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### 4. Kişi Güncelle
```http
PATCH /contacts/:contactId
```

**Request Body:** (Tüm alanlar opsiyonel)
```json
{
  "name": "Mehmet Demir (Güncellendi)",
  "isFavourite": false
}
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully patched a contact!",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mehmet Demir (Güncellendi)",
    "phoneNumber": "+905559876543",
    "email": "mehmet@example.com",
    "isFavourite": false,
    "contactType": "personal",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

#### 5. Kişi Sil
```http
DELETE /contacts/:contactId
```

**Başarılı Yanıt (204):**
```
No Content
```

**Hata Yanıtı (404):**
```json
{
  "status": 404,
  "message": "Contact not found"
}
```

### Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı istek |
| 201 | Başarılı oluşturma |
| 204 | Başarılı silme (içerik yok) |
| 400 | Geçersiz istek (validasyon hatası) |
| 404 | Kaynak bulunamadı |
| 500 | Sunucu hatası |

## 🗂️ Proje Yapısı

```
src/
├── controllers/        # İstek işleyicileri
│   └── contacts.js
├── db/                # Veritabanı yapılandırması
│   ├── models/
│   │   └── contact.js
│   └── initMongoConnection.js
├── middlewares/       # Middleware fonksiyonları
│   ├── errorHandler.js
│   ├── notFoundHandler.js
│   ├── validateBody.js
│   └── isValidId.js
├── routers/           # Route tanımlamaları
│   └── contacts.js
├── services/          # İş mantığı katmanı
│   └── contacts.js
├── utils/             # Yardımcı fonksiyonlar
│   ├── ctrlWrapper.js
│   ├── env.js
│   ├── calculatePaginationData.js
│   ├── parsePaginationParams.js
│   ├── parseSortParams.js
│   └── parseFilterParams.js
├── validation/        # Joi doğrulama şemaları
│   └── contacts.js
├── index.js          # Uygulama başlangıç noktası
└── server.js         # Express sunucu yapılandırması
```

## 🧪 Kullanım Örnekleri

### cURL ile Test

```bash
# Tüm kişileri getir
curl http://localhost:3000/contacts

# Sayfalama ile kişileri getir
curl "http://localhost:3000/contacts?page=2&perPage=5"

# Filtreleme ve sıralama
curl "http://localhost:3000/contacts?type=work&sortBy=name&sortOrder=desc"

# Yeni kişi oluştur
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phoneNumber": "+905551234567",
    "email": "test@example.com",
    "contactType": "work"
  }'

# Kişi güncelle
curl -X PATCH http://localhost:3000/contacts/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"isFavourite": true}'

# Kişi sil
curl -X DELETE http://localhost:3000/contacts/507f1f77bcf86cd799439011
```

### Postman Collection

Postman ile test etmek için collection dosyasını [buradan]() indirebilirsiniz.

## 🚢 Deployment (Render.com)

1. Render.com'da yeni bir Web Service oluşturun
2. GitHub repository'nizi bağlayın
3. Ortam değişkenlerini ekleyin:
   - `MONGODB_USER`
   - `MONGODB_PASSWORD`
   - `MONGODB_URL`
   - `MONGODB_DB`
4. Build komutunu ayarlayın: `npm install`
5. Start komutunu ayarlayın: `npm start`
6. Deploy edin!

**Live Demo:** [https://contacts-app-bdrd.onrender.com/contacts]

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**[Emre ÜRÜN]**
- GitHub: [@Emre-Urun](https://github.com/Emre-Urun)
- LinkedIn: [linkedin.com/in/emre-ürün](https://www.linkedin.com/in/emre-%C3%BCr%C3%BCn-944b4735b/)

## 🙏 Teşekkürler

Bu proje, GoIT Fullstack Developer kursunun bir parçası olarak geliştirilmiştir.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
