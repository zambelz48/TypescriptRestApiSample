import { HttpMethod, RouteSpec } from '../../utils/core/router_utils'
import * as profileController from './services/controllers/profile_controller'

export default [
  new RouteSpec(HttpMethod.POST, '/api/profile/save', profileController.save),
  new RouteSpec(HttpMethod.POST, '/api/profile/detail', profileController.detail),
  new RouteSpec(HttpMethod.GET, '/api/profile/list', profileController.list)
]
