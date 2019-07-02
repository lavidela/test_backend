# Test cargo desarrollador backend nodejs express mongoose api rest 

Test para cargo desarrollador backend nodejs/express/mongoose

Ejecución local:

* Clonar este repositorio
* Ejecutar `npm install`
* Ejecutar `npm start`

Variables de entorno .env del directorio raiz :

| Variable de entorno	| Descripción	    | Valor por defecto             |
| --------------------	| -----------	    | -------------                 |
| URL_MONGO			    | URL conexión mongo| mongodb://localhost/test      |
| PORT                  | puerto servidor   | 3000                          |

##### Pruebas Unitarias

Ejecutar 
```bash
npm test
```
Se incluye postman para pruebas.
* `pruebas.postman_collection.json`

La `api` contiene los siguientes metodos para ejecución

* GET `/api/contacts`
* POST `/api/contacts`
* GET `/api/contacts/:id`
* PUT `/api/contacts/:id`
* PATCH `/api/contacts/:id`
* DELETE `/api/contacts/:id`
