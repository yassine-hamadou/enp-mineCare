import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ConfigProvider} from 'antd'
import en_US from 'antd/lib/locale/en_US'
import {ErrorBoundary} from '@ant-design/pro-components'
import {IntlProvider} from 'react-intl'
import React, {Suspense} from 'react'

const queryClient = new QueryClient()
const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LayoutSplashScreen />}>
        <ConfigProvider locale={en_US}>
          <QueryClientProvider client={queryClient}>
            <IntlProvider locale={navigator.language === 'en-US' ? 'en' : 'fr'}>
              <LayoutProvider>
                <AuthInit>
                  <Outlet />
                  <MasterInit />
                </AuthInit>
              </LayoutProvider>
            </IntlProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export {App}
