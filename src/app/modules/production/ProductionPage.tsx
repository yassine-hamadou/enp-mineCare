import React, {lazy, Suspense} from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ScheduleInfo} from './components/scheduleInfo/ScheduleInfo'
import {WorkTypePage} from './components/setup/workType/WorkType'
import {DownTypePage} from './components/setup/downType/DownType'
import {CustodianPage} from './components/setup/custodian/Custodian'
import {LocationPage} from './components/setup/location/LocationPage'
import {FleetPage} from './components/setup/fleet/FleetPage'
import {ServicesPage} from './components/setup/service/ServicePage'
import {GroupsPage} from './components/setup/groups/GroupsPage'
import {ItemsPage} from './components/setup/items/ItemPage'
import {SectionsPage} from './components/setup/sections/Sections'
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
import { ItemValuePage } from './components/setup/itemValue/ItemValuePage'
import ModelClass from "./components/setup/equipment/ModelClass";
import Manufacturer from "./components/setup/equipment/Manufacturer";
import ModelsForManufacturer from "./components/setup/equipment/ModelsForManufacturer";
import EquipmentRegister from "./components/equipment-register/EquipmentRegister";
import AddEquipRegister from "./components/equipment-register/Add";
import UpdateRegister from './components/equipment-register/UpdateRegister'
import EquipmentSchedule from "./components/entries/equipment/EquipmentSchedule";
import ReportNew from "./components/report/DailyHMEReport/DailyaHMEReport";
import MemberListReport from "./components/report/Memberlist/MemberListReport";
import NumberOfCarperManufacturerReport
  from "./components/report/CarperManufacturerReport/NumberOfCarperManufacturerReport";
import { AllReportPage } from './components/report/AllReportPage'
const accountBreadCrumbs: Array<PageLink> = []


const ProductionPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/equipment-register/*'
        element={
            <>
                <Outlet />
            </>
        }
      >
      <Route
        path=''
        element={
        <>
          <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment Register</PageTitle>
          <EquipmentRegister />
        </>
        }
      />
      <Route
        path='add'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Add Equipment</PageTitle>
            <AddEquipRegister />
          </>
        }
      />
        <Route
          path='edit/:equipmentId'
          element={
            <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Update Equipment</PageTitle>
                <UpdateRegister />
            </>
          }
        />
      </Route>
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
                <EquipmentSchedule />
            </>
          }
        />
        <Route
            path='changeout/lube'
            element={
                <>
                    <PageTitle breadcrumbs={accountBreadCrumbs}>Change Out</PageTitle>
                    <LubePage />
                </>
            }
        />
        <Route
          path='start-work/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Check List</PageTitle>
              <ScheduleInfo />
              <br/>
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
            path='equipment/model-class'
            element={
                <>
                    <PageTitle breadcrumbs={accountBreadCrumbs}>All Model Class</PageTitle>
                    <ModelClass />
                  {/*<FleetPage />*/}
                </>
            }
        />
        <Route
          path='equipment/manufacturer'
          element={
            <>
              <Outlet />
            </>
          }
        >
<Route path='' element={
    <>
  <PageTitle breadcrumbs={accountBreadCrumbs}>All Manufacturers</PageTitle>
  <Manufacturer />
  </>
} />
          <Route
            path='model/:manufacturerCode'
            element={
                <>
                    <PageTitle breadcrumbs={accountBreadCrumbs}>Model</PageTitle>
                    <ModelsForManufacturer />
                </>
            }
            />
        </Route>
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
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Service Types</PageTitle>
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
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Reports</PageTitle>
              <AllReportPage />
            </>
          }
        />
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
          path='daily-hme'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Daily HME Report</PageTitle>
              <ReportNew />
            </>
          }
        />
        <Route
          path='member-list'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Member List Report</PageTitle>
                  <MemberListReport />
            </>
          }
        />
        <Route
          path='CarperManufacturerReport'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Number Of Carper Manufacturer Report</PageTitle>
                <NumberOfCarperManufacturerReport />
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
        {/*<Route*/}
        {/*  path='checkList'*/}
        {/*  element={*/}
        {/*    <>*/}
        {/*      <PageTitle breadcrumbs={accountBreadCrumbs}>Check List</PageTitle>*/}
        {/*      <CheckListForm3 />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/>*/}
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
        <Route
          path='itemValue/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>ItemValue </PageTitle>
              <ItemValuePage />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}
export default ProductionPage
