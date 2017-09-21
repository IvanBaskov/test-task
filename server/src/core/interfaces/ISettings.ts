export interface ISettings {
  get(mode?: 'developmnet' | 'test' | 'production'): IConfig | IDatabaseConfig;
}

export interface IConfig {
  server?: IServerConfig;
  session?: ISessionConfig;
  view?: IViewConfig;
}

export interface IDatabaseConfig {
  database: string;
  dialect: string;
  host: string;
  password: string;
  port: number;
  username: string;
}

export interface IServerConfig {
  port: number;
}

export interface ISessionConfig {
  secret: string;
  key_name: string;
  resave: boolean;
  save_uninitialized: boolean;
  secure_cookie: boolean;
}

export interface IViewConfig {
  path: string;
  engine: string;
}

export interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;

  seederStorage: string;
  migrationStorage: string;
}
