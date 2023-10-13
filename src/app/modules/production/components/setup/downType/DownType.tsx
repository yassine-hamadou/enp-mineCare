import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd'
import React, {useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {deleteDowntype, ENP_URL, getDowntypes, postDownType} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from '../../../../auth'
import axios from 'axios'

const DownTypePage = () => {
  const {tenant} = useAuth()
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')
  const {data: downTypes, isLoading} = useQuery('downTypes', () => getDowntypes(tenant))
  const [gridData, setGridData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const {mutate: addDownType} = useMutation((data: any) => postDownType(data, tenant), {
    onSuccess: () => {
      message.success('System added successfully')
      queryClient.invalidateQueries('downTypes')
      form.resetFields()
      setIsModalOpen(false)
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Error adding System, Please try again')
    },
  })
  const {mutate: removeDownType} = useMutation(deleteDowntype, {
    onSuccess: () => {
      message.success('System deleted successfully')
      queryClient.invalidateQueries('downTypes')
    },
    onError: () => {
      message.error('Error deleting System, Please try again')
    },
  })
  let [filteredData] = useState([])

  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    console.log('Success:', values)
    addDownType(values)
  }
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

  function handleDelete(element: any) {
    removeDownType(element?.id)
  }

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        if (a.id > b.id) {
          return 1
        }
        if (b.id > a.id) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Name',
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
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button className='btn btn-light-warning btn-sm'>Update</button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.name}?`}
            onConfirm={() => {
              handleDelete(record)
            }}
          >
            <button className='btn btn-light-danger btn-sm'>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithIndex.filter((value) => {
      return (
        value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }
  const dataWithIndex = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      // loadData()
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder='Enter Search Text'
                onChange={handleInputChange}
                type='text'
                allowClear
                value={searchText}
              />
              <Button type='primary' onClick={globalSearch}>
                Search
              </Button>
            </Space>
            <Space style={{marginBottom: 16}}>
              <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
            </Space>
          </div>
          <Table
            columns={columns}
            dataSource={downTypes?.data?.map((item: any) => ({
              ...item,
              name: item.name?.toUpperCase(),
            }))}
            bordered
            loading={isLoading}
          />
          <Modal
            title='System Entry'
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
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
              onFinish={onFinish}
            >
              <Form.Item name='name' label='Name' rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}
export default DownTypePage
