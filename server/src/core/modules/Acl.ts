import * as Acl from 'acl';
import * as SequelizeBackend from 'acl-sequelize';
import { sequelize } from './Database';

class AclInstance extends Acl {
}

export const aclInstance: AclInstance = new Acl(new SequelizeBackend(sequelize, {prefix: 'acl_'}));
