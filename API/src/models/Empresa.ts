import Sequelize from 'sequelize';
import { InitObject } from '../utils/types';
import { Base, baseInit, initConfig } from './Base';
import { Usuario } from './Usuario';

export class Empresa extends Base {
  nome: string;
  descricao: string;
  saldo: number;
  Usuario: Usuario;
  UsuarioId: number;
  website?: string;
  facebook?: string;
  twitter?: string;
  dataLimite?: string;
  instagram?: string;
  youtube?: string;
}

const initObj: InitObject<Empresa> = {
  ...baseInit,
  dataLimite: {
    type: Sequelize.DataTypes.DATE
  },
  descricao: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  },
  facebook: {
    type: Sequelize.DataTypes.STRING(300)
  },
  instagram: {
    type: Sequelize.DataTypes.STRING(300)
  },
  nome: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  saldo: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  twitter: {
    type: Sequelize.DataTypes.STRING(300)
  },
  website: {
    type: Sequelize.DataTypes.STRING(300)
  },
  youtube: {
    type: Sequelize.DataTypes.STRING(300)
  }
};

Empresa.init(initObj, initConfig('Empresa'));


