import { memo } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../states/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLoginPage } from './components/appLoginPage/appLoginPage'
import { AppRequireAuthRouteElement } from './components/appRequireAuthRouteElement/appRequireAuthRouteElement'
import { AppLayoutRouteElement } from './components/appLayoutRouteElement/appLayoutRouteElement'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'utils/web3React'

import { Dashboard } from 'features/dashboard/dashboard'
import { IdoPage } from 'features/idoPage/idoPage'
import { IdoForm } from 'features/idoPage/components/idoForm/idoForm'
import { StakePage } from 'features/stakePage/stakePage'
import { EkycPage } from 'features/ekycPage/ekycPage'

export const App = memo(() => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="login" element={<AppLoginPage />} />
            <Route element={<AppRequireAuthRouteElement />}>
              <Route element={<AppLayoutRouteElement />}>
                <Route path="/">
                  <Route index element={<Dashboard />} />
                  <Route path="ido" element={<IdoPage />} />
                  <Route path="ido/add" element={<IdoForm />} />
                  <Route path="ido/edit/:id" element={<IdoForm />} />
                  <Route path="stake" element={<StakePage />} />
                  <Route path="ekyc" element={<EkycPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </Web3ReactProvider>
  )
})
