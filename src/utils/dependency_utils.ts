import { InjectionToken } from 'tsyringe'

export class DependencySpec {

  constructor(private injectionToken: InjectionToken, private implementationClass: any) {}

  getInjectionToken(): InjectionToken {
    return this.injectionToken
  }

  getImplementation(): any {
    return this.implementationClass
  }
}
