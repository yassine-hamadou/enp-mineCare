import {useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {Button, Form, Input, Tabs} from "antd";
import React from "react";

const UpdateRegister = () => {
  const {id} = useParams<{id: string}>();
    let [form] = Form.useForm();

    return <>
      <KTCard>
        <KTCardBody>
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                label: `Component`,
                key: '3',
                children: (
                  <>
                    <Form
                      layout={'vertical'}
                      // form={generalInfo}
                      // onFinish={onfinish}
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
                      // onFinish={onfinish}
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
                      // onFinish={onfinish}
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
                      // onFinish={onfinish}
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

export default UpdateRegister
