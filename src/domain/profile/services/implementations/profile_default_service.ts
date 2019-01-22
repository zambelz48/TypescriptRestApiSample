import { injectable } from 'tsyringe'
import { Observable, defer, of, from } from 'rxjs'
import { map, catchError, flatMap, toArray } from 'rxjs/operators'
import { ProfileService } from '../interfaces/profile_service'
import { ProfileSaveRequestParams, ProfileActionRequestParams } from '../../models/profile_request_model'
import { BaseResponse, createSuccessResponse, createErrorResponse } from '../../../../utils/models/base_response'
import { ProfileResponse } from '../../models/profile_response_model'
import { ProfileTableModel } from '../../models/profile_table_model'

@injectable()
export class ProfileDefaultService implements ProfileService {

  constructor() {}
  
  save(params: ProfileSaveRequestParams): Observable<BaseResponse<ProfileResponse>> {

    let profileData: any = {
      createdAt: new Date(),
      createdBy: 'unknown'
    }

    if (params.fullname && params.fullname !== '') {
      profileData.fullname = params.fullname
    }

    if (params.address && params.address !== '') {
      profileData.address = params.address
    }

    if (params.phone && params.phone !== '') {
      profileData.phone = params.phone
    }

    if (params.email && params.email !== '') {
      profileData.email = params.email
    }

    let query: any = undefined
    if (!params.profileId || params.profileId === 0) {
      query = ProfileTableModel.create(profileData)
    } else {
      query = ProfileTableModel.update(profileData, {
        where: { id: params.profileId }
      })
    }

    return defer(() => query)
        .pipe(map(result => (result as ProfileTableModel)))
        .pipe(map(result => {
          
          const response = createSuccessResponse<ProfileResponse>({
            profileId: result.id,
            fullname: result.fullname,
            address: result.address,
            phone: result.phone,
            email: result.email
          })

          return response
        }))
        .pipe(catchError((error: Error) => {

          const response = createErrorResponse<ProfileResponse>({
            code: '001',
            message: error.message
          })

          return of(response)
        }))
  }

  detail(params: ProfileActionRequestParams): Observable<BaseResponse<ProfileResponse>> {

    const query = ProfileTableModel.find({
      where: { 
        id: params.profileId 
      }
    })

    return defer(() => query)
      .pipe(map(result => {
            
        const response = createSuccessResponse<ProfileResponse>({
          profileId: result.id,
          fullname: result.fullname,
          address: result.address,
          phone: result.phone,
          email: result.email
        })

        return response
      }))
      .pipe(catchError((error: Error) => {

        const response = createErrorResponse<ProfileResponse>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
  }

  list(): Observable<BaseResponse<ProfileResponse[]>> {

    const query = ProfileTableModel.findAll()
    const flatternObservable = defer(() => query)
      .pipe(flatMap(result => { 
        return from(result)
          .pipe(map(result => {

            const response: ProfileResponse = {
              profileId: result.id,
              fullname: result.fullname,
              address: result.address,
              phone: result.phone,
              email: result.email
            }
    
            return response

          }), toArray())
      }))

    return flatternObservable
      .pipe(map(results => createSuccessResponse(results)))
      .pipe(catchError((error: Error) => {

        const response = createErrorResponse<ProfileResponse[]>({
          code: '001',
          message: error.message
        })

        return of(response)
      }))
  }
}
