import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeIdoUpdateModal } from 'features/idoPage/states/idoSlice'
import { Form, message } from 'antd'
import { useIdoContract } from 'hooks/useContract'
import { idoUpdated } from 'features/idoPage/states/idoSlice'

export const useIdoCycleDayForm = (poolId: number) => {
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
        const cycleDay = values.cycleDay
        const tx = await idoContract.setCycleDay(cycleDay)
        await tx.wait()
        setPendingTx(false)
        message.success('Set IDO cycle day successful')
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
