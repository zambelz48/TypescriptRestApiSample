import { DependencySpec } from '../../utils/dependency_utils'
import { UserServiceTokenName, UserDefaultService } from './services/user_service'

export default [
  new DependencySpec(UserServiceTokenName, UserDefaultService)
]
