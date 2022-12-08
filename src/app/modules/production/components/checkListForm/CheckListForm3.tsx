import {Divider, Radio} from 'antd'
import {useState} from 'react'

const CheckListForm3 = () => {
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
              <strong>SECTION '3' - BODY/FRAME</strong>
            </h2>
          </div>
          <div className='d-flex justify-content-center mb-7'>
            <span className='fst-itali fs-5 text-danger'>
              Please read each lable carefully and select the appropriate option
            </span>
          </div>
          <Divider />
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <div className='form-control form-control-solid mb-3'>
                <div>
                  <label className='required fw-bold fs-6 mb-2'>
                    Check Auto Lub Supply to all pins & bearings
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
                    Check operation of Auto Lub system
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
                  <label className='required fw-bold fs-6 mb-2'>Clean Air conditioner filter</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Clean cab air filter</label>
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
                    Inspect Access steps, grab rails & handrails
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect Cab Mounts</label>
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
                    Inspect Frame & Body support pads
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect ROPS</label>
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
                    Inspect and repair Skip ropes
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
                    Check all other linkages & bearings
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
                  <label className='required fw-bold fs-6 mb-2'>Check Steering Accumulator</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Check Suspension cylinders</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect catwalk for cracks</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect Condition of Tyres</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect service brakes</label>
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
                  <label className='required fw-bold fs-6 mb-2'>Inspect Steering linkage</label>
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
                    Lubricate Steering cylinder bearings
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
              <b>Check condition of all Cylinders</b>
            </h3>
            <Divider />
          </div>
          {/* end::row */}
          <div className='row mb-4'>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>LH Hoist Cylinder & hoses</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Ok</option>
                <option value='2'>Chrome Damage</option>
                <option value='3'>Weeping</option>
                <option value='4'>Leaking</option>
                <option value='4'>Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>LH Steering Cylinder & hoses</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Ok</option>
                <option value='2'>Chrome Damage</option>
                <option value='3'>Weeping</option>
                <option value='4'>Leaking</option>
                <option value='4'>Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>RH Steering Cylinder & hoses</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Ok</option>
                <option value='2'>Chrome Damage</option>
                <option value='3'>Weeping</option>
                <option value='4'>Leaking</option>
                <option value='4'>Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>RH Hoist Cylinder & hoses</label>
              <select className='form-select form-control form-control-solid mb-3'>
                <option selected>Select one option</option>
                <option value='1'>Ok</option>
                <option value='2'>Chrome Damage</option>
                <option value='3'>Weeping</option>
                <option value='4'>Leaking</option>
                <option value='4'>Leaking & Chrome Damage</option>
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

export {CheckListForm3}
