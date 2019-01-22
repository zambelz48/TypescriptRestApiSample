import { injectable, inject } from 'tsyringe'
import { Observable, defer, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { BaseResponse, createErrorResponse, createSuccessResponse } from '../../../../utils/models/base_response'
import { UserTableModel } from '../../models/user_table_model'
import { UserService, UserRequestParams, UserResponse } from '../interfaces/user_service'

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
        
        const response = createSuccessResponse<UserResponse>({
          username: result.username
        })

        return response
      }))
      .pipe(catchError((error: Error) => {

        const response = createErrorResponse<UserResponse>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
    
    return observable
  }

}
