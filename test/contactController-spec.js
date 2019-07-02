/* istanbul ignore file */
const chai = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies
const Response = require('mock-express-response');
// eslint-disable-next-line import/no-extraneous-dependencies
const proxyquire = require('proxyquire').noCallThru();

const { expect } = chai;

describe('test contactController', () => {

  beforeEach(() => {
  })

  it('listContact(), test obtener todos los registros, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          find: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  resolve([{ "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }]);
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.listContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'Contactos obtenidos satisfactoriamente');
  });

  it('listContact(), test obtener todos los registros, catch', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          find: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  reject({ error: 'error' });
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.listContact(req, res);
    expect(res).to.have.a.property('statusCode', 400);
    const body = res._getJSON();
    expect(body).to.have.a.property('error', 'error');
  });

  it('newContact(), crear un nuevo registro, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: function () {
          return new class Contact {
            save() {
              // throw new Error({ error: error });
            }
          }
        }
      }

    });
    const req = { "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.newContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'nuevo contacto creado');
    expect(body.data).to.have.a.property('name', 'juan');
    expect(body.data).to.have.a.property('gender', 'M');
    expect(body.data).to.have.a.property('email', 'aaa@aaa.cl');
    expect(body.data).to.have.a.property('phone', '1234');
  });

  it('newContact(), crear nuevo registro, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: function () {
          return new class Contact {
            save() {
              // throw new Error({ error: error });
            }
          }
        }
      }

    });
    const req = { "body": { "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.newContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'nuevo contacto creado');
    expect(body.data).to.have.a.property('gender', 'M');
    expect(body.data).to.have.a.property('email', 'aaa@aaa.cl');
    expect(body.data).to.have.a.property('phone', '1234');
  });

  it('newContact(), test obtener todos los registros, catch', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: function () {
          return new class Contact {
            save() {
              throw new Error({ error: error });
            }
          }
        }
      }

    });
    const req = { "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.newContact(req, res);
    expect(res).to.have.a.property('statusCode', 400);
    const body = res._getJSON();
  });

  it('view(), test obtener un registro, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          findById: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  resolve([{ "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }]);
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.viewContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'detalles del contacto');
    expect(body.data[0]).to.have.a.property('name', 'juan');
    expect(body.data[0]).to.have.a.property('gender', 'M');
    expect(body.data[0]).to.have.a.property('email', 'aaa@aaa.cl');
    expect(body.data[0]).to.have.a.property('phone', '1234');
  });

  it('view(), test obtener un registro, catch', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          findById: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  reject({ error: 'error' });
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.viewContact(req, res);
    expect(res).to.have.a.property('statusCode', 400);
    const body = res._getJSON();
    expect(body).to.have.a.property('error', 'error');
  });

  it('update(), test actualizar un registro, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          findById: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  //se hace mock del save
                  resolve({
                    "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234",
                    save(){
                      return {}
                    }
                  });
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.updateContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'contacto actualizado');
    expect(body.data).to.have.a.property('name', 'juan');
    expect(body.data).to.have.a.property('gender', 'M');
    expect(body.data).to.have.a.property('email', 'aaa@aaa.cl');
    expect(body.data).to.have.a.property('phone', '1234');
  });

  it('update(), test actualizar un registro, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          findById: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  //se hace mock del save
                  resolve({
                    "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234",
                    save(){
                      return {}
                    }
                  });
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.updateContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'contacto actualizado');
    expect(body.data).to.have.a.property('gender', 'M');
    expect(body.data).to.have.a.property('email', 'aaa@aaa.cl');
    expect(body.data).to.have.a.property('phone', '1234');
  });

  it('update(), test actualizar un registro, catch', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          findById: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  reject({ error: 'error' });
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.updateContact(req, res);
    expect(res).to.have.a.property('statusCode', 400);
    const body = res._getJSON();
    expect(body).to.have.a.property('error', 'error');
  });

  it('deleteContact(), test eliminar un contacto, ok', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          deleteOne: (a) => {
            return {
              exec: () => {
                const promise = new Promise((resolve, reject) => {
                  resolve([{ "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }]);
                });
                return promise;
              }
            }
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.deleteContact(req, res);
    expect(res).to.have.a.property('statusCode', 200);
    const body = res._getJSON();
    expect(body).to.have.a.property('status', 'exito');
    expect(body).to.have.a.property('message', 'contacto eliminado');
  });

  it('deleteContact(), test eliminar un registro, catch', async () => {
    const res = new Response();
    const controller = proxyquire('../controllers/contactController', {
      '../models/contactModel': {
        Contact: {
          deleteOne: (a) => {
            throw new Error();
          }
        }
      }
    });
    const req = { "params": { contact_id: 1 }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    await controller.deleteContact(req, res);
    expect(res).to.have.a.property('statusCode', 400);
    const body = res._getJSON();
  });
});