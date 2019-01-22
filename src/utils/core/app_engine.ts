import { from, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { Application, PathParams, Response, NextFunction, Request } from 'express-serve-static-core'
import { registerDependencies } from './dependency_resolver'

export enum HttpMethod {
  GET, POST, PUT, PATCH, DELETE
}

export interface ConfigTemplate {

  PORT: Number

  appDependencies: any[]

}

export class RouteSpec<T> {
  method: HttpMethod
  endpoint: PathParams
  observable: (request: Request) => Observable<T>

  constructor(method: HttpMethod, endpoint: PathParams, observable: (request: Request) => Observable<T>) {
    this.method = method
    this.endpoint = endpoint
    this.observable = observable
  }
}

export class AppEngine {

  private static instance: AppEngine

  private app: Application
  private config: ConfigTemplate

  private constructor(app: Application) {
    this.app = app
  }

  static createUsing(app: Application): AppEngine {

    if (!AppEngine.instance) {
      AppEngine.instance = new AppEngine(app)
    }

    return AppEngine.instance
  }

  configureWith(config: ConfigTemplate): AppEngine {

    this.config = config

    registerDependencies(config.appDependencies)
    
    return this
  }

  handle(routes: RouteSpec<any>[]) {

    from(routes)
      .pipe(distinctUntilChanged())
      .subscribe((route: RouteSpec<any>) => this.handleRoute(route))

      this.listen()
  }

  private listen() {

    if (!this.config) {
      return
    }

    const PORT = this.config.PORT
    this.app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    })
  }

  private handleRoute(route: RouteSpec<any>) {

    const method = route.method
    const path = route.endpoint
    const observable = (request: Request) => route.observable(request)

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
