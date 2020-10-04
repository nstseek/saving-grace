import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Imagem } from '../models/Imagem';
import { Usuario } from '../models/Usuario';
import createResponse from '../utils/httpResponseFactory';
import { HttpResponse } from '../utils/types';

const router = express.Router();

router.get(
  '',
  async (
    req: Request<{
      from?: string;
      to?: string;
      orderBy?: Exclude<keyof Usuario, keyof Model>;
      orderType?: 'ASC' | 'DESC';
      id?: string;
    }>,
    res
  ) => {
    try {
      if (req.params.id) {
        createResponse(
          200,
          await Usuario.findAll({
            where: {
              id: req.params.id
            }
          }),
          req,
          res
        );
      } else if (req.params.to) {
        createResponse(
          200,
          await Usuario.findAll({
            limit: Number(req.params.to) - (Number(req.params.from) || 0),
            offset: Number(req.params.from) || 0,
            order: req.params.orderBy
              ? [[req.params.orderBy, req.params.orderType || 'ASC']]
              : []
          }),
          req,
          res
        );
      } else {
        createResponse(
          200,
          await Usuario.findAll({
            order: req.params.orderBy
              ? [[req.params.orderBy, req.params.orderType || 'ASC']]
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
  async (req: Request<null, HttpResponse<Usuario>, Usuario>, res) => {
    try {
      if (req.body.imagem) {
        const response = await Usuario.create(req.body, { include: [Imagem] });
        createResponse(200, response, req, res);
      } else {
        const response = await Usuario.create(req.body);
        createResponse(200, response, req, res);
      }
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

export default router;
