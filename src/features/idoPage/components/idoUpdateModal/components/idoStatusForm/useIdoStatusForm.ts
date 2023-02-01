import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeIdoUpdateModal } from 'features/idoPage/states/idoSlice'
import { Form, message } from 'antd'
import { useIdoContract } from 'hooks/useContract'
import { idoUpdated } from 'features/idoPage/states/idoSlice'

export const useIdoStatusForm = (poolId: number) => {
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
        const status = values.status
        const tx = await idoContract.setIDOSatus(poolId, status)
        await tx.wait()
        setPendingTx(false)
        message.success('Set IDO status successful')
        dispatch(idoUpdated())
      } catch (error) {
        console.log(error)
        setPendingTx(false)
        message.error('Something error')
      }
    },
    [dispatch, idoContract, poolId]
  )

  return { handleCancel, handleSubmitForm, pendingTx }
}
