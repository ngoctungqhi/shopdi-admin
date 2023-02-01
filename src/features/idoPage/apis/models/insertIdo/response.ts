export type InsertIdoResponse = {
  _id: string
  tokenAddress: string
  currency: string
  presaleRate: string
  totalSell: string
  startTime: number
  endTime: number
  levelBuy: number
  tgePercent: number
  tgeTime: number
  feePercent: number
  canRefund: boolean
  vestingStart: number
  cycleVestingDay: number
  vestingPercent: number
  website: string | null
  logo: string | null
  banner: string | null
  facebook: string | null
  telegramChannel: string | null
  telegramGroup: string | null
  twitter: string
  instagram: string | null
  youtube: string | null
  tiktok: string | null
  isAudit: boolean | null
  isKYC: boolean | null
  certificate: string | null
  shortDescription: string | null
  info: string | null
  team: string | null
  ranks: Rank[] | null
  kols: Kols | null
}

export type Kols = {
  totalSell: number
  slots: KolsSlot[]
}

export type KolsSlot = {
  address: string
  maxBuy: number
}

export type Rank = {
  startTime: number
  endTime: number
  minBuy: number
  maxBuy: number
}
