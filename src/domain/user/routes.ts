import { HttpMethod, RouteSpec } from '../../utils/core/router_utils'
import * as userController from './services/controllers/user_controller'

export default [
  new RouteSpec(HttpMethod.GET, '/api/user/save', userController.saveUser)
]
