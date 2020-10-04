import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Imagem } from '../models/Imagem';
import { Premio } from '../models/Premio';
import createResponse from '../utils/httpResponseFactory';
import { HttpResponse } from '../utils/types';

const router = express.Router();

router.get(
  '',
  async (
    req: Request<
      null,
      HttpResponse<Premio | Premio[]>,
      null,
      {
        from?: string;
        to?: string;
        orderBy?: Exclude<keyof Premio, keyof Model>;
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
          await Premio.findAll({
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
          await Premio.findAll({
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
          await Premio.findAll({
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
  async (req: Request<null, HttpResponse<Premio>, Premio>, res) => {
    try {
      if (req.body.Imagem) {
        const response = await Premio.create(req.body, {
          include: [Imagem]
        });
        createResponse(200, response, req, res);
      } else {
        const response = await Premio.create(req.body);
        createResponse(200, response, req, res);
      }
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.put(
  '',
  async (
    req: Request<null, HttpResponse<Premio[]>, Premio, { id: string }>,
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
      let response: [number, Premio[]];
      if (req.body.Imagem === undefined) {
        response = await Premio.update(req.body, {
          where: { id: req.query.id }
        });
      } else if (req.body.Imagem === null) {
        delete req.body.Imagem;
        req.body.ImagemId = null;
        response = await Premio.update(req.body, {
          where: { id: req.query.id }
        });
      } else {
        const img = await Imagem.create(req.body.Imagem);
        delete req.body.Imagem;
        req.body.ImagemId = img.id;
        response = await Premio.update(req.body, {
          where: { id: req.query.id }
        });        
      }
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
          await Premio.destroy({
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
