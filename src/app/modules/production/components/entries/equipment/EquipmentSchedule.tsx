import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import axios from 'axios'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {Calendar} from './calendar/Calendar'
import {Button, Space, Table, Tabs} from 'antd'
import {useNavigate} from 'react-router-dom'
import {ENP_URL, fetchEmployee} from '../../../../../urls'
import {useQuery} from 'react-query'
import React, {useState} from 'react'
import {ErrorBoundary} from "@ant-design/pro-components";
import {useAuth} from "../../../../auth";
import {fetchSchedules, fetchServiceTypes} from "./calendar/requests";

function EquipmentSchedule() {
    const {tenant} = useAuth()
    let dropDownListObj: any
    const [chosenLocationIdFromDropdown, setChosenLocationIdFromDropdown] = useState(null)
    const navigate = useNavigate()
    const {data: locations} = useQuery('Locations', () => axios.get(`${ENP_URL}/IclocsApi`), {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    const {data: custodians} = useQuery('custodians', fetchEmployee, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    //set the data to dataSource property
    // const {data: schedulesData, isLoading: isScheduleLoading} = useQuery('schedules', () => fetchSchedules(tenant), {
    //   refetchOnWindowFocus: true,
    // })
    // const queryClient = useQueryClient()
    // const scheduleCache: any = queryClient?.getQueryData('schedules')
    const {
        data: schedulesData,
        isLoading: isScheduleLoading
    } = useQuery('completedSchedules', () => fetchSchedules(tenant), {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    const {data: serviceTypes, isLoading: servicesLoading} = useQuery('serviceTypes', () => fetchServiceTypes(tenant))


    const columns: any = [
        {
            title: 'Fleet ID',
            dataIndex: 'fleetId',
        },
        {
            title: 'Location',
            dataIndex: 'locationId',
        },
        {
            title: 'From',
            dataIndex: 'timeStart',
            render: (timeStart: any) => {
                return new Date(timeStart).toUTCString()
            }
        },
        {
            title: 'To',
            dataIndex: 'timeEnd',
            render: (timeEnd: any) => {
                return new Date(timeEnd).toUTCString()
            }
        },
        {
            title: 'Custodian ',
            dataIndex: 'responsible',
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceTypeId',
            render: (serviceTypeId: any) => {
                return serviceTypes?.data.find(
                  (service: any) => service.id === serviceTypeId
                )?.name
            }
        },
        // {
        //   title: 'Action',
        //   dataIndex: 'entryId',
        //   width: 350,
        //   fixed: 'right',
        //   render: (record: any) => {
        //     return (
        //       <Space size="middle">
        //         <button type={'button'} className='btn btn-light-primary btn-sm'>
        //           Checklist
        //         </button>
        //         <button
        //           type={'button'}
        //           className='btn btn-light-success btn-sm'
        //           onClick={() => navigate(`/entries/${record}/work`)}
        //         >
        //           Complete
        //         </button>
        //         <button type={'button'} className='btn btn-light-info btn-sm'>
        //           View Backlogs
        //         </button>
        //       </Space>
        //     )
        //   }
        // }
    ]

    console.log('chosenLocationIdFromDropdown', chosenLocationIdFromDropdown)

    return (
      <div
        style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
          <Tabs
            defaultActiveKey='1'
            items={[
                {
                    label: <span className='me-4'>Pending</span>,
                    key: '1',
                    children: (
                      <KTCard>
                          <KTCardBody className='py-5 px-2'>
                              <div className='d-flex justify-content-between'>
                                  <Space style={{marginBottom: 0}}>
                                      <DropDownListComponent
                                        id='dropdownlist'
                                        placeholder='Filter By location'
                                        onChange={(e: any) => setChosenLocationIdFromDropdown(e.value)}
                                        ref={(scope) => {
                                            dropDownListObj = scope
                                        }}
                                        dataSource={locations?.data?.map((location: any) => {
                                            return {
                                                text: `${location.locationCode}- ${location.locationDesc}`,
                                                value: `${location.locationCode}`,
                                            }
                                        })}
                                        fields={{text: 'text', value: 'value'}}
                                      />
                                      <Button
                                        type='primary'
                                        onClick={() => {
                                            setChosenLocationIdFromDropdown(null)
                                            dropDownListObj.value = null
                                        }}
                                      >
                                          Reset
                                      </Button>
                                      <DropDownListComponent
                                        id='dropdownlist'
                                        placeholder='Filter By Custodian'
                                        onChange={(e: any) => setChosenLocationIdFromDropdown(e.value)}
                                        ref={(scope) => {
                                            dropDownListObj = scope
                                        }}
                                        dataSource={custodians?.data?.map((custodians: any) => {
                                            return {
                                                text: `${custodians.emplCode}- ${custodians.emplName}`,
                                                value: `${custodians.emplCode}`,
                                            }
                                        })}
                                        fields={{text: 'text', value: 'value'}}
                                      />
                                      <Button
                                        type='primary'
                                        onClick={() => {
                                            setChosenLocationIdFromDropdown(null)

                                            dropDownListObj.value = null
                                        }}
                                      >
                                          Reset
                                      </Button>
                                  </Space>
                                  <Space style={{marginBottom: 0}}>
                                      <button
                                        type='button'
                                        className='btn btn-sm btn-primary me-3 mb-2'
                                        onClick={() => {
                                            navigate('/entries/start-work')
                                        }}
                                      >
                                          <KTSVG path='/media/icons/duotune/technology/teh005.svg'
                                                 className='svg-icon-2'/>
                                          Open Schedules
                                      </button>
                                  </Space>
                              </div>
                              <Calendar chosenLocationIdFromDropdown={chosenLocationIdFromDropdown}/>
                          </KTCardBody>
                      </KTCard>
                    ),
                },
                {
                    label: <span className='me-4'>Completed</span>,
                    key: '2',
                    children: (
                      <ErrorBoundary>
                          <KTCard>
                              <KTCardBody className='py-5 px-2'>
                                  <Table
                                    columns={columns}
                                    dataSource={schedulesData?.data?.filter(
                                      (schedule: any) => schedule.status === 'Completed'
                                    )}
                                    loading={isScheduleLoading}
                                    bordered
                                    rowKey={(record: any) => record.entryId}
                                    scroll={{x: 1000}}
                                  />
                              </KTCardBody>
                          </KTCard>
                      </ErrorBoundary>
                    ),
                },
            ]}
          />
      </div>
    )
}

export default EquipmentSchedule
