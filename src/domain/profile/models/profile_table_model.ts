import { Table, Column, DataType, HasMany } from 'sequelize-typescript'
import { BaseTableModel } from '../../../utils/models/base_table_model'
import { AccountTableModel } from '../../account/models/account_table_model'
import { UserTableModel } from '../../user/models/user_table_model'

@Table({ tableName: 'tbl_profile' })
export class ProfileTableModel extends BaseTableModel {

  @Column(DataType.STRING)
  fullname: String

  @Column(DataType.STRING)
  address: String

  @Column(DataType.STRING)
  phone: String

  @Column(DataType.STRING)
  email: String

  @HasMany(() => UserTableModel)
  users: UserTableModel[]

  @HasMany(() => AccountTableModel)
  accounts: AccountTableModel[]
  
}
