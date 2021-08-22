import routes from '../routes/logDataRoutes';
import request from 'supertest';
import fs from 'mz/fs';
import express from 'express';
import path from 'path/posix';
import redis from 'redis';
import { client } from '../services/db';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

afterAll(() => {
  client.quit();
});

describe('api testing', () => {
  test('test stats routes return json', async () => {
    const req = await request(app)
      .get('/stats')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('test latestFile routes return json', async () => {
    const req = await request(app)
      .get('/latestFile')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('test file upload', async () => {
    const filePath = path.resolve(__dirname, 'test.csv');

    await fs.exists(filePath).then((exists) => {
      if (!exists) {
        throw new Error('file does not exist');
      }
    });

    const req = await request(app).post('/upload').attach('file', filePath);
    expect(req.status).toBe(200);
  });
});
