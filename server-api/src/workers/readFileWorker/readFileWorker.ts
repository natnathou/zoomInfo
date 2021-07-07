import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import path from 'path';

console.log('in read worker before');
let readStream = fs.createReadStream(path.resolve(workerData.value.path));

readStream.on('data', (chunk) => {
  parentPort.postMessage(chunk.toString());
});

readStream.on('end', () => {
  fs.unlink(workerData.value.path, () => {
    console.log(workerData.value.fileName, ' has been deleted');
  });
});
