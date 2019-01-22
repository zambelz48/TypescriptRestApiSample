import { Observable } from 'rxjs'
import { BaseResponse } from '../../../../utils/models/base_response'
import { AccountResponse } from '../../models/account_response_model'
import { AccountOpeningRequestParams, AccountActionRequestParams } from '../../models/account_request_model'

export const AccountServiceTokenName = 'AccountService'
export interface AccountService {

  create(params: AccountOpeningRequestParams): Observable<BaseResponse<AccountResponse>>

  detail(params: AccountActionRequestParams): Observable<BaseResponse<AccountResponse>>

}
