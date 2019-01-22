import { RouteSpec } from './utils/core/app_engine'
import userDomainRoutes from './domain/user/routes'
import profileDomainRoutes from './domain/profile/routes'
import accountDomainRoutes from './domain/account/routes'

const registeredRoutes: RouteSpec<any>[] = new Array()
const registerRoutes = (routes: any) => {
  routes.forEach((route: any) => {
    if (Array.isArray(route)) {
      registerRoutes(route)
      return
    }

    if (route instanceof RouteSpec) {
      registeredRoutes.push(route)
    }
  })
}

registerRoutes([ 
  userDomainRoutes,
  profileDomainRoutes,
  accountDomainRoutes
])

export default registeredRoutes
