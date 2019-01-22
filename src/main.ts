import express from 'express'
import bodyParser from 'body-parser'
import { registerDependencies } from './utils/core/dependency_resolver'
import { AppRouter } from './utils/core/router_utils'
import { DefaultConfig } from './config'
import Routes from './routes'
import SequelizeConnector from './utils/core/sequelize_connector'
import UtilsDependencies from './utils/dependencies'
import UserDomainDependencies from './domain/user/dependencies'
import ProfileDomainDependencies from './domain/profile/dependencies'
import AccountDomainDependencies from './domain/account/dependencies'

registerDependencies([
  UtilsDependencies,
  UserDomainDependencies,
  ProfileDomainDependencies,
  AccountDomainDependencies
])

SequelizeConnector.subscribe(() => { 
  console.log('database connected !') 
}, (error) => { 
  console.log('database connection failure:', error) 
})

const defaultExpress = express()

const cors = require('cors')
defaultExpress.use(cors())

defaultExpress.use(bodyParser.urlencoded({
  extended: true
}))

defaultExpress.use(bodyParser.json())

const config = new DefaultConfig()

AppRouter.createUsing(defaultExpress)
  .configureWith(config)
  .handle(Routes)
