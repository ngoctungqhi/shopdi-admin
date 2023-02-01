import { convertWeiToNumber } from 'utils/formatBalance'

export const Kols = ({ ido, symbol }) => {
  return ido.kols ? (
    <div>
      <p className="flex gap-x-5">
        Total sell{' '}
        <span>
          {Number(convertWeiToNumber(ido.kols.totalSell)).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}{' '}
          {symbol}
        </span>
      </p>
      <p>Whitelist</p>
      <div className="flex w-full">
        <div className="w-[40%] font-semibold bg-gray-300 px-5 py-1">
          Address
        </div>
        <div className="w-[10%] font-semibold bg-gray-300 px-5 py-1">
          Max buy
        </div>
      </div>
      {ido.kols &&
        ido.kols.slots &&
        ido.kols.slots.map((slot, index) => {
          return (
            <div className="flex w-full" key={index}>
              <div className="w-[40%] px-5 py-1">{slot.address}</div>
              <div className="w-[10%] px-5 py-1">
                {convertWeiToNumber(slot.maxBuy)}
              </div>
            </div>
          )
        })}
    </div>
  ) : (
    <></>
  )
}
