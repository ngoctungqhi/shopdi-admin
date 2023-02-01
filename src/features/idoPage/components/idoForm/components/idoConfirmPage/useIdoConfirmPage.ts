import { useLazyGetIdoQuery } from 'features/idoPage/apis/idoApis'
import { useTokenInfo } from 'hooks/useTokenInfo'
import { useCallback, useEffect, useState } from 'react'
import { convertWeiToNumber, getDecimalAmount } from 'utils/formatBalance'
import { IdoConfirmPageProps } from './idoConfirmPage'
import { useWeb3React } from '@web3-react/core'
import { openSelectWalletModal } from 'features/app/states/appSlice'
import { useAppDispatch } from 'states/hooks'
import { useApprove } from 'hooks/useApprove'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'configs/constants/contracts'
import { useIdoContract } from 'hooks/useContract'
import { useUpdateIdoMutation } from 'features/idoPage/apis/idoApis'

export const useIdoConfirmPage = (props: IdoConfirmPageProps) => {
  const [lazyGetIdoQuery] = useLazyGetIdoQuery()
  const [updateIdoMutation] = useUpdateIdoMutation()

  const idoAddess = getAddress(addresses.ido)
  const idoContract = useIdoContract()

  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  const [tokenAddress, setTokenAddress] = useState('')
  const [ido, setIdo] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)

  const { name, symbol, decimals } = useTokenInfo(tokenAddress)

  const onApprove = useApprove(tokenAddress, idoAddess)

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()

      const tempIdo = {
        ...result.ido,
        presaleRate: convertWeiToNumber(result.ido.presaleRate),
        totalSell: convertWeiToNumber(result.ido.totalSell),
      }
      setTokenAddress(tempIdo.tokenAddress)
      setIdo(tempIdo)
    }

    if (props.id) {
      initialData(props.id)
    }
  }, [lazyGetIdoQuery, props.id])

  const handleOpenSelectWalletModal = useCallback(() => {
    dispatch(openSelectWalletModal())
  }, [dispatch])

  const handleConfirmButtonClick = async () => {
    if (!props.id) return

    setPendingTx(true)
    // const response = await onApprove()
    // if (!response) return

    const poolLength = await idoContract.poolLength()
    const nextPoolId = Number(poolLength)

    const idoToken = ido.tokenAddress
    const idoToken2buy = ido.currency
    const tokenBuy2IDOtoken = getDecimalAmount(ido.presaleRate).toString(10)
    const totalAmount = getDecimalAmount(ido.totalSell).toString(10)
    const startTime = ido.startTime
    const endTime = ido.endTime
    const tgePercent = ido.tgePercent
    const tgeTime = ido.tgeTime
    const lockingTime = ido.vestingStart - ido.endTime
    const vestingPercent = ido.vestingPercent
    const level = ido.levelBuy
    const isWL = false

    try {
      //Create pool on contract
      const transaction = await idoContract.addPool(
        idoToken,
        idoToken2buy,
        tokenBuy2IDOtoken,
        totalAmount,
        startTime,
        endTime,
        tgePercent,
        tgeTime,
        lockingTime,
        vestingPercent,
        level,
        isWL
      )

      const response = await transaction.wait()

      //Update pool is register to contract
      if (response) {
        await updateIdoMutation({
          _id: props.id,
          isOnchain: true,
          idoContract: [nextPoolId].toString(),
        })
      }

      setPendingTx(false)
    } catch (err) {
      console.log(err)
      setPendingTx(false)
    }
  }

  return {
    ido,
    name,
    symbol,
    decimals,
    account,
    handleOpenSelectWalletModal,
    handleConfirmButtonClick,
    pendingTx,
  }
}
