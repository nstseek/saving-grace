import Sequelize from 'sequelize';
import { InitObject } from '../utils/types';
import { Base, baseInit, initConfig } from './Base';
import { Imagem } from './Imagem';

export class Usuario extends Base {
  nome: string;
  saldo: number;
  email: string;
  senha: string;
  cnpj?: string;
  cpf?: string;
  Imagem?: Imagem;
  ImagemId: number;
}

const initObj: InitObject<Usuario> = {
  ...baseInit,
  cnpj: {
    type: Sequelize.DataTypes.STRING(14),
    allowNull: true
  },
  cpf: {
    type: Sequelize.DataTypes.STRING(11),
    allowNull: true
  },
  email: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  nome: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  saldo: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  senha: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  }
};

Usuario.init(
  initObj,
  initConfig('Usuario')
);

