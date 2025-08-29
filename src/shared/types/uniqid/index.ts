export const uiidPrefix = 'uiid' as const

export type UIUniqId = `${typeof uiidPrefix}_${string}`
