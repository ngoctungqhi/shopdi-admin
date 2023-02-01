import { message } from 'antd'
import {
  closeStakeSettingDialog,
  stakeUpdated,
} from 'features/stakePage/states/stakeSlice'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { useStakeContract } from 'hooks/useContract'
import { getDecimalAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

export const useSetRequireStake = () => {
  const dispatch = useAppDispatch()
  const stakeContract = useStakeContract()

  const [pendingTx, setPendingTx] = useState(false)

  const handleCancel = useCallback(() => {
    dispatch(closeStakeSettingDialog())
  }, [dispatch])

  const handleSubmitForm = useCallback(
    async (values) => {
      try {
        setPendingTx(true)
        let requireStake = ['0']
        for (let i = 0; i < 5; i++) {
          const requireAmount = getDecimalAmount(
            new BigNumber(values[`requireStake-${i}`]),
            18
          ).toString(10)
          requireStake.push(requireAmount)
        }
        const tx = await stakeContract.setRequireStake(requireStake)
        await tx.wait()
        setPendingTx(false)
        message.success('Set stake rank require stake successful')
        dispatch(stakeUpdated())
      } catch (error) {
        console.log(error)
        setPendingTx(false)
        message.error('Something error')
      }
    },
    [dispatch, stakeContract]
  )

  return { handleSubmitForm, handleCancel, pendingTx }
}
