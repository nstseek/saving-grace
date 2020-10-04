import chalk from 'chalk';
import { log } from 'console';
import express, { Request } from 'express';
import { Imagem } from '../models/Imagem';
import createResponse from '../utils/httpResponseFactory';
import { HttpResponse } from '../utils/types';
import httpStatusCode from 'http-status-codes';

const router = express.Router();

router.get(
  '/src',
  async (
    req: Request<null, Uint8Array | HttpResponse<string>, null, { id: string }>,
    res
  ) => {
    if (isNaN(Number(req.query.id)) || Number(req.query.id) < 1) {
      createResponse(
        400,
        null,
        req,
        res,
        'Informe um ID válido por query parameter'
      );
    }
    let color = chalk.blue;
    if (res.statusCode >= 200 && res.statusCode < 300) {
      color = chalk.green;
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      color = chalk.yellow;
    } else if (res.statusCode >= 400) {
      color = chalk.red;
    }
    log(
      color(
        `${res.statusCode} ${httpStatusCode.getStatusText(res.statusCode)}`
      ),
      chalk.white(`| IP ${req.ip} ${req.method} ${req.originalUrl}`)
    );
    res.send((await Imagem.findOne({ where: { id: req.query.id } })).conteudo);
  }
);

export default router;
