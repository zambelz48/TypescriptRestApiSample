
import { Observable } from 'rxjs'
import { BaseResponse } from '../../../../utils/models/base_response'
import { UserRequestParams } from '../../models/user_request_model'
import { UserResponse } from '../../models/user_response_model'

export const UserServiceTokenName = 'UserService'
export interface UserService {
  saveUser(params: UserRequestParams): Observable<BaseResponse<UserResponse>>
}
