import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ConfigProvider} from "antd";
import en_US from 'antd/lib/locale/en_US';
import {ErrorBoundary} from '@ant-design/pro-components'

const queryClient = new QueryClient()
const App = () => {
    return (
      <ErrorBoundary>
          <ConfigProvider locale={en_US}>
              <QueryClientProvider client={queryClient}>
                  <Suspense fallback={<LayoutSplashScreen/>}>
                      <I18nProvider>
                          <LayoutProvider>
                              <AuthInit>
                                  <Outlet/>
                                  <MasterInit/>
                              </AuthInit>
                          </LayoutProvider>
                      </I18nProvider>
                  </Suspense>
                  <ReactQueryDevtools initialIsOpen={false}/>
              </QueryClientProvider>
          </ConfigProvider>
      </ErrorBoundary>
    )
}

export {App}
