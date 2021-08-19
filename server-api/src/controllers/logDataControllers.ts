import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { getLastResponse, getStats } from '../providers/csvDataProvider';
import { parserWorker } from '../tools/runWorker';
import { isMainThread, threadId } from 'worker_threads';

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    console.log('No file is available!');
    return res.status(500);
  } else {
    let dataFile = '';
    console.log('read file is started');
    let readStream = fs.createReadStream(path.resolve(req.file.path));

    readStream.on('data', (chunk) => {
      dataFile += chunk.toString();
    });

    readStream.on('end', () => {
      console.log('end of read file');
      fs.unlink(req.file.path, () => {
        console.log(req.file.originalname, ' has been deleted');
      });
      console.log(`Main isMainThread ${isMainThread}`);
      console.log(`Main thread id is ${threadId}`);
      console.log('Main process id is', process.pid);
      const workerParser = parserWorker(
        path.join(__dirname, '..', './workers/parserWorker/parserWorker.js'),
        {
          value: dataFile,
          path: path.resolve(__dirname, '..', './workers/parserWorker/parserWorker.ts'),
        },
        res
      );
    });
  }
};

export const latestFile = async (req: Request, res: Response) => {
  try {
    let response = await getLastResponse();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500);
  }
};

export const stats = async (req: Request, res: Response) => {
  try {
    let response = await getStats();
    res.status(200).json(response);
  } catch (error) {
    res.status(500);
  }
};
