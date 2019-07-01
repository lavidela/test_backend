// importa el modelo de contactos
Contact = require('../models/contactModel');

// obtener todos los contactos
exports.index = function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "exito",
            message: "Contactos obtenidos satisfactoriamente",
            data: contacts
        });
    });

};

// crear un nuevo contacto
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    // guardar el contacto y verificar que no tenga errores
    contact.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "exito",
            message: 'nuevo contacto creado',
            data: contact
        });
    });
};


// obtener un contacto por id
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "exito",
            message: 'detalles del contacto',
            data: contact
        });
    });
};

// actualizar un contacto por id
exports.update = function (req, res) {

    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        // actualizar el contacto y verificar si hay errores
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: "exito",
                message: 'contacto actualizado',
                data: contact
            });
        });
    });
};


// eliminar un contacto por id
exports.delete = function (req, res) {
    Contact.deleteOne({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "exito",
            message: 'contacto eliminado'
        });
    });
};