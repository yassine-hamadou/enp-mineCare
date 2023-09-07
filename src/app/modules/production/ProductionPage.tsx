import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import TopBarProgress from 'react-topbar-progress-indicator'
import {ErrorBoundary, PageLoading} from "@ant-design/pro-components";
import React, {lazy, Suspense} from "react";

const ScheduleInfo = lazy(() => import('./components/scheduleInfo/ScheduleInfo'))
const WorkTypePage = lazy(() => import('./components/setup/workType/WorkType'))
const DownTypePage = lazy(() => import('./components/setup/downType/DownType'))
const CustodianPage = lazy(() => import('./components/setup/custodian/Custodian'))
const LocationPage = lazy(() => import('./components/setup/location/LocationPage'))
const FleetPage = lazy(() => import('./components/setup/fleet/FleetPage'))
const ServicesPage = lazy(() => import('./components/setup/service/ServicePage'))
const GroupsPage = lazy(() => import('./components/setup/groups/GroupsPage'))
const ItemsPage = lazy(() => import('./components/setup/items/ItemPage'))
const SectionsPage = lazy(() => import('./components/setup/sections/Sections'))
const LubePage = lazy(() => import('./components/setup/lube/Lube'))
const CompartmentPage = lazy(() => import('./components/setup/compartment/Compartment'))
const RefillPage = lazy(() => import('./components/setup/refill/Refill'))
const OilGradePage = lazy(() => import('./components/setup/oilGrade/OilGrade'))
const OilTypePage = lazy(() => import('./components/setup/oilType/OilType'))
const FaultTable = lazy(() => import('./components/entries/fault_d/FaultTable'))
const LubeConfig = lazy(() => import('./components/setup/lubeConfig/LubeConfig'))
const ItemValuePage = lazy(() => import('./components/setup/itemValue/ItemValuePage'))
const Manufacturer = lazy(() => import('./components/setup/equipment/Manufacturer'))
const EquipmentSchedule = lazy(() => import('./components/entries/equipment/EquipmentSchedule'))
const AllReportPage = lazy(() => import('./components/report/AllReportPage'))
const CategorySetup = lazy(() => import('./components/setup/category/CategorySetup'))
const GroundEngagingTools = lazy(() => import('./components/entries/changeOut/get/GroundEngagingTools'))
const ReportComponent = lazy(() => import('./components/report/ReportComponent/ReportComponent'))
const Backlog = lazy(() => import('./components/entries/backlog/Backlog'))
const Priority = lazy(() => import('./components/setup/backlogs/Priority'))
const Source = lazy(() => import('./components/setup/backlogs/Source'))
const Sequence = lazy(() => import('./components/setup/service/sequence/Sequence'))
const ViewBacklog = lazy(() => import('./components/entries/backlog/ViewBacklog'))
const DownStatusPage = lazy(() => import('./components/setup/downType/DownStatus'))
const ModelsForManufacturer = lazy(() => import('./components/setup/equipment/ModelsForManufacturer'))
const ModelClass = lazy(() => import('./components/setup/equipment/ModelClass'))

const EquipmentRegister = lazy(() => import('./components/equipment-register/EquipmentRegister'))
const AddEquipRegister = lazy(() => import('./components/equipment-register/Add'))
const UpdateRegister = lazy(() => import('./components/equipment-register/UpdateRegister'))
const HoursModelClass = lazy(() => import('./components/entries/hours/HoursModelClass'))
const TabsTest = lazy(() => import('./components/checkListForm/Tabs'))

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
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <EquipmentRegister/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='add'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Add Equipment</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
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
                        <Suspense fallback={<TopBarProgress/>}>
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
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <EquipmentSchedule/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='backlog/*'
                element={
                    <>
                        <Suspense fallback={<PageLoading/>}>
                            <ErrorBoundary>
                                <Outlet/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              >
                  <Route
                    path=''
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Backlog</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <Backlog/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path=':fleetId'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>
                                {`View Backlog`}
                            </PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ViewBacklog/>
                                </ErrorBoundary>
                            </Suspense>
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
                    path='lube'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Scheduled Oil Sampling</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <LubePage/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='ground-engaging-tools'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Ground Engaging Tools</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <GroundEngagingTools/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
              </Route>
              <Route
                path='start-work/*'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Maintenance Schedule</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ScheduleInfo/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              >

              </ Route>
              <Route
                path='start-work/:serviceId/:fleetId'
                element={
                    <>
                        <Suspense fallback={<PageLoading/>}>
                            <ErrorBoundary>
                                <PageTitle breadcrumbs={accountBreadCrumbs}>Checklist</PageTitle>
                                <TabsTest/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
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
                          <Suspense fallback={<TopBarProgress/>}>
                              <ErrorBoundary>
                                  <FaultTable/>
                              </ErrorBoundary>
                          </Suspense>
                      </>
                  }/>
              </Route>
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
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Hours Entries</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <HoursModelClass/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
              </Route>
              <Route index element={<Navigate to='/dashboard'/>}/>
          </Route>
          <Route
            path='/setup/*'
            element={
                <>
                    <Outlet/>
                </>
            }
          >
              <Route
                path='sequence/*'
                element={
                    <>
                        <Outlet/>
                    </>
                }
              >
                  <Route
                    path=':modelId'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Sequence</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <Sequence/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
              </Route>
              <Route
                path='equipment/model-class'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Model Class </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ModelClass/>
                            </ErrorBoundary>
                        </Suspense>
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
                          <PageTitle breadcrumbs={accountBreadCrumbs}>All Manufacturers </PageTitle>
                          <Suspense fallback={<TopBarProgress/>}>
                              <ErrorBoundary>
                                  <Manufacturer/>
                              </ErrorBoundary>
                          </Suspense>
                      </>
                  }/>
                  <Route
                    path=':manufacturerCode'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Models For Manufacturer </PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ModelsForManufacturer/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
              </Route>
              <Route
                path='fleet'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Fleets </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <FleetPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='down-type'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Down Types </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <DownTypePage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='down-status'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Down Statuses </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <DownStatusPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='custodian'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Custodians </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <CustodianPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='location'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Locations</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <LocationPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='compartment'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Compartment</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <CompartmentPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='category'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Categories</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <CategorySetup/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='refill'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All RefillTypes</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <RefillPage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='lube-grade/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Grades</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <OilGradePage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='lube-config'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Lube Configurations</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <LubeConfig/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='lube-brand'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Brands</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <OilTypePage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='work-type'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Service Types</PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>

                                <WorkTypePage/>

                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='backlogs/*'
                element={
                    <>
                        <ErrorBoundary>
                            <Outlet/>
                        </ErrorBoundary>
                    </>
                }
              >
                  <Route
                    path='priority'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Priorities</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <Priority/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='source'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Sources</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <Source/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />

              </Route>
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
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <AllReportPage/>
                            </ErrorBoundary>
                        </Suspense>
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
                    path='all-metering'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>All Metering</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<MeteringByModelClassSummary/>*/}
                                    <ReportComponent reportName={"AllMeteringReport"}/>
                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='MeteringByModelDetail'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Detail</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<MeteringByModelDetail/>*/}
                                    <ReportComponent
                                      reportName={"MeteringbyModelDetail"}/>

                                </ErrorBoundary>
                            </Suspense>

                        </>
                    }
                  />
                  <Route
                    path='MeteringByEquipment'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Equipment</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ReportComponent
                                      reportName={"MeteringByEquipment"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='MeteringByModelSummary'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Summary</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ReportComponent
                                      reportName={"Meteringbymodelsummary"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='MeteringByModelEquipment'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Equipment</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                </ErrorBoundary>
                            </Suspense>
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
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<ChangeoutByModel/>*/}
                                    <ReportComponent
                                      reportName={"ChangeoutByModel"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='summary'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>All Change out</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ReportComponent
                                      reportName={"AllChangeoutReport"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='ChangeoutByRefillTypeModel'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Changeout By Refill Type Model</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ReportComponent
                                      reportName={"Changeoutbyrefilltypemodel"}/>

                                </ErrorBoundary>
                            </Suspense>
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
                    path='all-schedules'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>All Schedules</PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<ScheduleByModelSummaryReport/>*/}
                                    <ReportComponent
                                      reportName={"AllSchedulesReport"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='ScheduleByModelSummaryReport'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Model Summary Report </PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<ScheduleByModelSummaryReport/>*/}
                                    <ReportComponent
                                      reportName={"ScheduleByModelSummaryReport"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path='ScheduleByServiceTypeReport'
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Model Service Type </PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    <ReportComponent
                                      reportName={"ScheduleByServiceTypeReport"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
                  <Route
                    path={'ScheduleByLocationReport'}
                    element={
                        <>
                            <PageTitle breadcrumbs={accountBreadCrumbs}>Schedule By Location Report </PageTitle>
                            <Suspense fallback={<TopBarProgress/>}>
                                <ErrorBoundary>
                                    {/*<ScheduleByLocationReport/>*/}
                                    <ReportComponent
                                      reportName={"ScheduleByLocationSummaryReport"}/>

                                </ErrorBoundary>
                            </Suspense>
                        </>
                    }
                  />
              </Route>

              <Route
                path='equipment-transactions'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment transactions </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"EquipmentTransactionReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='fault-summary-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Fault Summary Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"FaultEntrySummaryReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='all-faults'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Faults Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"AllfaultsReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='all-backlogs'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Backlogs Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FaultEntryReport/>*/}
                                <ReportComponent
                                  reportName={"AllBacklogsReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='FaultByCustodianSummary'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Summary </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FaultByCustodianSummary/>*/}
                                <ReportComponent
                                  reportName={"FaultByCustodianSummary"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='FaultByCustodianDetail'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Custodian Detail </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FaultByCustodianDetail/>*/}
                                <ReportComponent
                                  reportName={"FaultByCustodianDetail"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='daily-hme-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Daily HME Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<ReportNew/>*/}
                                <ReportComponent
                                  reportName={"Daily_HME_KPIReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='all-equip-summary'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Equipment Summary </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<AllEquipSummary/>*/}
                                <ReportComponent
                                  reportName={"AllEquipmentSummary"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='defect'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>All Defects </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"EquipmentDefect"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='sumBydownType'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Summary By Down Type </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FaultByDowntimeReport/>*/}
                                <ReportComponent
                                  reportName={"FaultByDowntimeReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='equipment-summary'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>List Equipment Summary </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<ListEquipmentSummary/>*/}
                                <ReportComponent
                                  reportName={"ListEquipmentSummary"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='faultByModelSummary'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Fault By Model Summary </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FaultByModelSummary/>*/}
                                <ReportComponent
                                  reportName={"FaultByModelSummary"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />

              <Route
                path='service-type'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Service Type Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<ServiceTypeReport/>*/}
                                <ReportComponent
                                  reportName={"ServiceTypeReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='warranty-life'
                element={
                    <>
                        <PageTitle>Warranty End Of Life Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<WarrantyEndOfLifeReport/>*/}
                                <ReportComponent
                                  reportName={"WarrantyEndOfLifeReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='CarperManufacturerReport'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Number Of Equipment Per Manufacturer </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent reportName={"NumberOfCarperManufacturerReport"}/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='meteringbymodelClassSummary'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Metering By Model Class Summary </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<MeteringByModelClassSummary/>*/}
                                <ReportComponent reportName={"meteringbymodelclasssummary"}/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />

              <Route
                path='hourly-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Hourly Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<HourlyReport/>*/}
                                <ReportComponent
                                  reportName={"HourlyReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='solved-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Solved Fault Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"FaultEntrySolvedReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>

                    </>
                }
              />
              <Route
                path='pending-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Pending Fault Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent reportName={"FaultEntryPendingReport"}/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='fleetschedule-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Fleet Schedule Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                {/*<FleetScheduleReport/>*/}
                                <ReportComponent
                                  reportName={"FleetScheduleReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='fleet-history-report'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Equipment History Report </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ReportComponent
                                  reportName={"FaultEntryFleetHistoryReport"}
                                />
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route index element={<Navigate to='/dashboard'/>}/>
          </Route>


          {/*<Route*/}
          {/*  path='/checkListForm/*'*/}
          {/*  element={*/}
          {/*      <>*/}
          {/*          /!*<ProductionHeader />*!/*/}
          {/*          <Outlet/>*/}
          {/*      </>*/}
          {/*  }*/}
          {/*>*/}


          {/*    <Route index element={<Navigate to='/dashboard'/>}/>*/}
          {/*</Route>*/}
          <Route
            path='setup/*'
            element={
                <>
                    <Outlet/>
                </>
            }
          >
              <Route
                path='service/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Services </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ServicesPage/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='sections/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Sections </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <SectionsPage/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='groups/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Groups </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <GroupsPage/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='items/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>Items </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ItemsPage/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route
                path='itemValue/:id'
                element={
                    <>
                        <PageTitle breadcrumbs={accountBreadCrumbs}>ItemValue </PageTitle>
                        <Suspense fallback={<TopBarProgress/>}>
                            <ErrorBoundary>
                                <ItemValuePage/>
                            </ErrorBoundary>
                        </Suspense>
                    </>
                }
              />
              <Route index element={<Navigate to='/dashboard'/>}/>
          </Route>
      </Routes>
    )
}
export default ProductionPage
