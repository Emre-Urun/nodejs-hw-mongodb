import bcrypt from 'bcrypt';
import { User } from '../db/model/user.js';
import createHttpError from 'http-errors';
import { Session } from '../db/model/session.js';
import { randomBytes } from 'crypto';

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
