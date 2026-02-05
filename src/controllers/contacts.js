import {
  getContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

// Tüm kontakları getiren control
const getContactsController = async (req, res) => {
  const contact = await getContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
};

//   ID'ye göre kontak getiren control
const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};

// Yeni kontak oluşturan control
const createContactController = async (req, res) => {
  const payload = req.body;
  const newContact = await createContact(payload);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};
// Update (PATCH) kontak control
const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const payload = req.body;
  const result = await updateContact(contactId, payload);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};
// Delete kontak control
const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
};
