import express, { Request } from 'express';
import { Model } from 'sequelize/types';
import { Empresa } from '../models/Empresa';
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
      HttpResponse<Transacao | Transacao[]>,
      null,
      {
        from?: string;
        to?: string;
        orderBy?: Exclude<keyof Transacao, keyof Model>;
        orderType?: 'ASC' | 'DESC';
        id?: string;
        EmpresaId?: string;
        UsuarioId?: string;
      }
    >,
    res
  ) => {
    try {
      let where: { EmpresaId?: string; UsuarioId?: string } = {};
      if (req.query.EmpresaId) {
        where.EmpresaId = req.query.EmpresaId;
      }
      if (req.query.UsuarioId) {
        where.UsuarioId = req.query.UsuarioId;
      }
      if (!req.query.EmpresaId && !req.query.UsuarioId) {
        where = undefined;
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
          await Transacao.findAll({
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
          await Transacao.findAll({
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
          await Transacao.findAll({
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
  async (req: Request<null, HttpResponse<Transacao>, Transacao>, res) => {
    try {
      // const response = await Transacao.create(req.body);
      const empresa = await Empresa.findOne({
        where: { id: req.body.EmpresaId }
      });
      const usuario = await Usuario.findOne({
        where: { id: req.body.UsuarioId }
      });
      await Empresa.update(
        { saldo: Number(empresa.saldo) + Number(req.body.valor) },
        { where: { id: empresa.id } }
      );
      await Usuario.update(
        { saldo: Number(usuario.saldo) - Number(req.body.valor) },
        { where: { id: usuario.id } }
      );
      createResponse(200, req.body, req, res);
    } catch (e) {
      createResponse(500, e, req, res);
    }
  }
);

router.put(
  '',
  async (
    req: Request<null, HttpResponse<Transacao[]>, Transacao, { id: string }>,
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
      const response = await Transacao.update(req.body, {
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
          await Transacao.destroy({
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
