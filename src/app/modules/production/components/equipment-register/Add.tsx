import {Button, Col, Form, Input, Row, Tabs} from "antd";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";

const AddEquipRegister = () => {
  let [form] = Form.useForm();

  function onfinish(values: any) {
    console.log('onfinish');
    console.log(values)
  }

  return <>
    <KTCard>
      <KTCardBody>


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
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add Equipment'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Fleet ID' label='Fleet ID' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Fleet ID'
                        type='text'
                        className='form-control form-control-solid'
                        style={{width: '100%'}}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Manufacturer' label='Manufacturer' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Manufacturer'
                        type='text'
                        className='form-control form-control-solid'

                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Model' label='Model' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Model'
                        type='text'
                        className='form-control form-control-solid'
                      />
                    </Form.Item>
                  </div>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Model Class' label='Model Class' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Model Class'
                        type='text'
                        className='form-control form-control-solid'
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Description' label='Description' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Description'
                        type='text'
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
                // form={generalInfo}
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add General Info'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='General Information' label='General Information' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Description'
                        type='text'
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
          label: `Component`,
          key: '3',
          children: (
            <>
              <Form
                layout={'vertical'}
                // form={generalInfo}
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add Component'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Component' label='Component' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Component'
                        type='text'
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
          label: `Meters`,
          key: '4',
          children: (
            <>
              <Form
                name={'general-info'}
                layout={'vertical'}
                // form={generalInfo}
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add Meters'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Meters' label='Meters' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Meters'
                        type='text'
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
          label: `Fault`,
          key: '5',
          children: (
            <>
              <Form
                name={'general-info'}
                layout={'vertical'}
                // form={generalInfo}
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add Fault'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Fault' label='Fault' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Fault'
                        type='text'
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
          label: `Agreement`,
          key: '6',
          children: (
            <>
              <Form
                name={'general-info'}
                layout={'vertical'}
                // form={generalInfo}
                onFinish={onfinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                title='Add General Info'
              >
                <div className='row mb-0'>
                  <div className='col-6 mb-7'>
                    <Form.Item name='Agreement' label='Agreement' rules={[ {required: true} ]}>
                      <Input
                        placeholder='Enter Agreement'
                        type='text'
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
      ]}
    />
      </KTCardBody>
    </KTCard>

  </>
 }

 export default AddEquipRegister
