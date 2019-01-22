import 'reflect-metadata'
import { container, InjectionToken } from 'tsyringe'

export class DependencySpec {

  constructor(private injectionToken: InjectionToken, private implementationClass: any) {}

  getInjectionToken(): InjectionToken {
    return this.injectionToken
  }

  getImplementation(): any {
    return this.implementationClass
  }
}

export const registerDependencies = (dependencies: any) => {
  dependencies.forEach((dependency: any) => {
    if (Array.isArray(dependency)) {
      registerDependencies(dependency)
      return
    } 
    
    if (dependency instanceof DependencySpec) {
      container.register(dependency.getInjectionToken(), {
        useClass: dependency.getImplementation()
      })
    }
  })
}
