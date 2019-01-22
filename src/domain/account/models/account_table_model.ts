import { Table, Column, DataType } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'

@Table({ tableName: 'tbl_account' })
export class AccountTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  accountNumber: String

  @Column(DataType.STRING)
  balance: String

  @Column(DataType.STRING)
  status: String
  
}
