// import {Divider, Form} from 'antd'
// import {useState} from 'react'
// import {fetchServices} from '../../../../urls'
// import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
// import {useQuery} from 'react-query'
// import {useNavigate} from "react-router-dom";
// import {useAuth} from "../../../auth";
// import {fetchSchedules} from "../entries/equipment/calendar/requests";
//
// export function ScheduleInfo() {
//   const {tenant} = useAuth()
//   const navigate = useNavigate()
//   const [scheduleToworkOn, setScheduleToWorkOn] = useState<any>([])
//
//   const {data: loadSchedule}: any = useQuery('loadSchedule', () => fetchSchedules(tenant))
//
//   const {data: serviceType}: any = useQuery('serviceType', () => fetchServices(tenant))
//
//   const onSelect = (e: any) => {
//     const entryID = parseInt(e.target.value)
//     const schedule = loadSchedule?.data.find((s: any) => s.entryId === entryID)
//     console.log('scheduleSelect', schedule)
//     setScheduleToWorkOn(schedule)
//     if (schedule?.serviceTypeId === null || schedule?.serviceTypeId === undefined) {
//       navigate(`/entries/start-work`)
//     } else {
//       navigate(`/entries/start-work/${schedule?.serviceTypeId}/${schedule?.fleetId}`, {state: {schedule: schedule}})
//     }
//   }
//
//
//   return (
//     <>
//       <KTCard>
//         <KTCardBody>
//           <Form
//             id='kt_modal_add_plan_form'
//             className='form'
//             noValidate
//             name='basic'
//             // initialValues={{remember: true}}
//           >
//             {/* begin::Scroll */}
//             <div className='d-flex justify-content-center'>
//               <h2>
//                 <strong>Work Schedule</strong>
//               </h2>
//             </div>
//             <div className='d-flex justify-content-center mb-7'>
//               <span className='fst-itali fs-5 text-danger'>
//                 Please select your work schedule you want to work on from the list below
//               </span>
//             </div>
//             <div>
//               <Divider/>
//             </div>
//             {/* end::row */}
//             {/* start::row */}
//             <div className='row mb-10'>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>Schedule</label>
//                 <select
//                   className='form-select form-control form-control-solid mb-3'
//                   onChange={onSelect}
//                 >
//                   <option defaultValue='Select Schedule'>
//                     Select Schedule
//                   </option>
//                   {loadSchedule?.data?.map((schedule: any) => (
//                     <option value={schedule.entryId} key={schedule.entryId}>
//                       {schedule.fleetId}- {schedule.locationId} -{' '}
//                       {new Date(schedule.timeStart).toUTCString()} -{' '}
//                       {new Date(schedule.timeEnd).toUTCString()}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>Fleet ID</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-solid'
//                   name='fleetId'
//                   value={scheduleToworkOn?.fleetId ? scheduleToworkOn?.fleetId : ''}
//                   readOnly
//                 />
//               </div>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>Location</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-solid'
//                   name='location'
//                   value={
//                     scheduleToworkOn?.locationId ? scheduleToworkOn?.locationId : ''
//                   }
//                   readOnly
//                 />
//               </div>
//             </div>
//             {/* end::row */}
//             <div className='row mb-10'>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>From</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-solid'
//                   name='from'
//                   value={
//                     scheduleToworkOn?.timeStart
//                       ? new Date(scheduleToworkOn?.timeStart).toUTCString()
//                       : ''
//                   }
//                   readOnly
//                 />
//               </div>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>To</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-solid'
//                   name='to'
//                   value={
//                     scheduleToworkOn?.timeEnd
//                       ? new Date(scheduleToworkOn?.timeEnd).toUTCString()
//                       : ''
//                   }
//                   readOnly
//                 />
//               </div>
//               <div className='col-4'>
//                 <label className='required fw-bold fs-6 mb-2'>Service type</label>
//                 <input
//                   type='text'
//                   className='form-control form-control-solid'
//                   name='to'
//                   value={
//                     scheduleToworkOn?.serviceTypeId
//                       ? serviceType?.data.find(
//                         (service: any) => service.id === scheduleToworkOn?.serviceTypeId
//                       )?.name
//                       : ''
//                   }
//                   readOnly
//                 />
//               </div>
//             </div>
//             {/* end::row */}
//           </Form>
//         </KTCardBody>
//       </KTCard> {/*end::Card*/}
//     </>
//   )
// }


import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Space, Table} from 'antd'
import React, {useState} from 'react'
import {addHours, fetchServices, getHours, patchSchedule} from '../../../../urls'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../auth";
import {pendingSchedule} from "../entries/equipment/calendar/requests";
import dayjs from "dayjs";

export default function ScheduleInfo() {
    const {tenant} = useAuth()
    const navigate = useNavigate()
    const [scheduleToworkOn, setScheduleToWorkOn] = useState<any>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [form] = Form.useForm()

    const {data: loadSchedule, isLoading}: any = useQuery('loadSchedule', () => pendingSchedule(tenant))
    const {data: allHours}: any = useQuery('hours', () => getHours(tenant))
    const {data: serviceType}: any = useQuery('serviceType', () => fetchServices(tenant))
    const queryClient: any = useQueryClient()
    const onChecklist = (e: any) => {
        const entryID = parseInt(e)
        const schedule = loadSchedule?.data.find((s: any) => s.entryId === entryID)
        console.log('scheduleSelect', schedule)
        setScheduleToWorkOn(schedule)
        if (schedule?.serviceTypeId === null || schedule?.serviceTypeId === undefined) {
            navigate(`/entries/start-work`)
        } else {
            navigate(`/entries/start-work/${schedule?.serviceTypeId}/${schedule?.fleetId}`, {state: {schedule: schedule}})
        }
    }

    const {mutate: mutateHours} = useMutation(addHours, {
        onSuccess: () => {
            setIsModalOpen(false)
            form.resetFields()
            message.success('Hours added successfully')
            queryClient.invalidateQueries('hours')
        },
        onError: (error: any) => {
            message.error(error.message)
            throw error.ErrorBoundary
        }
    })

    const {mutate: completeSchedule} = useMutation(
      patchSchedule, {
          onSuccess: () => {
              queryClient.invalidateQueries('loadSchedule')
              setIsModalOpen(false)
              setSubmitLoading(false)
              console.log('completed')
              message.success('Schedule completed successfully')
              const equipmentHours = allHours?.data.filter((hour: any) => hour.fleetId === form.getFieldValue('fleetId'))
              mutateHours({
                  fleetId: form.getFieldValue('fleetId'),
                  comment: form.getFieldValue('comment'),
                  previousReading: equipmentHours?.length > 0 ? equipmentHours[equipmentHours.length - 1]?.currentReading : 0,
                  currentReading: form.getFieldValue('currentReading') ? form.getFieldValue('currentReading') : equipmentHours[equipmentHours.length - 1]?.currentReading,
                  tenantId: tenant,
                  date: form.getFieldValue('completedDate') ? form.getFieldValue('completedDate') : new Date(),
                  entrySource: 'PM Reading'
              })
              form.resetFields()
          },
          onError: (error: any) => {
              message.error(error)
          }
      }
    )


    const handleCompleteBacklog = (entryId: any, fleetId: any) => {
        setIsModalOpen(true)
        console.log('allHours', allHours?.data?.filter((hour: any) => hour.fleetId?.trim() === fleetId?.trim()))
        const latestReading = allHours?.data?.filter((hour: any) => hour.fleetId?.trim() === fleetId?.trim())[0]?.currentReading
        console.log('latestReading', latestReading)
        form.setFieldsValue({
              entryId: entryId,
              fleetId: fleetId,
              latestReading: latestReading,
          }
        )
    }

    const columns: any = [
        {
            title: 'Fleet ID',
            dataIndex: 'fleetId',
            sorter: (a: any, b: any) => {
                if (a.fleetId > b.fleetId) {
                    return 1
                }
                if (b.fleetId > a.fleetId) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Location',
            dataIndex: 'locationId',
            sorter: (a: any, b: any) => {
                if (a.locationId > b.locationId) {
                    return 1
                }
                if (b.locationId > a.locationId) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'From',
            dataIndex: 'timeStart',
            render: (timeStart: any) => {
                return new Date(timeStart).toUTCString()
            },
            sorter: (a: any, b: any) => {
                if (a.timeStart > b.timeStart) {
                    return 1
                }
                if (b.timeStart > a.timeStart) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'To',
            dataIndex: 'timeEnd',
            sorter: (a: any, b: any) => {
                if (a.timeEnd > b.timeEnd) {
                    return 1
                }
                if (b.timeEnd > a.timeEnd) {
                    return -1
                }
                return 0
            },
            render: (timeEnd: any) => {
                return new Date(timeEnd).toUTCString()
            }
        },
        {
            title: 'Custodian',
            dataIndex: 'responsible',
            sorter: (a: any, b: any) => {
                if (a.responsible > b.responsible) {
                    return 1
                }
                if (b.responsible > a.responsible) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceTypeId',
            sorter: (a: any, b: any) => {
                if (a.serviceTypeId > b.serviceTypeId) {
                    return 1
                }
                if (b.serviceTypeId > a.serviceTypeId) {
                    return -1
                }
                return 0
            },
            render: (serviceTypeId: any) => {
                return serviceType?.data.find(
                  (service: any) => service.id === serviceTypeId
                )?.name
            }
        },
        {
            title: 'Action',
            dataIndex: 'entryId',
            width: 350,
            fixed: 'right',
            render: (entryId: any, record: any) => {
                return (
                  <Space size="middle">
                      <button type={'button'} className='btn btn-light-primary btn-sm'
                              onClick={() => onChecklist(entryId)}>
                          Checklist
                      </button>
                      <button type={'button'} className='btn btn-light-success btn-sm' onClick={
                          () => handleCompleteBacklog(entryId, record?.fleetId)
                      }>
                          Complete
                      </button>
                      <button type={'button'} className='btn btn-light-info btn-sm' onClick={
                          () => navigate(`/entries/backlog/${record?.fleetId}`)
                      }>
                          View Backlogs
                      </button>
                  </Space>
                )
            }
        }
    ]

    function onFinish() {
        setSubmitLoading(true)
        completeSchedule({
            entryId: form?.getFieldValue('entryId'),
            comment: form.getFieldValue('comment'),
            completedDate: form.getFieldValue('completedDate')
        })
    }

    function handleCancel() {
        setIsModalOpen(false)
        setSubmitLoading(false)
        form.resetFields()
    }


    return (
      <>
          <KTCard>
              <KTCardBody>
                  <div className='row mb-0'>
                      <div>
                          <button
                            className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary mb-3'
                            onClick={() => {
                                navigate(-1)
                            }}
                          >
                              <i className='la la-arrow-left'/>
                              Back
                          </button>

                      </div>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={loadSchedule?.data}
                    loading={isLoading}
                    rowKey={'entryId'}
                    bordered
                    scroll={{x: 1000}}
                  />
                  <Modal
                    title={'Complete Backlog'}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    closable={true}
                    footer={[
                        <Button key='back' onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button
                          key='submit'
                          htmlType='submit'
                          type='primary'
                          loading={submitLoading}
                          onClick={() => {
                              form.submit()
                          }}
                        >
                            Complete
                        </Button>,
                    ]}
                  >
                      <Form
                        form={form}
                        name='control-hooks'
                        labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        title={'Complete Backlog'}
                        onFinish={onFinish}
                        layout={'horizontal'}
                      >
                          <Form.Item
                            name='entryId'
                            label='Entry ID'
                            hidden
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                          >
                              <Input disabled/>
                          </Form.Item>
                          <Form.Item
                            name='fleetId'
                            label='Fleet ID'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                          >
                              <Input disabled/>
                          </Form.Item>
                          <Form.Item
                            name='completedDate'
                            label='Date'
                            rules={[
                                {
                                    required: true,
                                    validator: (rule, value, callback) => {
                                        if (dayjs(value).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
                                            callback('Completed date cannot be less than today')
                                        }
                                        callback()
                                    }
                                },
                            ]}
                          >
                              <DatePicker
                              />
                          </Form.Item>
                          <Form.Item
                            name='latestReading'
                            label='Latest Reading'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                          >
                              <Input
                                disabled
                              />
                          </Form.Item>
                          <Form.Item
                            name='currentReading'
                            label='Current Reading'
                            rules={[
                                {

                                    validator: (rule, value, callback) => {
                                        if (value < form.getFieldValue('latestReading')) {
                                            callback('Current reading cannot be less than latest reading')
                                        }
                                        callback()
                                    }
                                },
                            ]}
                          >
                              <InputNumber min={0} max={999999}/>
                          </Form.Item>
                          <Form.Item
                            name='comment'
                            label='Comment'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                          >
                              <Input.TextArea/>
                          </Form.Item>
                      </Form>
                  </Modal>
              </KTCardBody>
          </KTCard> {/*end::Card*/}
      </>
    )
}
