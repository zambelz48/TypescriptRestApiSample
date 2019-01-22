import { HttpMethod, RouteSpec } from '../../utils/core/app_engine'
import * as userController from './services/controllers/user_controller'

export default [
  new RouteSpec(HttpMethod.POST, false, '/api/user/save', userController.saveUser),
  new RouteSpec(HttpMethod.POST, false, '/api/user/login', userController.login)
]
