/* istanbul ignore file */

const mongoose = require('mongoose');

// declaracion de esquema
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
const Contact = mongoose.model('contact', contactSchema);
// exportar el modelo de contacto
module.exports = { Contact };