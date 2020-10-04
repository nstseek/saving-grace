import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import sequelize from './database';
import { Usuario } from './models/Usuario';
import { Empresa } from './models/Empresa';
import { Imagem } from './models/Imagem';
import { Comentario } from './models/Comentario';
import { Avaliacao } from './models/Avaliacao';
import { Premio } from './models/Premio';
import { Transacao } from './models/Transacao';
import { Favorito } from './models/Favorito';
import './models/Relations';

export function log(...args: string[]) {
  console.log(
    chalk.bold(chalk.gray(`[${new Date().toISOString()}]:`)),
    ...args
  );
}

log(chalk.blueBright('Starting server...'));
async function testDb() {
  log(chalk.yellow('Testing database connection...'));
  await sequelize.authenticate();
  log(chalk.yellow('Database connected.'));
  log(chalk.yellow('Synchronizing tables...'));
  await Avaliacao.sync();
  await Comentario.sync();
  await Empresa.sync();
  await Favorito.sync();
  await Imagem.sync();
  await Premio.sync();
  await Transacao.sync();
  await Usuario.sync();
}
testDb();

const port = process.env.PORT || 4000;

log(chalk.blue('Creating express instance...'));

const server = express();

log(chalk.blue('Express instantiated.'));

server.use((req, res, next) => {
  let color = chalk.blue;
  if (res.statusCode >= 200 && res.statusCode < 300) {
    color = chalk.green;
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    color = chalk.yellow;
  } else if (res.statusCode >= 400) {
    color = chalk.red;
  }
  log(
    color(`${res.statusCode} ${res.statusMessage}`),
    chalk.white(`| IP ${req.ip} ${req.method} ${req.path}`)
  );
  next();
});

server.use(cors());

server.use(express.json());

server.get('/', async (_req, res) => {
  try {
    res.send(await Usuario.findAll());
  } catch (e) {
    res.send(e);
  }
});

const listener = server.listen(port, () => {
  const address = listener.address() as any;
  log(
    chalk.green('Server listening on ' + address.address + ':' + address.port)
  );
});
