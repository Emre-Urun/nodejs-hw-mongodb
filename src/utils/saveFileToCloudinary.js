import cloudinary from './cloudinary.js';
import fs from 'node:fs/promises';

export const saveFileToCloudinary = async (file) => {
  // 1. Dosyayı Cloudinary'e yükle
  const response = await cloudinary.uploader.upload(file.path);

  // 2. Yükleme bittiği için temp klasöründeki dosyayı sil (Çöp birikmesin)
  await fs.unlink(file.path);

  // 3. Cloudinary'den gelen güvenli resim linkini döndür
  return response.secure_url;
};
