import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Empresa } from '../models/Empresa';
import { Usuario } from '../models/Usuario';
import createResponse from '../utils/httpResponseFactory';
import { HttpResponse } from '../utils/types';

const router = express.Router();

router.get(
  '',
  async (
    req: Request<
      null,
      HttpResponse<Empresa | Empresa[]>,
      null,
      {
        from?: string;
        to?: string;
        orderBy?: Exclude<keyof Empresa, keyof Model>;
        orderType?: 'ASC' | 'DESC';
        id?: string;
        usuario?: 'true' | 'false';
      }
    >,
    res
  ) => {
    try {
      if (req.query.id) {
        if (isNaN(Number(req.query.id)) || Number(req.query.id) < 1) {
          createResponse(
            400,
            null,
            req,
            res,
            'Informe um ID válido por query parameter'
          );
          return;
        }
        if (req.query.usuario === 'true') {
          createResponse(
            200,
            await Empresa.findAll({
              where: {
                id: req.query.id
              },
              include: Usuario
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Empresa.findAll({
              where: {
                id: req.query.id
              }
            }),
            req,
            res
          );
        }
      } else if (req.query.to) {
        if (req.query.usuario === 'true') {
          createResponse(
            200,
            await Empresa.findAll({
              limit: Number(req.query.to) - (Number(req.query.from) || 0),
              offset: Number(req.query.from) || 0,
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : [],
              include: Usuario
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Empresa.findAll({
              limit: Number(req.query.to) - (Number(req.query.from) || 0),
              offset: Number(req.query.from) || 0,
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : []
            }),
            req,
            res
          );
        }
      } else {
        if (req.query.usuario === 'true') {
          createResponse(
            200,
            await Empresa.findAll({
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : [],
              include: Usuario
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Empresa.findAll({
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : []
            }),
            req,
            res
          );
        }
      }
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.post(
  '',
  async (req: Request<null, HttpResponse<Empresa>, Empresa>, res) => {
    try {
      const response = await Empresa.create(req.body);
      createResponse(200, response, req, res);
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.put(
  '',
  async (
    req: Request<null, HttpResponse<Empresa[]>, Empresa, { id: string }>,
    res
  ) => {
    try {
      if (isNaN(Number(req.query.id)) || Number(req.query.id) < 1) {
        createResponse(
          400,
          null,
          req,
          res,
          'Informe um ID válido por query parameter'
        );
        return;
      }
      const response = await Empresa.update(req.body, {
        where: { id: req.query.id }
      });
      createResponse(200, response[1], req, res);
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.delete(
  '',
  async (
    req: Request<null, HttpResponse<number>, null, { id: string }>,
    res
  ) => {
    try {
      if (!req.query.id) {
        createResponse(
          400,
          null,
          req,
          res,
          'Informe um ID válido por query parameter'
        );
      } else {
        createResponse(
          200,
          await Empresa.destroy({
            where: {
              id: req.query.id
            }
          }),
          req,
          res
        );
      }
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

export default router;
