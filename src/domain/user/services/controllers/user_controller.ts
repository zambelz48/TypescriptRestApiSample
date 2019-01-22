import { container } from 'tsyringe'
import { Request } from 'express-serve-static-core'
import { UserService, UserRequestParams } from '../interfaces/user_service'
import { UserDefaultService } from '../implementations/user_default_service'

const userService: UserService = container.resolve(UserDefaultService)

export const saveUser = (request: Request) => {

  const reqBody = request.body
  const requestParams: UserRequestParams = {
    username: reqBody['username'],
    password: reqBody['password']
  }

  return userService.saveUser(requestParams)
}
