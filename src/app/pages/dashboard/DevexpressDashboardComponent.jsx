import 'devextreme/dist/css/dx.light.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css'
import '@devexpress/analytics-core/dist/css/dx-querybuilder.css'
import 'devexpress-dashboard/dist/css/dx-dashboard.light.css'
import React, {lazy, Suspense} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {SERVER} from '../../urls'
import {useAuth} from '../../modules/auth'

const DashboardControl = lazy(() => import('devexpress-dashboard-react'))

const DevexpressDashboardComponent = (props) => {
  const {tenant} = useAuth()
  function onBeforeRender(e) {
    const dashboardControl = e.component
    dashboardControl.setDashboardState({
      Parameters: {
        TenantId: [tenant],
      },
    })
    //hide the parameter panel if there is only one parameter
    var parameterExtension = dashboardControl.findExtension('dashboard-parameter-dialog')
    if (parameterExtension) {
      parameterExtension.showDialogButton(false)
    }
  }

  return (
    <Suspense fallback={<TopBarProgress />}>
      <div style={{width: '100%', height: '80vh'}}>
        <DashboardControl
          id='web-dashboard'
          style={{height: '100%'}}
          endpoint={`${SERVER}/dashboards/dashboardcontrol`}
          workingMode={props.workingMode ? props.workingMode : 'ViewerOnly'}
          dashboardId={props.dashboardId}
          onDashboardInitialized={onBeforeRender}
        ></DashboardControl>
      </div>
    </Suspense>
  )
}

export default DevexpressDashboardComponent
