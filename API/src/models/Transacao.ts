import { InitObject } from '../utils/types';
import Sequelize from 'sequelize';
import { Base, baseInit, initConfig } from './Base';
import { Empresa } from './Empresa';
import { Usuario } from './Usuario';

export class Transacao extends Base {
  valor: number;
  empresa: Empresa;
  usuario: Usuario;
}

const initObj: InitObject<Transacao> = {
  ...baseInit,
  valor: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
};

Transacao.init(initObj, initConfig('Transacao'));
