import {
  registerUser,
  refreshUserSession,
  loginUser,
  logoutUser,
} from '../services/auth.js';
// ! Kullanıcı kaydı'ı oluşturma
export const registerUserController = async (req, res) => {
  // 1. servise body'i göndererek kullanıcıyı oluşturmasını sağla
  const newUser = await registerUser(req.body);

  //  2. cevabı oluşturma
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};
// ! Kullanıcı girişi'ni oluşturma
export const loginUserController = async (req, res) => {
  // TODO 1.Servise giderek tokenları ve id alma
  const { accessToken, refreshToken, _id } = await loginUser(req.body);
  // TODO 2. Refresh tokenı cookie'ye kaydetme
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // sadece sunucu tarafından erişilebilir
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün
  });
  // TODO 3. Session id'yi cookie'ye kaydetme (bir sonraki refresh işlemi için)
  res.cookie('sessionId', _id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  // TODO 4. Access tokenı response body'e gönderme
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });
};
// ! Kullanıcı oturumunu yenileme
export const refreshUserSessionController = async (req, res) => {
  // TODO 1. Cookie'den refresh tokenı alma
  const { sessionId, refreshToken } = req.cookies;
  // --- HATA AYIKLAMA LOGLARI ---
  console.log('--- REFRESH KONTROL ---');
  console.log("Cookie'den gelen SessionID:", sessionId);
  console.log("Cookie'den gelen RefreshToken:", refreshToken);
  // TODO 2. Servise giderek yeni access token alma
  const session = await refreshUserSession({ sessionId, refreshToken });
  // TODO 3. Yeni refresh tokenı cookie'ye kaydetme
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true, // sadece sunucu tarafından erişilebilir
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün
  });
  // TODO 4. Session id'yi cookie'ye kaydetme (bir sonraki refresh işlemi için)
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  // TODO 5. Yeni access tokenı response body'e gönderme
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
// ! Kullanıcı çıkışı
export const logoutUserController = async (req, res) => {
  // TODO 1. Cookie'den session id'yi alma
  const { sessionId } = req.cookies;
  // TODO 2. Servise giderek oturumu sonlandırma
  await logoutUser({ sessionId });
  // TODO 3. Cookie'leri temizleme
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  // TODO 4. Cevabı oluşturma
  res.status(204).send();
};
