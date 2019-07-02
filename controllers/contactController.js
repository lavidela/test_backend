// importa el modelo de contactos
const { Contact } = require('../models/contactModel');

// obtener todos los contactos
const listContact = async (req, res) => {
  try {
    const contacts = await Contact.find({}).exec();
    return res.json({
      status: "exito",
      message: "Contactos obtenidos satisfactoriamente",
      data: contacts
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// crear un nuevo contacto
const newContact = function (req, res) {
  try {
    const contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    // guardar el contacto y verificar que no tenga errores
    contact.save();
    return res.json({
      status: "exito",
      message: 'nuevo contacto creado',
      data: contact
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};


// obtener un contacto por id
const viewContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contact_id).exec();
    return res.json({
      status: "exito",
      message: 'detalles del contacto',
      data: contact
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// actualizar un contacto por id
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contact_id).exec();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // actualizar el contacto y verificar si hay errores
    const result = contact.save();
    return res.json({
      status: "exito",
      message: 'contacto actualizado',
      data: contact

    });
  } catch (error) {
    return res.status(400).send(error);
  }
};


// eliminar un contacto por id
const deleteContact = function (req, res) {
  try {
    Contact.deleteOne({
      _id: req.params.contact_id
    }).exec();
    return res.json({
      status: "exito",
      message: 'contacto eliminado'
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { listContact, newContact, viewContact, updateContact, deleteContact }