import Application from '../core/modules/Application';

import UserController from './ClientController';

const controllers = {
  UserController: new UserController()
};

export default class Controllers {
  private _controllers: Object;

  constructor(application: Application) {
    this._controllers = controllers;

    Object.keys(this._controllers).forEach((controllerName: string) => {
      application.attachController(this._controllers[controllerName]);
    });
  }
}
