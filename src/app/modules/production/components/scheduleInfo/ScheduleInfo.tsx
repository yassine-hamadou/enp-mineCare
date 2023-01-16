import {Divider, Form, Select} from 'antd'
import {useState} from 'react'
import axios from 'axios'
import {ENP_URL} from '../../../../urls'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {useQuery} from 'react-query'
import { useNavigate } from "react-router-dom";

export function ScheduleInfo() {
  const navigate = useNavigate()
  const [scheduleToworkOn, setScheduleToWorkOn] = useState<any>([])

  const {data: loadSchedule}: any = useQuery('loadSchedule', () => {
    return axios.get(`${ENP_URL}/FleetSchedulesApi`)
  })

  const {data: serviceType}: any = useQuery('serviceType', () => {
    return axios.get(`${ENP_URL}/Services`)
  })

  const onSelect = (e: any) => {
    const entryID = parseInt(e.target.value)
    const schedule = loadSchedule?.data.find((s: any) => s.entryId === entryID)
    console.log('scheduleSelect', schedule)
    setScheduleToWorkOn(schedule)
    if (schedule?.serviceTypeId === null || schedule?.serviceTypeId === undefined) {
      navigate(`/entries/start-work`)
    }
    else {
      navigate(`/entries/start-work/${schedule?.serviceTypeId}`)
    }
  }


  return (
    <>
      <KTCard>
        <KTCardBody>
          <Form
            id='kt_modal_add_plan_form'
            className='form'
            noValidate
            name='basic'
            initialValues={{remember: true}}
          >
            {/* begin::Scroll */}
            <div className='d-flex justify-content-center'>
              <h2>
                <strong>Work Schedule</strong>
              </h2>
            </div>
            <div className='d-flex justify-content-center mb-7'>
              <span className='fst-itali fs-5 text-danger'>
                Please select your work schedule you want to work on from the list below
              </span>
            </div>
            <div>
              <Divider />
            </div>
            {/* end::row */}
            {/* start::row */}
            <div className='row mb-10'>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>Schedule</label>
                <select
                  className='form-select form-control form-control-solid mb-3'
                  onChange={onSelect}
                >
                  <option defaultValue='Select Schedule'>
                    Select Schedule
                  </option>
                  {loadSchedule?.data.map((schedule: any) => (
                    <option value={schedule.entryId} key={schedule.entryId}>
                      {schedule.fleetId}- {schedule.locationId} -{' '}
                      {new Date(schedule.timeStart).toUTCString()} -{' '}
                      {new Date(schedule.timeEnd).toUTCString()}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>Fleet ID</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='fleetId'
                  value={scheduleToworkOn?.fleetId ? scheduleToworkOn?.fleetId : 'Select Schedule'}
                  readOnly
                />
              </div>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>Location</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='location'
                  value={
                    scheduleToworkOn?.locationId ? scheduleToworkOn?.locationId : 'Select Schedule'
                  }
                  readOnly
                />
              </div>
            </div>
            {/* end::row */}
            <div className='row mb-10'>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>From</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='from'
                  value={
                    scheduleToworkOn?.timeStart
                      ? new Date(scheduleToworkOn?.timeStart).toUTCString()
                      : 'Select Schedule'
                  }
                  readOnly
                />
              </div>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>To</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='to'
                  value={
                    scheduleToworkOn?.timeEnd
                      ? new Date(scheduleToworkOn?.timeEnd).toUTCString()
                      : 'Select Schedule'
                  }
                  readOnly
                />
              </div>
              <div className='col-4'>
                <label className='required fw-bold fs-6 mb-2'>Service type</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='to'
                  value={
                    scheduleToworkOn?.serviceTypeId
                      ? serviceType?.data.find(
                          (service: any) => service.id === scheduleToworkOn?.serviceTypeId
                        )?.name
                      : 'No Service Type'
                  }
                  readOnly
                />
              </div>
            </div>
            {/* end::row */}
            <Divider dashed />
          </Form>
        </KTCardBody>
      </KTCard>  {/*end::Card*/}
    </>
  )
}
