import routes from '../routes/logDataRoutes';
import request from 'supertest';

import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

test('test stats routes return json', (done) => {
  request(app).get('/stats').expect('Content-Type', /json/).expect(200, done);
});

test('test latestFile routes return json', (done) => {
  request(app).get('/latestFile').expect('Content-Type', /json/).expect(200, done);
});
