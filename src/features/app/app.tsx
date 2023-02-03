import { memo } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../states/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLoginPage } from './components/appLoginPage/appLoginPage'
import { AppRequireAuthRouteElement } from './components/appRequireAuthRouteElement/appRequireAuthRouteElement'
import { AppLayoutRouteElement } from './components/appLayoutRouteElement/appLayoutRouteElement'
import { Users } from 'features/users/users'
import { Products } from 'features/products/products'
import { Orders } from 'features/orders/orders'
import { Vouchers } from 'features/vouchers/vouchers'
import { VoucherBlockchain } from 'features/voucherBlockchain/voucherBlockchain'
import { MainWallet } from 'features/mainWallet/mainWallet'
import { OperationWallet } from 'features/operationWallet/operationWallet'
import { Settings } from 'features/settings/settings'
import { AccountSettings } from 'features/accountSettings/accountSettings'

export const App = memo(() => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="login" element={<AppLoginPage />} />
          <Route element={<AppRequireAuthRouteElement />}>
            <Route element={<AppLayoutRouteElement />}>
              <Route path="/admin">
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="vouchers" element={<Vouchers />} />
                <Route
                  path="voucher-blockchain"
                  element={<VoucherBlockchain />}
                />
                <Route path="main-wallet" element={<MainWallet />} />
                <Route path="operation-wallet" element={<OperationWallet />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account-settings" element={<AccountSettings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
})
