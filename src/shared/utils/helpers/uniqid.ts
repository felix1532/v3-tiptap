import { v4 as uuidv4 } from 'uuid'
import type { UIUniqId } from '@/shared/types'
import { uiidPrefix } from '@/shared/types'

export const uuid = () => {
  return uuidv4()
}

export function getUIUniqId(): UIUniqId {
  return `${uiidPrefix}_${uuid()}`
}
