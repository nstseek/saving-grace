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
    req: Request<
      null,
      HttpResponse<Usuario | Usuario[]>,
      null,
      {
        from?: string;
        to?: string;
        orderBy?: Exclude<keyof Usuario, keyof Model>;
        orderType?: 'ASC' | 'DESC';
        id?: string;
        imagem?: 'true' | 'false';
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
        if (req.query.imagem === 'true') {
          createResponse(
            200,
            await Usuario.findAll({
              where: {
                id: req.query.id
              },
              include: Imagem
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Usuario.findAll({
              where: {
                id: req.query.id
              }
            }),
            req,
            res
          );
        }
      } else if (req.query.to) {
        if (req.query.imagem === 'true') {
          createResponse(
            200,
            await Usuario.findAll({
              limit: Number(req.query.to) - (Number(req.query.from) || 0),
              offset: Number(req.query.from) || 0,
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : [],
              include: Imagem
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Usuario.findAll({
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
        if (req.query.imagem === 'true') {
          createResponse(
            200,
            await Usuario.findAll({
              order: req.query.orderBy
                ? [[req.query.orderBy, req.query.orderType || 'ASC']]
                : [],
              include: Imagem
            }),
            req,
            res
          );
        } else {
          createResponse(
            200,
            await Usuario.findAll({
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
  async (req: Request<null, HttpResponse<Usuario>, Usuario>, res) => {
    try {
      if (req.body.Imagem) {
        const response = await Usuario.create(req.body, {
          include: [Imagem]
        });
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

router.put(
  '',
  async (
    req: Request<null, HttpResponse<Usuario[]>, Usuario, { id: string }>,
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
      let response: [number, Usuario[]];
      if (req.body.Imagem === undefined) {
        response = await Usuario.update(req.body, {
          where: { id: req.query.id }
        });
      } else if (req.body.Imagem === null) {
        delete req.body.Imagem;
        req.body.ImagemId = null;
        response = await Usuario.update(req.body, {
          where: { id: req.query.id }
        });
      } else {
        const img = await Imagem.create(req.body.Imagem);
        delete req.body.Imagem;
        req.body.ImagemId = img.id;
        response = await Usuario.update(req.body, {
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
          await Usuario.destroy({
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

router.post(
  '/login',
  async (
    req: Request<
      null,
      HttpResponse<Usuario | string>,
      {
        email: string;
        senha: string;
      }
    >,
    res
  ) => {
    try {
      const response = await Usuario.findOne({
        where: {
          email: req.body.email,
          senha: req.body.senha
        }
      });
      if (!response) {
        createResponse(404, 'Usuário não encontrado', req, res);
      }
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

export default router;
