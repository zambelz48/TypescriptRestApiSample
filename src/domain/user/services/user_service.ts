import { injectable, inject } from 'tsyringe'
import { UserTableModel } from '../models/user_table_model'
import { Observable, defer, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { BaseResponse } from '../../../utils/base_response'

export class UserRequestParams {
  username: String
  password: String
}

export class UserResponse {
  username: String
}

export const UserServiceTokenName = 'UserService'
export interface UserService {
  saveUser(params: UserRequestParams): Observable<BaseResponse<UserResponse>>
}

@injectable()
export class UserDefaultService implements UserService {

  constructor() {}

  saveUser(params: UserRequestParams): Observable<BaseResponse<UserResponse>> {

    const md5 = require('md5')
    const userData = {
      username: params.username,
      password: md5(params.password),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const query = UserTableModel.create(userData)

    const observable = defer(() => query)
      .pipe(map(result => {
        
        const response = BaseResponse.CreateSuccessResponse<UserResponse>({
          username: result.username
        })

        return response
      }))
      .pipe(catchError((error: Error) => {

        const response = BaseResponse.CreateErrorResponse<UserResponse>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
    
    return observable
  }

}
