import { HttpMethod, RouteSpec } from '../../utils/core/app_engine'
import * as accountController from './services/controllers/account_controller'

export default [
  new RouteSpec(HttpMethod.POST, true, '/api/account/create', accountController.create),
  new RouteSpec(HttpMethod.POST, true, '/api/account/detail', accountController.detail),
]
