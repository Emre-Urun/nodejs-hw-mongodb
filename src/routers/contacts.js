import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../db/model/contact.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
router.use(authenticate); // ! Tüm kontak rotaları için kimlik doğrulama middleware'ini ekliyoruz

// ! Ana get isteği ( /contacts )
router.get('/', ctrlWrapper(getContactsController));
// ! ID'ye göre get isteği ( /contacts/:contactId )
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
// ! Yeni kontak oluşturma isteği ( /contacts )
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
// ! PATCH ile kontak güncelleme isteği ( /contacts/:contactId )
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
// ! DELETE ile kontak silme isteği ( /contacts/:contactId )
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
