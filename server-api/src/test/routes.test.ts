import routes from '../routes/logDataRoutes';
import request from 'supertest';
import fs from 'mz/fs';
import express from 'express';
import path from 'path/posix';
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

describe('api testing', () => {
  jest.setTimeout(60000);

  test('test stats routes return json', (done) => {
    request(app).get('/stats').expect('Content-Type', /json/).expect(200, done);
  });

  test('test latestFile routes return json', (done) => {
    request(app).get('/latestFile').expect('Content-Type', /json/).expect(200, done);
  });

  test('test file upload', async () => {
    const filePath = path.resolve(__dirname, 'test.csv');

    await fs.exists(filePath).then((exists) => {
      if (!exists) {
        throw new Error('file does not exist');
      }
    });

    await request(app)
      .post('/upload')
      .attach('file', filePath)
      .expect((response) => {
        expect(response.status).toBe(200);
      });
  });
});
