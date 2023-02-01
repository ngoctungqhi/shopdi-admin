export type InsertIdoRequest = {
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
  website?: string
  logo?: string
  banner?: string
  facebook?: string
  telegramChannel?: string
  telegramGroup?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
  isAudit?: boolean
  isKYC?: boolean
  certificate?: string
  shortDescription?: string
  info?: string
  team?: string
  ranks?: Rank[]
  kols?: Kols
}

type Kols = {
  totalSell: number
  slots: KolsSlot[]
}

type KolsSlot = {
  address: string
  maxBuy: number
}

type Rank = {
  startTime: number
  endTime: number
  minBuy: number
  maxBuy: number
}
