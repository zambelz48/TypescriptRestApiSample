import { RouteSpec } from './utils/core/router_utils'

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

const userDomainRoutes = require('./domain/user/routes')

registerRoutes([ 
  userDomainRoutes 
])

export default registeredRoutes
