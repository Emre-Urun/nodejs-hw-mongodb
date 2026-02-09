import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// TODO 1. Kayıt Yerini belirleme
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ! Dosyalar nereye kaydedilecek -------> temp klasörüne
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // ! Dosya adı ne olsun (Çakışma olmaması için Datenow.)
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

// TODO 2. Multer ayarı
export const upload = multer({ storage: storage });
