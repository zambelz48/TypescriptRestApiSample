import { injectable, inject } from 'tsyringe'
import { Observable, defer, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { BaseResponse, createErrorResponse, createSuccessResponse } from '../../../../utils/models/base_response'
import { UserTableModel } from '../../models/user_table_model'
import { UserSaveRequestParams, UserLoginRequestParams } from '../../models/user_request_model'
import { UserResponse, UserLoginResponse } from '../../models/user_response_model'
import { UserService } from '../interfaces/user_service'
import { generateJWTToken } from '../../../../utils/core/jwt_utils'
import { ProfileTableModel } from '../../../profile/models/profile_table_model'

const md5 = require('md5')

@injectable()
export class UserDefaultService implements UserService {

  constructor() {}

  saveUser(params: UserSaveRequestParams): Observable<BaseResponse<UserResponse>> {

    const userData = {
      profile_id: params.profileId,
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

  login(params: UserLoginRequestParams): Observable<BaseResponse<UserLoginResponse>> {

    const query = UserTableModel.findOne({ 
      where: {
        username: params.username,
        password: md5(params.password)
      },
      include: [ ProfileTableModel ] 
    })

    const observable = defer(() => query)
      .pipe(map(result => {
        
        const email = result.profile.email

        const response = createSuccessResponse<UserLoginResponse>({
          token: generateJWTToken(email)
        })

        return response
      }))
      .pipe(catchError((error: Error) => {

        const response = createErrorResponse<UserLoginResponse>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
    
    return observable
  }

}
