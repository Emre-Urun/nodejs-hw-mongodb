import { getContacts, getContactsById } from '../services/contacts.js';

// Tüm kontakları getiren control
const getContactsController = async (req, res) => {
  try {
    const contact = await getContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contact,
    });
  } catch (error) {
    console.log('Veriler alınırken bir hata oluştu:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//   ID'ye göre kontak getiren control
const getContactsByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found!' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.log('Veriler alınırken bir hata oluştu:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//

export { getContactsController, getContactsByIdController };
