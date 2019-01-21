import { RouteSpec } from './utils/router_utils'
import UserDomainRoutes from './domain/user/routes'

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
  UserDomainRoutes 
])

export default registeredRoutes
