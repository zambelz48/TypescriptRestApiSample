import { Table, Column, DataType } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'

@Table({ tableName: 'tbl_profile' })
export class ProfileTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  fullname: String

  @Column(DataType.STRING)
  address: String
  
}
