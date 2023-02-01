import BigNumber from 'bignumber.js'

export interface Address {
  97?: string
  56: string
}

export type Pool = {
  id: number
  idoToken: string
  idoToken2Buy: string
  tokenBuy2IDOtoken: BigNumber
  totalAmount: BigNumber
  remainAmount: BigNumber
  startTime: number
  endTime: number
  vestingPercent: number
  level: number
  status: number
  owner: string
  isWL: boolean
}
