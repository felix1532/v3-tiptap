import type { UIUniqId } from '@/shared/types'
import { uiidPrefix } from '@/shared/types'

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isUIUniqid(id: unknown): id is UIUniqId {
  return isString(id) && id.includes(uiidPrefix)
}
