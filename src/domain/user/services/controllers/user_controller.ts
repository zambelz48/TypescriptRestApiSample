import { container } from 'tsyringe'
import { Request } from 'express-serve-static-core'
import { UserSaveRequestParams, UserLoginRequestParams } from '../../models/user_request_model'
import { UserService } from '../interfaces/user_service'
import { UserDefaultService } from '../implementations/user_default_service'

const userService: UserService = container.resolve(UserDefaultService)

export const saveUser = (request: Request) => {

  const reqBody = request.body
  const requestParams: UserSaveRequestParams = {
    profileId: reqBody.profileId,
    username: reqBody.username,
    password: reqBody.password
  }

  return userService.saveUser(requestParams)
}

export const login = (request: Request) => {

  const reqBody = request.body
  const requestParams: UserLoginRequestParams = {
    username: reqBody.username,
    password: reqBody.password
  }

  return userService.login(requestParams)
}
