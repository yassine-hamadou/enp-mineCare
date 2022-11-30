import {Divider} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {ENP_URL} from '../../../../urls'
import {TabsTest} from '../checkListForm/Tabs'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'

export function ScheduleInfo() {
  const [schedules, setSchedules] = useState<any>([])
  const [scheduleToworkOn, setScheduleToWorkOn] = useState<any>([])

  const loadSchedules = async () => {
    const response = await axios.get(`${ENP_URL}/FleetSchedulesApi`)
    setSchedules(response.data)
  }
  const onSelect = (e: any) => {
    const entryID = parseInt(e.target.value)
    const schedule = schedules.find((s: any) => s.entryId === entryID)
    console.log('scheduleSelect', schedule)
    setScheduleToWorkOn(schedule)
  }
  useEffect(() => {
    loadSchedules()
  }, [])

  return (
    <>
      <KTCard>
        <KTCardBody>
          <form id='kt_modal_add_plan_form' className='form' noValidate>
            {/* begin::Scroll */}
            <div className='d-flex justify-content-center'>
              <h2>
                <strong>Work Schedule</strong>
              </h2>
            </div>
            <div className='d-flex justify-content-center mb-7'>
              <span className='fst-itali fs-5 text-danger'>
                Please select your work schedule you want to work on
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
                  <option value='Select Schedule'>Select Schedule</option>
                  {schedules?.map((schedule: any) => (
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
                    scheduleToworkOn?.serviceType
                      ? scheduleToworkOn?.serviceType
                      : 'No Service Type'
                  }
                  readOnly
                />
              </div>
            </div>
            {/* end::row */}
            <Divider dashed />
          </form>
        </KTCardBody>
      </KTCard>
      {/*</div>*/}
      <TabsTest />
    </>
  )
}
