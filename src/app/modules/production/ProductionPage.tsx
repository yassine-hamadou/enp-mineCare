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
import {OilGradePage} from './components/setup/oilGrade/OilGrade'
import {OilTypePage} from './components/setup/oilType/OilType'
import {FaultTable} from './components/entries/fault_d/FaultTable'
import FaultEntryPendingReport from './components/report/fault/faultEntryPending/FaultEntryPendingReport'
import {LubeConfig} from './components/setup/lubeConfig/LubeConfig'
import {ItemValuePage} from './components/setup/itemValue/ItemValuePage'
import ModelClass from "./components/setup/equipment/ModelClass";
import Manufacturer from "./components/setup/equipment/Manufacturer";
import ModelsForManufacturer from "./components/setup/equipment/ModelsForManufacturer";
import EquipmentSchedule from "./components/entries/equipment/EquipmentSchedule";
import {AllReportPage} from './components/report/AllReportPage'
import {CategorySetup} from './components/setup/category/CategorySetup'
import GroundEngagingTools from './components/entries/changeOut/get/GroundEngagingTools'
import ChangeoutByRefillTypeModel
  from "./components/report/changeout/ChangeoutByRefillTypeModel/ChangeoutByRefillTypeModel";
import {ErrorBoundary, PageLoading} from "@ant-design/pro-components";
import {lazy, Suspense} from "react";
import ReportComponent from "./components/report/ReportComponent/ReportComponent";

const EquipmentRegister = lazy(() => import('./components/equipment-register/EquipmentRegister'))
const AddEquipRegister = lazy(() => import('./components/equipment-register/Add'))
const UpdateRegister = lazy(() => import('./components/equipment-register/UpdateRegister'))
const HoursModelClass = lazy(() => import('./components/entries/hours/HoursModelClass'))


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
              <Suspense fallback={<PageLoading/>}>
                <ErrorBoundary>
                  <EquipmentRegister/>
                </ErrorBoundary>
              </Suspense>
              {/*dfs*/}
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Add Equipment</PageTitle>
              <Suspense fallback={<PageLoading/>}>
                <ErrorBoundary>
                  <AddEquipRegister/>
                </ErrorBoundary>
              </Suspense>
            </>
          }
        />
        <Route
          path='edit/:equipmentId'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Update Equipment</PageTitle>
              <Suspense fallback={<PageLoading/>}>
                <ErrorBoundary>
                  <UpdateRegister/>
                </ErrorBoundary>
              </Suspense>
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
              <Suspense fallback={<PageLoading/>}>
                <ErrorBoundary>
                  <EquipmentSchedule/>
                </ErrorBoundary>
              </Suspense>
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
                <ErrorBoundary>
                  <TabsTest/>
                </ErrorBoundary>
              </>
            }
          />
        </ Route>
        <Route
          path='fault/*'
          element={
            <>
              <ErrorBoundary>
                <Outlet/>
              </ErrorBoundary>
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
              <ErrorBoundary>
                <Suspense fallback={<PageLoading/>}>
                  <Outlet/>
                </Suspense>
              </ErrorBoundary>
            </>
          }
        >
          <Route
            path=''
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>All Entries</PageTitle>
                <HoursModelClass/>
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
              <ErrorBoundary>
                <WorkTypePage/>
              </ErrorBoundary>
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
          path='all'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Reports</PageTitle>
              <AllReportPage/>
            </>
          }
        />
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
                {/*<MeteringByModelDetail/>*/}
                <ReportComponent
                  reportName={"MeteringbyModelDetail"}
                />
              </>
            }
          />
          <Route
            path='MeteringByEquipment'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Equipment</PageTitle>
                {/*<MeteringByEquipment/>*/}
                <ReportComponent
                  reportName={"MeteringByEquipment"}
                />
              </>
            }
          />
          <Route
            path='MeteringByModelSummary'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Summary</PageTitle>
                {/*<MeteringByModelSummary/>*/}
                <ReportComponent
                  reportName={"Meteringbymodelsummary"}
                />
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
                {/*<ChangeoutByModel/>*/}
                <ReportComponent
                  reportName={"ChangeoutByModel"}
                />
              </>
            }
          />
          <Route
            path='ChangeoutByRefillTypeModel'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Changeout By Refill Type Model</PageTitle>
                <ChangeoutByRefillTypeModel/>
                <ReportComponent
                  reportName={"Changeoutbyrefilltypemodel"}
                />
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
                {/*<ScheduleByModelSummaryReport/>*/}
                <ReportComponent
                  reportName={"ScheduleByModelSummaryReport"}
                />
              </>
            }
          />
          <Route
            path='ScheduleByServiceTypeReport'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Model Service Type</PageTitle>
                {/*<ScheduleByServiceTypeReport/>*/}
                <ReportComponent
                  reportName={"ScheduleByServiceTypeReport"}
                />
              </>
            }
          />
          <Route
            path={'ScheduleByLocationReport'}
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Location Report</PageTitle>
                {/*<ScheduleByLocationReport/>*/}
                <ReportComponent
                  reportName={"ScheduleByLocationSummaryReport"}
                />
              </>
            }
          />
        </Route>

        <Route
          path='equipment-transactions'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment transactions</PageTitle>
              {/*<FaultEntryReport/>*/}
              <ReportComponent
                reportName={"EquipmentTransactionReport"}
              />
            </>
          }
        />
        <Route
          path='fault-summary-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Fault Report</PageTitle>
              {/*<FaultEntryReport/>*/}
              <ReportComponent
                reportName={"FaultEntrySummaryReport"}
              />
            </>
          }
        />
        <Route
          path='FaultByCustodianSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Summary</PageTitle>
              {/*<FaultByCustodianSummary/>*/}
              <ReportComponent
                reportName={"FaultByCustodianSummary"}
              />
            </>
          }
        />
        <Route
          path='FaultByCustodianDetail'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Detail</PageTitle>
              {/*<FaultByCustodianDetail/>*/}
              <ReportComponent
                reportName={"FaultByCustodianDetail"}
              />
            </>
          }
        />
        <Route
          path='daily-hme-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Daily HME Report</PageTitle>
              {/*<ReportNew/>*/}
              <ReportComponent
                reportName={"Daily_HME_KPIReport"}
              />
            </>
          }
        />
        <Route
          path='all-equip-summary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Equipment Summary</PageTitle>
              {/*<AllEquipSummary/>*/}
              <ReportComponent
                reportName={"AllEquipmentSummary"}
              />
            </>
          }
        />
        <Route
          path='defect'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Defects</PageTitle>
              <ReportComponent
                reportName={"EquipmentDefect"}
              />
            </>
          }
        />
        <Route
          path='sumBydownType'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Summary By Down Type</PageTitle>
              {/*<FaultByDowntimeReport/>*/}
              <ReportComponent
                reportName={"FaultByDowntimeReport"}
              />
            </>
          }
        />
        <Route
          path='equipment-summary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>List Equipment Summary</PageTitle>
              {/*<ListEquipmentSummary/>*/}
              <ReportComponent
                reportName={"ListEquipmentSummary"}
              />
            </>
          }
        />
        <Route
          path='faultByModelSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Model Summary</PageTitle>
              {/*<FaultByModelSummary/>*/}
              <ReportComponent
                reportName={"FaultByModelSummary"}
              />
            </>
          }
        />

        <Route
          path='service-type'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Service Type Report</PageTitle>
              {/*<ServiceTypeReport/>*/}
              <ReportComponent
                reportName={"ServiceTypeReport"}
              />
            </>
          }
        />
        <Route
          path='warranty-life'
          element={
            <>
              <PageTitle>Warranty End Of Life Report</PageTitle>
              {/*<WarrantyEndOfLifeReport/>*/}
              <ReportComponent
                reportName={"WarrantyEndOfLifeReport"}
              />
            </>
          }
        />
        <Route
          path='CarperManufacturerReport'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Number Of Equipment Per Manufacturer</PageTitle>
              <ReportComponent reportName={"NumberOfCarperManufacturerReport"}/>
            </>
          }
        />
        <Route
          path='meteringbymodelClassSummary'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Class Summary</PageTitle>
              {/*<MeteringByModelClassSummary/>*/}
              <ReportComponent reportName={"meteringbymodelclasssummary"}/>
            </>
          }
        />
        <Route
          path='hourly-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Hourly Report</PageTitle>
              {/*<HourlyReport/>*/}
              <ReportComponent
                reportName={"HourlyReport"}
              />
            </>
          }
        />
        <Route
          path='solved-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Solved Fault Report</PageTitle>
              {/*<FaultEntrySolvedReport/>*/}
              <ReportComponent
                reportName={"FaultEntrySolvedReport"}
              />

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
              {/*<FleetScheduleReport/>*/}
              <ReportComponent
                reportName={"FleetScheduleReport"}
              />
            </>
          }
        />
        <Route
          path='fleet-history-report'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment History Report</PageTitle>
              {/*<FaultEntryFleetHistoryReport/>*/}
              <ReportComponent
                reportName={"FaultEntryFleetHistoryReport"}
              />
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
              <ErrorBoundary>
                <TabsTest/>
              </ErrorBoundary>
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
