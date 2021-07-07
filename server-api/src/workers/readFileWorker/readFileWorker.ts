import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import path from 'path';

console.log('in read worker before');
console.log(workerData.value);
let readStream = fs.createReadStream(
  path.join(__dirname, '../..', workerData.value)
);

readStream.on('data', (chunk) => {
  parentPort.postMessage(chunk.toString());
});
