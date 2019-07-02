/* istanbul ignore file */
// obtener variables de entorno
const dotenv = require('dotenv');
dotenv.config();
// importar express
let express = require('express');
// importar body-parsers
let bodyParser = require('body-parser');
// importar mongoose
let mongoose = require('mongoose');
// iniciar app
let app = express();

// importar rutas
const apiRoutes = require("./routes/api-routes")


// configurar bodyparser para solicitudes posts
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// conectarse a mongoose con variable de entorno
mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('Mongoose conectado!');
});
var db = mongoose.connection;
// setear la variable de puerto al levantar 
var port = process.env.PORT;


// test de servicio arriba
app.get('/', (req, res) => res.send('Ok Express'));

// usar las rutas api en la app
app.use('/api', apiRoutes)

// iniciar la app escuchando en un puerto especificado
app.listen(port, function () {
    console.log("Ejecutando test en puerto " + port);
});

// controlar termino de la app y cerrar la bd
process.on('SIGINT', () => {
    console.info('SIGINT señal recibida.');
    mongoose.connection.close(false, () => {
        console.log('Mongoose conexión cerrada.');
        process.exit(0);
    });
});

// controlar termino de la app y cerrar la bd
process.on('SIGTERM', () => {
    console.info('SIGTERM señal recibida.');
    mongoose.connection.close(false, () => {
        console.log('Mongoose conexión cerrada.');
        process.exit(0);
    });
});

