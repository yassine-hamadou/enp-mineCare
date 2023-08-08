import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import ProductionPage from '../modules/production/ProductionPage'
import TopBarProgress from 'react-topbar-progress-indicator'

import {Suspense} from "react";
import DashboardWrapper from "../pages/dashboard/DashboardWrapper";

const PrivateRoutes = () => {
    return (
      <Routes>
          <Route element={<MasterLayout/>}>
              {/* Redirect to Dashboard after success login/registartion */}
              <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
              {/* Pages */}

              <Route path='/dashboard' element={
                  <Suspense fallback={<TopBarProgress/>}>
                      <DashboardWrapper/>
                  </Suspense>
              }/>


              <Route path='/*' element={<ProductionPage/>}/>

              {/* Page Not Found */}
              <Route path='*' element={<Navigate to='/error/404'/>}/>
          </Route>
      </Routes>
    )
}

// export const SuspensedView: FC<WithChildren> = ({children}) => {
//     const baseColor = getCSSVariableValue('--kt-primary')
//     TopBarProgress.config({
//         barColors: {
//             '0': baseColor,
//         },
//         barThickness: 1,
//         shadowBlur: 5,
//     })
//     return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
// }

export {PrivateRoutes}
