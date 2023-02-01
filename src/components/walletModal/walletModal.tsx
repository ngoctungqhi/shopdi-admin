import { memo } from 'react'
import { Button } from 'antd'
import Icon from '@ant-design/icons'
import { useWalletModal } from './useWalletModal'

export const WalletModal = memo(() => {
  const { WALLETS, handleWalletButtonClick } = useWalletModal()

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {WALLETS.map((wallet) => {
          return (
            <Button
              key={wallet.name}
              type="primary"
              icon={
                <Icon
                  component={() => (
                    <img src={wallet.icon} className="w-4 h-4" alt="" />
                  )}
                />
              }
              block
              onClick={() => handleWalletButtonClick(wallet.provider)}
            >
              {wallet.name}
            </Button>
          )
        })}
      </div>
    </>
  )
})
