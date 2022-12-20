import {Button, Form, Input, InputNumber, Modal, Radio, Select, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody, KTSVG } from '../../../../../../_metronic/helpers'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { ENP_URL, fetchCompartments, fetchLubeBrands, fetchModels } from '../../../../../urls'
import { useQuery } from 'react-query'


const LubeConfig = () => {
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
      const response = await axios.delete(`${ENP_URL}/oilgrades/${element.id}`)
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
      title: 'Model',
      dataIndex: 'model',
      sorter: (a: any, b: any) => {
        if (a.model > b.model) {
          return 1
        }
        if (b.model > a.model) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Compartment',
      key:'compartmentId', 
      render: (row: any) => {
        return getCompartmentName(row.compartmentId)
      },
      sorter: (a: any, b: any) => {
        if (a.compartmentId > b.compartmentId) {
          return 1
        }
        if (b.compartmentId > a.compartmentId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Change Out Interval',
      dataIndex: 'changeOutInterval',
      sorter: (a: any, b: any) => {
        if (a.changeOutInterval > b.changeOutInterval) {
          return 1
        }
        if (b.changeOutInterval > a.changeOutInterval) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      sorter: (a: any, b: any) => {
        if (a.capacity > b.capacity) {
          return 1
        }
        if (b.capacity > a.capacity) {
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
          <Link to={`/setup/lube-grade/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Grades</span>
          </Link>
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
  ]
  const loadData = async () => {
    setLoading(true)
    try {
      
      const response = await axios.get(`${ENP_URL}/LubeConfigs`)
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadData()

  }, [])

  const dataGradesId = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))


  const {data:allModel} = useQuery('models', fetchModels, {cacheTime:5000})
  const {data:allLubeBrands} = useQuery('lube-brands', fetchLubeBrands, {cacheTime:5000})
  const {data:allCompartment} = useQuery('compartment', fetchCompartments, {cacheTime:5000})

  const getCompartmentName = (compartmentId: any) => {
    //count number of model
    let compartmentName = null
    allCompartment?.data.map((item: any) => {
      if (item.id === compartmentId) {
       compartmentName=item.name
      }
    })
    return compartmentName
  }

  
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataGradesId.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchText.toLowerCase()) ||
        value.brandId.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const url = `${ENP_URL}/LubeConfigs`
    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        const data = {
            model: values.model,
            compartmentId: values.compartmentId,
            changeOutInterval: values.changeOutInterval,
            capacity: values.capacity
        }
       console.log(data)
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
            {/* <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Upload
            </button> */}
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              
              Export
            </button>
            
          </Space>
        </div>
        <Table columns={columns} dataSource={dataGradesId} loading={loading}/>
          <Modal title='Add Lube Grade' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
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
          <Form 
          labelCol={{span: 7}}  
          wrapperCol={{span: 14}} 
          layout='horizontal' 
          form={form}
          name='control-hooks' 
          title='Add Service' 
          onFinish={onFinish}>
      <Form.Item label='Model' name='model' >
        <Select 
        showSearch 
        placeholder="Search to select"
        optionFilterProp="children"
        >
            {
                allModel?.data.map((model:any)=>(
                    <Option key={model.txmodl} value={model.txmodel}>
                        {model.txmodel}- {model.txmanf}
                    </Option>    
                ))
            }
        </Select>
      </Form.Item>
      <Form.Item label='Compartment' name='compartmentId' >
        <Select 
        showSearch 
        placeholder="Search to select"
        optionFilterProp="children"
        >
            {
                allCompartment?.data.map((compartment:any)=>(
                    <Option key={compartment.id} value={compartment.id}>
                        {compartment.name}
                    </Option>    
                ))
            }
        </Select>
      </Form.Item>
      
      <Form.Item label='Change Out Interval' name='changeOutInterval' >
        <InputNumber />
      </Form.Item>
      <Form.Item label='Capacity' name='capacity' >
        <InputNumber />
      </Form.Item>
      
      
    </Form>
        </Modal>
      </div>

      </KTCardBody>
    </div>
  )
}

export {LubeConfig};

