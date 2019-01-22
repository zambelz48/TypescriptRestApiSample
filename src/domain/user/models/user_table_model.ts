import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'
import { ProfileTableModel } from '../../profile/models/profile_table_model'

@Table({ tableName: 'tbl_user' })
export class UserTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  username: String

  @Column(DataType.STRING)
  password: String
  
  @ForeignKey(() => ProfileTableModel)
  @Column
  profile_id: number

  @BelongsTo(() => ProfileTableModel, 'id')
  profile: ProfileTableModel
  
}
