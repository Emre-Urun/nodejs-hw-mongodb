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

const router = Router();

// Ana get isteği ( /contacts )
router.get('/', ctrlWrapper(getContactsController));

// ID'ye göre get isteği ( /contacts/:contactId )
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

// Yeni kontak oluşturma isteği ( /contacts )
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// PATCH ile kontak güncelleme isteği ( /contacts/:contactId )
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// DELETE ile kontak silme isteği ( /contacts/:contactId )
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
export default router;
