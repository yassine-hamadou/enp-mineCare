import React, {useState, useEffect} from "react";
import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../../_metronic/helpers";
import {useForm} from "antd/es/form/Form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getEquipment, getGroundEngagingTools, postGroundEngagingTools} from "../../../../../../urls";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";

export default function GroundEngagingTools() {

  const queryClient = useQueryClient()


  const {
    data: groundengagingtools,
    isLoading: groundengagingtoolsLoading
  } = useQuery('groundengagingtools', () => getGroundEngagingTools())

  const [getForm] = useForm();
  const [editGetForm] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const {data: equipmentData} = useQuery('equipments', () => getEquipment());
  const {data: groundETData, isLoading: getLoading} = useQuery('groundEngagingTools', () => getGroundEngagingTools());
  const columns: any = [
    {
      title: "Equipment ID",
      dataIndex: "equipmentId"
    },
    {
      title: "Previous Hours",
      dataIndex: "previousHours"
    },
    {
      title: "Current Hours",
      dataIndex: "currentHours"
    },
    {
      title: "Quantity",
      dataIndex: "quantity"
    },
    {
      title: "Reason",
      dataIndex: "reason"
    },
    {
      title: "Date",
      dataIndex: "date"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" className="me-3" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" className="me-3" danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const {mutate: postGroundTool} = useMutation(postGroundEngagingTools, {
    onSuccess: () => {
      setSubmitLoading(false);
      getForm.resetFields();
      setIsModalOpen(false);
      queryClient.invalidateQueries('groundEngagingTools').then(
        () => {
          message.success('Ground Engaging Tool Added Successfully')
        }
      )
    }, onError: (e: any) => {
      setSubmitLoading(false);
      message.error(e.message)
    }
  })

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleEdit = (values: any) => {
    setOpenEditModal(true);
    editGetForm.setFieldsValue({
      equipmentId: values.equipmentId,
      previousHours: values.previousHours,
      currentHours: values.currentHours,
      quantity: values.quantity,
      reason: values.reason,
      date: dayjs(values.date)
    })
    console.log('date', values.date)
    console.log('values', values);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setOpenEditModal(false);
  }

  const onEditFinish = (values: any) => {
    return console.log('done', values);
  }


  const onFinish = (values: any) => {
    setSubmitLoading(true);
    console.log('done', values);
    const data = {
      equipmentId: values.equipmentId,
      previousHours: 0,
      currentHours: values.currentHours,
      quantity: values.quantity,
      reason: values.reason,
      date: new Date(values.date.$d).toISOString()
    }
    console.log('data', data);
    postGroundTool(data);
  }


  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className="d-flex justify-content-between">
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder="Enter Search Text"
                // onChange={handleInputChange}
                type="text"
                allowClear
              />
            </Space>
            <Space style={{marginBottom: 16}}>
              <button type="button" className="btn btn-primary me-3" onClick={() => showModal()}>
                <KTSVG
                  path="/media/icons/duotune/arrows/arr075.svg"
                  className="svg-icon-2"
                />
                Add
              </button>

              <Modal
                title="Add GET Ground Engaging Tool"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key='back' onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key='submit'
                    type='primary'
                    htmlType='submit'
                    loading={submitLoading}
                    onClick={() => {
                      getForm.submit()
                    }}
                  >
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  form={getForm}
                  name='control-hooks'
                  labelCol={{span: 8}}
                  wrapperCol={{span: 14}}
                  title='Add GET Ground Engaging Tool'
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='equipmentId'
                    label='Equipment ID'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Equipment ID'
                      }
                    ]}
                  >
                    <Select
                      placeholder='Select Equipment ID'
                      className={'w-100'}
                      allowClear
                      showSearch
                    >
                      {equipmentData?.data?.map((equipment: any) => {
                        return (
                          <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                            {equipment.equipmentId}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='previousHours'
                    label='Previous Hours'
                  >
                    <InputNumber min={1}
                                 className={'w-100'}
                                 disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name='currentHours'
                    label='Current Hours'
                    rules={[{
                      required: true,
                      message: 'Please select Current Hours'
                    }]}
                  >
                    <InputNumber min={1} className={'w-100'}/>
                  </Form.Item>
                  <Form.Item
                    name='date'
                    label='Date'
                    rules={[{
                      required: true,
                      message: 'Please select Date'
                    }]}
                  >
                    <DatePicker
                    />
                  </Form.Item>
                  <Form.Item
                    name='quantity'
                    label='Quantity'
                    rules={[{
                      required: true,
                      message: 'Please select Quantity'
                    }]}
                  >
                    <InputNumber
                      min={1}
                      className={'w-100'}
                    />
                  </Form.Item>
                  <Form.Item
                    name='reason'
                    label='Reason'
                    rules={[{
                      required: true,
                      message: 'Please Type Reason'
                    }]}
                  >
                    <TextArea
                      className={'w-100'}
                    />
                  </Form.Item>
                </Form>
              </Modal>

              <Modal
                title={`Edit: ${editGetForm.getFieldValue('equipmentId')}`}
                open={openEditModal}
                onCancel={handleEditCancel}
                footer={[
                  <Button key='back' onClick={handleEditCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key='submit'
                    type='primary'
                    htmlType='submit'
                    loading={submitLoading}
                    onClick={() => {
                      editGetForm.submit()
                    }}
                  >
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  form={editGetForm}
                  name='control-hooks'
                  labelCol={{span: 8}}
                  wrapperCol={{span: 14}}
                  title={`Edit Ground Engaging Tool`}
                  onFinish={onEditFinish}
                >
                  <Form.Item
                    name='equipmentId'
                    label='Equipment ID'
                    hidden
                    rules={[
                      {
                        required: true,
                        message: 'Please select Equipment ID'
                      }
                    ]}
                  >
                    <Select
                      placeholder='Select Equipment ID'
                      className={'w-100'}
                      allowClear
                      showSearch
                      disabled={true}
                    >
                      {equipmentData?.data?.map((equipment: any) => {
                          return (
                            <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                              {equipment.equipmentId}
                            </Select.Option>
                          );

                        }
                      )}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='previousHours'
                    label='Previous Hours'
                  >
                    <InputNumber min={1}
                                 className={'w-100'}
                                 disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name='currentHours'
                    label='Current Hours'
                    rules={[{
                      required: true,
                      message: 'Please select Current Hours'
                    }]}
                  >
                    <InputNumber min={1} className={'w-100'}/>
                  </Form.Item>
                  <Form.Item
                    name='date'
                    label='Date'
                    rules={[{
                      required: true,
                      message: 'Please select Date'
                    }]}
                  >
                    <DatePicker
                    />
                  </Form.Item>
                  <Form.Item
                    name='quantity'
                    label='Quantity'
                    rules={[{
                      required: true,
                      message: 'Please select Quantity'
                    }]}
                  >
                    <InputNumber
                      min={1}
                      className={'w-100'}
                    />
                  </Form.Item>
                  <Form.Item
                    name='reason'
                    label='Reason'
                    rules={[{
                      required: true,
                      message: 'Please Type Reason'
                    }]}
                  >
                    <TextArea
                      className={'w-100'}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </Space>
          </div>
          <Table
            columns={columns}
            //filter data for last 7 days
            dataSource={groundETData?.data}
            bordered
            loading={getLoading}
            // rowKey={}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
}


