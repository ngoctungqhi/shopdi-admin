import { LEVEL_LIST } from 'configs/constants/constants'
import { format } from 'date-fns'
import { convertWeiToNumber } from 'utils/formatBalance'

export const Limit = ({ ido }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-[10%] font-semibold bg-gray-300 px-5 py-1">Rank</div>
        <div className="w-[200px] font-semibold bg-gray-300 px-5 py-1">
          Start time
        </div>
        <div className="w-[200px] font-semibold bg-gray-300 px-5 py-1">
          End time
        </div>
        <div className="w-[10%] font-semibold bg-gray-300 px-5 py-1">
          Min buy
        </div>
        <div className="w-[10%] font-semibold bg-gray-300 px-5 py-1">
          Max buy
        </div>
      </div>
      {ido.ranks &&
        ido.ranks.map((rank, index) => {
          return (
            <div className="flex w-full" key={index}>
              <div className="w-[10%] px-5 py-1">
                {LEVEL_LIST.find((item) => item.value === index).label}
              </div>
              <div className="w-[200px] px-5 py-1">
                {format(rank.startTime * 1000, 'Pp')}
              </div>
              <div className="w-[200px] px-5 py-1">
                {format(rank.endTime * 1000, 'Pp')}
              </div>
              <div className="w-[10%] px-5 py-1">
                {convertWeiToNumber(rank.minBuy)}
              </div>
              <div className="w-[10%] px-5 py-1">
                {convertWeiToNumber(rank.maxBuy)}
              </div>
            </div>
          )
        })}
    </div>
  )
}
