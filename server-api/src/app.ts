import express from 'express';
import morganChalk from './services/logger';
import routes from './routes/logDataRoutes';
import('./services/db');
const app = express();

app.use(morganChalk);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/logData', routes);

app.listen(5000, () => {
  console.log('server is listening on port 5000!!!');
});
