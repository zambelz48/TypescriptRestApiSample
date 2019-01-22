import { DependencySpec } from '../../utils/core/dependency_resolver'
import { ProfileServiceTokenName } from './services/interfaces/profile_service'
import { ProfileDefaultService } from './services/implementations/profile_default_service'

export default [
  new DependencySpec(ProfileServiceTokenName, ProfileDefaultService)
]
