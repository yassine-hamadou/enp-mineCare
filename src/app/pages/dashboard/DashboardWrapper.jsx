/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {DashboardTable} from './dashboardTable/CycleDetailsList'
import Devexpres from "./Devexpress"


// @ts-ignore
// @ts-ignore
// @ts-ignore
const DashboardPage = () => (

    <>
        <div className='row gy-5 g-xl-8'>
            <div className='col-xl-12'>
                <Devexpres/>
            </div>
        </div>
        <br/>
        <br/>
        {/* begin::Row */}
        {/*<div className='row gy-5 g-xl-8'>*/}
        {/*    <div className='col-xl-6'>*/}
        {/*        <BarChart*/}
        {/*            className='card-xxl-stretch mb-5 mb-xl-8'*/}
        {/*            chartColor='primary'*/}
        {/*            chartHeight='200px'*/}
        {/*        />*/}
        {/*        /!*<ColumnChart/>*!/*/}
        {/*    </div>*/}
        {/*    <div className='col-xl-6'>*/}
        {/*        /!*<DownTypeFaultType/>*!/*/}
        {/*        <BarChart2*/}
        {/*            className='card-xxl-stretch mb-5 mb-xl-8'*/}
        {/*            chartColor='danger'*/}
        {/*            chartHeight='200px'*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className='row gy-5 g-xl-8'>*/}
        {/*<div className='col-xl-6'>*/}
        {/*  <BarChart*/}
        {/*    className='card-xxl-stretch mb-5 mb-xl-8'*/}
        {/*    chartColor='primary'*/}
        {/*    chartHeight='200px'*/}
        {/*  />*/}
        {/*  /!*<ColumnChart/>*!/*/}
        {/*</div>*/}
        {/*<div className='col-xl-6'>*/}
        {/*  /!*<DownTypeFaultType/>*!/*/}
        {/*  <BarChart2*/}
        {/*    className='card-xxl-stretch mb-5 mb-xl-8'*/}
        {/*    chartColor='danger'*/}
        {/*    chartHeight='200px'*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div style={{position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px'}}>*/}
        {/*    <DashboardControl style={{height: '100%'}}*/}
        {/*                      endpoint="http://208.117.44.15/dashboards/api/dashboard">*/}
        {/*    </DashboardControl>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/* end::Row */}
        <div className='row gy-5 g-xl-8'>
            <div className='col-xl-12'>
                {/*card-xxl-stretch mb-5 mb-xl-8*/}
                <DashboardTable/>
            </div>
        </div>
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
