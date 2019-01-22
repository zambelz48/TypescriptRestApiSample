import { Request, Response, NextFunction } from 'express-serve-static-core'
import { Observable, Observer } from 'rxjs';
import { createErrorResponse } from '../models/base_response';

const jwt = require('jsonwebtoken')
const secretKey = 'lfhsiury214yrwhagndadar932qtvhfcridewr23949243qt4@#^%few8*62323TGEVTTE'
const options = { expiresIn: '1d', issuer: 'playgame.com' }

class JWTClaimModel {
  sub: String
  iat: Number
  exp: Number
}

export const generateJWTToken = (email: String) => {

  const payload: JWTClaimModel = {
    sub: email,
    iat: 1,
    exp: 1
  }

  return jwt.sign(payload, secretKey, options)
}

export function validateJWTToken(request: Request): Observable<Boolean> {

  return Observable.create((observer: Observer<Boolean>) => {

    const authorization = request.headers.authorization

    if (!authorization) {
      const errorResponse = createErrorResponse({
        code: '401',
        message: 'Forbidden access'
      })
      observer.error(errorResponse)
      return
    } 

    const token = request.headers.authorization.split(' ')[1]

    jwt.verify(token, secretKey, (error: any, decoded: any) => {

      if (error) {
        const errorResponse = createErrorResponse({
          code: '401',
          message: error.message
        })
        observer.error(errorResponse)
      } else {
        observer.next(true)
      }

      observer.complete()
    })
  })
}
