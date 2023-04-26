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
import {HoursPage} from './components/entries/hours/HoursModelClass'
import {OilGradePage} from './components/setup/oilGrade/OilGrade'
import {OilTypePage} from './components/setup/oilType/OilType'
import {FaultTable} from './components/entries/fault_d/FaultTable'
import HourlyReport from './components/report/hourly/HourlyReports'
import FaultEntryReport from './components/report/fault/faultEntry/FaultEntryReport'
import FaultEntryPendingReport from './components/report/fault/faultEntryPending/FaultEntryPendingReport'
import FaultEntrySolvedReport from './components/report/fault/faultEntrySolved/FaultEntrySolvedReport'
import FleetScheduleReport from './components/report/fleetSchedule/FleetScheduleReport'
import {LubeConfig} from './components/setup/lubeConfig/LubeConfig'
import FaultEntryFleetHistoryReport from './components/report/fault/faultFleetHistory/FaultEntryFleetHistoryReport'
import {ItemValuePage} from './components/setup/itemValue/ItemValuePage'
import ModelClass from "./components/setup/equipment/ModelClass";
import Manufacturer from "./components/setup/equipment/Manufacturer";
import ModelsForManufacturer from "./components/setup/equipment/ModelsForManufacturer";
import EquipmentRegister from "./components/equipment-register/EquipmentRegister";
import AddEquipRegister from "./components/equipment-register/Add";
import UpdateRegister from './components/equipment-register/UpdateRegister'
import EquipmentSchedule from "./components/entries/equipment/EquipmentSchedule";
import ReportNew from "./components/report/DailyHMEReport/DailyaHMEReport";
import NumberOfCarperManufacturerReport
  from "./components/report/CarperManufacturerReport/NumberOfCarperManufacturerReport";
import {AllReportPage} from './components/report/AllReportPage'
import {CategorySetup} from './components/setup/category/CategorySetup'
import ServiceTypeReport from "./components/report/ServiceTypeReport/ServiceTypeReport";
import WarrantyEndOfLifeReport from './components/report/warrantyEndOfLifeReport/WarrantyEndOfLife'
import GroundEngagingTools from './components/entries/changeOut/get/GroundEngagingTools'
import MeteringByModelDetail from './components/report/metering/MeteringByModelDetail/MeteringByModelDetail'
import MeteringByModelSummary from './components/report/metering/MeteringByModelSummary/MeteringByModelSummary'
import ChangeoutByModel from "./components/report/changeout/ChangeoutByModel/ChangeoutByModel";
import ChangeoutByRefillTypeModel
  from "./components/report/changeout/ChangeoutByRefillTypeModel/ChangeoutByRefillTypeModel";
import FaultByCustodianSummary from './components/report/fault/FaultByCustodianSummary/FaultByCustodianSummary'
import ScheduleByModelSummaryReport from './components/report/ScheduleByModelSummaryReport/ScheduleByModelSummaryReport'
import ScheduleByServiceTypeReport from './components/report/ScheduleByServiceTypeReport/ScheduleByServiceTypeReport'
import ScheduleByLocationReport from './components/report/ScheduleByLocationReport/ScheduleByLocationReport'
import AllEquipSummary from "./components/report/equipmentReport/AllEquipSummary";
import FaultByCustodianDetail from './components/report/fault/faultByCustodianDetail/FaultByCustodianDetail'
import FaultByModelSummary from './components/report/fault/faultByModelSummary/FaultByModelSummary'
import FaultByDowntimeReport from './components/report/fault/FaultByDownTimeReport/FaultByDowntimeReport'
import ListEquipmentSummary from "./components/report/equipmentReport/ListEquipmentSummary";
import MeteringByModelClassSummary
  from "./components/report/metering/MeteringByModelSummary/MeteringByModelClassSummary";
import {ErrorBoundary} from "@ant-design/pro-components";
import MeteringByEquipment from './components/report/metering/MeteringByEquipment/MeteringByEquipment'


const accountBreadCrumbs: Array<PageLink> = []

const ProductionPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/equipment-register/*'
        element={
          <>
            <Outlet/>
          </>
        }
      >
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment Register</PageTitle>
              <ErrorBoundary>
                <EquipmentRegister/>
              </ErrorBoundary>
              {/*dfs*/}
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Add Equipment</PageTitle>
              <AddEquipRegister/>
            </>
          }
        />
        <Route
          path='edit/:equipmentId'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Update Equipment</PageTitle>
              <UpdateRegister/>
            </>
          }
        />
      </Route>
      <Route
        path='/entries/*'
        element={
          <>
            <Outlet/>
          </>
        }
      >
        <Route
          path='schedule'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment Schedule</PageTitle>
              {/*<Overview />*/}
              <EquipmentSchedule/>
            </>
          }
        />
        <Route
          path='changeout/*'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route
            path='lube'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Change Out</PageTitle>
                <LubePage/>
              </>
            }
          />
          <Route
            path='ground-engaging-tools'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Ground Engaging Tools</PageTitle>
                <GroundEngagingTools/>
              </>
            }
          />
        </Route>
        <Route
          path='start-work/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Maintenance Schedule</PageTitle>
              <ScheduleInfo/>
              <br/>
              <Outlet/>
            </>
          }
        >
          <Route
            path=':serviceId/:fleetId'
            element={
              <>
                <TabsTest/>
              </>
            }
          />
        </ Route>
        <Route
          path='fault/*'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route path='' element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault/Resolution</PageTitle>
              <FaultTable/>
            </>
          }/>
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
          path={'hours/*'}
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route
            path=''
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>All Entries</PageTitle>
                {/*<HoursModelClass/>*/}
                <ErrorBoundary>
                  <HoursPage/>
                </ErrorBoundary>
              </>
            }
          />
          {/*<Route*/}
          {/*  path=':modelClassId'*/}
          {/*  element={*/}
          {/*    <>*/}
          {/*      <PageTitle breadcrumbs={accountBreadCrumbs}>All Entries</PageTitle>*/}
          {/*      <HoursPage/>*/}
          {/*    </>*/}
          {/*  }*/}
          {/*/>*/}
        </Route>
        <Route index element={<Navigate to='/dashboard'/>}/>
      </Route>
      <Route
        path='/setup/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet/>
          </>
        }
      >
        <Route
          path='equipment/model-class'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Model Class</PageTitle>
              <ModelClass/>
              {/*<FleetPage />*/}
            </>
          }
        />
        <Route
          path='equipment/manufacturer'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route path='' element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Manufacturers</PageTitle>
              <Manufacturer/>
            </>
          }/>
          <Route
            path=':manufacturerCode'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Models</PageTitle>
                <ModelsForManufacturer/>
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
              <FleetPage/>
            </>
          }
        />
        <Route
          path='down-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Down Type</PageTitle>
              {/*<Overview />*/}
              <DownTypePage/>
            </>
          }
        />
        <Route
          path='custodian'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Custodians</PageTitle>
              {/*<Overview />*/}
              <CustodianPage/>
            </>
          }
        />
        <Route
          path='location'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Locations</PageTitle>
              {/*<Overview />*/}
              <LocationPage/>
            </>
          }
        />
        <Route
          path='compartment'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Compartment</PageTitle>
              {/*<Overview />*/}
              <CompartmentPage/>
            </>
          }
        />
        <Route
          path='category'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Categories</PageTitle>
              {/*<Overview />*/}
              <CategorySetup/>
            </>
          }
        />
        <Route
          path='refill'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All RefillTypes</PageTitle>
              {/*<Overview />*/}
              <RefillPage/>
            </>
          }
        />
        <Route
          path='lube-grade/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Grades</PageTitle>
              {/*<Overview />*/}
              <OilGradePage/>
            </>
          }
        />
        <Route
          path='lube-config'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Lube Configurations</PageTitle>
              {/*<Overview />*/}
              <LubeConfig/>
            </>
          }
        />
        <Route
          path='lube-brand'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Brands</PageTitle>
              {/*<Overview />*/}
              <OilTypePage/>
            </>
          }
        />
        <Route
          path='work-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Service Types</PageTitle>
              {/*<Overview />*/}
              <WorkTypePage/>
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard'/>}/>
      </Route>
      <Route
        path='/report/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet/>
          </>
        }
      >
        <Route
          path='metering/*'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route
            path='MeteringByModelDetail'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Detail</PageTitle>
                <MeteringByModelDetail/>
              </>
            }
          />
          <Route
            path='MeteringByEquipment'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Equipment</PageTitle>
                <MeteringByEquipment/>
              </>
            }
          />
          <Route
            path='MeteringByModelSummary'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Summary</PageTitle>
                <MeteringByModelSummary/>
              </>
            }
          />
          <Route
            path='MeteringByModelEquipment'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Equipment</PageTitle>
                {/*<MeteringByModelEquipment/>*/}
              </>
            }
          />
        </Route>
        <Route
          path='changeout/*'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route
            path='ChangeOutByModel'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Change Out By Model</PageTitle>
                <ChangeoutByModel/>
              </>
            }
          />
          <Route
            path='ChangeoutByRefillTypeModel'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Changeout By Refill Type Model</PageTitle>
                <ChangeoutByRefillTypeModel/>
              </>
            }
          />
        </Route>
        <Route
          path='schedules/*'
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route
            path='ScheduleByModelSummaryReport'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Model Summary Report</PageTitle>
                <ScheduleByModelSummaryReport/>
              </>
            }
          />
          <Route
            path='ScheduleByServiceTypeReport'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Model Service Type</PageTitle>
                <ScheduleByServiceTypeReport/>
              </>
            }
          />
          <Route
            path={'ScheduleByLocationReport'}
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Location Report</PageTitle>
                <ScheduleByLocationReport/>
              </>
            }
          />
        </Route>
        <Route
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Reports</PageTitle>
              <AllReportPage/>
            </>
          }
        />
        <Route
          path='fault-summary-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Fault Report</PageTitle>
              <FaultEntryReport/>
            </>
          }
        />
        <Route
          path='FaultByCustodianSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Summary</PageTitle>
              <FaultByCustodianSummary/>
            </>
          }
        />
        <Route
          path='FaultByCustodianDetail'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Detail</PageTitle>
              <FaultByCustodianDetail/>
            </>
          }
        />
        <Route
          path='daily-hme-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Daily HME Report</PageTitle>
              <ReportNew/>
            </>
          }
        />
        <Route
          path='all-equip-summary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Equipment Summary</PageTitle>
              <AllEquipSummary/>
            </>
          }
        />
        <Route
          path='sumBydownType'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Summary By Down Type</PageTitle>
              <FaultByDowntimeReport/>
            </>
          }
        />
        <Route
          path='equipment-summary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>List Equipment Summary</PageTitle>
              <ListEquipmentSummary/>
            </>
          }
        />
        <Route
          path='faultByModelSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Model Summary</PageTitle>
              <FaultByModelSummary/>
            </>
          }
        />

        <Route
          path='service-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Service Type Report</PageTitle>
              <ServiceTypeReport/>
            </>
          }
        />
        <Route
          path='warranty-life'
          element={
            <>
              <PageTitle>Warranty End Of Life Report</PageTitle>
              <WarrantyEndOfLifeReport/>
            </>
          }
        />
        <Route
          path='CarperManufacturerReport'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Number Of Equipment Per Manufacturer</PageTitle>
              <NumberOfCarperManufacturerReport/>
            </>
          }
        />
        <Route
          path='meteringbymodelClassSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Class Summary</PageTitle>
              <MeteringByModelClassSummary/>
            </>
          }
        />
        <Route
          path='hourly-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Hourly Report</PageTitle>
              <HourlyReport/>
            </>
          }
        />
        <Route
          path='solved-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Solved Fault Report</PageTitle>
              <FaultEntrySolvedReport/>
            </>
          }
        />
        <Route
          path='pending-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Pending Fault Report</PageTitle>
              <FaultEntryPendingReport/>
            </>
          }
        />
        <Route
          path='fleetschedule-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fleet Schedule Report</PageTitle>
              <FleetScheduleReport/>
            </>
          }
        />
        <Route
          path='fleet-history-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment History Report</PageTitle>
              <FaultEntryFleetHistoryReport/>
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard'/>}/>
      </Route>


      <Route
        path='/checkListForm/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet/>
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
              <TabsTest/>
            </>
          }
        />

        <Route index element={<Navigate to='/dashboard'/>}/>
      </Route>
      <Route
        path='setup/*'
        element={
          <>
            {/*<ProductionHeader />*/}
            <Outlet/>
          </>
        }
      >
        <Route
          path='service/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Services </PageTitle>
              <ServicesPage/>
            </>
          }
        />
        <Route
          path='sections/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Sections </PageTitle>
              <SectionsPage/>
            </>
          }
        />
        <Route
          path='groups/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Groups </PageTitle>
              <GroupsPage/>
            </>
          }
        />
        <Route
          path='items/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Items </PageTitle>
              <ItemsPage/>
            </>
          }
        />
        <Route
          path='itemValue/:id'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>ItemValue </PageTitle>
              <ItemValuePage/>
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard'/>}/>
      </Route>
    </Routes>
  )
}
export default ProductionPage
