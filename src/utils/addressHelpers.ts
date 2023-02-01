import addresses from 'configs/constants/contracts'
import { Address } from 'configs/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId]
}

export const getIdoAddress = () => {
  return getAddress(addresses.ido)
}

export const getStakeAddress = () => {
  return getAddress(addresses.stake)
}
