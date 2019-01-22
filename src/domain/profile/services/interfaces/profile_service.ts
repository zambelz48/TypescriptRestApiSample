import { Observable } from 'rxjs'
import { BaseResponse } from '../../../../utils/models/base_response'
import { ProfileSaveRequestParams, ProfileActionRequestParams } from '../../models/profile_request_model'
import { ProfileResponse } from '../../models/profile_response_model'

export const ProfileServiceTokenName = 'ProfileService'
export interface ProfileService {
  
  save(params: ProfileSaveRequestParams): Observable<BaseResponse<ProfileResponse>>

  detail(params: ProfileActionRequestParams): Observable<BaseResponse<ProfileResponse>>

  list(): Observable<BaseResponse<ProfileResponse[]>>

}
