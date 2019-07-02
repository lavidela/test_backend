/* istanbul ignore file */
// Inicializar express router
const router = require('express').Router();

// importa el controller de contactos
const { listContact, newContact, viewContact, updateContact, deleteContact } = require('../controllers/contactController');

// Setea por defecto la respuesta del API
router.get('/', function (req, res) {
    res.json({
        status: 'La api esta disponible',
        message: 'Pueden utilizarla',
    });
});


// Router de contactos
router.route('/contacts')
    .get(listContact)
    .post(newContact);

router.route('/contacts/:contact_id')
    .get(viewContact)
    .patch(updateContact)
    .put(updateContact)
    .delete(deleteContact);

// Exporta la rutas
module.exports = router;