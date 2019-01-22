import { container } from 'tsyringe'
import { Request } from 'express-serve-static-core'
import { ProfileSaveRequestParams, ProfileActionRequestParams } from '../../models/profile_request_model'
import { ProfileService } from '../interfaces/profile_service'
import { ProfileDefaultService } from '../implementations/profile_default_service'

const profileService: ProfileService = container.resolve(ProfileDefaultService)

export const save = (request: Request) => {

  const reqBody = request.body
  const profileId = reqBody['profileId'] as number
  const fullname = reqBody['fullname'] as string
  const address = reqBody['address'] as string
  const phone = reqBody['phone'] as string
  const email = reqBody['email'] as string

  const requestParams = new ProfileSaveRequestParams()
  if (profileId && profileId >= 0) {
    requestParams.profileId = profileId
  }
  if (fullname && fullname !== '') {
    requestParams.fullname = fullname
  }
  if (address && address !== '') {
    requestParams.address = address
  }
  if (phone && phone !== '') {
    requestParams.phone = phone
  }
  if (email && email !== '') {
    requestParams.email = email
  }

  return profileService.save(requestParams)
}

export const detail = (request: Request) => {

  const reqBody = request.body
  const reqParams: ProfileActionRequestParams = {
    profileId: (reqBody['profileId'] as number)
  }

  return profileService.detail(reqParams)
}

export const list = (request: Request) => {
  return profileService.list()
}
