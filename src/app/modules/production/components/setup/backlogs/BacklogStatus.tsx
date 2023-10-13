import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Button, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Table} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {
  deleteBacklogStatus,
  getBacklogStatuses,
  postBacklogStatus,
  putBacklogStatus,
} from '../../../../../urls'
import {useAuth} from '../../../../auth'
import React, {useState} from 'react'

const BacklogStatus = () => {
  const {tenant} = useAuth()
  const queryClient: any = useQueryClient()
  const {data: statuses, isLoading} = useQuery('statuses', () => getBacklogStatuses(tenant))
  console.log('statuses', statuses)
  const {mutate: addBacklogStatus} = useMutation((data) => postBacklogStatus(data, tenant), {
    onSuccess: () => {
      message.success('Status added successfully')
      queryClient.invalidateQueries('statuses')
      form.resetFields()
      setIsModalOpen(false)
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Error adding status, Please try again')
    },
  })
  const {mutate: updateBacklogStatus} = useMutation(putBacklogStatus, {
    onSuccess: () => {
      message.success('Status updated successfully')
      queryClient.invalidateQueries('statuses')
      form.resetFields()
      setIsModalOpen(false)
      setIsUpdating(false)
    },
    onError: () => {
      message.error('Error updating status, Please try again')
    },
  })
  const {mutate: removeBacklogStatus} = useMutation(deleteBacklogStatus, {
    onSuccess: () => {
      message.success('Status deleted successfully')
      queryClient.invalidateQueries('statuses')
    },
    onError: () => {
      message.error('Error deleting status, Please try again')
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
          <Button
            type='primary'
            ghost
            onClick={() => {
              setIsModalOpen(true)
              setIsUpdating(true)
              form.setFieldsValue({
                ...record,
              })
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete 
            ${record.name} 
            ?`}
            onConfirm={() => {
              removeBacklogStatus(record.id)
            }}
          >
            <Button type={'primary'} danger>
              Delete
            </Button>
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
      isUpdating ? updateBacklogStatus(values) : addBacklogStatus(values)
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
        <Table columns={columns} bordered dataSource={statuses?.data} loading={isLoading} />
        <Modal
          title={isUpdating ? 'Update Status' : 'Add BacklogStatus'}
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

export default BacklogStatus
