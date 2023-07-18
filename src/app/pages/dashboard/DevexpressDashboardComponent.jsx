import 'devextreme/dist/css/dx.light.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css'
import '@devexpress/analytics-core/dist/css/dx-querybuilder.css'
import 'devexpress-dashboard/dist/css/dx-dashboard.light.css'

import {DashboardControl} from 'devexpress-dashboard-react'
import React from 'react'

const DevexpressDashboardComponent = (props) => {
    return (
        <div style={{width: '100%', height: '80vh'}}>
            <DashboardControl
                id='web-dashboard'
                style={{height: '100%'}}
                endpoint='http://208.117.44.15/dashboardcontrol'
                // endpoint='https://app.sipconsult.net/dashboards/dashboardcontrol'
                // endpoint='https://localhost:5001/dashboardcontrol'
                //optional configuration with default values
                workingMode={props.workingMode ? props.workingMode : 'ViewerOnly'}
                dashboardId={props.dashboardId} // or a path to a dashboard file
                // onBeforeRender={function () {
                //     //get the dashboard instance and perform any custom logic with it before the rendering starts
                //     dashboardParameters = this.getDashboard().parameters()
                // }}
            ></DashboardControl>
        </div>
    )
}

export default DevexpressDashboardComponent
