import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Button, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Table} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {addPriorities, deletePriority, getPriority, putPriority} from '../../../../../urls'
import {useAuth} from '../../../../auth'
import React, {useState} from 'react'

const Priority = () => {
  const {tenant} = useAuth()
  const queryClient: any = useQueryClient()
  const {data: priorities, isLoading} = useQuery('priorities', () => getPriority(tenant))
  console.log('priorities', priorities)
  const {mutate: addPriority} = useMutation((data) => addPriorities(data, tenant), {
    onSuccess: () => {
      message.success('Priority added successfully')
      queryClient.invalidateQueries('priorities')
      form.resetFields()
      setIsModalOpen(false)
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Error adding priority, Please try again')
    },
  })
  const {mutate: updatePriority} = useMutation('updatePriority', putPriority, {
    onSuccess: () => {
      message.success('Priority updated successfully')
      queryClient.invalidateQueries('priorities')
      form.resetFields()
      setIsModalOpen(false)
      setIsUpdating(false)
    },
    onError: () => {
      message.error('Error updating priority, Please try again')
    },
  })
  const {mutate: removePriority} = useMutation('deletePriority', deletePriority, {
    onSuccess: () => {
      message.success('Priority deleted successfully')
      queryClient.invalidateQueries('priorities')
    },
    onError: () => {
      message.error('Error deleting priority, Please try again')
    },
  })
  const columns = [
    {
      title: 'Code',
      dataIndex: 'priorityId',
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
              removePriority(record.priorityId)
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
      isUpdating ? updatePriority(values) : addPriority(values)
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
        <Table columns={columns} bordered dataSource={priorities?.data} loading={isLoading} />
        <Modal
          title={isUpdating ? 'Update Priority' : 'Add Priority'}
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
              <Form.Item label='Code' name='priorityId' hidden={true} required={true}>
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

export default Priority
