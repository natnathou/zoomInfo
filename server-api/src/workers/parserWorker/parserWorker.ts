import { parentPort, workerData } from 'worker_threads';
import { parser } from '../../tools/parser';

console.log('in worker parser, before parsing');
const startTimer = Date.now();

let result = parser(workerData.value);

const stopTimer = Date.now();
console.log(`Time Taken to parse csv = ${(stopTimer - startTimer) / 1000} seconds`);
console.log('in worker parser, after parsing');

parentPort.postMessage(result);
