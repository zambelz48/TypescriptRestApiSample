import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseTableModel } from '../utils/base_table_model'

@Table({ tableName: 'User' })
export class UserTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  username: String

  @Column(DataType.STRING)
  password: String
  
}
