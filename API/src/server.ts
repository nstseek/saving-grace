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
import router from './controllers';
import { log } from './utils/log';
import createResponse from './utils/httpResponseFactory';

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
  log(chalk.yellow('Tables synced.'));
}
testDb();

const port = process.env.PORT || 4000;

log(chalk.blue('Creating express instance...'));

const server = express();

log(chalk.blue('Express instantiated.'));

server.use(cors());

server.use(express.json());

server.use(router);

server.get('/', async (req, res) => {
  try {
    createResponse(
      200,
      'Server working just fine! Try to GET one controller.',
      req,
      res
    );
  } catch (e) {
    createResponse(500, e, req, res);
  }
});

const listener = server.listen(port, () => {
  const address = listener.address() as any;
  log(
    chalk.green('Server listening on ' + address.address + ':' + address.port)
  );
});
