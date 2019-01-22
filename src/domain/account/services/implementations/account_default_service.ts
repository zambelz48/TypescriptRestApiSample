import { Observable, defer, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AccountService } from '../interfaces/account_service'
import { AccountOpeningRequestParams, AccountActionRequestParams } from '../../models/account_request_model'
import { BaseResponse, createSuccessResponse, createErrorResponse } from '../../../../utils/models/base_response'
import { ProfileTableModel } from '../../../profile/models/profile_table_model'
import { AccountResponse } from '../../models/account_response_model'
import { AccountTableModel } from '../../models/account_table_model'

export class AccountDefaultService implements AccountService {

  constructor() {}

  create(params: AccountOpeningRequestParams): Observable<BaseResponse<AccountResponse>> {

    let data: any = {
      profile_id: params.profileId,
      status: 'active',
      createdAt: new Date(),
      createdBy: 'unknown'
    }

    if (params.accountNumber && params.accountNumber !== '') {
      data.accountNumber = params.accountNumber
    }

    if (params.balance && params.balance !== '') {
      data.balance = params.balance
    }

    let query: any = undefined
    if (!params.accountId || params.accountId === 0) {
      query = AccountTableModel.create(data, { 
        include: [ ProfileTableModel ]
      })
    } else {
      query = AccountTableModel.update(data, {
        where: { id: params.accountId }
      })
    }

    return defer(() => query)
        .pipe(map(result => (result as AccountTableModel)))
        .pipe(map(result => {
          
          const accountName = result.profile.fullname || 'Unknown'

          const response = createSuccessResponse<AccountResponse>({
            accountNumber: result.accountNumber,
            accountName: accountName,
            balance: result.balance,
            status: result.status
          })

          return response
        }))
        .pipe(catchError((error: Error) => {

          const response = createErrorResponse<AccountResponse>({
            code: '001',
            message: error.message
          })

          return of(response)
        }))
  }

  detail(params: AccountActionRequestParams): Observable<BaseResponse<AccountResponse>> {
    
    const query = AccountTableModel.findOne({
      where: { 
        accountNumber: params.accountNumber 
      },
      include: [ ProfileTableModel ]
    })

    return defer(() => query)
      .pipe(map(result => {
            
        const response = createSuccessResponse<AccountResponse>({
          accountNumber: result.accountNumber,
          accountName: result.profile.fullname,
          balance: result.balance,
          status: result.status
        })

        return response
      }))
      .pipe(catchError((error: Error) => {

        const response = createErrorResponse<AccountResponse>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
  }

}
