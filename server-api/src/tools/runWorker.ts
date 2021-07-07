import { Worker } from 'worker_threads';
import { Response } from 'express';
import * as pathModule from 'path';
import {
  getFileNumberParsed,
  getLineNumberParsed,
  saveLastResponse,
  setFileNumberParsed,
  setLineNumberParsed,
} from '../provider/csvDataProvider';

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

    console.log('message parserWorker');
    await res.status(200).json(response);
  });

  worker.on('error', () => {
    res.status(500);
  });

  worker.on('exit', () => {
    console.log('exit parserWorker');
  });
};

export const readFileWorker = (
  path: string,
  workerDataObj: object | null = null,
  res: Response
) => {
  const worker = new Worker(path, { workerData: workerDataObj });

  let data: string = '';

  worker.on('message', (response: string) => {
    data += response;
    console.log('message readFileWorker');
  });
  worker.on('exit', () => {
    const workerParser = parserWorker(
      pathModule.join(
        __dirname,
        '..',
        './workers/parserWorker/parserWorker.js'
      ),
      {
        value: data,
        path: pathModule.resolve(
          __dirname,
          '..',
          './workers/parserWorker/parserWorker.ts'
        ),
      },
      res
    );
    console.log('exit readFileWorker');
  });
};
