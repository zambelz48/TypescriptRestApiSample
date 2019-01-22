import { Sequelize } from 'sequelize-typescript'
import { from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { UserTableModel } from '../../domain/user/models/user_table_model'

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

const modelsRegistration = (async () => {
  await sequelize.addModels([ UserTableModel ])
})()

const connectionObservable = from(sequelize.authenticate())
  .pipe(switchMap(() => modelsRegistration))

export default connectionObservable
