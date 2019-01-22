import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class BaseTableModel extends Model<BaseTableModel> {

  @Column(DataType.DATE)
  createdAt?: Date

  @Column(DataType.DATE)
  updatedAt?: Date

  @Column(DataType.STRING)
  createdBy?: String

  @Column(DataType.STRING)
  updatedBy?: String
  
}
