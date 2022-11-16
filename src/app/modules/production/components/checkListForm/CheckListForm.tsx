import {Button, Input, Modal, Radio, RadioChangeEvent, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { isNotEmpty, KTCard, KTCardBody } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import {Field, useFormik} from 'formik'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Divider } from 'antd';
// import { Tabs } from 'antd';
import { CheckListForm2 } from './CheckListForm2'
import { CheckListForm3 } from './CheckListForm3'
import { CheckListForm5 } from './CheckListForm5'
import { CheckListForm4 } from './CheckListForm4'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import { TabContext } from '@mui/lab';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const CheckListForm = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [value, setValue] = useState(0);
  const [agree, setAgree] = useState(false);
  const [value1, setValue1] = useState(1);
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // When the button is clicked
  const btnHandler = () => {
    alert('The buttion is clickable!');
  };

  return (
    <>
    <div style={{backgroundColor:'white',  padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
     
      <form id='kt_modal_add_plan_form' className='form' noValidate>
        {/* begin::Scroll */}
        
          <div className='d-flex justify-content-center'>
            <h2><strong>SECTION '1' - ENGINE</strong></h2>
            
          </div>
          <div className='d-flex justify-content-center mb-7'>
            <span className="fst-itali fs-5 text-danger">Please read each lable carefully and select the appropriate option</span>
          </div>
          <Divider />
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              {/* <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select> */}
              <div className="form-control form-control-solid mb-3" >
                <div>
                <label className='required fw-bold fs-6 mb-2'>Cut Open Filter (Show to Supervisor)</label>

                </div>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
              </Radio.Group>
              </div>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Clean Primary Fuel filter</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check condition of battery cables</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
        

          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check condition of engine mounts</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check cooling fan for cracks or damage</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check Cooling system clamps & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check pulleys for excess bearing noise</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Clean Engine crankcase breather</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Condition & tension of all drive belts</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Check for cracks on fan belts & tighten Bolts</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Drain fuel tank water trap</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Inspect radiator core. (Clean if needed)</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Jump start receptacle cables if fitted</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Lubricate Fan hub & jockey pulley</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Test Air con system</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Test Charging system </label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Replace Primary Fuel filter</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Replace Secondary fuel filter</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Replace Fuel Filter (ORS) </label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Replace Engine oil filter</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Remove & clean starter silenser</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-7'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Inspect pulleys for cracks & dirt build-up  </label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
                
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Inspect Fuel lines for leaks & damage</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Inspect Exhaust manifolds & lines for leaks</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div>
          {/* end::row */}
          <div className='row mb-10'>
            <div className='col-4'>
              <label className='required fw-bold fs-6 mb-2'>Inspect Air induction system clamps & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Repair</option>
              </select>
            </div>
          </div> 
          <div>
            <h3><b>Check  condition of all Cylinders</b></h3>
            <Divider />
          </div>
          {/* end::row */}
          <div className='row mb-4'>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>LH Hoist Cylinder & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Chrome Damage</option>
                <option value="3">Weeping</option>
                <option value="4">Leaking</option>
                <option value="4">Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>LH Steering Cylinder & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Chrome Damage</option>
                <option value="3">Weeping</option>
                <option value="4">Leaking</option>
                <option value="4">Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>RH Steering Cylinder & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Chrome Damage</option>
                <option value="3">Weeping</option>
                <option value="4">Leaking</option>
                <option value="4">Leaking & Chrome Damage</option>
              </select>
            </div>
            <div className='col-3'>
              <label className='required fw-bold fs-6 mb-2'>RH Hoist Cylinder & hoses</label>
              <select className="form-select form-control form-control-solid mb-3" >
                <option selected>Select one option</option>
                <option value="1">Ok</option>
                <option value="2">Chrome Damage</option>
                <option value="3">Weeping</option>
                <option value="4">Leaking</option>
                <option value="4">Leaking & Chrome Damage</option>
              </select>
            </div>
          </div>
          <Divider dashed />
          <div className='row mb-5'>
            <div className='mb-4'>
              <input type="checkbox" id="agree" onChange={checkboxHandler} />
              <label htmlFor="agree"> I have completed <b>the above maintenance and inspections</b></label>
            </div>
            <div>
              <button 
                disabled={!agree}
                className='btn btn-primary'
                data-kt-plans-modal-action='submit' 
                onClick={btnHandler}>
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

