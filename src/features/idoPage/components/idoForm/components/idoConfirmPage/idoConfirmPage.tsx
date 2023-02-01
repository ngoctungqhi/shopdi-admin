import { memo } from 'react'
import { useIdoConfirmPage } from './useIdoConfirmPage'
import { Button, Collapse } from 'antd'
import { Contract } from './components/contract'
import { Info } from './components/info'
import { Limit } from './components/limit'
import { Kols } from './components/Kols'

export type IdoConfirmPageProps = {
  currentStep: number
  onPrevStep: () => void
  id?: string | undefined
}

export const IdoConfirmPage = memo((props: IdoConfirmPageProps) => {
  const {
    ido,
    name,
    symbol,
    decimals,
    account,
    handleOpenSelectWalletModal,
    handleConfirmButtonClick,
    pendingTx,
  } = useIdoConfirmPage(props)
  return ido ? (
    <>
      <Collapse defaultActiveKey={['1', '2', '3', '4']}>
        <Collapse.Panel header="Contract" key="1">
          <Contract ido={ido} name={name} symbol={symbol} decimals={decimals} />
        </Collapse.Panel>
        <Collapse.Panel header="Info" key="2">
          <Info ido={ido} />
        </Collapse.Panel>
        <Collapse.Panel header="Limit" key="3">
          <Limit ido={ido} />
        </Collapse.Panel>
        <Collapse.Panel header="KOLs" key="4">
          <Kols ido={ido} symbol={symbol} />
        </Collapse.Panel>
      </Collapse>
      <div className="flex gap-x-2 justify-end mt-5">
        {props.currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={props.onPrevStep}>
            Previous
          </Button>
        )}

        {account ? (
          <Button
            type="primary"
            onClick={handleConfirmButtonClick}
            loading={pendingTx}
          >
            Confirm
          </Button>
        ) : (
          <Button type="primary" onClick={handleOpenSelectWalletModal}>
            Connect wallet
          </Button>
        )}
      </div>
    </>
  ) : (
    <></>
  )
})
