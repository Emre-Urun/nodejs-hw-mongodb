import createHttpError from 'http-errors';
import { Session } from '../db/model/session.js';
import { User } from '../db/model/user.js';

export const authenticate = async (req, res, next) => {
  // TODO 1. İsteğin header'ından 'Authorization' bilgisini alıyoruz
  const authHeader = req.get('Authorization');
  // TODO 2. Header yoksa 401 hatası ver
  if (!authHeader) {
    throw createHttpError(401, 'Please provide Authorization header');
  }
  // TODO 3. Header'ın formatı "Bearer <token>" şeklinde mi?
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  // TODO 4. Eğer format yanlışsa veya token yoksa 401 hatası ver
  if (bearer !== 'Bearer' || !token) {
    // ... 401 hatası ("Auth header should be of type Bearer")
    throw createHttpError(401, 'Auth header should be of type Bearer');
  }
  // TODO 4. Bu token'a sahip geçerli bir Session var mı
  const session = await Session.findOne({
    accessToken: token,
    accessTokenValidUntil: { $gt: new Date() },
  });
  // TODO 5. Session yoksa 401 hatası ver
  if (!session) {
    throw createHttpError(401, 'Access token expired');
  }
  // TODO 6. Session varsa, bu session kime ait
  const user = await User.findById(session.userId);
  // TODO 7. Kullanıcı bulunamazsa 401.
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  // TODO 8. Her şey tamamsa
  req.user = user;

  next();
};
