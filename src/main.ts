import './dependency_resolver'
import express from 'express'
import bodyParser from 'body-parser'
import { AppRouter } from './utils/router_utils'
import { DefaultConfig } from './config'
import Routes from './routes'
import SequelizeConnector from './utils/sequelize_connector'

SequelizeConnector.subscribe(
  () => console.log('database connected !'), 
  (error) => console.log('database connection failure:', error)
)

const defaultExpress = express()

var cors = require('cors')
defaultExpress.use(cors())

defaultExpress.use(bodyParser.urlencoded({
  extended: true
}))

defaultExpress.use(bodyParser.json())

const config = new DefaultConfig()

AppRouter.createUsing(defaultExpress)
  .configureWith(config)
  .handle(Routes)
