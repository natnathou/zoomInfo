import { Router } from 'express';
import {
  latestFile,
  stats,
  uploadFile,
} from '../controllers/logDataControllers';

const logDataRoutes = Router();

logDataRoutes.get('/upload', uploadFile);

logDataRoutes.get('/latestFile', latestFile);

logDataRoutes.get('/stats', stats);

export default logDataRoutes;
