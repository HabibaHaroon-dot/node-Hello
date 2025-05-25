import request from 'supertest';
import app from '../server.js';

describe('API', () => {
  it('root responds', () => request(app).get('/').expect(200));
  it('/items flow', async () => {
    const item = 'Bread';
    await request(app).post('/items').send({ name: item }).expect(201);
    const res = await request(app).get('/items').expect(200);
    expect(res.body.some(i => i.name === item)).toBeTruthy();
  });
});
