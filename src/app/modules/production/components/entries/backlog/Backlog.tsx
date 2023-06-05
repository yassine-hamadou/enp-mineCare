import React, {useState} from 'react';
import {Badge, Button, DatePicker, Form, Input, message, Modal, Select, Space, Table, Tabs} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import TextArea from "antd/lib/input/TextArea";
import {getBacklogs, getEquipment, postBacklogs} from "../../../../../urls";
import {useAuth} from "../../../../auth";
import {useMutation, useQuery} from "react-query";

const Backlog = () => {
  const {tenant} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitCompleteLoading, setSubmitCompleteLoading] = useState(false)
  const {data: backlogData, isLoading: backlogIsLoading} = useQuery('backlog', () => getBacklogs(tenant))
  const {mutate: addBacklog} = useMutation('addBacklog', (data) => postBacklogs(data, tenant), {
    onSuccess: () => {
      message.success('Backlog added successfully')
    },
    onError: () => {
      message.error('Error adding backlog, Please try again')
    }
  })
  console.log(backlogData)
  const Option = Select.Option
  const showModal = () => {
    setIsModalOpen(true)
  }

  function handleCancel() {
    form.resetFields()
    setIsModalOpen(false)
  }

  function handleCompleteCancel() {
    // formComplete.resetFields()
    setIsCompleteModalOpen(false)
  }

  const showModalSolve = () => {
    setIsCompleteModalOpen(true)
  }
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    try {
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      message.success('Fault reported successfully')
      console.log("values", values)
      addBacklog(values)
    } catch (error: any) {
      setSubmitLoading(false)
      message.error('Error reporting fault, Please try again')
      return error.statusText
    }
  }
  const [form] = Form.useForm()
  const {data: equipmentData, isLoading: equipmentIsLoading} = useQuery('equipment', () => getEquipment(tenant))

  let columns: any[] = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
    },
    {
      title: 'BDate',
      dataIndex: 'bDate',
    },
    {
      title: 'CDate',
      dataIndex: 'cDate',
    },
    {
      title: 'Item',
      dataIndex: 'item',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Reference No',
      dataIndex: 'referenceNo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary">Complete</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    }
  ];
  return (
    <KTCard>
      <KTCardBody>
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              label: <Badge count={0}><span
                className='me-4'>All Backlogs</span></Badge>,
              key: '1',
              children: (
                <>
                  <div className='d-flex justify-content-between'>
                    <Space style={{marginBottom: 16}}>
                      <Input
                        placeholder='Enter Search Text'
                        // onChange={handleInputChange}
                        type='text'
                        allowClear
                      />
                    </Space>
                    <Space style={{marginBottom: 16}}>
                      <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
                        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                        Add
                      </button>
                      {/*<button type='button' className='btn btn-light-primary me-3'>*/}
                      {/*  <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>*/}
                      {/*  Export*/}
                      {/*</button>*/}
                    </Space>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={backlogData?.data}
                    bordered
                    rowKey={(record: any) => record.entryId}
                    scroll={{x: 1500}}
                    pagination={{
                      defaultPageSize: 10,
                    }}
                  />
                </>
              ),
            },
            {
              label: <Badge style={{backgroundColor: '#52c41a'}} count={0}><span
                className='me-4'>Completed Backlog</span></Badge>,
              key: '2',
              children: (
                <>
                  {/*<ResolutionTable faults={''}/>*/}
                </>
              ),
            },
          ]}
        />
        <Modal
          title='Add Backlog'
          open={isModalOpen}
          onCancel={handleCancel}
          closable={true}
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
                form.submit()
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            form={form}
            name='control-hooks'
            labelCol={{span: 8}}
            wrapperCol={{span: 14}}
            title='Add Backlog'
            onFinish={onFinish}
            layout={'horizontal'}
          >
            <Form.Item name='equipmentId' label='Equipment ID'>
              <Select
                showSearch
                placeholder='Select an equipment'
              >
                {
                  equipmentData?.data?.map((equipment: any) => (
                    <Option value={equipment.equipmentId}>{equipment.equipmentId}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item name='Bdate' label='Backlog Date'>
              <DatePicker showTime/>
            </Form.Item>
            <Form.Item name='Item' label='Item' rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name='Note' label='Note' rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name='Comment' label='Comment' rules={[{required: true}]}>
              <TextArea/>
            </Form.Item>
            <Form.Item name='ReferenceNo' label='Reference No'>
              <Input/>
            </Form.Item>
            <Form.Item name='Status' label='Status'>
              <Input/>
            </Form.Item>
            <Form.Item name='CompletionDate' label='Completion Date'>
              <DatePicker showTime/>
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  );
};

export default Backlog;
