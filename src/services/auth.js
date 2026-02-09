import bcrypt from 'bcrypt';
import { User } from '../db/model/user.js';
import createHttpError from 'http-errors';
import { Session } from '../db/model/session.js';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../services/emailService.js';
import { parseTemplate } from '../utils/parseTemplate.js';

// ! Kullanıcı kaydı
export const registerUser = async (payload) => {
  // 1. E-posta kontrolü
  const exitingUser = await User.findOne({
    email: payload.email,
  });
  // eğer kullanıcı varsa hata fırlat
  if (exitingUser) {
    throw createHttpError(409, 'Email in use');
  }
  //   2.Şifre hashleme
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  // 3. Kullanıcı oluşturma
  const newUser = await User.create({
    ...payload,
    password: encryptedPassword, // şifreyi hashlenmiş olarak kaydet
  });
  //  4. Hassas bilgileri (şifre) çıkartarak kullanıcıyı döndür
  const userObj = newUser.toObject();
  delete userObj.password; // ! şifreyi kullanıcı objesinden çıkart
  delete userObj.__v; // ! mongoose versiyon bilgisini kullanıcı objesinden çıkart
  return userObj; // şifre olmadan kullanıcıyı döndür
};

// ! Kullanıcı girişi
export const loginUser = async (payload) => {
  // TODO Kullanıcıyı email ile bulma
  const user = await User.findOne({
    email: payload.email,
  });
  // Eğer kullanıcı yoksa hata fırlat
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  // TODO 2. Şifre doğrulama
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');
  // TODO 3. var olan oturumu sonlandırma
  await Session.deleteOne({
    userId: user._id,
  });
  // TODO 4. Token oluşturma
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  // TODO 5. Oturumu veritabanına kaydetme
  const newSession = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  // TODO 6. Tokenları döndürme
  return {
    accessToken,
    refreshToken,
    _id: newSession._id,
  };
};

// ! Kullanıcı oturumunu yenileme
export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  // TODO 1. Oturumu veritabanında bulma(sessionId ile)
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: refreshToken,
  });
  // TODO 2. Oturum yoksa hata ver
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  // TODO 3. Refresh token geçerliliğini kontrol etme ve eşleşmiyorsa hata ver
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  // TODO 3. Eski oturumu sonlandırma (güvenlik için yeni oturum oluşturulmadan önce eski oturumun tokenini yenileme)
  await Session.deleteOne({
    _id: sessionId,
  });
  // TODO 4. Yeni tokenlar oluşturma
  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');

  // TODO 5. Yeni oturumu veritabanına kaydetme
  const newSession = await Session.create({
    userId: session.userId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  // TODO 6. Yeni tokenları döndürme
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    _id: newSession._id, // yeni oturumun id'sini döndür
  };
};

// ! Kullanıcı çıkışı
export const logoutUser = async ({ sessionId }) => {
  // TODO Oturumu veritabanından silme
  await Session.deleteOne({
    _id: sessionId,
  });
};

// ! Şifre sıfırlama Maili Gönderme servisi
export const requestResetToken = async ({ email }) => {
  //  TODO 1. Kullanıcıyı email ile bulma
  const user = await User.findOne({
    email,
  });
  // TODO 2. Kullanıcı yoksa hata fırlat
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  // TODO 3. Şifre sıfırlamak için JWT token oluşturma
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    env('JWT_SECRET'),
    { expiresIn: '5m' }, // Token süresi
  );
  // TODO 4. Şifre sıfırlama linki oluşturma
  const resetLink = `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`;
  // TODO 5. Email içeriğini hazırlama
  const html = await parseTemplate('reset-password.hbs', {
    name: user.name || 'Kullanıcı', // Kullanıcı adını gönderiyoruz
    link: resetLink, // Linki gönderiyoruz
  });
  // TODO 6. Email servisini çağırma
  try {
    await sendEmail({
      to: email,
      subject: 'Şifre Sıfırlama Talebi',
      html: html,
    });
  } catch (error) {
    // Mail gönderme başarısız olursa hata fırlat
    console.log('Email Gönderme Hatası:', error);
    throw createHttpError(500, 'Failed to send reset email');
  }
  return {
    message: 'Reset email sent successfully',
  };
};
// ! Şİfre sıfırlama
export const resetPassword = async (payload) => {
  let entries;
  //  TODO 1. Token doğrulama
  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    // Token süresi dolmuşsa veya bozuksa hata ver
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }
  // TODO 2. Kullanıcıyı token içindeki bilgilerle bulma
  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  // Kullanıcı yoksa hata fırlat
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  // TODO 3. Yeni şifreyi hashleme
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  // TODO 4. Kullanıcının şifresini güncelleme
  await User.updateOne(
    {
      _id: user._id,
    },
    {
      password: encryptedPassword,
    },
  );
  // TODO 5. Eski oturumları sonlandırma (tüm oturumları silme)
  await Session.deleteMany({
    userId: user._id,
  });
};
