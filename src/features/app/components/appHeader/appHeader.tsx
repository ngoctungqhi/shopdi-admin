import { memo } from 'react'
import { Button } from 'antd'
import { useAppHeader } from './useAppHeader'
import { useWeb3React } from '@web3-react/core'
import truncateHash from 'utils/truncateHash'
import { LogoutOutlined } from '@ant-design/icons'

export const AppHeader = memo(() => {
  const { handleOpenSelectWalletModal, handleLogout } = useAppHeader()
  const { account } = useWeb3React()

  return (
    <div className="flex justify-end">
      {account ? (
        <div className="flex items-center gap-x-2">
          <span>{truncateHash(account, 8, 4)}</span>
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
          />
        </div>
      ) : (
        <Button type="primary" onClick={handleOpenSelectWalletModal}>
          Connect wallet
        </Button>
      )}
    </div>
  )
})
