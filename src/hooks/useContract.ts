import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Contract } from '@ethersproject/contracts'
import { getBep20Contract } from 'utils/contractHelpers'
import { getContract } from 'utils'
import { getIdoAddress, getStakeAddress } from 'utils/addressHelpers'

import idoAbi from 'configs/abi/idoAbi.json'
import stakeAbi from 'configs/abi/stakeAbi.json'

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(
    () => getBep20Contract(address, library.getSigner()),
    [address, library]
  )
}

export function useIdoContract(): Contract | null {
  return useContract(getIdoAddress(), idoAbi, true)
}

export function useStakeContract(): Contract | null {
  return useContract(getStakeAddress(), stakeAbi, true)
}
