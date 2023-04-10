/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {MixedWidget11} from '../../../_metronic/partials/widgets'
import {DashboardTable} from './dashboardTable/CycleDetailsList'
import {Column} from "@ant-design/plots";
import {useQuery} from "react-query";
import axios from "axios";
import {ENP_URL} from "../../urls";
import {BarChart} from "./BarChart";


const ColumnChart = () => {


  const data1 = [
    {
      type: 'Apr',
      sales: 38,
    },
    {
      type: 'May',
      sales: 52,
    },
    {
      type: 'Jun',
      sales: 61,
    },
    {
      type: 'May',
      sales: 145,
    },
    {
      type: 'Jun',
      sales: 48,
    },
    {
      type: 'Jul',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sep',
      sales: 38,
    }, {
      type: 'Oct',
      sales: 382,
    }, {
      type: 'Nov',
      sales: 38,
    }, {
      type: 'Dec',
      sales: 38,
    }, {
      type: 'Jan',
      sales: 38,
    }, {
      type: 'Feb',
      sales: 82,
    }, {
      type: 'Mar',
      sales: 40,
    },
  ];


  const config = {
    data1,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  //@ts-ignore
  return <Column {...config} />;
}

const DashboardPage = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-6 card-xxl-stretch mb-5 mb-xl-8'>
        <BarChart
          className='card-xxl-stretch mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='200px'
        />
        {/*<ColumnChart/>*/}
      </div>
      <div className='col-xl-6'>
        <MixedWidget11
          className='card-xxl-stretch mb-5 mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
        />
      </div>
    </div>
    {/* end::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-12'>
        {/*card-xxl-stretch mb-5 mb-xl-8*/}
        <DashboardTable/>
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage/>
    </>
  )
}

export {DashboardWrapper}
