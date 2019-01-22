import { DependencySpec } from '../../utils/core/dependency_resolver'
import { UserServiceTokenName } from './services/interfaces/user_service'
import { UserDefaultService } from './services/implementations/user_default_service'

export default [
  new DependencySpec(UserServiceTokenName, UserDefaultService)
]
