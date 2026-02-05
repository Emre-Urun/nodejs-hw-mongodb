import { Contact } from '../db/model/contact.js';

// Tüm kontakları getiren service
export const getContacts = async () => {
  const response = await Contact.find();
  return response;
};
// ID'ye göre kontak getiren service
export const getContactsById = async (contactId) => {
  const response = await Contact.findById(contactId);
  return response;
};
// Yeni kontak oluşturan service
export const createContact = async (payload) => {
  const response = await Contact.create(payload);
  return response;
};
// Update (PATCH) kontak service
export const updateContact = async (contactId, payload) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
  });
  return result;
};
// Delete kontak service
export const deleteContact = async (contactId) => {
  const result = await Contact.findOneAndDelete({ _id: contactId });
  return result;
};
