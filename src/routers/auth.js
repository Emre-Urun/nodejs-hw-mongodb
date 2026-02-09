import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  userCreateSchema,
  usersLoginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../db/model/user.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
const authRouter = Router();

// ! Yeni kullanıcı kaydı isteği ( /auth/register )
authRouter.post(
  '/register',
  validateBody(userCreateSchema),
  ctrlWrapper(registerUserController),
);
// ! Kullanıcı giriş isteği ( /auth/login )
authRouter.post(
  '/login',
  validateBody(usersLoginSchema),
  ctrlWrapper(loginUserController),
);
// ! Kullanıcı oturum yenileme isteği ( /auth/refresh )
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
// ! Kullanıcı çıkış isteği ( /auth/logout )
authRouter.post('/logout', ctrlWrapper(logoutUserController));
// ! Şifre sıfırlama e-postası gönderme isteği ( /auth/send-reset-email )
authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);
// ! Şifre sıfırlama isteği ( /auth/reset-pwd )
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default authRouter;
