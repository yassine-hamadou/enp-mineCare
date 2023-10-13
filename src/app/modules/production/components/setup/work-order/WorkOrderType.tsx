import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Button, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Table} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {
  addWorkOrderTypes,
  deleteWorkOrderTypes,
  getWorkOrderTypes,
  putWorkOrderTypes,
} from '../../../../../urls'
import {useAuth} from '../../../../auth'
import React, {useState} from 'react'

const WorkOrderType = () => {
  const {tenant} = useAuth()
  const queryClient: any = useQueryClient()
  const {data: workOrderTypes, isLoading} = useQuery('workOrderTypes', () =>
    getWorkOrderTypes(tenant)
  )
  const {mutate: addWorkOrderType} = useMutation(
    'addWorkOrderType',
    (data) => addWorkOrderTypes(data, tenant),
    {
      onSuccess: () => {
        message.success('WorkOrderType added successfully')
        queryClient.invalidateQueries('workOrderTypes')
        form.resetFields()
        setIsModalOpen(false)
      },
      onError: () => {
        message.error('Error adding workOrderType, Please try again')
      },
    }
  )
  const {mutate: updateWorkOrderType} = useMutation(
    'updateWorkOrderType',
    (data) => putWorkOrderTypes(data, tenant),
    {
      onSuccess: () => {
        message.success('WorkOrderType updated successfully')
        queryClient.invalidateQueries('workOrderTypes')
        form.resetFields()
        setIsModalOpen(false)
        setIsUpdating(false)
      },
      onError: () => {
        message.error('Error updating workOrderType, Please try again')
      },
    }
  )
  const {mutate: removeWorkOrderType} = useMutation('deleteWorkOrderType', deleteWorkOrderTypes, {
    onSuccess: () => {
      message.success('WorkOrderType deleted successfully')
      queryClient.invalidateQueries('workOrderTypes')
    },
    onError: () => {
      message.error('Error deleting workOrderType, Please try again')
    },
  })
  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button
            className={'btn btn-sm btn-light-primary'}
            onClick={() => {
              setIsModalOpen(true)
              setIsUpdating(true)
              form.setFieldsValue({
                ...record,
              })
            }}
          >
            Edit
          </button>
          <Popconfirm
            title={`Are you sure you want to delete 
            ${record.name} 
            ?`}
            onConfirm={() => {
              removeWorkOrderType(record.id)
            }}
          >
            <button className={'btn btn-sm btn-light-danger'}>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)

  function handleCancel() {
    setIsModalOpen(false)
    form.resetFields()
    setIsUpdating(false)
  }

  function handleModalSubmit() {
    form.submit()
  }

  function onFinish(values: any) {
    setSubmitLoading(true)
    console.log(values)
    try {
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      isUpdating ? updateWorkOrderType(values) : addWorkOrderType(values)
      setIsUpdating(false)
    } catch (error: any) {
      setSubmitLoading(false)
      setIsUpdating(false)
      return error.statusText
    }
  }

  function openAdd() {
    setIsUpdating(false)
    setIsModalOpen(true)
  }

  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input placeholder='Enter Search Text' type='text' allowClear />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={openAdd}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table columns={columns} bordered dataSource={workOrderTypes?.data} loading={isLoading} />
        <Modal
          title={isUpdating ? 'Update WorkOrderType' : 'Add WorkOrderType'}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitLoading} onClick={handleModalSubmit}>
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={form}
            name='control-hooks'
            title='Add'
            onFinish={onFinish}
          >
            {isUpdating && (
              <Form.Item label='Code' name='id' hidden={true} required={true}>
                <InputNumber disabled={true} />
              </Form.Item>
            )}
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Enter Name' type='text' allowClear />
            </Form.Item>
            {isUpdating && (
              <Form.Item label='Tenant' name='tenantId' hidden required={true}>
                <Input
                  placeholder='Enter Name'
                  type='text'
                  allowClear
                  value={tenant}
                  disabled={true}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default WorkOrderType
