import { redisClient } from '../services/db';

export const getLineNumberParsed = async (responseLength: number) => {
  try {
    let lastLineNumberParsed = await redisClient.get('lineNumberParsed');
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
    await redisClient.set('lineNumberParsed', data);
  } catch (error) {
    console.log(error);
  }
};

export const getFileNumberParsed = async () => {
  let fileNumberParsed = 1;
  try {
    let fileNumberParsedString = await redisClient.get('fileNumberParsed');
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
    await redisClient.set('fileNumberParsed', fileNumber.toString());
  } catch (error) {
    console.log(error);
  }
};

export const saveLastResponse = async (data: {}) => {
  try {
    let lastResponse = await redisClient.set(
      'lasResponse',
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getLastResponse = async () => {
  try {
    let response = await redisClient.get('lasResponse');
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
    obj.fileNumberParsed = await redisClient.get('fileNumberParsed');
    obj.lineNumberParsed = await redisClient.get('lineNumberParsed');
    return obj;
  } catch (error) {
    throw new Error('their are an error');
  }
};

interface StatsResponse {
  fileNumberParsed: string;
  lineNumberParsed: string;
}
