import { AutomaticDeletionDateEnum } from '../enums'

export const automaticDeletionDate = {
  [AutomaticDeletionDateEnum.ONE_HOUR]: 3600000,
  [AutomaticDeletionDateEnum.ONE_DAY]: 86400000,
  [AutomaticDeletionDateEnum.ONE_WEEK]: 604800000,
}
