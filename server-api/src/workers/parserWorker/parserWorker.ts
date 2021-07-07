import { parentPort, workerData } from 'worker_threads';
import { parser } from '../../tools/parser';

console.log('in worker parser before');
const startTimer = Date.now();

let result = parser(workerData.value);

const stopTimer = Date.now();
console.log(
  `Time Taken to execute = ${(stopTimer - startTimer) / 1000} seconds`
);
console.log('in worker parser after');

parentPort.postMessage(result);
