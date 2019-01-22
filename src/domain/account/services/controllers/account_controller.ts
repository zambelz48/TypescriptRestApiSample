import { container } from 'tsyringe'
import { Request } from 'express-serve-static-core'
import { AccountDefaultService } from '../implementations/account_default_service'
import { AccountOpeningRequestParams, AccountActionRequestParams } from '../../models/account_request_model'

const accountController = container.resolve(AccountDefaultService)

export const create = (request: Request) => {

  const reqBody = request.body
  const accountId: number = reqBody.accountId || 0
  const profileId: number = reqBody.profileId

  const requestParams: AccountOpeningRequestParams = {
    accountId: accountId,
    profileId: profileId,
    accountNumber: (reqBody.accountNumber as String),
    balance: (reqBody.balance as String)
  }
  
  return accountController.create(requestParams)
}

export const detail = (request: Request) => {

  const reqBody = request.body
  const requestParams: AccountActionRequestParams = {
    accountNumber: reqBody.accountNumber
  }

  return accountController.detail(requestParams)
}
