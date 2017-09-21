declare function require(name: string);

require('source-map-support').install();

import CoreServer from './core/modules/CoreServer';
import Application from './core/modules/Application';
import JsonSettings from './core/modules/JsonSettings';
import Controllers from './controllers';

const settings: JsonSettings = new JsonSettings('./settings/settings.json');
const application: Application = new Application(settings);
const server: CoreServer = new CoreServer(application, settings);

new Controllers(application);

application.initialize();

server.start();
