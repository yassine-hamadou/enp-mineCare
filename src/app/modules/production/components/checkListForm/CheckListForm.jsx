import { Divider, Empty, Radio, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import React from "react";

//pass props to the component
const CheckListForm = (props) => {
  console.log('props', props.sections)
  const [checkList, setCheckList] = useState([]);
  const [agree, setAgree] = useState(false)
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree)
    // Don't miss the exclamation mark
  }

  const onChange = (e, itemName, groupName, propsSections) => {
    setCheckList(
      [
        ...checkList,
        e.target.value
      ]
    )
  }

  useEffect(() => {
    console.log('checkList', checkList)
    console.log('form elements', checkListForm.getFieldsValue())
  }, [checkList])
  // When the button is clicked
  const btnHandler = () => {
    console.log('form elements', checkListForm.getFieldsValue())
  }

  const [checkListForm] = useForm()

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          // padding: '20px',
          // borderRadius: '5px',
          // boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
        <Form
          id='kt_modal_add_plan_form'
          className='form'
          onFinish={btnHandler}
          form={checkListForm}
          noValidate
          name={props.sections.name}
        >
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
          {props.sections.groups.map((group) => {
            return props.sections.groups.length > 0 ? (
              <>
                <div>
                  <h2 className='mt-5'>
                    <b>{String(group.name).toUpperCase()}</b>
                    <Divider />
                  </h2>

                </div>
                <Form.Item name={props.sections.name}>
                  <div className='row mb-0'>
                    {/*map through the items*/}
                    {group.items.length > 0 ? group.items.map((item, index) => {
                      return (
                        <div className='col-4 mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>
                            {item.name ? item.name : null}
                          </label>
                          <select
                            className='form-select form-control form-control-solid mb-3'
                            onChange={
                              (e) => onChange(e, item.name, group.name, props.sections)
                            }
                          >
                            <option defaultValue='Select one option'>Select one option</option>
                            {item.itemValues.length > 0 ? item.itemValues.map((itemValue, index) => {
                              return (
                                <option key={index} value={JSON.stringify({
                                  [props.sections.name]: {
                                    [group.name]: {
                                      [item.name]: itemValue.name ? itemValue.name : 'Ok'
                                    }
                                  }
                                })}>{itemValue.name ? itemValue.name : 'Default Ok'}</option>
                              )
                            }) :
                               <option key={index} value={JSON.stringify({
                                  [props.sections.name]: {
                                    [group.name]: {
                                      [item.name]: 'Default Ok'
                                    }
                                  }
                                })}>Default Ok</option>
                            }
                          </select>
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
                </Form.Item>
              </>
            ) : (
              <>
                <div className='row mb-7'>
                  <h2>No groups found!</h2>
                </div>
              </>
            )
          })}

          {/*// <div className='row mb-5'>*/}
          {/*//   <div className='mb-4'>*/}
          {/*//     <input type='checkbox' id='agree' onChange={checkboxHandler} />*/}
          {/*//     <label htmlFor='agree'>*/}
          {/*//       I have completed <b>the above maintenance and inspections</b>*/}
          {/*//     </label>*/}
          {/*//   </div>*/}
          {/*//   <div>*/}
          {/*    <button*/}
          {/*      disabled={!agree}*/}
          {/*      className='btn btn-primary'*/}
          {/*      data-kt-plans-modal-action='submit'*/}
          {/*      onClick={btnHandler}*/}
          {/*    >*/}
          {/*      Continue*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </Form>
      </div>
    </>
  )
}

export { CheckListForm }
