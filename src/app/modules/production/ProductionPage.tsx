import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {FuelReportTable} from './components/report/fuel/CycleDetailsList'
import {EquipmentTable} from './components/report/equipment/CycleDetailsList'
import {StatisticsTable} from './components/report/activity/CycleDetailsList'
import {ScheduleInfo} from './components/scheduleInfo/ScheduleInfo'
import {EquipmentDetail} from './components/entries/equipment/EquipmentSchedule'
import {WorkTypePage} from './components/setup/workType/WorkType'
import {DownTypePage} from './components/setup/downType/DownType'
import {CustodianPage} from './components/setup/custodian/Custodian'
import {LocationPage} from './components/setup/location/LocationPage'
import {FleetPage} from './components/setup/fleet/FleetPage'
import {ServicesPage} from './components/setup/service/ServicePage'
import {GroupsPage} from './components/setup/groups/GroupsPage'
import {ItemsPage} from './components/setup/items/ItemPage'
import {SectionsPage} from './components/setup/sections/Sections'
import {CheckListForm3} from './components/checkListForm/CheckListForm3'
import {TabsTest} from './components/checkListForm/Tabs'
import {LubePage} from './components/setup/lube/Lube'
import {CompartmentPage} from './components/setup/compartment/Compartment'
import {RefillPage} from './components/setup/refill/Refill'
import {HoursPage} from './components/entries/hours/HoursTable'
import {OilGradePage} from './components/setup/oilGrade/OilGrade'
import {OilTypePage} from './components/setup/oilType/OilType'
import {FaultTable} from './components/entries/fault_d/FaultTable'
import HourlyReport from './components/report/hourly/HourlyReports'
import FaultEntryReport from './components/report/fault/faultEntry/FaultEntryReport'
import FaultEntryPendingReport from './components/report/fault/faultEntryPending/FaultEntryPendingReport'
import FaultEntrySolvedReport from './components/report/fault/faultEntrySolved/FaultEntrySolvedReport'
import FleetScheduleReport from './components/report/fleetSchedule/FleetScheduleReport'
import { LubeConfig } from './components/setup/lubeConfig/LubeConfig'
import FaultEntryFleetHistoryReport from './components/report/fault/faultFleetHistory/FaultEntryFleetHistoryReport'
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
          path='start-work/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Check List</PageTitle>
              <ScheduleInfo />
              <Outlet />
            </>
          }
        >
          <Route
            path=':serviceId'
            element={
              <>
                <TabsTest />
              </>
            }
          />
          </ Route>
        <Route
          path='fault/*'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path='' element={<FaultTable />} />
        </Route>
        {/*<Route*/}
        {/*  path='resolution'*/}
        {/*  element={*/}
        {/*    <>*/}
        {/*      <PageTitle breadcrumbs={accountBreadCrumbs}>All Resolution</PageTitle>*/}
        {/*      <ResolutionTable />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/>*/}
        <Route
          path='hours'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Hours</PageTitle>
              <HoursPage />
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
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Fleets</PageTitle>
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
          path='compartment'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Compartment</PageTitle>
              {/*<Overview />*/}
              <CompartmentPage />
            </>
          }
        />
        <Route
          path='refill'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All RefillTypes</PageTitle>
              {/*<Overview />*/}
              <RefillPage />
            </>
          }
        />
        <Route
          path='lube-grade/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Grades</PageTitle>
              {/*<Overview />*/}
              <OilGradePage />
            </>
          }
        />
        <Route
          path='lube-config'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Lube Configurations</PageTitle>
              {/*<Overview />*/}
              <LubeConfig />
            </>
          }
        />
        <Route
          path='lube-brand'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Brands</PageTitle>
              {/*<Overview />*/}
              <OilTypePage />
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
        <Route
          path='lube'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Lubes</PageTitle>
              {/*<Overview />*/}
              <LubePage />
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
          path='fault-summary-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Fault Report</PageTitle>
              <FaultEntryReport />
            </>
          }
        />
        <Route
          path='hourly-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Hourly Report</PageTitle>
              <HourlyReport />
            </>
          }
        />
        <Route
          path='solved-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Solved Fault Report</PageTitle>
              <FaultEntrySolvedReport />
            </>
          }
        />
        <Route
          path='pending-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Pending Fault Report</PageTitle>
              <FaultEntryPendingReport />
            </>
          }
        />
        <Route
          path='fleetschedule-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fleet Schedule Report</PageTitle>
              <FleetScheduleReport />
            </>
          }
        />
        <Route
          path='fleet-history-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fleet History Report</PageTitle>
              <FaultEntryFleetHistoryReport />
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
              <CheckListForm3 />
            </>
          }
        />
        <Route
          path='tabs'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Tabs</PageTitle>
              <TabsTest />
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
          path='service/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Services </PageTitle>
              <ServicesPage />
            </>
          }
        />
        <Route
          path='sections/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Sections </PageTitle>
              <SectionsPage />
            </>
          }
        />
        <Route
          path='groups/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Groups </PageTitle>
              <GroupsPage />
            </>
          }
        />
        <Route
          path='items/:id'
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
