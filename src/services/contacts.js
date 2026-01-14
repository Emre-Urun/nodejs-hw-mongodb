import { Contact } from '../db/model/contact.js';

export const getContacts = async () => {
  const response = await Contact.find();
  return response;
};

export const getContactsById = async (contactId) => {
  const response = await Contact.findById(contactId);
  return response;
};
