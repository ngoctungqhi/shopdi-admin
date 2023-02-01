import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useERC20 } from './useContract'

export const useApprove = (tokenAddress: string, spenderAddress: string) => {
  const tokenContract = useERC20(tokenAddress)

  const onApprove =
    useCallback(async (): Promise<ethers.providers.TransactionReceipt> => {
      try {
        const tx = await tokenContract.approve(
          spenderAddress,
          ethers.constants.MaxInt256
        )
        return tx.wait()
      } catch (err) {
        console.log(err)
      }
    }, [spenderAddress, tokenContract])

  return onApprove
}
