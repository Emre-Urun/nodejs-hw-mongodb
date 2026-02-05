import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Ana get isteği ( /contacts )
router.get('/', ctrlWrapper(getContactsController));

// ID'ye göre get isteği ( /contacts/:contactId )
router.get('/:contactId', ctrlWrapper(getContactsByIdController));

// Yeni kontak oluşturma isteği ( /contacts )
router.post('/', ctrlWrapper(createContactController));

// PATCH ile kontak güncelleme isteği ( /contacts/:contactId )
router.patch('/:contactId', ctrlWrapper(patchContactController));

// DELETE ile kontak silme isteği ( /contacts/:contactId )
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;
