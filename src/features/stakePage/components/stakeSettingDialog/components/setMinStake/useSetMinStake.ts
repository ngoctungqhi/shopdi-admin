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

export const useSetMinStake = () => {
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
        const minStakeAmount = getDecimalAmount(
          new BigNumber(values.minStake),
          18
        ).toString(10)
        const tx = await stakeContract.setMinStake(minStakeAmount)
        await tx.wait()
        setPendingTx(false)
        message.success('Set min stake successful')
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
