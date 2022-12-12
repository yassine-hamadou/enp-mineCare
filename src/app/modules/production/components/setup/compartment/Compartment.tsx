import {Button, Form, Input, Modal, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCardBody, KTSVG } from '../../../../../../_metronic/helpers'
import { ENP_URL } from '../../../../../urls'



const CompartmentPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()


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
              `${ENP_URL}/Compartment/${element.id}`
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

    // {
    //     title: 'ID',
    //     dataIndex: 'id',
    //     sorter: (a: any, b: any) => {
    //         if (a.id > b.id) {
    //         return 1
    //         }
    //         if (b.id > a.id) {
    //         return -1
    //         }
    //         return 0
    //     },
    // },
    {
      title: 'Name of Compartment',
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
      render: (_: any, record: any ) => (
        <Space size="middle">
          <a href="#" className="btn btn-light-warning btn-sm">Update</a>
          <a onClick={() => handleDelete(record)} className="btn btn-light-danger btn-sm">Delete</a>
        </Space>
      ),
    },
  ]
  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/Compartment`)
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
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
        value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const url = `${ENP_URL}/Compartment`
    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        const data = {
            name: values.name,
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
        <Table columns={columns} dataSource={dataWithVehicleNum}/>
          <Modal title='Add Compartment' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
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
       <Form.Item label='Name' name='name' rules={[{required: true}]}>
        <Input />
      </Form.Item>
      {/* <Form.Item label='Model'>
        <Select 
        showSearch 
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: '793D',
          },
          {
            value: '2',
            label: 'DE810',
          },
          {
            value: '3',
            label: 'DE810',
          },
          
        ]}
        />
        </Form.Item> */}
      {/* <Form.Item label='Status' name='status' rules={[{required: true}]}>
        <Radio.Group >
          <Radio value={1}>Active</Radio>
          <Radio value={2}>InActive</Radio>
        </Radio.Group>
      </Form.Item> */}
      
    </Form>
        </Modal>
      </div>
      </KTCardBody>
    </div>
  )
}

export {CompartmentPage}

function uuidv4() {
  throw new Error('Function not implemented.')
}

