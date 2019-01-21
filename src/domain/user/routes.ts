import { UserService, UserDefaultService } from './services/user_service'
import { container } from 'tsyringe'
import { HttpMethod, RouteSpec } from '../../utils/router_utils'
import { Request } from 'express-serve-static-core'

const saveUser = (request: Request) => {
  
  const reqBody = request.body
  const service: UserService = container.resolve(UserDefaultService)

  return service.saveUser({
    username: reqBody['username'],
    password: reqBody['password']
  })
}

export default [
  new RouteSpec(HttpMethod.GET, '/api/user/save', saveUser)
]
