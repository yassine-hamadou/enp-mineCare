import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ProductionReportTable} from './components/report/production_table/CycleDetailsList'
import {FuelReportTable} from './components/report/fuel/CycleDetailsList'
import {EquipmentTable} from './components/report/equipment/CycleDetailsList'
import {StatisticsTable} from './components/report/activity/CycleDetailsList'
import {Fleet} from './components/setup/fleet/CycleDetailsList'
import {EquipmentDetail} from './components/entries/equipment/CycleDetailsList'
import {ResolutionTable} from './components/entries/resolution/ResolutionTable'
import {DownType} from './components/setup/downType/CycleDetailsList'
import {WorkType} from './components/setup/workType/CycleDetailsList'
import {LocationTable} from './components/setup/location/CycleDetailsList'
import {Custodian} from './components/setup/custodian/CycleDetailsList'
import {FaultTable} from './components/entries/fault_d/FaultTable'
import {HoursTable} from './components/entries/hours/HoursTable'
import {AddFaultForm} from './components/entries/fault_d/AddFaultForm'
const accountBreadCrumbs: Array<PageLink> = []

const ProductionPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/entries/*'
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path='schedule'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment Schedule</PageTitle>
              {/*<Overview />*/}
              <EquipmentDetail />
            </>
          }
        />
        <Route
          path='fault/*'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path='' element={<FaultTable />} />
          <Route
            path='add'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Add Fault</PageTitle>
                <AddFaultForm />
              </>
            }
          />
        </Route>
        <Route
          path='resolution'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Resolution</PageTitle>
              <ResolutionTable />
            </>
          }
        />
        <Route
          path='hours'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Hours</PageTitle>
              <HoursTable />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
      <Route
        path='/setup/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet />
          </>
        }
      >
        <Route
          path='fleet'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fleet</PageTitle>
              {/*<Overview />*/}
              <Fleet />
            </>
          }
        />
        <Route
          path='down-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Down Type</PageTitle>
              {/*<Overview />*/}
              <DownType />
            </>
          }
        />
        <Route
          path='custodian'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Custodian</PageTitle>
              {/*<Overview />*/}
              <Custodian />
            </>
          }
        />
        <Route
          path='location'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Location</PageTitle>
              {/*<Overview />*/}
              <LocationTable />
            </>
          }
        />
        <Route
          path='work-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Work Type</PageTitle>
              {/*<Overview />*/}
              <WorkType />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
      <Route
        path='/report/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet />
          </>
        }
      >
        <Route
          path='production-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Production Report</PageTitle>
              {/*<Overview />*/}
              <ProductionReportTable />
            </>
          }
        />
        <Route
          path='fuel-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fuel Report</PageTitle>
              <FuelReportTable />
            </>
          }
        />
        <Route
          path='equipment-kpi'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment KPI</PageTitle>
              <EquipmentTable />
            </>
          }
        />
        <Route
          path='activity-statistics'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Activity Statistics</PageTitle>
              <StatisticsTable />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}
export default ProductionPage
