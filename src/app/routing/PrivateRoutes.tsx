import {FC, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import ProductionPage from '../modules/production/ProductionPage'
import ReportComponent from "../modules/production/components/report/ReportComponent/ReportComponent";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout/>}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper/>}/>
        <Route path='/*' element={<ProductionPage/>}/>
        <Route
          path='app/production/components/report/activity/*'
          element={
            <SuspensedView>
              <ReportComponent reportName={"WeeklyReport"}/>
            </SuspensedView>
          }
        />
        <Route
          path='app/production/components/report/daily/*'
          element={
            <SuspensedView>
              <ReportComponent reportName={"DailyReport"}/>
            </SuspensedView>
          }
        />
        <Route
          path='app/production/components/report/downtime/*'
          element={
            <SuspensedView>
              <ReportComponent reportName={"ActivityReport"}/>
            </SuspensedView>
          }
        />
        <Route
          path='app/production/components/report/weekly/*'
          element={
            <SuspensedView>
              <ReportComponent reportName={"WeeklyReport"}/>
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404'/>}/>
      </Route>
    </Routes>
  )
}

export const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
