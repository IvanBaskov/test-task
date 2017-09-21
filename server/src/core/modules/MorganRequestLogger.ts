import * as morgan from 'morgan';
import { IRequestLogger } from '../interfaces';
import { IMiddleware } from '../interfaces';

export default class MorganRequestLogger implements IRequestLogger, IMiddleware {
  constructor() {
  }

  extractMiddleware() {
    return morgan('dev');
  }
}
