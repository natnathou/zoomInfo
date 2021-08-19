import { Router } from 'express';
import { latestFile, stats, uploadFile } from '../controllers/logDataControllers';
import upload from '../services/upload';

const logDataRoutes = Router();

logDataRoutes.post('/upload', upload.single('file'), uploadFile);

logDataRoutes.get('/latestFile', latestFile);

logDataRoutes.get('/stats', stats);

export default logDataRoutes;
