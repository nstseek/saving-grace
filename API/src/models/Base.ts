import Sequelize from 'sequelize';
import sequelize from '../database';
import { InitObject } from '../utils/types';

export class Base extends Sequelize.Model {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export const baseInit: InitObject<Base> = {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};

export function initConfig<T extends Sequelize.Model>(
  tableName: string
): Sequelize.InitOptions<T> {
  return {
    sequelize,
    tableName,
    freezeTableName: true
  };
}
