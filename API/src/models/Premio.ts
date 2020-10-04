import { InitObject } from '../utils/types';
import Sequelize from 'sequelize';
import { Base, baseInit, initConfig } from './Base';
import { Empresa } from './Empresa';
import { Imagem } from './Imagem';

export class Premio extends Base {
  valor: number;
  titulo: string;
  descricao: string;
  empresa: Empresa;
  imagem: Imagem;
}

const initObj: InitObject<Premio> = {
  ...baseInit,
  valor: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  descricao: {
    type: Sequelize.DataTypes.STRING(4000),
    allowNull: false
  }
};

Premio.init(initObj, initConfig('Premio'));
