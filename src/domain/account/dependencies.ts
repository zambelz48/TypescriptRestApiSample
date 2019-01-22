import { DependencySpec } from '../../utils/core/dependency_resolver'
import { AccountServiceTokenName } from './services/interfaces/account_service'
import { AccountDefaultService } from './services/implementations/account_default_service'

export default [
  new DependencySpec(AccountServiceTokenName, AccountDefaultService)
]
