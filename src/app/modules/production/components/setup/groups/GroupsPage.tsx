import {Button, Form, Input, Modal, Select, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {AddGroupsForm} from './AddGroupForm'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {ENP_URL} from '../../../../../urls'

const GroupsPage = () => {
  const [gridData, setGridData] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)

  const {Option} = Select

  // Modal functions
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // Modal functions end
  const dataSource: any = [
    {
      section: 'Section 1',
      group: 'Engine',
    },
    {
      section: 'Section 2',
      group: 'Transmission',
    },
    {
      section: 'Section 2',
      group: 'Hydraulic',
    },
    {
      section: 'Section 2',
      group: 'Axles',
    },
    {
      section: 'Section 3',
      group: 'Body',
    },
    {
      section: 'Section 3',
      group: 'Frame',
    },
    {
      section: 'PM-A',
      group: 'Cap',
    },
    {
      section: 'PM-A',
      group: 'Operation',
    },
  ]
  const columns: any = [
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => a.key - b.key,
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      // defaultSortOrder: 'descend',
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

    // {
    //   title: 'Group',
    //   dataIndex: 'group',
    //   sorter: (a: any, b: any) => {
    //     if (a.group > b.group) {
    //       return 1
    //     }
    //     if (b.group > a.group) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },

    {
      title: 'Action',

      // dataIndex: 'faultDesc',
      // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a href="items" className="btn btn-light-info btn-sm">Items</a>
           */}
          <Link to={`/setup/items/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Items</span>
          </Link>
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a href='#' className='btn btn-light-danger btn-sm'>
            Delete
          </a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
    //console
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/Groups`)
      setGridData(response.data)
      console.log(gridData)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const loadSection = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/Sections`)
      setSectionData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
    loadSection()
  }, [])

  const dataWithVehicleNum = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithVehicleNum.filter((value) => {
      return (
        value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.group.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const url = `${ENP_URL}/Groups`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      name: values.name,
      sectionId: values.sectionId.toString(),
    }

    try {
      const response = await axios.post(url, data)
      console.log(data)
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      loadData()
      return response.statusText
    } catch (error: any) {
      setSubmitLoading(false)
      return error.statusText
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
          <Link to={'/setup/sections'}>
            <span className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Sections
            </span>
          </Link>

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
              <button type='button' className='btn btn-primary me-3' onClick={showModal}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Upload
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading} />
          {/* <Modal title='Add Group' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddGroupsForm />
      </Modal> */}

          <Modal
            title='Add Group'
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
              title='Add Service'
              onFinish={onFinish}
            >
              <Form.Item label='Name' name='name' rules={[{required: true}]}>
                <Input />
              </Form.Item>
              <Form.Item name='sectionId' label='Section'>
                <Select placeholder='Select'>
                  {sectionData.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {GroupsPage}
