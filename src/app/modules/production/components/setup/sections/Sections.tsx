import {Button, Form, Input, Modal, Select, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
// import { AddWorkTypeForm } from './AddWorkTypeForm'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {AddSectionForm} from './AddSectionForm'
import axios from 'axios'
import {ENP_URL} from '../../../../../urls'

const SectionsPage = () => {
  const [gridData, setGridData] = useState<any>([])
  const [serviceData, setServiceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)

  
  const params:any  = useParams();
  const navigate = useNavigate();
  console.log(params.id)
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

  const deleteData = async (element: any) => {
    try {
      const response = await axios.delete(`${ENP_URL}/Sections/${element.id}`)
      // update the local state so that react can refecth and re-render the table with the new data
      const newData = gridData.filter((item: any) => item.id !== element.id)
      setGridData(newData)
      return response.status
    } catch (e) {
      return e
    }
  }

  function handleDelete(element: any) {
    deleteData(element)
  }
  const columns: any = [

    {
      title: 'Section Name',
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

      // dataIndex: 'faultDesc',
      // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a href="groups" className="btn btn-light-info btn-sm">Groups</a> */}
          <Link to={`/setup/groups/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Groups</span>
          </Link>
          <a href='#' className='btn btn-light-warning btn-sm '>
            Update
          </a>
          {/* <a href="#" className="btn btn-light-danger btn-sm">Delete</a> */}
          <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>
        </Space>
      ),
    },
    //console
  ]

  const {Option} = Select

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/Sections`)

      setGridData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const loadService = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get(`${ENP_URL}/Services`)
      setServiceData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
    loadService()
  }, [])

  const dataWithIndex = gridData.map((item: any, index:any) => ({
    ...item,
    key: index,
  }))

  const dataByID = dataWithIndex.filter((section:any) =>{
    return section.serviceId.toString() ===params.id
  })
  console.log(dataByID)


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
        value.service.toLowerCase().includes(searchText.toLowerCase()) ||
        value.section.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const url = `${ENP_URL}/Sections`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      name: values.name,
      serviceId: params.id,
    }

  

    try {
      const response = await axios.post(url, data)
      
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
      {/* <div style={{backgroundColor:'white'}}> */}
    
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
          {/* <Link to={`/setup/service/${params.id}`}>
            <span className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Services
            </span>
          </Link> */}
          {/* <p>{params.id}</p> */}
          <button className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary' onClick={() => navigate(-1)}>Back to Services</button>
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
          <Table columns={columns} dataSource={dataByID} loading={loading} />

          <Modal
            title='Add Section'
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
              title='Add Section'
              onFinish={onFinish}
            >
              <Form.Item label='Name' name='name' rules={[{required: true}]}>
                <Input />
              </Form.Item>

              {/* <Form.Item name='serviceId' label='Service'>
                <Select placeholder='Select'>
                  {serviceData.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {SectionsPage}
