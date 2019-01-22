import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'
import { ProfileTableModel } from '../../profile/models/profile_table_model'

@Table({ tableName: 'tbl_account' })
export class AccountTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  accountNumber: String

  @Column(DataType.STRING)
  balance: String

  @Column(DataType.STRING)
  status: String
  
  @ForeignKey(() => ProfileTableModel)
  @Column
  profile_id: number

  @BelongsTo(() => ProfileTableModel, 'id')
  profile: ProfileTableModel

}
