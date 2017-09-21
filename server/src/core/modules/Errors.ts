'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Sequelize from 'sequelize';
import IRC from '../IRC';
import {
  IErrorHandler,
  IExtendableError,
  IApiValidationError,
  IError
} from '../interfaces';

const env: string = process.env.NODE_ENV || 'development';

class ExtendableError extends Error implements IExtendableError {
  public name: string;
  public message: string;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiValidationError extends ExtendableError implements IApiValidationError {
  public responseCode: number;
  public code: number;
  public extra: any;

  constructor(internalErrorConst: string, extra?: any) {
    let internalError = IRC[internalErrorConst];
    super(internalError.message);
    this.responseCode = internalError.responseCode;
    this.message = internalError.message;
    this.code = internalError.code;
    this.extra = extra || null;
  }

  response() {
    return {
      code: this.code,
      message: this.message,
      extra: this.extra
    };
  }
}

export class ApiAclDenyError extends ExtendableError {
  private responseCode: number;

  constructor(resource, action) {
    let message = 'You don\'t have permissions';
    super(message);
    this.responseCode = 403;
    this.message = message;
  }

  response() {
    return {
      message: this.message
    };
  }
}

export class ErrorHandler {
  private static isDev: boolean = env === 'development';

  public static middleware() {
    return (err, req: Request, res: Response, next: NextFunction): Response | void => {
      if (res.headersSent) {
        return;
      }
      if (err instanceof ApiValidationError || err instanceof ApiAclDenyError) {
        return this.handleApiError(err, res);
      }
      if (err instanceof Sequelize.ValidationError ||
        err instanceof Sequelize.UniqueConstraintError) {
        return this.handleSequelizeValidationError(err, res);
      }
      if (err instanceof Sequelize.DatabaseError) {
        return this.handleDatabaseError(err, res);
      }
      this.handleUnprocessedError(err, res);
    };
  }

  public static notFoundHandler() {
    return (req: Request, res: Response, next: NextFunction): Response => {
      let err: IError = new Error('Not Found');
      err.status = 404;

      return res
        .status(IRC['NOT_FOUND'].responseCode)
        .send({
          message: IRC['NOT_FOUND'].message
        });
    };
  }

  private static handleApiError(err, res: Response): Response {
    return res
      .status(err.responseCode || 400)
      .send(err.response());
  }

  private static handleSequelizeValidationError(err, res: Response): Response {
    let validationErrors = err.errors.map(error => {
      return {
        field: error.path,
        message: error.message
      };
    });

    return res
      .status(422)
      .send(validationErrors);
  }

  private static handleDatabaseError(err, res: Response): Response {
    if (!this.isDev) {
      return res
        .status(IRC['INTERNAL_SERVER_ERROR'].responseCode)
        .send({
          message: IRC['INTERNAL_SERVER_ERROR'].message
        });
    }
    return res
      .status(500)
      .send({
        message: err.message
      });
  }

  private static handleUnprocessedError(err, res: Response): Response {
    console.error(err);
    if (err.trace) {
      console.trace(err.trace);
    }

    if (!this.isDev) {
      return res
        .status(IRC['INTERNAL_SERVER_ERROR'].responseCode)
        .send({
          message: IRC['INTERNAL_SERVER_ERROR'].message
        });
    }
    return res
      .status(500)
      .send({
        message: err.message
      });
  }
}

