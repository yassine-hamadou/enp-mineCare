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
// import {WorkType} from './components/setup/workType/CycleDetailsList'
import {LocationTable} from './components/setup/location/CycleDetailsList'
import {Custodian} from './components/setup/custodian/CycleDetailsList'
import {FaultTable} from './components/entries/fault_d/FaultTable'
import {HoursTable} from './components/entries/hours/HoursTable'
import {AddFaultForm} from './components/entries/fault_d/AddFaultForm'
import {WorkTypePage} from './components/setup/workType/WorkType'
import { DownTypePage } from './components/setup/downType/DownType'
import { CustodianPage } from './components/setup/custodian/Custodian'
import { LocationPage } from './components/setup/location/LocationPage'
import { FleetPage } from './components/setup/fleet/FleetPage'
import { ServicesPage } from './components/setup/service/ServicePage'
import { GroupsPage } from './components/setup/groups/GroupsPage'
import { ItemsPage } from './components/setup/items/ItemPage'
import { SectionsPage } from './components/setup/sections/Sections'
import { CheckListForm } from './components/checkListForm/CheckListForm'
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
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Resolution</PageTitle>
              <ResolutionTable />
            </>
          }
        />
        <Route
          path='hours'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Hours</PageTitle>
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
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Fleet</PageTitle>
              {/*<Overview />*/}
              <FleetPage />
            </>
          }
        />
        <Route
          path='down-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Down Type</PageTitle>
              {/*<Overview />*/}
              <DownTypePage />
            </>
          }
        />
        <Route
          path='custodian'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Custodians</PageTitle>
              {/*<Overview />*/}
              <CustodianPage />
            </>
          }
        />
        <Route
          path='location'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Locations</PageTitle>
              {/*<Overview />*/}
              <LocationPage />
            </>
          }
        />
        <Route
          path='work-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Work Types</PageTitle>
              {/*<Overview />*/}
              <WorkTypePage />
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
      <Route
        path='/checkListForm/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet />
          </>
        }
      >
       
        <Route
          path='checkList'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Check List</PageTitle>
              <CheckListForm />
            </>
          }
        />
        
       
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
      <Route
        path='setup/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet />
          </>
        }
      >
       
        <Route
          path='service'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Services </PageTitle>
              <ServicesPage />
            </>
          }
        />
        <Route
          path='sections'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Sections </PageTitle>
              <SectionsPage />
            </>
          }
        />
        <Route
          path='groups'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Groups </PageTitle>
              <GroupsPage />
            </>
          }
        />
        <Route
          path='items'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Items </PageTitle>
              <ItemsPage />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}
export default ProductionPage
