import { Request, Response, NextFunction } from 'express';
import CoreController from '../core/modules/base/CoreController';
import { Controller, Route } from '../core/modules/base/CoreExpressDecorators';
import Methods from '../core/modules/base/CoreHttpMethods';
import { ApiValidationError } from '../core/modules/Errors';
import { Client, clientSchema } from '../models/Client';
import * as Ajv from 'ajv';

const {GET, POST} = Methods;
const ajv = new Ajv();

@Controller('/api/clients')
export default class ClientController extends CoreController {

  /**
   * Get client list
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @returns {Promise<void>}
   */
  @Route(GET, '/')
  public async getClients(req: Request, res: Response, next: NextFunction) {
    try {
      let where: any = {$and: []};
      if (req.query.name) {
        where.name = {
          $like: req.query.name + '%'
        };
      }
      if (req.query.phone) {
        where.phone = {
          $like: req.query.phone + '%'
        };
      }
      if (req.query.birthYearFrom && req.query.birthYearFrom > 100) {
        where.$and.push({
          birthday: {
            $gte: new Date(Date.parse(req.query.birthYearFrom))
          }
        });
      }
      if (req.query.birthYearTo && req.query.birthYearTo > 100) {
        where.$and.push({
          birthday: {
            $lte: new Date(Date.parse(req.query.birthYearTo))
          }
        });
      }
      let data = await Client.findAndCountAll({
        where,
        limit: +req.query._limit,
        offset: +req.query._start,
        order: ['id']
      });
      res.json({rows: data.rows, totalElements: data.count});
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get info about client by id
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @returns {Promise<void>}
   */
  @Route(GET, '/:id')
  public async getClient(req: Request, res: Response, next: NextFunction) {
    try {
      let clientId = req.params.id;
      if (!clientId) {
        throw new ApiValidationError('BAD_REQUEST');
      }

      let client = await Client.findById(clientId);
      res.json({client});
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create client
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @returns {Promise<void>}
   */
  @Route(POST, '/')
  public async addClient(req: Request, res: Response, next: NextFunction) {
    try {
      const validator = ajv.compile(clientSchema);
      if (!validator(req.body)) {
        throw new ApiValidationError('BAD_REQUEST');
      }
      let client = await Client.create(req.body);
      res.json({client});
    } catch (err) {
      next(err);
    }
  }
}
