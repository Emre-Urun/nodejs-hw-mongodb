import { Contact } from '../db/model/contact.js';

// Tüm kontakları getiren service
export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  // Verileri sayfalara bölerek getirme
  const limit = perPage;
  const skip = (page - 1) * perPage;
  // dinamik filtreleme
  const contactsQuery = {};
  // eğer filtrede type varsa ekle
  if (filter.type) {
    contactsQuery.contactType = filter.type;
  }
  // eğer filtrede isFavourite varsa sorguya ekle boolen olduğu için undefined kontrolü yap
  if (filter.isFavourite !== undefined) {
    contactsQuery.isFavourite = filter.isFavourite;
  }
  if (filter.name) {
    contactsQuery.name = { $regex: filter.name, $options: 'i' };
  }
  // verileri filtreleyerek, sıralayarak, sayfalara bölerek getirme
  const contacts = await Contact.find(contactsQuery)
    .sort({
      [sortBy]: sortOrder,
    })
    .skip(skip)
    .limit(limit);
  // Toplam kontak sayısını getirme sorguya göre (sayfa hesabı için)
  const totalItems = await Contact.countDocuments(contactsQuery);
  return {
    contacts,
    totalItems,
  };
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
