import {Button, Divider, Empty, Radio, RadioChangeEvent} from 'antd'
import {useState} from 'react'
// import { Tabs } from 'antd';
// import { TabContext } from '@mui/lab';

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}


//pass props to the component
const CheckListForm = (props: any) => {
  console.log('props', props.sections)
  const [value, setValue] = useState(0)
  const [agree, setAgree] = useState(false)
  const [value1, setValue1] = useState(1)
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree)
    // Don't miss the exclamation mark
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
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
            <h1>
              <strong>{String(`${props.sections.name}`).toUpperCase()}</strong>
            </h1>
          </div>
          <div className='d-flex justify-content-center mb-7'>
            <span className='fst-itali fs-5 text-danger'>
              Please read each label carefully and select the appropriate option
            </span>
          </div>
          {props.sections.groups.map((group: any, index: any) => {
            return props.sections.groups.length > 0 ? (
              <>
                <div>
                  <h2 className='mt-5'>
                    <b>{String(group.name).toUpperCase()}</b>
                    <Divider />
                  </h2>

                </div>
                <div className='row mb-0'>
                  {/*map through the items*/}
                  {group.items.length > 0 ? group.items.map((item: any, index: any) => {
                    return (
                      <div className='col-4 mb-7'>
                        <div className='form-control form-control-solid mb-3'>
                          <div>
                            <label className='required fw-bold fs-6 mb-2'>
                              {item.name ? item.name : null}
                            </label>
                          </div>
                          <Radio.Group>
                            <Radio value={1}>Ok</Radio>
                            <Radio value={2}>Repair</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                    )
                  }) : (
                    <>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        imageStyle={{
                          height: 60,
                        }}
                        description={
                          <span>No items found. Kindly setup new items for the checklist.</span>
                        }
                      >
                      </Empty>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className='row mb-7'>
                  <h2>No groups found!</h2>
                </div>
              </>
            )
          })}

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

export {CheckListForm}
