/**
 * Contains simple functions which correspond to an error code.
 * Each error code function accepts parameters which are
 * interpolated into the associated error message for specific
 * error codes in order to provide more specific detail. Also a
 * generic helper method to return an errorObject.
 */

/**
 * Error code functions which relate an error code and
 * message
 */

/**
 * Generic error codes
 */
export const ERROR_RUNTIME = errorMessage =>
  `Error: Unexpected runtime error occurred. ${errorMessage}`;
export const ERROR_UNKNOWN = method => `Error: During ${method}, an unknown error occured.`;

/**
 * Generic network error codes
 */
export const ERROR_INCORRECT_URL = method =>
  `Error: During ${method}, incorrect base URL. HTTP CODE: 404`;
export const ERROR_UNEXPECTED_RESPONSE = (method, status) =>
  `Error: During ${method}, an unexpected response ${status} was received.`;
export const ERROR_NETWORK = method =>
  `Error: During ${method}, the request did not reach the server.`;
export const ERROR_AUTHENTICATION = method =>
  `Error: During ${method}, an authentication error occurred. HTTP CODE: 401`;

/**
 * Simple method to return a formatted error object.
 * @param {ERROR_CODE}            function An error code function
 * @param {...optionalParameters} String Optional parameters for the ERROR_CODE function
 */
export function errorObject(ERROR_CODE, ...optionalParameters) {
  const { name: code } = ERROR_CODE;
  return {
    code,
    message: ERROR_CODE(...optionalParameters),
  };
}