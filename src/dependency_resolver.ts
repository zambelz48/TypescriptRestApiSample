import 'reflect-metadata'
import { container } from 'tsyringe'
import { DependencySpec } from './utils/dependency_utils'
import UtilsDependencies from './utils/dependencies'
import UserDomainDependencies from './domain/user/dependencies'

const registerDependencies = (dependencies: any) => {
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

/**
 * Register any dependencies here...
 */
registerDependencies([
  UtilsDependencies,
  UserDomainDependencies
])
