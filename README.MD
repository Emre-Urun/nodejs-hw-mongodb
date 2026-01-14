# İletişim API - Node.js MongoDB Projesi

Node.js, Express ve MongoDB kullanılarak geliştirilmiş bir iletişim yönetim REST API'si. Bu proje CRUD işlemlerini, veritabanı entegrasyonunu ve doğru API mimarisini göstermektedir.

## 🚀 Özellikler

- **RESTful API** - Temiz ve sezgisel endpoint tasarımı
- **MongoDB Entegrasyonu** - Mongoose ODM ile kalıcı veri depolama
- **Express Framework** - Hızlı ve minimal web framework
- **Hata Yönetimi** - Kapsamlı hata yönetim sistemi
- **CORS Desteği** - Cross-origin kaynak paylaşımı desteği
- **Loglama** - Pino ile istek loglama
- **Ortam Değişkenleri** - Güvenli yapılandırma yönetimi

## 📋 Gereksinimler

Projeyi çalıştırmadan önce aşağıdakilere sahip olduğunuzdan emin olun:

- Node.js (v14 veya üzeri)
- MongoDB Atlas hesabı
- npm veya yarn paket yöneticisi

## 🛠️ Kurulum

1. **Depoyu klonlayın**

```bash
git clone https://github.com/Emre-Urun/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. **Proje dalına geçin**

```bash
git checkout hw2-mongodb
```

3. **Bağımlılıkları yükleyin**

```bash
npm install
```

4. **Ortam değişkenlerini yapılandırın**

Kök dizinde `.env` dosyası oluşturun:

```env
PORT=3000
MONGODB_USER=mongodb_kullanıcı_adınız
MONGODB_PASSWORD=mongodb_şifreniz
MONGODB_URL=mongodb_cluster_url
MONGODB_DB=veritabanı_adınız
```

5. **Başlangıç verilerini içe aktarın**

`contacts.json` dosyasını MongoDB Compass veya MongoDB Atlas arayüzünü kullanarak veritabanınıza aktarın.

## 🏃‍♂️ Uygulamayı Çalıştırma

### Geliştirme Modu

```bash
npm run dev
```

### Üretim Modu

```bash
npm start
```

Sunucu `http://localhost:3000` adresinde başlayacaktır (veya yapılandırdığınız PORT).

## 📡 API Endpoint'leri

### Tüm İletişimleri Getir

```http
GET /contacts
```

**Yanıt (200 OK)**

```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmet Yılmaz",
      "phoneNumber": "+905551234567",
      "email": "ahmet@example.com",
      "isFavourite": false,
      "contactType": "personal",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### ID'ye Göre İletişim Getir

```http
GET /contacts/:contactId
```

**Yanıt (200 OK)**

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
    "contactType": "personal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Yanıt (404 Bulunamadı)**

```json
{
  "message": "Contact not found"
}
```

## 🗂️ Proje Yapısı

```
nodejs-hw-mongodb/
├── src/
│   ├── controllers/
│   │   └── contacts.js          # İstek işleyicileri
│   ├── db/
│   │   ├── models/
│   │   │   └── contact.js       # Mongoose şeması
│   │   └── initMongoConnection.js
│   ├── services/
│   │   └── contacts.js          # İş mantığı
│   ├── utils/
│   │   └── env.js               # Ortam değişkeni yardımcısı
│   ├── server.js                # Express sunucu kurulumu
│   └── index.js                 # Uygulama giriş noktası
├── .env.example                 # Ortam değişkenleri şablonu
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

## 📊 Veri Modeli

### İletişim Şeması

```javascript
{
  name: String (zorunlu),
  phoneNumber: String (zorunlu),
  email: String (opsiyonel),
  isFavourite: Boolean (varsayılan: false),
  contactType: String (enum: ['work', 'home', 'personal'], varsayılan: 'personal'),
  createdAt: Date (otomatik oluşturulur),
  updatedAt: Date (otomatik güncellenir)
}
```

## 🔧 Kullanılan Teknolojiler

- **Node.js** - JavaScript çalışma ortamı
- **Express** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB için ODM
- **dotenv** - Ortam değişkeni yönetimi
- **cors** - CORS middleware
- **pino-http** - HTTP logger
- **nodemon** - Geliştirme otomatik yeniden başlatma

## 🌐 Yayınlama

Bu uygulama Render.com üzerinde yayınlanmıştır.

**Canlı URL:** https://contacts-app-bdrd.onrender.com/contacts

## 📝 Geliştirme

### Kod Kalitesi

- Kod denetimi için ESLint
- Kod biçimlendirme için Prettier

### Linter Çalıştırma

```bash
npm run lint
```

## 🤝 Katkıda Bulunma

1. Depoyu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/HarikaBirOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Branch'inizi push edin (`git push origin feature/HarikaBirOzellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje eğitim amaçlı oluşturulmuştur.

## 👤 Geliştirici

İsminiz - [@Emre-Urun]

## 🙏 Teşekkürler

- Kapsamlı ödev için kurs eğitmenlerine teşekkürler
- Veritabanı barındırma için MongoDB Atlas'a teşekkürler
- Uygulama barındırma için Render.com'a teşekkürler
