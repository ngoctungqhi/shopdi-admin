import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'enums/app'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import { message } from 'antd'
import { useAppDispatch } from 'states/hooks'
import { setToken } from 'features/app/states/appSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        // connector.handleAccountsChanged = () => localStorage.removeItem('token')
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem('provider')
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              message.error('Provider Error: No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              message.error(
                'Authorization Error: Please authorize to access your account'
              )
            } else {
              console.log(error)
              message.error(`${error.name}: ${error.message}`)
            }
          }
        })
      } else {
        message.error('Unable to find connector: The connector config is wrong')
      }
    },
    [activate]
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem('provider')
    localStorage.removeItem('token')
    dispatch(setToken(''))
  }, [deactivate, dispatch])

  return { login, logout }
}

export default useAuth
