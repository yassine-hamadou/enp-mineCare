import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export {App}
