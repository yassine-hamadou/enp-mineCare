import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {deleteManufacturer, getManufacturers, postManufacturer} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from '../../../../auth'

const Manufacturer = () => {
  const {tenant} = useAuth()
  const queryClient = useQueryClient()
  const {data: manufacturers, isLoading} = useQuery('manufacturersQuery', () =>
    getManufacturers(tenant)
  )
  const {mutate: mutateManufacturer} = useMutation((data) => postManufacturer(data, tenant), {
    onSuccess: () => {
      setIsModalOpen(false)
      form.resetFields()
      setSubmitLoading(false)
      message.success('Manufacturer added successfully')
      queryClient.invalidateQueries('manufacturersQuery')
    },
    onError: (error: any) => {
      message.error(error.message)
      setSubmitLoading(false)
    },
  })
  const {mutate: removeManufacturer} = useMutation(deleteManufacturer, {
    onSuccess: () => {
      message.success('Manufacturer deleted successfully')
      queryClient.invalidateQueries('manufacturersQuery')
    },
    onError: (error: any) => {
      message.error(error.message)
    },
  })

  const columns: any = [
    {
      title: 'Manufacturer ID',
      dataIndex: 'manufacturerId',
      visible: false,
      sorter: (a: any, b: any) => {
        if (a.manufacturerId > b.manufacturerId) {
          return 1
        }
        if (b.manufacturerId > a.manufacturerId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Manufacturer Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      },
      search: true,
    },
    {
      title: 'Model',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link
            to={`${record.manufacturerId}`}
            state={manufacturers?.data?.filter(
              (manufacturer: any) => manufacturer.manufacturerId === record.manufacturerId
            )}
          >
            <button type='button' className='btn btn-light-primary me-3'>
              Models
            </button>
          </Link>
        </Space>
      ),
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button type='button' className='btn btn-light-warning me-3'>
            Edit
          </button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.name}?`}
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete(record.manufacturerId)}
          >
            <button type='button' className='btn btn-light-danger me-3'>
              Delete
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      ...values,
    }
    mutateManufacturer(data)
  }

  function handleDelete(element: any) {
    //if there are other dependencies, do not delete
    //the current record
    if (
      manufacturers?.data?.find((manufacturer: any) => manufacturer.manufacturerId === element)
        ?.models?.length > 0
    ) {
      message.error('Cannot delete manufacturer with models, Delete all models first')
      return
    }
    removeManufacturer(element)
  }

  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input placeholder='Enter Search Text' type='text' allowClear />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={showModal}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns?.filter((column: any) => column.visible !== false)}
          bordered
          rowKey={(record: any) => record.manufacturerId}
          dataSource={manufacturers?.data}
          loading={isLoading}
        />
        <Modal
          title='Add Manufacturer'
          open={isModalOpen}
          onOk={handleOk}
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
                form.submit()
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={form}
            name='control-hooks'
            title='Add Manufacturer'
            onFinish={onFinish}
          >
            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please enter manufacturer name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='Code' name='code'>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input type='email' />
            </Form.Item>
            <Form.Item label='Address' name='address'>
              <Input />
            </Form.Item>
            <Form.Item label='Phone' name='phone'>
              <Input type='number' />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default Manufacturer
