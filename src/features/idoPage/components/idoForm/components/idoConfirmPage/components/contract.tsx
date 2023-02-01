import { Col, Row } from 'antd'
import { CURRENCY_LIST, LEVEL_LIST } from 'configs/constants/constants'
import { format } from 'date-fns'

export const Contract = ({ ido, name, symbol, decimals }) => {
  return (
    <Row gutter={16}>
      <Col span={10}>
        <div className="flex flex-col gap-y-2">
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Token address</span>
            <span>{ido.tokenAddress}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Name</span>
            <span>{name}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Symbol</span>
            <span>{symbol}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Decimals</span>
            <span>{decimals}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Currency</span>
            <span>
              {CURRENCY_LIST.find((item) => item.value === ido.currency).label}
            </span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/3 block text-right">Level buy</span>
            <span>
              {LEVEL_LIST.find((item) => item.value === ido.levelBuy).label}
            </span>
          </p>
        </div>
      </Col>
      <Col span={7}>
        <div className="flex flex-col gap-y-2">
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Presale rate</span>
            <span>{ido.presaleRate}$</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Total sell</span>
            <span>
              {Number(ido.totalSell).toLocaleString('en', {
                maximumFractionDigits: 2,
              })}{' '}
              {symbol}
            </span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Start time</span>
            <span>{format(ido.startTime * 1000, 'Pp')}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">End time</span>
            <span>{format(ido.endTime * 1000, 'Pp')}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">TGE percent</span>
            <span>{ido.tgePercent}%</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">TGE time</span>
            <span>{format(ido.tgeTime * 1000, 'Pp')}</span>
          </p>
        </div>
      </Col>
      <Col span={7}>
        <div className="flex flex-col gap-y-2">
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Fee percent</span>
            <span>{ido.feePercent}%</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Can refund</span>
            <span>{ido.canRefund ? 'Yes' : 'No'}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Vesting start</span>
            <span>{format(ido.vestingStart * 1000, 'Pp')}</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Cycle vesting day</span>
            <span>{ido.cycleVestingDay / 60} minutes</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">Vesting percent</span>
            <span>{ido.vestingPercent}%</span>
          </p>
          <p className="flex m-0 gap-x-5">
            <span className="w-1/2 block text-right">TGE time</span>
            <span>{format(ido.tgeTime * 1000, 'Pp')}</span>
          </p>
        </div>
      </Col>
    </Row>
  )
}
