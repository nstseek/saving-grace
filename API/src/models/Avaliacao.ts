import { InitObject } from '../utils/types';
import Sequelize from 'sequelize';
import { Base, baseInit, initConfig } from './Base';
import { Empresa } from './Empresa';
import { Usuario } from './Usuario';

export class Avaliacao extends Base {
  titulo: string;
  conteudo: string;
  rating: number;
  Empresa: Empresa;
  EmpresaId: number;
  Usuario: Usuario;
  UsuarioId: number;
}

const initObj: InitObject<Avaliacao> = {
  ...baseInit,
  titulo: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  conteudo: {
    type: Sequelize.DataTypes.STRING(4000),
    allowNull: false
  },
  rating: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
};

Avaliacao.init(initObj, initConfig('Avaliacao'));
