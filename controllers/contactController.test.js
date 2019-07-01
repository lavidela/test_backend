const MockModel = require("jest-mongoose-mock");
const Contact = require("../models/contactModel");
jest.mock("../models/contactModel");
const contactController = require("./contactController");

describe('index', () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    Contact.mockClear();
  })
  it('test obtener todos los registros', async () => {
    req = { body: {} };
    res = {
      data: null,
      json(payload) {
        this.data = JSON.stringify(payload)
      }
    };

    await contactController.index(req, res);
  });

  it('grabar el registro', async () => {
    req = { "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    res = { json: jest.fn() };
    const contact = new Contact();
    await contactController.new(req, res);
    expect(contact.save.mock.calls.length).toBe(1);
  });

  it('ver un registro', async () => {
    req = { "params": { "contact_id": "aaaa" } };
    res = { json: jest.fn() };
    const contact = new Contact();
    await contactController.view(req, res);
  });

  it('actualizar un registro', async () => {
    req = { "params": { "contact_id": "aaaa" }, "body": { "name": "juan", "gender": "M", "email": "aaa@aaa.cl", "phone": "1234" }, "headers": { "Content-Type": "application/json" } };
    res = { json: jest.fn() };
    const contact = new Contact();
    await contactController.update(req, res);
  });

  it('eliminar un registro', async () => {
    req = { "params": { "contact_id": "aaaa" } };
    res = { json: jest.fn() };
    const contact = new Contact();
    await contactController.delete(req, res);
  });
});
