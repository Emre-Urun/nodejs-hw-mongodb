# 📇 Contacts API

Node.js ve Express.js kullanılarak geliştirilmiş, MongoDB veritabanı ile entegre edilmiş RESTful API projesi. Kişi bilgilerini yönetmek için tam CRUD (Create, Read, Update, Delete) operasyonlarını destekler.

## 🚀 Özellikler

- ✅ Tüm kişileri listeleme
- ✅ ID'ye göre kişi sorgulama
- ✅ Yeni kişi ekleme
- ✅ Mevcut kişi bilgilerini güncelleme (PATCH)
- ✅ Kişi silme
- ✅ Kapsamlı hata yönetimi
- ✅ MongoDB Atlas entegrasyonu
- ✅ CORS desteği
- ✅ Profesyonel loglama (Pino)
- ✅ Modüler ve ölçeklenebilir mimari

## 🛠️ Teknolojiler

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Veritabanı ve ODM
- **Pino** - Yüksek performanslı loglama
- **http-errors** - HTTP hata yönetimi
- **dotenv** - Ortam değişkenleri yönetimi
- **CORS** - Cross-Origin Resource Sharing

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB Atlas hesabı veya yerel MongoDB kurulumu
- npm veya yarn paket yöneticisi

## 🔧 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/Emre-Urun/hw2-mongodb.git
cd hw2-mongodb
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**

Proje kök dizininde `.env` dosyası oluşturun:

```env
PORT=3000
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=your_database_name
```

4. **Uygulamayı başlatın:**
```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## 📚 API Endpoints

### 1. Tüm Kişileri Getir

```http
GET /contacts
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": [
    {
      "_id": "contact_id",
      "name": "Ahmet Yılmaz",
      "phoneNumber": "+90 555 123 4567",
      "email": "ahmet@example.com",
      "isFavourite": false,
      "contactType": "personal",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. ID'ye Göre Kişi Getir

```http
GET /contacts/:contactId
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully found contact with id: {contactId}!",
  "data": {
    "_id": "contact_id",
    "name": "Ahmet Yılmaz",
    "phoneNumber": "+90 555 123 4567",
    "email": "ahmet@example.com",
    "isFavourite": false,
    "contactType": "personal"
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

### 3. Yeni Kişi Oluştur

```http
POST /contacts
```

**İstek Gövdesi:**
```json
{
  "name": "Mehmet Demir",
  "phoneNumber": "+90 555 987 6543",
  "email": "mehmet@example.com",
  "isFavourite": true,
  "contactType": "work"
}
```

**Zorunlu Alanlar:**
- `name` (string)
- `phoneNumber` (string)
- `contactType` (string: "work", "home", veya "personal")

**İsteğe Bağlı Alanlar:**
- `email` (string)
- `isFavourite` (boolean)

**Başarılı Yanıt (201):**
```json
{
  "status": 201,
  "message": "Successfully created a contact!",
  "data": {
    "_id": "new_contact_id",
    "name": "Mehmet Demir",
    "phoneNumber": "+90 555 987 6543",
    "email": "mehmet@example.com",
    "isFavourite": true,
    "contactType": "work",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Kişi Bilgilerini Güncelle

```http
PATCH /contacts/:contactId
```

**İstek Gövdesi (tüm alanlar isteğe bağlı):**
```json
{
  "name": "Mehmet Demir (Güncellenmiş)",
  "phoneNumber": "+90 555 111 2222",
  "email": "mehmet.yeni@example.com",
  "isFavourite": false,
  "contactType": "personal"
}
```

**Başarılı Yanıt (200):**
```json
{
  "status": 200,
  "message": "Successfully patched a contact!",
  "data": {
    "_id": "contact_id",
    "name": "Mehmet Demir (Güncellenmiş)",
    "phoneNumber": "+90 555 111 2222",
    "email": "mehmet.yeni@example.com",
    "isFavourite": false,
    "contactType": "personal",
    "updatedAt": "2024-01-02T00:00:00.000Z"
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

### 5. Kişi Sil

```http
DELETE /contacts/:contactId
```

**Başarılı Yanıt (204):**
- Yanıt gövdesi yok (No Content)

**Hata Yanıtı (404):**
```json
{
  "status": 404,
  "message": "Contact not found"
}
```

## 🗂️ Proje Yapısı

```
├── src/
│   ├── controllers/
│   │   └── contacts.js          # İstek kontrolörleri
│   ├── db/
│   │   ├── model/
│   │   │   └── contact.js       # Mongoose modeli
│   │   └── initMongoConnection.js # MongoDB bağlantısı
│   ├── middlewares/
│   │   ├── errorHandler.js      # Hata yakalama middleware'i
│   │   └── notFoundHandler.js   # 404 hatası middleware'i
│   ├── routers/
│   │   └── contacts.js          # API rotaları
│   ├── services/
│   │   └── contacts.js          # İş mantığı servisleri
│   ├── utils/
│   │   ├── ctrlWrapper.js       # Kontrolör sarmalayıcı
│   │   └── env.js               # Ortam değişkenleri yardımcısı
│   ├── index.js                 # Uygulama giriş noktası
│   └── server.js                # Express sunucu yapılandırması
├── .env                         # Ortam değişkenleri
├── .gitignore
├── package.json
└── README.md
```

## 🏗️ Mimari

Proje, **MVC (Model-View-Controller)** desenine benzer bir mimari kullanır:

- **Models (db/model/):** MongoDB şemaları ve modelleri
- **Controllers (controllers/):** HTTP isteklerini işler ve yanıt döner
- **Services (services/):** İş mantığını ve veritabanı işlemlerini yönetir
- **Routers (routers/):** API endpoint'lerini tanımlar
- **Middlewares (middlewares/):** Hata yönetimi ve doğrulama
- **Utils (utils/):** Yardımcı fonksiyonlar

## 🔒 Hata Yönetimi

Proje kapsamlı hata yönetimi içerir:

- **errorHandler:** Tüm uygulama hatalarını yakalar ve işler
- **notFoundHandler:** Var olmayan rotalar için 404 hatası döner
- **ctrlWrapper:** Async kontrolörleri sarar ve hataları otomatik yakalar
- **http-errors:** Standart HTTP hata yanıtları oluşturur

## 🧪 Test Etme

API'yi test etmek için Postman, Insomnia veya cURL kullanabilirsiniz:

**Örnek cURL Komutları:**

```bash
# Tüm kişileri listele
curl http://localhost:3000/contacts

# ID ile kişi getir
curl http://localhost:3000/contacts/CONTACT_ID

# Yeni kişi oluştur
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Kullanıcı",
    "phoneNumber": "+90 555 000 1111",
    "contactType": "personal"
  }'

# Kişi güncelle
curl -X PATCH http://localhost:3000/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -d '{"isFavourite": true}'

# Kişi sil
curl -X DELETE http://localhost:3000/contacts/CONTACT_ID
```

## 🚀 Deployment

Proje [Render.com](https://render.com) üzerinde dağıtılabilir:

1. Render.com'da yeni bir Web Service oluşturun
2. GitHub repository'nizi bağlayın
3. Ortam değişkenlerini ekleyin
4. Deploy branch'i olarak `hw3-crud` seçin
5. Deploy edin!

**Önemli:** Render.com'da ortam değişkenlerini eklemeyi unutmayın:
- `MONGODB_USER`
- `MONGODB_PASSWORD`
- `MONGODB_URL`
- `MONGODB_DB`

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

**[@Emre-Urun]**

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
