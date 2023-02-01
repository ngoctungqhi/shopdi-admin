import { useCallback, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeIdoUpdateModal } from 'features/idoPage/states/idoSlice'
import { Form, message } from 'antd'
import { useIdoContract } from 'hooks/useContract'
import { idoUpdated } from 'features/idoPage/states/idoSlice'
import { getUnixTime } from 'date-fns'
import { getDecimalAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { getStakeAddress } from 'utils/addressHelpers'

export const useIdoBuyLimitForm = (poolId: number) => {
  const dispatch = useAppDispatch()
  const idoContract = useIdoContract()
  const [form] = Form.useForm()

  const [pendingTx, setPendingTx] = useState(false)
  const [isBuyByRank, setIsBuyByRank] = useState(true)

  const stakeAddress = getStakeAddress()

  const handleCancel = useCallback(() => {
    form.resetFields()
    dispatch(closeIdoUpdateModal())
  }, [dispatch, form])

  const handleSubmitForm = useCallback(
    async (values) => {
      try {
        setPendingTx(true)
        let startTime = [getUnixTime(new Date(values['endTime-0']))]
        let endTime = [getUnixTime(new Date(values['startTime-0']))]
        let minAmount = ['0']
        let maxAmount = ['0']
        if (isBuyByRank) {
          for (let i = 0; i < 5; i++) {
            startTime.push(getUnixTime(new Date(values[`startTime-${i}`])))
            endTime.push(getUnixTime(new Date(values[`endTime-${i}`])))
            minAmount.push(
              getDecimalAmount(
                new BigNumber(values[`minAmount-${i}`]),
                18
              ).toString(10)
            )
            maxAmount.push(
              getDecimalAmount(
                new BigNumber(values[`maxAmount-${i}`]),
                18
              ).toString(10)
            )
          }
        } else {
          for (let i = 0; i < 5; i++) {
            startTime.push(getUnixTime(new Date(values['startTime-0'])))
            endTime.push(getUnixTime(new Date(values['endTime-0'])))
            minAmount.push(
              getDecimalAmount(
                new BigNumber(values['minAmount-0']),
                18
              ).toString(10)
            )
            maxAmount.push(
              getDecimalAmount(
                new BigNumber(values['maxAmount-0']),
                18
              ).toString(10)
            )
          }
        }

        const tx = await idoContract.setMinMax(
          poolId,
          startTime,
          endTime,
          minAmount,
          maxAmount,
          stakeAddress
        )
        await tx.wait()
        setPendingTx(false)
        message.success('Set IDO min max successful')
        dispatch(idoUpdated())
      } catch (error) {
        console.log(error)
        setPendingTx(false)
        message.error('Something error')
      }
    },
    [dispatch, idoContract, isBuyByRank, poolId, stakeAddress]
  )

  const handleChangeSwitch = useCallback((checked: boolean) => {
    setIsBuyByRank(checked)
  }, [])

  return {
    handleCancel,
    handleSubmitForm,
    pendingTx,
    handleChangeSwitch,
    isBuyByRank,
  }
}
