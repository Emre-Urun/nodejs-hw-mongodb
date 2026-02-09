import {
  getContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// ! Tüm kontakları getiren control
const getContactsController = async (req, res) => {
  // TODO 1. Query parametrelerini işleme
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  // ! middlerware'den gelen user bilgisi ile userId'yi alma
  const userId = req.user._id;
  // TODO 2. Servisden hem veriyi hemde total count'ı alma
  const { contacts, totalItems } = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });
  // TODO 3. Sayfalama verilerini hesaplama
  const paginationData = calculatePaginationData(totalItems, perPage, page);
  // TODO 4. Cevap oluşturma
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      ...paginationData,
    },
  });
};

//  ! ID'ye göre kontak getiren control
const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  // ! Middleware'den gelen user bilgisi ile userId'yi alma
  const userId = req.user._id;
  const contact = await getContactsById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};

// ! Yeni kontak oluşturan control
const createContactController = async (req, res) => {
  const payload = { ...req.body, userId: req.user._id };
  // TODO Photo için yapılan ayar
  const photo = req.file;
  // TODO Eğer bir photo geldiyse cloudinarye yükle
  if (photo) {
    const photoUrl = await saveFileToCloudinary(photo);
    payload.photo = photoUrl; //URL' yi database gidecek veriye ekle
  }
  const newContact = await createContact(payload);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// ! Update (PATCH) kontak control
const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  // TODO Photo kısmı
  const payload = { ...req.body };
  const photo = req.file;
  // Eğer foto varsa yükle ve payloada ekle
  if (photo) {
    const photoUrl = await saveFileToCloudinary(photo);
    payload.photo = photoUrl;
  }
  const result = await updateContact(contactId, userId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

// ! Delete kontak control
const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await deleteContact(contactId, userId); // userId eklendi

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
