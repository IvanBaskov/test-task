import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { Sequelize } from 'sequelize-typescript';

import MorganRequestLogger from '../modules/MorganRequestLogger';
import { ErrorHandler } from './Errors';
import CoreApplication from './base/CoreApplication';
import {
  ISettings,
  IController,
  IError
} from '../interfaces';


export default class Application extends CoreApplication {

  private requestLogger: MorganRequestLogger = null;
  private sequelize: Sequelize;

  constructor(settings: ISettings) {
    super(settings);
    this.requestLogger = new MorganRequestLogger();
  }

  public async initialize() {
    // view engine setup
    this.app.set('views', path.join(__dirname, this.parameters.view.path));
    this.app.set('view engine', this.parameters.view.engine);

    // uncomment after placing your favicon in /public
    // this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.set('trust proxy', 1); // trust first proxy
    this.app.use(compression());
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.controllers.forEach((controller: IController) => {
      controller.register(this.app);
    });

    this.app.use(ErrorHandler.middleware());
    this.app.use(ErrorHandler.notFoundHandler);
  }

  public getExpressInstance() {
    return this.app;
  }

}
