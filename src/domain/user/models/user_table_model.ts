import { Table, Column, DataType } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'

@Table({ tableName: 'tbl_user' })
export class UserTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  username: String

  @Column(DataType.STRING)
  password: String
  
}
