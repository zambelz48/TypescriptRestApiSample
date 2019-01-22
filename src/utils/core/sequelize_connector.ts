import { Sequelize } from 'sequelize-typescript'
import { from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { UserTableModel } from '../../domain/user/models/user_table_model'
import { ProfileTableModel } from '../../domain/profile/models/profile_table_model'
import { AccountTableModel } from '../../domain/account/models/account_table_model'

const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../../database/config/config')[env]

const sequelize = new Sequelize({
  dialect: config.dialect,
  operatorsAliases: Sequelize.Op as any,
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
})

const tabelModels = [
  ProfileTableModel, 
  AccountTableModel, 
  UserTableModel
]
const modelsRegistration = (async () => {
  await sequelize.addModels(tabelModels)
})()

const connectionObservable = from(sequelize.authenticate())
  .pipe(switchMap(() => modelsRegistration))

export default connectionObservable
