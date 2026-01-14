import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import {
  getContactsController,
  getContactsByIdController,
} from './controllers/contacts.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Logları kaydetme Pino-http
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //   Genel Get isteği
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Sunucu çalışıyor!' });
  });
  //   Contacts ile ilgili route işlemleri
  app.get('/contacts', getContactsController);
  app.get('/contacts/:contactId', getContactsByIdController);
  // 404 hata yönetimi
  app.use((req, res, next) => {
    res.status(404).json({ message: '!!!Not found!!!' });
  });

  //   express kütüphanesinin çalışması için gereken listen methodu
  app.listen(PORT, () => {
    console.log(`***Sunucu ${PORT} portunda çalışıyor.***`);
  });
};
