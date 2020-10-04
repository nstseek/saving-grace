import Sequelize from 'sequelize';
import { InitObject } from '../utils/types';
import { Base, initConfig } from './Base';
import { Empresa } from './Empresa';

export class Imagem extends Base {
  nomeArquivo: string;
  conteudo: Uint8Array;
  Empresa: Empresa;
  EmpresaId: number;
}

const initObj: InitObject<Imagem> = {
  conteudo: {
    type: Sequelize.DataTypes.BLOB,
    allowNull: false
  },
  nomeArquivo: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  }
};

Imagem.init(initObj, initConfig('Imagem'));

