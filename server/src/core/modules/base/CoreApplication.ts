import * as express from 'express';
import { Application } from 'express';
import CoreController from './CoreController';
import {
  IMiddleware,
  ISettings
} from '../../interfaces';

export default class CoreApplication {
  protected app: Application = null;
  protected parameters = null;
  protected controllers: Array<CoreController> = [];

  constructor(settings: ISettings) {
    this.app = express();
    this.parameters = settings.get();
  }

  protected injectMiddlware(mw: IMiddleware) {
    this.app.use(mw.extractMiddleware());
  }

  public attachController(controller: CoreController) {
    this.controllers.push(controller);
  }
}
