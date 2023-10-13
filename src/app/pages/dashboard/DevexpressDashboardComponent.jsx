import 'devextreme/dist/css/dx.light.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css'
import '@devexpress/analytics-core/dist/css/dx-querybuilder.css'
import 'devexpress-dashboard/dist/css/dx-dashboard.light.css'
import React, {lazy, Suspense} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {SERVER} from '../../urls'
import {useAuth} from '../../modules/auth'
import 'devexpress-dashboard/model/parameters/parameter'
import {Parameter} from 'devexpress-dashboard/model'
const DashboardControl = lazy(() => import('devexpress-dashboard-react'))

const DevexpressDashboardComponent = (props) => {
  const {tenant} = useAuth()
  return (
    <Suspense fallback={<TopBarProgress />}>
      <div style={{width: '100%', height: '80vh'}}>
        <DashboardControl
          id='web-dashboard'
          style={{height: '100%'}}
          endpoint={`${SERVER}/dashboards/dashboardcontrol`}
          //optional configuration with default values
          workingMode={props.workingMode ? props.workingMode : 'ViewerOnly'}
          dashboardId={props.dashboardId} // or a path to a dashboard file
          // onDashboardInitializing={(e) => {
          //   const parameters = e.dashboard.parameters
          //   let p = new Parameter()
          //   p.name('TenantId')
          //   p.defaultValue('tarkwa')
          //   p.allowMultiselect(true)
          //   p.allowNull(true)
          //   p.description('Company')
          //   p.visible = true
          //   parameters.removeAll()
          //   parameters.push(p)
          // }}
          // onDashboardInitialized={(e) => {
          //   let p = new Parameter()
          //   const parameters = e.dashboard.parameters
          //   p.name('TenantId')
          //   p.defaultValue('tarkwa')
          //   p.description('Company')
          //   p.visible = true
          //   parameters.removeAll()
          //   parameters.push(p)
          // }}
          // onBeforeRender={(e) => {
          //   const parameters = e.component.
          //   }}
        ></DashboardControl>
      </div>
    </Suspense>
  )
}

export default DevexpressDashboardComponent
