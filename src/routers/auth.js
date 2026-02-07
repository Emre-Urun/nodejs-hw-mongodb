import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userCreateSchema, usersLoginSchema } from '../db/model/user.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  logoutUserController,
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

export default authRouter;
