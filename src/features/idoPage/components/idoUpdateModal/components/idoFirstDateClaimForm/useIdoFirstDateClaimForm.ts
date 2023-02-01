import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeIdoUpdateModal } from 'features/idoPage/states/idoSlice'
import { Form, message } from 'antd'
import { useIdoContract } from 'hooks/useContract'
import { idoUpdated } from 'features/idoPage/states/idoSlice'
import { getUnixTime } from 'date-fns'

export const useIdoFirstDateClaimForm = (poolId: number) => {
  const dispatch = useAppDispatch()
  const idoContract = useIdoContract()
  const [form] = Form.useForm()

  const [pendingTx, setPendingTx] = useState(false)

  const handleCancel = useCallback(() => {
    form.resetFields()
    dispatch(closeIdoUpdateModal())
  }, [dispatch, form])

  const handleSubmitForm = useCallback(
    async (values) => {
      try {
        setPendingTx(true)
        const claimDate = getUnixTime(new Date(values.claimDate))
        const tx = await idoContract.setFirstTimeWait(claimDate)
        await tx.wait()
        setPendingTx(false)
        message.success('Set IDO first claim date successful')
        dispatch(idoUpdated())
      } catch (error) {
        console.log(error)
        setPendingTx(false)
        message.error('Something error')
      }
    },
    [dispatch, idoContract]
  )

  return { handleCancel, handleSubmitForm, pendingTx }
}
