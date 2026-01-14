import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}`);
    console.log('----------MongoDB bağlantısı başarılı.----------------');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
  }
};
