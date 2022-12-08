import {Divider, Radio} from 'antd'
import {useState} from 'react'

const CheckListForm2 = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

  const [agree, setAgree] = useState(false)
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree)
    // Don't miss the exclamation mark
  }

  // When the button is clicked
  const btnHandler = () => {
    alert('The buttion is clickable!')
  }

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
              <strong>SECTION '2' - TRANSMISSION/HYDRAULIC/AXLES</strong>
            </h2>
          </div>
          <div className='d-flex justify-content-center mb-7'>
            <span className='fst-itali fs-5 text-danger'>
              Please read each lable carefully and select the appropriate option
            </span>
          </div>
          <div>
            <h3>
              <b>TRANSMISSION</b>
            </h3>
            <Divider />
          </div>
          {/* <Divider /> */}
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Replace Transmission oil filter
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Replace Torque Converter oil filter
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Inspect Torque Converter outlet screen
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Inspect all hoses for Leaks & damage
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Inspect & lubricate all drive shafts
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Cut Open Filter (Show to Supervisor)
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Check Transmission oil level</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Condition of transmission mounts
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Clean Transmission magnetic screen
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check Transmission & converter for oil leaks
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check for loose, missing or damaged guards
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Inspect Pump Drive</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check for Grease injector & adjust Accordingly
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <div>
            <h3>
              <b>HYDRAULIC</b>
            </h3>
            <Divider />
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Check hydraulic oil level</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check hydraulic Tank mounts for cracks
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Cut Open Filter (Show to Supervisor)
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Inspect all cylinder pivots & bearings
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Inspect tank for damage & leaks
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Replace Hoist, Torque breather filter
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Replace Parking brake release oil filter
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Replace steering oil filter</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div>
            <h3>
              <b>AXLES</b>
            </h3>
            <Divider />
          </div>

          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Change L/H & R/H Front wheel oil
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check Rear L/H & R/H Final drive oil level
                  </label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Check Rear Axle oil level</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Replace Rear axle oil filter</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='col-4 mb-10'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>Kidney Loop Rear Axle Oil</label>
                </div>
                <Radio.Group>
                  <Radio value={1}>Ok</Radio>
                  <Radio value={2}>Repair</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div>
            <h3>
              <b>Check condition of magnetic plugs</b>
            </h3>
            <Divider />
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>L/H Final Drive</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Clean </option>
                <option value='2'>Light Past</option>
                <option value='3'>Heavy Paste</option>
                <option value='4'>Light Flakes</option>
                <option value='5'>Heavy Flakes</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>R/H Final Drive</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Clean </option>
                <option value='2'>Light Past</option>
                <option value='3'>Heavy Paste</option>
                <option value='4'>Light Flakes</option>
                <option value='5'>Heavy Flakes</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Rear Axle</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Clean </option>
                <option value='2'>Light Past</option>
                <option value='3'>Heavy Paste</option>
                <option value='4'>Light Flakes</option>
                <option value='5'>Heavy Flakes</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>L/H Front Wheel</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Clean </option>
                <option value='2'>Light Past</option>
                <option value='3'>Heavy Paste</option>
                <option value='4'>Light Flakes</option>
                <option value='5'>Heavy Flakes</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>R/H Front Wheel</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Clean </option>
                <option value='2'>Light Past</option>
                <option value='3'>Heavy Paste</option>
                <option value='4'>Light Flakes</option>
                <option value='5'>Heavy Flakes</option>
              </select>
            </div>
          </div>
          <Divider dashed />
          <div className='row mb-5'>
            <div className='mb-4'>
              <input type='checkbox' id='agree' onChange={checkboxHandler} />
              <label htmlFor='agree'>
                {' '}
                I have completed <b>the above maintenance and inspections</b>
              </label>
            </div>
            <div>
              <button
                disabled={!agree}
                className='btn btn-primary'
                data-kt-plans-modal-action='submit'
                onClick={btnHandler}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export {CheckListForm2}
