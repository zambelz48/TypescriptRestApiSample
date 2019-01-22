import { from, Observable, Subject, of, never } from 'rxjs'
import { distinctUntilChanged, map, flatMap, switchMap } from 'rxjs/operators'
import { Application, PathParams, Response, NextFunction, Request } from 'express-serve-static-core'
import { registerDependencies } from './dependency_resolver'
import { validateJWTToken } from './jwt_utils'

export enum HttpMethod {
  GET, POST, PUT, PATCH, DELETE
}

export interface ConfigTemplate {

  PORT: Number

  appDependencies: any[]

}

export class RouteSpec<T> {
  method: HttpMethod
  secure: Boolean
  endpoint: PathParams
  observable: (request: Request) => Observable<T>

  constructor(method: HttpMethod, secure: Boolean, endpoint: PathParams, observable: (request: Request) => Observable<T>) {
    this.method = method
    this.secure = secure
    this.endpoint = endpoint
    this.observable = observable
  }
}

export class AppEngine {

  private static instance: AppEngine

  private app: Application
  private configObservable = new Subject<ConfigTemplate>()
  private routeObservable = new Subject<RouteSpec<any>[]>()

  private constructor(app: Application) {

    this.app = app

    this.bindObservables()
  }

  static createUsing(app: Application): AppEngine {

    if (!AppEngine.instance) {
      AppEngine.instance = new AppEngine(app)
    }

    return AppEngine.instance
  }

  configureWith(config: ConfigTemplate): AppEngine {

    this.configObservable.next(config)

    return this
  }

  handle(routes: RouteSpec<any>[]) {

    this.routeObservable.next(routes)

  }

  private bindObservables() {

    this.configObservable.asObservable()
      .pipe(distinctUntilChanged())
      .subscribe(config => {
        
        registerDependencies(config.appDependencies)

        this.app.listen(config.PORT, () => {
          console.log(`server running on port ${config.PORT}`)
        })
      }, error => {
        console.log('server error', error)
      })

    this.routeObservable.asObservable()
      .pipe(distinctUntilChanged())
      .pipe(flatMap(routes => from(routes)))
      .subscribe(route => {
        this.handleRoute(route)
      }, error => {
        console.log('routes handling failed', error)
      })
  }

  private handleRoute(route: RouteSpec<any>) {

    const method = route.method
    const isSecure = route.secure
    const path = route.endpoint

    const observable = (request: Request) => {
      
      if (!isSecure) { 
        return route.observable(request) 
      }

      return validateJWTToken(request)
        .pipe(map(result => {
          if (result) {
            return result
          }
          return never
        }))
        .pipe(switchMap(() => route.observable(request)))
    }

    switch (method) {
      case HttpMethod.GET:
        this.app.get(path, (request: Request, response: Response, next: NextFunction) => { 
          this.handleRequest(observable(request), response) 
        })
        break

      case HttpMethod.POST:
        this.app.post(path, (request: Request, response: Response, next: NextFunction) => { 
          this.handleRequest(observable(request), response) 
        })
        break

      case HttpMethod.PUT:
        this.app.put(path, (request: Request, response: Response, next: NextFunction) => { 
          this.handleRequest(observable(request), response) 
        })
        break

      case HttpMethod.PATCH:
        this.app.patch(path, (request: Request, response: Response, next: NextFunction) => { 
          this.handleRequest(observable(request), response) 
        })
        break

      case HttpMethod.DELETE:
        this.app.delete(path, (request: Request, response: Response, next: NextFunction) => { 
          this.handleRequest(observable(request), response) 
        })
        break
    }
  }

  private handleRequest(observable: Observable<any>, response: Response) {
    
    observable.subscribe(
      (result) => {
        response.status(200).send(result)
      }, 
      (error) => {
        response.status(400).send(error)
      })
  }
}
