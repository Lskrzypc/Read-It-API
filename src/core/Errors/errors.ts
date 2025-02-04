export const IErrorMessageCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
};

export const IErrorMessageCodeName = {
  [IErrorMessageCode.BAD_REQUEST]: 'BAD_REQUEST',
  [IErrorMessageCode.UNAUTHORIZED]: 'UNAUTHORIZED',
  [IErrorMessageCode.FORBIDDEN]: 'FORBIDDEN',
  [IErrorMessageCode.NOT_FOUND]: 'NOT_FOUND',
  [IErrorMessageCode.METHOD_NOT_ALLOWED]: 'METHOD_NOT_ALLOWED',
  [IErrorMessageCode.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
  [IErrorMessageCode.NOT_IMPLEMENTED]: 'NOT_IMPLEMENTED',
  [IErrorMessageCode.BAD_GATEWAY]: 'BAD_GATEWAY',
};

export const ErrorMessages = {
  [IErrorMessageCode.BAD_REQUEST]: 'Bad Request: The request was invalid or cannot be served.',
  [IErrorMessageCode.UNAUTHORIZED]: 'Unauthorized: Authentication is required and has failed or has not been provided.',
  [IErrorMessageCode.FORBIDDEN]: 'Forbidden: The server understood the request but refuses to authorize it.',
  [IErrorMessageCode.NOT_FOUND]: 'Not Found: The requested resource could not be found.',
  [IErrorMessageCode.METHOD_NOT_ALLOWED]: 'Method Not Allowed: The method specified in the request is not allowed.',
  [IErrorMessageCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error: Something went wrong on the server.',
  [IErrorMessageCode.NOT_IMPLEMENTED]:
    'Not Implemented: The server does not support the functionality required to fulfill the request.',
  [IErrorMessageCode.BAD_GATEWAY]: 'Bad Gateway: The server received an invalid response from the upstream server.',
};

export type IErrorMessageCode = (typeof IErrorMessageCode)[keyof typeof IErrorMessageCode];
export type IErrorMessageCodeName = (typeof IErrorMessageCodeName)[keyof typeof IErrorMessageCodeName];

export interface IErrorMessage {
  code: IErrorMessageCode;
  codeName: IErrorMessageCodeName;
  message: string;
}

export class AppError extends Error {
  constructor(
    public code: IErrorMessageCode,
    public codeName: IErrorMessageCodeName,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON(): IErrorMessage {
    return {
      code: this.code,
      codeName: this.codeName,
      message: this.message,
    };
  }
}

export const createError = (code: IErrorMessageCode, message?: string): AppError => {
  const defaultMessage = ErrorMessages[code] || 'An unexpected error occurred';
  return new AppError(code, IErrorMessageCodeName[code], message || defaultMessage);
};

export const badRequestError = (message?: string) => createError(IErrorMessageCode.BAD_REQUEST, message);

export const unauthorizedError = (message?: string) => createError(IErrorMessageCode.UNAUTHORIZED, message);

export const internalServerError = (message?: string) => createError(IErrorMessageCode.INTERNAL_SERVER_ERROR, message);

export const notFoundError = (message?: string) => createError(IErrorMessageCode.NOT_FOUND, message);

export const forbiddenError = (message?: string) => createError(IErrorMessageCode.FORBIDDEN, message);

export const methodNotAllowedError = (message?: string) => createError(IErrorMessageCode.METHOD_NOT_ALLOWED, message);

export const notImplementedError = (message?: string) => createError(IErrorMessageCode.NOT_IMPLEMENTED, message);

export const badGatewayError = (message?: string) => createError(IErrorMessageCode.BAD_GATEWAY, message);
