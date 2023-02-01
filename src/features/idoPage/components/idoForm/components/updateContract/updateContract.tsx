import { Button, Input } from 'antd'
import { LEVEL_LIST } from 'configs/constants/constants'
import { format } from 'date-fns'
import { convertWeiToNumber } from 'utils/formatBalance'
import { useUpdateContract } from './useUpdateContract'

export type UpdateContractProps = {
  currentStep: number
  onPrevStep: () => void
  id?: string | undefined
}

export const UpdateContract = (props: UpdateContractProps) => {
  const {
    account,
    handleOpenSelectWalletModal,
    ido,
    handleSetCycleDays,
    pendingTxCycleDay,
    handleRankSetting,
    pendingTxRank,
  } = useUpdateContract(props)
  return ido ? (
    <div>
      <div className="relative border border-solid border-[#D0D0D0] rounded-lg mt-8 px-8 pt-8 pb-5 mb-8">
        <span
          className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
          style={{ transform: 'translateY(-50%)' }}
        >
          Vesting cycle days (minutes)
        </span>
        <div className="flex gap-x-2">
          <Input readOnly={true} value={ido.cycleVestingDay / 60} />
          {account ? (
            <Button
              type="primary"
              onClick={handleSetCycleDays}
              loading={pendingTxCycleDay}
            >
              Register
            </Button>
          ) : (
            <Button type="primary" onClick={handleOpenSelectWalletModal}>
              Connect wallet
            </Button>
          )}
        </div>
      </div>
      <div className="relative border border-solid border-[#D0D0D0] rounded-lg mt-8 px-8 pt-8 pb-5 mb-8">
        <span
          className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
          style={{ transform: 'translateY(-50%)' }}
        >
          Rank limit
        </span>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <span>Cycle vesting day</span>
            <Input
              readOnly={true}
              value={format(ido.vestingStart * 1000, 'Pp')}
              className="w-1/4"
            />
          </div>
          <div>
            <div className="flex w-full">
              <div className="w-[10%] font-semibold bg-gray-300 px-5 py-2">
                Rank
              </div>
              <div className="w-[200px] font-semibold bg-gray-300 px-5 py-2">
                Start time
              </div>
              <div className="w-[200px] font-semibold bg-gray-300 px-5 py-2">
                End time
              </div>
              <div className="w-[10%] font-semibold bg-gray-300 px-5 py-2">
                Min buy
              </div>
              <div className="w-[10%] font-semibold bg-gray-300 px-5 py-2">
                Max buy
              </div>
            </div>
            {ido &&
              ido.ranks &&
              ido.ranks.map((rank, index) => {
                return (
                  <div className="flex w-full" key={index}>
                    <div className="w-[10%] px-5 py-2">
                      {LEVEL_LIST.find((item) => item.value === index).label}
                    </div>
                    <div className="w-[200px] px-5 py-2">
                      {format(rank.startTime * 1000, 'Pp')}
                    </div>
                    <div className="w-[200px] px-5 py-2">
                      {format(rank.endTime * 1000, 'Pp')}
                    </div>
                    <div className="w-[10%] px-5 py-2">
                      {convertWeiToNumber(rank.minBuy)}
                    </div>
                    <div className="w-[10%] px-5 py-2">
                      {convertWeiToNumber(rank.maxBuy)}
                    </div>
                  </div>
                )
              })}
          </div>
          <div>
            {account ? (
              <Button
                type="primary"
                onClick={handleRankSetting}
                loading={pendingTxRank}
              >
                Register
              </Button>
            ) : (
              <Button type="primary" onClick={handleOpenSelectWalletModal}>
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
