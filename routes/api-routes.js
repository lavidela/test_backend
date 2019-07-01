// Inicializar express router
let router = require('express').Router();

// Setea por defecto la respuesta del API
router.get('/', function (req, res) {
    res.json({
        status: 'La api esta disponible',
        message: 'Pueden utilizarla',
    });
});

// importa el controller de contactos
var contactController = require('../controllers/contactController');

// Router de contactos
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Exporta la rutas
module.exports = router;