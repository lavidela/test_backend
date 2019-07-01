var mongoose = require('mongoose');

// declaracion de esquema
var contactSchema = mongoose.Schema({
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

// exportar el modelo de contacto
var Contact = module.exports = mongoose.model('contact', contactSchema);