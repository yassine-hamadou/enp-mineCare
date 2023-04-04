import {useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {Button, Form, Input, Modal, Space, Table, Tabs} from "antd";
import React, {useState} from "react";

const UpdateRegister = () => {
  const {id} = useParams<{id: string}>();
    let [form] = Form.useForm();

  let [showModal, setShowModal] = useState(false);
  let columns: any = [
    {
        title: 'equipmentId',
    },
    {
        title: 'Serial Number',
    },
    {
        title: 'Description',
    },
    {
        title: 'Quantity',
    }
  ];
  let metersColumns: any = [
    {

    }
  ];
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
                      // onFinish={onfinish}
                      labelCol={{span: 8}}
                      wrapperCol={{span: 24}}
                      title='Add Equipment'
                    >
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='equipmentId' label='Euipment ID' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Equipment ID'
                              type='text'
                              className='form-control form-control-solid'
                              style={{width: '100%'}}
                            />
                          </Form.Item>
                        </div>
                        <div className='col-6 mb-7'>
                          <Form.Item name='serialNumber' label='Serial Number' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Serial Number'
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
                        <div className='col-6 mb-7'>
                          <Form.Item name='ManufactureDate' label='Manufacture Date' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Manufacture Date'
                              type='date'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='PurchaseDate' label='Purchase Date' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Purchase Date'
                              type='date'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                        <div className='col-6 mb-7'>
                          <Form.Item name='endOfLifeDate' label='End Of Life Date' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter End Of Life Date'
                              type='date'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='FACode' label='Fixed Asset Code' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Fixed Asset Code'
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
                      // onFinish={onfinish}
                      labelCol={{span: 8}}
                      wrapperCol={{span: 24}}
                      title='Add General Info'
                    >
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='Note' label='Note' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Note'
                              type='text'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                        <div className='col-6 mb-7'>
                          <Form.Item name='Warranty Start Date' label='Warranty Start Date' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Warranty Start Date'
                              type='text'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='Warranty End Date' label='Warranty End Date' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Warranty End Date'
                              type='text'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                        <div className='col-6 mb-7'>
                          <Form.Item name='Universal Code' label='Universal Code' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Universal Code'
                              type='text'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-6 mb-7'>
                          <Form.Item name='Meter Type' label='Meter Type (Hours, Km)' rules={[ {required: true} ]}>
                            <Input
                              placeholder='Enter Meter Type'
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
                    <div className='d-flex justify-content-between'>
                      <Space style={{ marginBottom: 16 }}>
                        <Input.Search
                            placeholder='Search Component'
                            onSearch={value => console.log(value)}
                            // style={{ width: 200 }}
                        />
                      </Space>
                      <Space style={{ marginBottom: 16 }}>
                        <Button type={"primary"} onClick={() => setShowModal(true)}>Add Component</Button>
                      </Space>
                    </div>
                    <Table
                        columns={columns}
                        // dataSource={data}
                    />
                    <Modal
                        title='Add Component'
                        open={showModal}
                        // onCancel={handleCancel}
                        closable={true}
                        footer={null}
                    >
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
                    </Modal>
                  </>
                ),
              },
              {
                label: `Meters`,
                key: '4',
                children: (
                  <>
                    <div className='d-flex justify-content-between'>
                      <Space style={{ marginBottom: 16 }}>
                        <Input.Search
                          placeholder='Search Component'
                          onSearch={value => console.log(value)}
                          // style={{ width: 200 }}
                        />
                      </Space>
                      <Space style={{ marginBottom: 16 }}>
                        <Button type={"primary"} onClick={() => setShowModal(true)}>Add Component</Button>
                      </Space>
                    </div>
                    <Table
                      columns={metersColumns}
                      // dataSource={data}
                    />
                    <Modal
                      title='Add Component'
                      open={showModal}
                      // onCancel={handleCancel}
                      closable={true}
                      footer={null}
                    >
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
                    </Modal>

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
