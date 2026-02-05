import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import router from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

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

  // Router'ları kullanma
  app.use('/contacts', router);

  // 404 Not Found Handler
  app.use(notFoundHandler);
  // Genel Hata Yakalama Middleware'i
  app.use(errorHandler);

  //   express kütüphanesinin çalışması için gereken listen methodu
  app.listen(PORT, () => {
    console.log(`***Sunucu ${PORT} portunda çalışıyor.***`);
  });
};
