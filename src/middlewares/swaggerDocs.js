import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

// JSON dosyasını okumak için yardımcı fonksiyon
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    // docs/swagger.json dosyasını okuyoruz (Bu dosya build edilince oluşacak)
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log('Swagger hatası..', err);
    return (req, res, next) =>
      next(createHttpError(500, 'Can not load swagger docs'));
  }
};
