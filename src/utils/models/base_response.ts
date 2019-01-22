
export enum ResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed'
}

export class ErrorResponse {
  code: String
  message: String
}

export class BaseResponse<T> {
  status: ResponseStatus = ResponseStatus.SUCCESS
  error?: ErrorResponse = undefined
  response?: T
}

export function createSuccessResponse<T>(response: T): BaseResponse<T> {

  const result = new BaseResponse<T>()
  result.status = ResponseStatus.SUCCESS
  result.error = undefined
  result.response = response

  return result
}

export function createErrorResponse<T>(errorResponse: ErrorResponse): BaseResponse<T> {

  const result = new BaseResponse<T>()
  result.status = ResponseStatus.FAILED
  result.error = errorResponse
  result.response = undefined

  return result
}
