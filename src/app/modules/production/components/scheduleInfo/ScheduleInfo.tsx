import {CheckListForm3} from '../checkListForm/CheckListForm3'
import {Divider} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'

const ENP_URL = 'http://localhost:3001'
// const ENP_URL = 'http://208.117.44.15/smwebapi/api'
export function ScheduleInfo() {
  const [schedules, setSchedules] = useState<any>([])

  const loadSchedules = async () => {
    const response = await axios.get(`${ENP_URL}/FleetSchedulesApi`)
    setSchedules(response.data)
  }
  useEffect(() => {
    loadSchedules()
  }, [])

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
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
          {/* <Divider /> */}
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Schedule</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one schedule</option>
                {schedules?.map((schedule: any) => (
                  <option
                    onSelect={() => {
                      //update other fields
                    }}
                    value={schedule.entryId}
                  >
                    {schedule.fleetId}- {schedule.locationId}
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
                readOnly
                // defaultValue='Fleet 1'
              />
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Location</label>
              <input
                type='text'
                className='form-control form-control-solid'
                name='fleetId'
                readOnly
                // defaultValue='Fleet 1'
              />
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-6'>
              <label className='required fw-bold fs-6 mb-2'>From</label>
              <input
                type='text'
                className='form-control form-control-solid'
                name='fleetId'
                readOnly
                // defaultValue='Fleet 1'
              />
            </div>
            <div className='col-6'>
              <label className='required fw-bold fs-6 mb-2'>To</label>
              <input
                type='text'
                className='form-control form-control-solid'
                name='fleetId'
                readOnly
                // defaultValue='Fleet 1'
              />
            </div>
          </div>
          {/* end::row */}
          <Divider dashed />
        </form>
      </div>
      <CheckListForm3 />
    </>
  )
}
