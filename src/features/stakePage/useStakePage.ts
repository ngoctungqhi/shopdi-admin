import { useStakeContract } from 'hooks/useContract'
import { useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { openStakeSettingDialog } from './states/stakeSlice'

const RANKS = [1, 2, 3, 4, 5]
export const useStakePage = () => {
  const [stakeToken, setStakeToken] = useState('')
  const [stakeInfo, setStakeInfo] = useState([])
  const dispatch = useAppDispatch()
  const triggerUpdateStake = useAppSelector(
    (state) => state.stake.stakeRefreshTrigger
  )

  const isOpenSettingStakeDialog = useAppSelector(
    (state) => state.stake.isOpenStakeSettingDialog
  )

  const stakeContract = useStakeContract()

  useEffect(() => {
    const initialData = async () => {
      const stake = await stakeContract.stakeToken()
      setStakeToken(stake)

      const locktimes = await Promise.all(
        RANKS.map((rank) => {
          return stakeContract.locktime(rank).then((resp) => {
            return { rank, locktime: resp }
          })
        })
      )

      const requireStakes = await Promise.all(
        RANKS.map((rank) => {
          return stakeContract.requireStake(rank - 1).then((resp) => {
            return { rank, requireStake: resp }
          })
        })
      )

      const results = locktimes.map((item, i) =>
        Object.assign({}, item, requireStakes[i])
      )

      setStakeInfo(results)
    }

    initialData()
  }, [stakeContract, triggerUpdateStake])

  const handleOpenSettingStakeDialog = useCallback(() => {
    dispatch(openStakeSettingDialog())
  }, [dispatch])

  return {
    stakeToken,
    stakeInfo,
    handleOpenSettingStakeDialog,
    isOpenSettingStakeDialog,
  }
}
