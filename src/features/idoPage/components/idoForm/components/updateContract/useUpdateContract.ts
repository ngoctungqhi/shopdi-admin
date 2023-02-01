import { useWeb3React } from '@web3-react/core'
import { openSelectWalletModal } from 'features/app/states/appSlice'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import { useLazyGetIdoQuery } from 'features/idoPage/apis/idoApis'
import { convertWeiToNumber } from 'utils/formatBalance'
import { UpdateContractProps } from './updateContract'
import { getUnixTime } from 'date-fns'
import { useIdoContract } from 'hooks/useContract'
import { message } from 'antd'

export const useUpdateContract = (props: UpdateContractProps) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const idoContract = useIdoContract()

  const [lazyGetIdoQuery] = useLazyGetIdoQuery()

  const [ido, setIdo] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()

      const tempIdo = {
        ...result.ido,
        presaleRate: convertWeiToNumber(result.ido.presaleRate),
        totalSell: convertWeiToNumber(result.ido.totalSell),
      }

      setIdo(tempIdo)
    }

    if (props.id) {
      initialData(props.id)
    }
  }, [lazyGetIdoQuery, props.id])

  const handleOpenSelectWalletModal = useCallback(() => {
    dispatch(openSelectWalletModal())
  }, [dispatch])

  const [pendingTxCycleDay, setPendingTxCycleDay] = useState(false)
  const handleSetCycleDays = useCallback(async () => {
    try {
      if (!ido) return

      setPendingTxCycleDay(true)
      const tx = await idoContract.setCycleDay(ido.cycleVestingDay)
      await tx.wait()
      setPendingTxCycleDay(false)
      message.success('Seting cycle day successful')
    } catch (err) {
      setPendingTxCycleDay(false)
      message.error(err as string)
    }
  }, [ido, idoContract])

  const [pendingTxRank, setPendingTxRank] = useState(false)
  const handleRankSetting = useCallback(async () => {
    try {
      if (!ido) return

      setPendingTxRank(true)
      const pid = Number(ido.idoContract)
      const startTime = []
      const endTime = []
      const minBuy = []
      const maxBuy = []
      ido.ranks.forEach((rank) => {
        startTime.push(rank.startTime)
        endTime.push(rank.endTime)
        minBuy.push(rank.minBuy.toString())
        maxBuy.push(rank.maxBuy.toString())
      })

      const cycleVestingDay = ido.vestingStart
      const tx = await idoContract.setMinMax(
        pid,
        startTime,
        endTime,
        minBuy,
        maxBuy,
        cycleVestingDay
      )

      await tx.wait()
      setPendingTxRank(false)
    } catch (err) {
      console.log(err)
      setPendingTxRank(false)
      message.error(err as string)
    }
  }, [ido, idoContract])

  return {
    account,
    handleOpenSelectWalletModal,
    ido,
    handleSetCycleDays,
    pendingTxCycleDay,
    handleRankSetting,
    pendingTxRank,
  }
}
