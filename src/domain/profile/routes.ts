import { HttpMethod, RouteSpec } from '../../utils/core/app_engine'
import * as profileController from './services/controllers/profile_controller'

export default [
  new RouteSpec(HttpMethod.POST, true, '/api/profile/save', profileController.save),
  new RouteSpec(HttpMethod.POST, false, '/api/profile/detail', profileController.detail),
  new RouteSpec(HttpMethod.GET, true, '/api/profile/list', profileController.list)
]
