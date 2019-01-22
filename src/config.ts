import { ConfigTemplate } from './utils/core/app_engine'
import UtilsDependencies from './utils/dependencies'
import UserDomainDependencies from './domain/user/dependencies'
import ProfileDomainDependencies from './domain/profile/dependencies'
import AccountDomainDependencies from './domain/account/dependencies'

export class DefaultConfig implements ConfigTemplate {

  PORT: Number = 4848

  appDependencies: any[] = [
    UtilsDependencies,
    UserDomainDependencies,
    ProfileDomainDependencies,
    AccountDomainDependencies
  ]

}
