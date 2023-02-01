import { message } from 'antd'
import {
  closeStakeSettingDialog,
  stakeUpdated,
} from 'features/stakePage/states/stakeSlice'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { useStakeContract } from 'hooks/useContract'

export const useSetStakeToken = () => {
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
        const tokenAddress = values.stakeTokenAddress
        const tx = await stakeContract.setStakeToken(tokenAddress)
        await tx.wait()
        setPendingTx(false)
        message.success('Set stake token successful')
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
