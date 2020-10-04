import { Model, ModelAttributeColumnOptions } from 'sequelize/types';

export type InitObject<T extends Model> = {
  [P in Exclude<
    Exclude<keyof T, keyof Model>,
    'createdAt' | 'updatedAt'
  >]?: ModelAttributeColumnOptions<T>;
};

export interface HttpResponse<T> {
  status: number;
  statusText: string;
  data: T;
  message?: string;
}