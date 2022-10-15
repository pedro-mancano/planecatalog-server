const app = require('../src/app');
const request = require('supertest');
const mongoose = require('mongoose');
const planeParams = require('../src/assets/planeParameters.json').parameters;

describe('Plane Route', () => {
  describe('POST /plane/all', () => {

    it('should return 200', async () => {
      const res = await request(app)
        .post('/plane/all')
        .send({ skip: 0 });
      expect(res.statusCode).toEqual(200);
    });

    it('should return an array of planes', async () => {
      const res = await request(app)
        .post('/plane/all')
        .send({ skip: 0 });
      expect(res.body.planes).toBeInstanceOf(Array);
      for (let param of planeParams) {
        expect(res.body.planes[0]).toHaveProperty(param.name);
      }
    });

    it('should return 400, if skip is negative', async () => {
      const res = await request(app)
        .post('/plane/all')
        .send({ skip: -1 });
      expect(res.statusCode).toEqual(400);
    });

  })

  describe('POST /plane/query', () => {

    it('should return 200', async () => {
      const res = await request(app)
        .post('/plane/query')
        .send({ skip: 0, filter: [] });
      expect(res.statusCode).toEqual(200);
    });

    it('should return 200, if body is empty', async () => {
      const res = await request(app)
        .post('/plane/query');
      expect(res.statusCode).toEqual(200);
    });

    it('should return an array of planes', async () => {
      const res = await request(app)
        .post('/plane/query')
        .send({ skip: 0, filter: [] });
      expect(res.body).toBeInstanceOf(Array);
      for (let param of planeParams) {
        expect(res.body[0]).toHaveProperty(param.name);
      }
    });

    it('should return 400, if skip is negative', async () => {
      const res = await request(app)
        .post('/plane/query')
        .send({ skip: -1, filter: [] });
      expect(res.statusCode).toEqual(400);
    });

    it('should return 400, if filter is not an array', async () => {
      const res = await request(app)
        .post('/plane/query')
        .send({ skip: 0, filter: {} });
      expect(res.statusCode).toEqual(400);
    });

    it('should return 400, if filter is not an array of objects', async () => {
      const res = await request(app)
        .post('/plane/query')
        .send({ skip: 0, filter: [1, 2, 3] });
      expect(res.statusCode).toEqual(400);
    });

  })
})

afterAll(async () => await mongoose.disconnect());

