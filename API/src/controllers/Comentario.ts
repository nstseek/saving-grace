import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Comentario } from '../models/Comentario';
import createResponse from '../utils/httpResponseFactory';
import { HttpResponse } from '../utils/types';

const router = express.Router();

router.get(
  '',
  async (
    req: Request<
      null,
      HttpResponse<Comentario | Comentario[]>,
      null,
      {
        from?: string;
        to?: string;
        orderBy?: Exclude<keyof Comentario, keyof Model>;
        orderType?: 'ASC' | 'DESC';
        id?: string;
        EmpresaId?: string;
      }
    >,
    res
  ) => {
    try {
      const where = req.query.EmpresaId
        ? { EmpresaId: req.query.EmpresaId }
        : undefined;
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
        createResponse(
          200,
          await Comentario.findAll({
            where: { id: req.query.id },
            limit: Number(req.query.to) - (Number(req.query.from) || 0),
            offset: Number(req.query.from) || 0,
            order: req.query.orderBy
              ? [[req.query.orderBy, req.query.orderType || 'ASC']]
              : []
          }),
          req,
          res
        );
      } else if (req.query.to) {
        createResponse(
          200,
          await Comentario.findAll({
            where,
            limit: Number(req.query.to) - (Number(req.query.from) || 0),
            offset: Number(req.query.from) || 0,
            order: req.query.orderBy
              ? [[req.query.orderBy, req.query.orderType || 'ASC']]
              : []
          }),
          req,
          res
        );
      } else {
        createResponse(
          200,
          await Comentario.findAll({
            where,
            order: req.query.orderBy
              ? [[req.query.orderBy, req.query.orderType || 'ASC']]
              : []
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

router.post(
  '',
  async (req: Request<null, HttpResponse<Comentario>, Comentario>, res) => {
    try {
      const response = await Comentario.create(req.body);
      createResponse(200, response, req, res);
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.put(
  '',
  async (
    req: Request<null, HttpResponse<Comentario[]>, Comentario, { id: string }>,
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
      const response = await Comentario.update(req.body, {
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
          await Comentario.destroy({
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
