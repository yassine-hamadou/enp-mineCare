/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {DashboardTable} from './dashboardTable/CycleDetailsList'
// import DevexpressDashboardComponent from "./DevexpressDashboardComponent";
import {Tabs} from "antd";
import {KTCard, KTCardBody} from "../../../_metronic/helpers";

const DevexpressDashboardComponent = React.lazy(() => import("./DevexpressDashboardComponent"));


// @ts-ignore
// @ts-ignore
// @ts-ignore
const DashboardPage = () => (

    <>
        <KTCard>
            <KTCardBody>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={'top'}
                    style={{height: '100%', width: '100%'}}
                >
                    <Tabs.TabPane tab="Fault" key="1">
                        <DevexpressDashboardComponent dashboardId={"dashboard3"}/>
                        <br/>
                        <br/>
                        <DashboardTable/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Backlog" key="2">
                        <DevexpressDashboardComponent dashboardId={"backlogDashboard"}/>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hours" key="3">
                        <DevexpressDashboardComponent dashboardId={"equipmentsAvailability"}/>

                    </Tabs.TabPane>
                </Tabs>
            </KTCardBody>
        </KTCard>

    </>
)

const DashboardWrapper = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
