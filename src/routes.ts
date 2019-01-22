import { RouteSpec } from './utils/core/router_utils'
import userDomainRoutes from './domain/user/routes'
import profileDomainRoutes from './domain/profile/routes'

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
  profileDomainRoutes
])

export default registeredRoutes
