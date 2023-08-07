/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Suspense} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import TopBarProgress from "react-topbar-progress-indicator";
// import DevexpressDashboardComponent from "./DevexpressDashboardComponent";
//
const DevexpressDashboardComponent = React.lazy(() => import("./DevexpressDashboardComponent"));
// const DashboardTable = React.lazy(() => import("./dashboardTable/DashboardTable"));


const DashboardWrapper = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Dashboard"}</PageTitle>
            <Suspense fallback={<TopBarProgress/>}>
                <DevexpressDashboardComponent dashboardId={"dashboard3"}/>
            </Suspense>
        </>
    )
}

export default DashboardWrapper
