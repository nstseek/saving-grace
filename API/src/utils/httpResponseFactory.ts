import chalk from 'chalk';
import { Request, Response } from 'express';
import { log } from './log';
import { HttpResponse } from './types';
import httpStatusCode from 'http-status-codes';

export default function createResponse<T>(
  status: number,
  data: T,
  req: Request,
  res: Response<HttpResponse<T>>,
  message: string = null
) {
  res.status(status);
  const response: HttpResponse<T> = {
    data,
    status: res.statusCode,
    statusText: httpStatusCode.getStatusText(res.statusCode),
    message
  };
  let color = chalk.blue;
  if (res.statusCode >= 200 && res.statusCode < 300) {
    color = chalk.green;
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    color = chalk.yellow;
  } else if (res.statusCode >= 400) {
    color = chalk.red;
  }
  log(
    color(`${res.statusCode} ${httpStatusCode.getStatusText(res.statusCode)}`),
    chalk.white(`| IP ${req.ip} ${req.method} ${req.originalUrl}`)
  );
  res.send(response);
}
