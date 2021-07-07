import { Request, Response } from 'express';
import path from 'path';
import { getLastResponse, getStats } from '../providers/csvDataProvider';
import { readFileWorker } from '../tools/runWorker';

export const uploadFile = async (req: Request, res: Response) => {
  const worker = readFileWorker(
    path.join(__dirname, '..', './workers/readFileWorker/readFileWorker.js'),
    {
      value: 'click_log.csv',
      path: path.resolve(
        __dirname,
        '..',
        './workers/readFileWorker/readFileWorker.ts'
      ),
    },
    res
  );
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
