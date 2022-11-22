import {Button, Form, Input, Modal, Radio, Select, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody, KTSVG } from '../../../../../../_metronic/helpers'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { ENP_URL } from '../../../../../urls'



const OilGradePage = () => {
  const [gridData, setGridData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()

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
      form.resetFields()
    setIsModalOpen(false)

    }
    // Modal functions end
    const deleteData = async (element: any) => {
      try {
          const response = await axios.delete(
              `${ENP_URL}/oilgrades/${element.id}`
          )
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

    const columns: any =[

    
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
      title: 'Oil Brand',
      dataIndex: 'typeId',
      sorter: (a: any, b: any) => {
        if (a.typeId > b.typeId) {
          return 1
        }
        if (b.typeId > a.typeId) {
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
      render: (_: any, record: any ) => (
        <Space size="middle">
          {/* <a href="sections" className="btn btn-light-info btn-sm">Sections</a> */}
          {/* <Link to={`/setup/sections/${record.id}`}>
          <span  className="btn btn-light-info btn-sm">
          Sections
            </span></Link> */}
          <a href="#" className="btn btn-light-warning btn-sm">Update</a>
          <a onClick={() => handleDelete(record)} className="btn btn-light-danger btn-sm">Delete</a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
  ]
  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get(`${ENP_URL}/oilgrades`)
      setGridData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const loadTypes = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get(`${ENP_URL}/oiltypes`)
      setTypeData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
    loadTypes()
  }, [])

  const dataWithVehicleNum = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))
  const typeWithId = typeData.map((item: any, id) => ({
    ...item,
    key: id,
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
        value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }
  const url = `${ENP_URL}/oilgrades`
    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        const data = {
            name: values.name,
            modelID: values.modelID,
            typeId: values.typeId,
            status: values.status,
            
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
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
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
        <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading}/>
          <Modal title='Add Oil Grade' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
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
          ]}>
          {/* <AddServiceForm /> */}
          <Form 
          labelCol={{span: 7}} 
          wrapperCol={{span: 14}} 
          layout='horizontal' 
          form={form}
          name='control-hooks' 
          title='Add Service' 
          onFinish={onFinish}>
       <Form.Item label='Name' name='name' rules={[{required: true}]}>
        <Input />
      </Form.Item>
      <Form.Item label='Oil Type' name='typeId' rules={[{required: true}]}>
        <Select 
        showSearch 
        placeholder="Search to Select"
        optionFilterProp="children"
        >
            {
                typeWithId.map((types:any)=>(
                    <Option key={types.id} value={types.name}>
                        {types.name}
                    </Option>    
                ))
            }
        </Select>
        </Form.Item>
      <Form.Item label='Status' name='status' rules={[{required: true}]}>
        <Radio.Group >
          <Radio value={1}>Active</Radio>
          <Radio value={2}>InActive</Radio>
        </Radio.Group>
      </Form.Item>
      
    </Form>
        </Modal>
      </div>
      </KTCardBody>
    </div>
  )
}

export {OilGradePage}

function uuidv4() {
  throw new Error('Function not implemented.')
}

