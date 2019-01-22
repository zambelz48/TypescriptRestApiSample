
import { Observable } from 'rxjs'
import { BaseResponse } from '../../../../utils/models/base_response'
import { UserSaveRequestParams, UserLoginRequestParams } from '../../models/user_request_model'
import { UserResponse, UserLoginResponse } from '../../models/user_response_model'

export const UserServiceTokenName = 'UserService'
export interface UserService {

  saveUser(params: UserSaveRequestParams): Observable<BaseResponse<UserResponse>>

  login(params: UserLoginRequestParams): Observable<BaseResponse<UserLoginResponse>>

}
