import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeIdoModal } from 'features/idoPage/states/idoSlice'
import { Form, message } from 'antd'
import { useIdoContract } from 'hooks/useContract'
import { getUnixTime } from 'date-fns'
import { getDecimalAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { idoUpdated } from 'features/idoPage/states/idoSlice'

export const useIdoEntryModal = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const idoContract = useIdoContract()

  const [pendingTx, setPendingTx] = useState(false)

  const handleCancel = useCallback(() => {
    form.resetFields()
    dispatch(closeIdoModal())
  }, [dispatch, form])

  const handleSubmitForm = useCallback(
    async (values) => {
      try {
        setPendingTx(true)
        const idoToken = values.idoToken
        const idoToken2Buy = values.idoToken2Buy
        const tokenBuy2IDOtoken = getDecimalAmount(
          new BigNumber(values.tokenBuy2IDOtoken),
          18
        ).toString(10)
        const totalAmount = getDecimalAmount(
          new BigNumber(values.totalAmount),
          18
        ).toString(10)
        const startTime = getUnixTime(new Date(values.startTime))
        const endTime = getUnixTime(new Date(values.endTime))
        const level = values.level
        const status = values.status
        const vestingPercent = values.vestingPercent
        const isWL = values.isWL ?? false

        const tx = await idoContract.addPool(
          idoToken,
          idoToken2Buy,
          tokenBuy2IDOtoken,
          totalAmount,
          startTime,
          endTime,
          vestingPercent,
          level,
          status,
          isWL
        )

        const result = await tx.wait()
        setPendingTx(false)
        message.success('Add pool successful')
        dispatch(idoUpdated())
        handleCancel()
        console.log(result)
      } catch (error) {
        console.log(error)
        setPendingTx(false)
        message.error('Something error')
      }
    },
    [dispatch, handleCancel, idoContract]
  )

  return { handleCancel, handleSubmitForm, pendingTx }
}
