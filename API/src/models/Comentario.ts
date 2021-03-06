import { InitObject } from '../utils/types';
import Sequelize from 'sequelize';
import { Base, baseInit, initConfig } from './Base';
import { Empresa } from './Empresa';
import { Usuario } from './Usuario';

export class Comentario extends Base {
  titulo: string;
  conteudo: string;
  Empresa: Empresa;
  EmpresaId: number;
  Usuario: Usuario;
  UsuarioId: number;
  Comentario: Comentario;
  ComentarioId: number;
}

const initObj: InitObject<Comentario> = {
  ...baseInit,
  titulo: {
    type: Sequelize.DataTypes.STRING(300),
    allowNull: false
  },
  conteudo: {
    type: Sequelize.DataTypes.STRING(4000),
    allowNull: false
  }
};

Comentario.init(initObj, initConfig('Comentario'));
