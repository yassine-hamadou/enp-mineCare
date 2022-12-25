import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Table,
} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ColumnsType} from 'antd/lib/table'
import {Link} from 'react-router-dom'
import {ENP_URL, fetchCompartments, fetchEquips, fetchLubeBrands, fetchLubeConfigs, fetchLubeGrade, fetchModels, fetchRefillTypes} from '../../../../../urls'
import {useQuery} from 'react-query'
import Item from 'antd/es/list/Item'

const LubePage = () => {
  const [gridData, setGridData] = useState([])
  const [allFleet, setFleetData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
const [newCompartData, setNewCompartData]= useState([])
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
      const response = await axios.delete(`${ENP_URL}/lubes/${element.id}`)
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
      title: 'Fleet ID',
      dataIndex: 'fleetId',
      sorter: (a: any, b: any) => {
        if (a.fleetId > b.fleetId) {
          return 1
        }
        if (b.fleetId > a.fleetId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Compartment',
      dataIndex: 'compartment',
      sorter: (a: any, b: any) => {
        if (a.compartment > b.compartment) {
          return 1
        }
        if (b.compartment > a.compartment) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a: any, b: any) => {
        if (a.brand > b.brand) {
          return 1
        }
        if (b.brand > a.brand) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Grade',
      dataIndex: 'Grade',
      sorter: (a: any, b: any) => {
        if (a.Grade > b.Grade) {
          return 1
        }
        if (b.Grade > a.Grade) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Change Out Interval',
      dataIndex: 'changeIn',
      sorter: (a: any, b: any) => {
        if (a.changeIn > b.changeIn) {
          return 1
        }
        if (b.changeIn > a.changeIn) {
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
      title: 'Refill Type',
      dataIndex: 'refilType',
      sorter: (a: any, b: any) => {
        if (a.refilType > b.refilType) {
          return 1
        }
        if (b.refilType > a.refilType) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Volume',
      dataIndex: 'prevHour',
      sorter: (a: any, b: any) => {
        if (a.prevHour > b.prevHour) {
          return 1
        }
        if (b.prevHour > a.prevHour) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Previous Hours',
      dataIndex: 'prevHour',
      sorter: (a: any, b: any) => {
        if (a.prevHour > b.prevHour) {
          return 1
        }
        if (b.prevHour > a.prevHour) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Current Hours',
      dataIndex: 'curHour',
      sorter: (a: any, b: any) => {
        if (a.curHour > b.curHour) {
          return 1
        }
        if (b.curHour > a.curHour) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Refill Date',
      dataIndex: 'refillDate',
      sorter: (a: any, b: any) => {
        if (a.refillDate > b.refillDate) {
          return 1
        }
        if (b.refillDate > a.refillDate) {
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
          {/* <a href="sections" className="btn btn-light-info btn-sm">Sections</a> */}
          {/* <Link to={`/setup/sections/${record.id}`}>
          <span  className="btn btn-light-info btn-sm">
          Sections
            </span></Link> */}
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
      const response = await axios.get(`${ENP_URL}/lubes`)
      setGridData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const {data: allEquips} = useQuery('equips', fetchEquips, {cacheTime: 5000})
  const {data:refilltypes} = useQuery('refillTypes', fetchRefillTypes, {cacheTime:5000})
  const {data:lubeBrands} = useQuery('lube-brands', fetchLubeBrands, {cacheTime:5000})
  const {data:lubeConfigs} = useQuery('lube-configs', fetchLubeConfigs, {cacheTime:5000})
  const {data:lubeGrades} = useQuery('lube-grades', fetchLubeGrade, {cacheTime:5000})


  const dataWithIndex = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  let compartData:any =null
  let model:any=""
  // let newModel:any=null
  const onFleetIdChange = (selected:any) => {
    model = allEquips?.data.find((item:any)=>
      item.fleetID===selected
    )
    
    compartData = lubeConfigs?.data.filter((item: any) =>
      item.model.trim() === model.modlName.trim()
    )


    // console.log(newCompartData)
    
    return setNewCompartData(compartData)
}

console.log(newCompartData)


  const onCompartmentChange = (selected: any) => {
    newCompartData.map((item: any) =>
      item.compartmentId === selected
        ? form.setFieldsValue({
            changeOutInterval:item.changeOutInterval,
            capacity: item.capacity,
          })
        : null
    )
  }

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
  const url = 'http://localhost:3000/lubes'
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      compartment: values.compartment,
      fleetId: values.fleetId,
      status: values.status,
      changeIn: values.changeIn,
      capacity: values.capacity,
      refillDate: values.refillDate,
      prevHour: values.prevHour,
      curHour: values.curHour,
      refillType: values.refilType,
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
          <Table columns={columns} dataSource={dataWithIndex} />
          <Modal
            title='Lube Entry'
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
              <Form.Item name='fleetId' label='fleetId'>
                <Select placeholder='Select' onChange={onFleetIdChange}>
                  {allEquips?.data.map((item: any) => (
                    <Option key={item.fleetID} value={item.fleetID}>
                      {item.fleetID}- {item.modlName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
           
              <Form.Item label='Compartment' name='compartmentId' rules={[{required: true}]}>
                <Select 
                showSearch 
                placeholder="Search to select"
                optionFilterProp="children"
                onChange={onCompartmentChange}
                >
                    {
                        newCompartData.map((item:any)=>(
                            <Option key={item.id} value={item.compartmentId}>
                                {item.model} - {item.compartment.name}
                            </Option>    
                        ))
                    }
                </Select>
              </Form.Item>
              <Form.Item label='Change Interval' name='changeOutInterval'>
                <InputNumber disabled={true} />
              </Form.Item>
              <Form.Item label='Capacity' name='capacity'>
                <InputNumber disabled={true} />
              </Form.Item>
              <Form.Item label='Refill Type' name='refillType' rules={[{required: true}]}>
                <Select 
                showSearch 
                placeholder="Search to select"
                optionFilterProp="children"
                >
                    {
                        refilltypes?.data.map((refillType:any)=>(
                            <Option key={refillType.id} value={refillType.id}>
                                {refillType.name}
                            </Option>    
                        ))
                    }
                </Select>
              </Form.Item>
              <Form.Item label='Brands' name='brandId' rules={[{required: true}]}>
                <Select 
                showSearch 
                placeholder="Search to select"
                optionFilterProp="children"
                >
                    {
                        lubeBrands?.data.map((brand:any)=>(
                            <Option key={brand.id} value={brand.id}>
                                {brand.name}
                            </Option>    
                        ))
                    }
                </Select>
              </Form.Item>
              <Form.Item label='Grade' name='gradeId'>
                <Select 
                  showSearch 
                  placeholder="Search to select"
                  optionFilterProp="children"
                  >
                    {
                      lubeGrades?.data.map((grade:any)=>(
                          <Option key={grade.id} value={grade.id}>
                              {grade.name}
                          </Option>    
                      ))
                    }
                </Select>
              </Form.Item>
              <Form.Item name='volume' label='Volume' rules={[{required: true}]}>
                <InputNumber />
              </Form.Item>
              <Form.Item name='previousHour' label='Previous Hours'>
                <InputNumber disabled={true} />
              </Form.Item>
              <Form.Item name='currentHour' label='Current Hours' rules={[{required: true}]}>
                <InputNumber />
              </Form.Item>
              <Form.Item name='refillDate' label='Refill Date' rules={[{required: true}]}>
                <DatePicker showTime />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {LubePage}

function uuidv4() {
  throw new Error('Function not implemented.')
}
