import express from 'express'
import bodyParser from 'body-parser'
import { AppEngine } from './utils/core/app_engine'
import { DefaultConfig } from './config'
import Routes from './routes'
import SequelizeConnector from './utils/core/sequelize_connector'

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

AppEngine.createUsing(defaultExpress)
  .configureWith(config)
  .handle(Routes)
