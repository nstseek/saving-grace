import { InitObject } from '../utils/types';
import { Base, baseInit, initConfig } from './Base';
import { Empresa } from './Empresa';
import { Usuario } from './Usuario';

export class Favorito extends Base {  
  Empresa: Empresa;
  EmpresaId: number;
  Usuario: Usuario;
  UsuarioId: number;
}

const initObj: InitObject<Favorito> = {
  ...baseInit
};

Favorito.init(initObj, initConfig('Favorito'));