import { Sequelize } from 'sequelize-typescript';
import JsonSettings from './JsonSettings';
import { IDatabaseConfig } from '../interfaces/ISettings';
import * as path from 'path';

class Database {
  private sequelize: Sequelize;
  private databaseParams: IDatabaseConfig;

  constructor() {
    let settings = new JsonSettings('./settings/database.json');
    this.databaseParams = settings.get(process.env.NODE_ENV);
    this.sequelize = new Sequelize({
      name: this.databaseParams.database,
      dialect: this.databaseParams.dialect,
      host: this.databaseParams.host,
      username: this.databaseParams.username,
      password: this.databaseParams.password,
      modelPaths: [
        path.join(__dirname, '../../models')
      ]
    });
  }

  public getSequelize() {
    return this.sequelize;
  }
}

const database = new Database();
export const sequelize = database.getSequelize();
