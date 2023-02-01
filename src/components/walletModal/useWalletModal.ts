import metamaskSvg from 'assets/icons/metamask.svg'
import bscSvg from 'assets/icons/bsc.svg'
import trustSvg from 'assets/icons/trust.svg'
import walletConnectSvg from 'assets/icons/walletconnect.svg'
import { useCallback } from 'react'
import { useAppDispatch } from 'states/hooks'
import { closeSelectWalletModal } from 'features/app/states/appSlice'
// import { ConnectorNames } from 'enums/app'
import { useAuth } from 'hooks/useAuth'

const WALLETS = [
  { name: 'Metamask', icon: metamaskSvg, provider: 'injected' },
  { name: 'WalletConnect', icon: walletConnectSvg, provider: 'walletconnect' },
  { name: 'Binance Chain Wallet', icon: bscSvg, provider: 'bsc' },
  { name: 'TrustWallet', icon: trustSvg, provider: 'injected' },
]

export const useWalletModal = () => {
  const dispatch = useAppDispatch()
  const { login } = useAuth()

  const handleWalletButtonClick = useCallback(
    (connectorID) => {
      window.localStorage.setItem('provider', connectorID)
      login(connectorID)
      dispatch(closeSelectWalletModal())
    },
    [dispatch, login]
  )

  return { WALLETS, handleWalletButtonClick }
}
