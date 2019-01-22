
import { Observable } from 'rxjs'
import { BaseResponse } from '../../../../utils/models/base_response'

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
