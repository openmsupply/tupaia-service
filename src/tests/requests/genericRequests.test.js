import '@babel/polyfill';
import {
  ERROR_AUTHENTICATION,
  ERROR_INCORRECT_URL,
  ERROR_NETWORK,
  ERROR_REQUEST,
  ERROR_UNKNOWN,
  ERROR_SERVER,
  errorObject,
} from '../../errors/errors';

const throwStatusError = statusCode => {
  throw { response: { status: statusCode } };
};

const throwGenericError = genericError => {
  throw genericError;
};

const runAndCatchFunction = async functionToRun => {
  let errorCatcher;
  try {
    await functionToRun({});
  } catch (error) {
    errorCatcher = error;
  }
  return errorCatcher;
};

beforeEach(() => {
  jest.resetModules();
});

test('All methods should throw an invalid request error on a 400 code response', async () => {
  const errorThrower = throwStatusError.bind(null, 400);
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_REQUEST, functionName));
  });
});

test('All methods should throw an unauthorized error on a 401 status code response', async () => {
  const errorThrower = throwStatusError.bind(null, 401);
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_AUTHENTICATION, functionName));
  });
});

test('All methods should throw an incorrect URL error on a 404 status code response', async () => {
  const errorThrower = throwStatusError.bind(null, 404);
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_INCORRECT_URL, functionName));
  });
});

test('All methods should throw a server error on a 500 status code response', async () => {
  const errorThrower = throwStatusError.bind(null, 500);
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_SERVER, functionName));
  });
});

test('All methods should throw a network error when no response is received', async () => {
  const errorThrower = throwGenericError.bind(null, { request: true });
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_NETWORK, functionName));
  });
});

test('All methods should throw an unknown error when a response is empty', async () => {
  const errorThrower = throwGenericError.bind(null, {});
  jest.doMock('axios', () => jest.fn(errorThrower));
  const requestFunctions = require('../../requests');
  Object.keys(requestFunctions).forEach(async functionName => {
    const errorCatcher = await runAndCatchFunction(requestFunctions[functionName]);
    expect(errorCatcher).toEqual(errorObject(ERROR_UNKNOWN, functionName));
  });
});