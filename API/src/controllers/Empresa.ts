import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Avaliacao } from '../models/Avaliacao';
import { Comentario } from '../models/Comentario';
import { Empresa } from '../models/Empresa';
import { Imagem } from '../models/Imagem';
import { Premio } from '../models/Premio';
import { Transacao } from '../models/Transacao';
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
        avaliacao?: 'true' | 'false';
        premio?: 'true' | 'false';
        transacao?: 'true' | 'false';
        comentario?: 'true' | 'false';
        imagem?: 'true' | 'false';
      }
    >,
    res
  ) => {
    try {
      const include = [];
      if (req.query.usuario === 'true') {
        include.push(Usuario);
      }
      if (req.query.imagem === 'true') {
        include.push(Imagem);
      }
      if (req.query.transacao === 'true') {
        include.push(Transacao);
      }
      if (req.query.premio === 'true') {
        include.push(Premio);
      }
      if (req.query.avaliacao === 'true') {
        include.push(Avaliacao);
      }
      if (req.query.comentario === 'true') {
        include.push(Comentario);
      }
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
          await Empresa.findAll({
            where: { id: req.query.id },
            include,
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
          await Empresa.findAll({
            limit: Number(req.query.to) - (Number(req.query.from) || 0),
            offset: Number(req.query.from) || 0,
            include,
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
          await Empresa.findAll({
            order: req.query.orderBy
              ? [[req.query.orderBy, req.query.orderType || 'ASC']]
              : [],
            include
          }),
          req,
          res
        );
      }
    } catch (e) {
      console.log(e);
      createResponse(500, e, req, res);
    }
  }
);

router.post(
  '',
  async (
    req: Request<null, HttpResponse<Empresa>, Empresa>,
    res
  ) => {
    try {
      let response: Empresa;
      if (req.body.Imagem) {
        response = await Empresa.create(req.body, { include: [Imagem] });
      } else {
        response = await Empresa.create(req.body);
      }
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
        const empresa = await Empresa.findOne({
          where: {
            id: req.query.id
          },
          include: [Imagem]
        });
        if (empresa.Imagem) {
          if (Array.isArray(empresa.Imagem)) {
            for (const img of empresa.Imagem) {
              await Imagem.destroy({ where: { id: img.id } });
            }
          } else {
            await Imagem.destroy({ where: { id: empresa.Imagem.id } });
          }
        }
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
