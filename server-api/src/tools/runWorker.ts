import { Worker } from 'worker_threads';
import { Response } from 'express';
import {
  getFileNumberParsed,
  getLineNumberParsed,
  saveLastResponse,
  setFileNumberParsed,
  setLineNumberParsed,
} from '../providers/csvDataProvider';

export const parserWorker = (
  path: string,
  workerDataObj: object | null = null,
  res: Response
) => {
  const worker = new Worker(path, { workerData: workerDataObj });
  worker.on('message', async (response: {}[]) => {
    let lastLineNumberParsed = await getLineNumberParsed(response.length);

    await setLineNumberParsed(lastLineNumberParsed.toString());

    let fileNumberParsed = await getFileNumberParsed();

    await setFileNumberParsed(fileNumberParsed);

    await saveLastResponse(response);

    console.log('after parsing, in message event before res.json');
    await res.status(200).json(response);
  });

  worker.on('error', () => {
    res.status(500);
  });

  worker.on('exit', () => {});
};
