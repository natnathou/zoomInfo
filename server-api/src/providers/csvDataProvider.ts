import { setAsync, getAsync } from '../services/db';

export const getLineNumberParsed = async (responseLength: number) => {
  try {
    let lastLineNumberParsed = await getAsync('lineNumberParsed');
    if (lastLineNumberParsed) {
      lastLineNumberParsed += responseLength;
      return lastLineNumberParsed;
    } else return responseLength;
  } catch (error) {
    console.log(error);
    return responseLength;
  }
};

export const setLineNumberParsed = async (data: string) => {
  try {
    await setAsync('lineNumberParsed', data);
  } catch (error) {
    console.log(error);
  }
};

export const getFileNumberParsed = async () => {
  let fileNumberParsed = 1;
  try {
    let fileNumberParsedString = await getAsync('fileNumberParsed');
    if (fileNumberParsedString) {
      fileNumberParsed = parseInt(fileNumberParsedString) + 1;
    }
  } catch (error) {
    console.log(error);
  }
  return fileNumberParsed;
};

export const setFileNumberParsed = async (fileNumber: number) => {
  try {
    await setAsync('fileNumberParsed', fileNumber.toString());
  } catch (error) {
    console.log(error);
  }
};

export const saveLastResponse = async (data: {}) => {
  try {
    let lastResponse = await setAsync('lasResponse', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getLastResponse = async () => {
  try {
    let response = await getAsync('lasResponse');
    return JSON.parse(response);
  } catch (error) {
    throw new Error('their are an error');
  }
};

export const getStats = async () => {
  let obj: StatsResponse = {
    fileNumberParsed: '',
    lineNumberParsed: '',
  };

  try {
    obj.fileNumberParsed = await getAsync('fileNumberParsed');
    obj.lineNumberParsed = await getAsync('lineNumberParsed');
    return obj;
  } catch (error) {
    throw new Error('their are an error');
  }
};

interface StatsResponse {
  fileNumberParsed: string;
  lineNumberParsed: string;
}
