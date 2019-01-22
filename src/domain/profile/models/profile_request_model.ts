export class ProfileSaveRequestParams {
  profileId: number = 0
  fullname: String
  address: String
  phone: String
  email: String
}

export class ProfileActionRequestParams {
  profileId: number
}
