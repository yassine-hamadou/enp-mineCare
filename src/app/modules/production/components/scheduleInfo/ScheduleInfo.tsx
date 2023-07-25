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


import {message, Popconfirm, Space, Table} from 'antd'
import React, {useState} from 'react'
import {fetchServices, patchSchedule} from '../../../../urls'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../auth";
import {pendingSchedule} from "../entries/equipment/calendar/requests";

export function ScheduleInfo() {
    const {tenant} = useAuth()
    const navigate = useNavigate()
    const [scheduleToworkOn, setScheduleToWorkOn] = useState<any>([])


    const {data: loadSchedule, isLoading}: any = useQuery('loadSchedule', () => pendingSchedule(tenant))

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

    const {mutate: completeSchedule} = useMutation(
      patchSchedule, {
          onSuccess: () => {
              queryClient.invalidateQueries('loadSchedule')
              message.success('Schedule completed successfully')
          },
          onError: (error: any) => {
              message.error(error)
          }
      }
    )

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
            title: 'Custodian',
            dataIndex: 'responsible',
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceTypeId',
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
                      <Popconfirm title={'Are you sure this schedule is completed?'} onConfirm={() => {
                          completeSchedule(entryId)
                          console.log('record', entryId)
                      }
                      }>
                          <button type={'button'} className='btn btn-light-success btn-sm'>
                              Complete
                          </button>
                      </Popconfirm>
                      <button type={'button'} className='btn btn-light-info btn-sm' onClick={
                          () => navigate(`/entries/backlog/${record.fleetId}`)
                      }>
                          View Backlogs
                      </button>
                  </Space>
                )
            }
        }
    ]

    return (
      <>
          <KTCard>
              <KTCardBody>
                  <Table
                    columns={columns}
                    dataSource={loadSchedule?.data}
                    loading={isLoading}
                    rowKey={'entryId'}
                    bordered
                    scroll={{x: 1000}}
                  />
              </KTCardBody>
          </KTCard> {/*end::Card*/}
      </>
    )
}
