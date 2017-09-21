import { Table, Column, Model, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'clients'
})
export class Client extends Model<Client> {
  @Column
  name: string;

  @Column
  phone: string;

  @Column
  email: string;

  @Column
  birthday: Date;

  @Column
  address: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export const clientSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    birthday: {
      type: 'string',
      format: 'date'
    },
    address: {
      type: 'string'
    }
  }
};
