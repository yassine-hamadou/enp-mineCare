import {Button, DatePicker, Form, Input, message, Select, Tabs} from "antd";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {getModels, postEquipment} from "../../../../urls";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Link} from "react-router-dom";

const AddEquipRegister = () => {
  let [form] = Form.useForm();
  let [generalInfo] = Form.useForm();
  const queryClient = useQueryClient()

  const {data: listOfModels} = useQuery('listOfModels', getModels)
  const {mutate: addEquipment} = useMutation(postEquipment, {
    onSuccess: () => {
      queryClient.invalidateQueries('listOfEquipment')
      message.success('Equipment Added Successfully')
      form.resetFields()
    },
    onError: (error: any) => {
      message.error(error?.message)
    }
  })

  function onDetailsFinish(values: any) {
    console.log('onfinish1');
    console.log(values)
    addEquipment(values)
  }

  function onGeneralInfoFinish(values: any) {
    console.log('onfinish');
    console.log(values)
    addEquipment(values)
  }


  return <>
    <KTCard>
      <KTCardBody>
        <div className='row mb-0'>
          <div className=''>
            <Link to='/equipment-register'>
              <button className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                <i className='la la-arrow-left'/>
                Equipment Register
              </button>
            </Link>

          </div>
        </div>


        <Tabs
          defaultActiveKey='1'
          items={[
            {
              label: `Details`,
              key: '1',
              children: (
                <>
                  <Form
                    name={'add-equip-register'}
                    layout={'vertical'}
                    form={form}
                    onFinish={onDetailsFinish}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 24}}
                    title='Add Equipment'
                  >
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='equipmentId' label='Equipment ID' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Equipment ID'
                            type='text'
                            className='form-control form-control-solid'
                            style={{width: '100%'}}
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='serialNumber' label='Serial Number' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Serial Number'
                            type='text'
                            className='form-control form-control-solid'

                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='FACode' label='Fixed Asset Code' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Fixed Asset Code'
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='model' label='Model'
                                   rules={[{required: true}]}>
                          <Select
                            showSearch={true}
                            placeholder='Select Model'
                            className='form-control form-control-solid py-1'
                          >
                            {listOfModels?.data?.map((item: any) => (
                                <Select.Option value={item.code}>{item.manufacturer?.name} - {item.name}</Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='PurchaseDate' label='Purchase Date' rules={[{required: true}]}>
                          <DatePicker
                            placeholder='Select Purchase Date'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='ManufactureDate' label='Manufacture Date' rules={[{required: true}]}>
                          <DatePicker
                            placeholder='Select Manufacture Date'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-5 mb-7'>
                        <Form.Item name='Description' label='Description' rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder='Enter Description'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-3 mb-7'>
                        <Form.Item name='endOfLifeDate' label='End Of Life Date' rules={[{required: true}]}>
                          <DatePicker
                            placeholder='Select End Of Life Date'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>

                    </div>
                    <Button
                      type='primary'
                      htmlType='submit'
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              ),
            },
            {
              label: `General Information`,
              key: '2',
              children: (
                <>
                  <Form
                    name={'general-info'}
                    layout={'vertical'}
                    form={generalInfo}
                    onFinish={onGeneralInfoFinish}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 24}}
                    title='Add General Info'
                  >
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='universalCode' label='Universal Code' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Universal Code'
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='Meter Type' label='Meter Type (Hours, Km)' rules={[{required: true}]}>
                          <Select
                            showSearch={true}
                            placeholder='Select Meter Type'
                            className='form-control form-control-solid py-1'
                          >
                            <Select.Option value='HOUR'>Hours</Select.Option>
                            <Select.Option value='Km'>Km</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>

                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='warrantyStartDate' label='Warranty Start Date' rules={[{required: true}]}>
                          <DatePicker
                            placeholder='Select Warranty Start Date'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='warrantyEndDate' label='Warranty End Date' rules={[{required: true}]}>
                          <DatePicker
                            placeholder='Select Warranty End Date'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>

                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='Note' label='Note' rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder='Enter Note'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Button
                      type='primary'
                      htmlType='submit'
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              ),
            },
            // {
            //   label: `Component`,
            //   key: '3',
            //   children: (
            //     <>
            //       <Form
            //         layout={'vertical'}
            //         // form={generalInfo}
            //         onFinish={onfinish}
            //         labelCol={{span: 8}}
            //         wrapperCol={{span: 24}}
            //         title='Add Component'
            //       >
            //         <div className='row mb-0'>
            //           <div className='col-6 mb-7'>
            //             <Form.Item name='Component' label='Component' rules={[ {required: true} ]}>
            //               <Input
            //                 placeholder='Enter Component'
            //                 type='text'
            //                 className='form-control form-control-solid'
            //               />
            //             </Form.Item>
            //           </div>
            //         </div>
            //         <Button
            //           type='primary'
            //           htmlType='submit'
            //         >
            //           Submit
            //         </Button>
            //       </Form>
            //     </>
            //   ),
            // },
            // {
            //   label: `Meters`,
            //   key: '4',
            //   children: (
            //     <>
            //       <Form
            //         name={'general-info'}
            //         layout={'vertical'}
            //         // form={generalInfo}
            //         onFinish={onfinish}
            //         labelCol={{span: 8}}
            //         wrapperCol={{span: 24}}
            //         title='Add Meters'
            //       >
            //         <div className='row mb-0'>
            //           <div className='col-6 mb-7'>
            //             <Form.Item name='Meters' label='Meters' rules={[ {required: true} ]}>
            //               <Input
            //                 placeholder='Enter Meters'
            //                 type='text'
            //                 className='form-control form-control-solid'
            //               />
            //             </Form.Item>
            //           </div>
            //         </div>
            //         <Button
            //           type='primary'
            //           htmlType='submit'
            //         >
            //           Submit
            //         </Button>
            //       </Form>
            //     </>
            //   ),
            // },
            // {
            //   label: `Fault`,
            //   key: '5',
            //   children: (
            //     <>
            //       <Form
            //         name={'general-info'}
            //         layout={'vertical'}
            //         // form={generalInfo}
            //         onFinish={onfinish}
            //         labelCol={{span: 8}}
            //         wrapperCol={{span: 24}}
            //         title='Add Fault'
            //       >
            //         <div className='row mb-0'>
            //           <div className='col-6 mb-7'>
            //             <Form.Item name='Fault' label='Fault' rules={[ {required: true} ]}>
            //               <Input
            //                 placeholder='Enter Fault'
            //                 type='text'
            //                 className='form-control form-control-solid'
            //               />
            //             </Form.Item>
            //           </div>
            //         </div>
            //         <Button
            //           type='primary'
            //           htmlType='submit'
            //         >
            //           Submit
            //         </Button>
            //       </Form>
            //     </>
            //   ),
            // },
            // {
            //   label: `Agreement`,
            //   key: '6',
            //   children: (
            //     <>
            //       <Form
            //         name={'general-info'}
            //         layout={'vertical'}
            //         // form={generalInfo}
            //         onFinish={onfinish}
            //         labelCol={{span: 8}}
            //         wrapperCol={{span: 24}}
            //         title='Add General Info'
            //       >
            //         <div className='row mb-0'>
            //           <div className='col-6 mb-7'>
            //             <Form.Item name='Agreement' label='Agreement' rules={[ {required: true} ]}>
            //               <Input
            //                 placeholder='Enter Agreement'
            //                 type='text'
            //                 className='form-control form-control-solid'
            //               />
            //             </Form.Item>
            //           </div>
            //         </div>
            //         <Button
            //           type='primary'
            //           htmlType='submit'
            //         >
            //           Submit
            //         </Button>
            //       </Form>
            //     </>
            //   ),
            // },
          ]}
        />
      </KTCardBody>
    </KTCard>

  </>
}

export default AddEquipRegister

