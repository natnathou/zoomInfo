import { parser } from '../tools/parser';
import { smallText, smallResponses, bigText, bigResponses } from './text';

describe('parser testing', () => {
  test('test parse small csv', () => {
    let response = parser(smallText);
    expect(response).toEqual(smallResponses);
  });

  test('test parse small csv', () => {
    let response = parser(bigText);
    expect(response).toEqual(bigResponses);
  });
});
