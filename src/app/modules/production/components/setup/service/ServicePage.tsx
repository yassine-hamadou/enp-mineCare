import {Button, Form, Input, Modal, Space, Table} from 'antd'
import {useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {ENP_URL, fetchServices} from '../../../../../urls'
import {QueryClient, useQuery, useQueryClient} from 'react-query'
import {useAuth} from "../../../../auth";

const ServicesPage = () => {
  const {tenant} = useAuth()
  const [gridData, setGridData] = useState<any>([])
  const [loading] = useState(false)
  const [searchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const {data: services} = useQuery('services', () => fetchServices(tenant))
  const [form] = Form.useForm()
  const queryClient: QueryClient = useQueryClient()

  const routeParams: any = useParams();
  const navigate = useNavigate();
  const location: any = useLocation();

  // console.log(routeParams)
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
      const response = await axios.delete(`${ENP_URL}/services/${element.id}`)
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
      title: 'Service Name',
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

          <Link to={`/setup/sections/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Sections</span>
          </Link>
          <Button href='#' className='btn btn-light-warning btn-sm'>
            Update
          </Button>
          <Button onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </Button>

        </Space>
      ),
    },
  ]
  // const loadData = async () => {
  //   setLoading(true)
  //   try {
  //
  //     const response = await axios.get(`${ENP_URL}/Services`)
  //     console.log('responssss', response.data)
  //     setGridData(response.data)
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const loadModel = async () => {
  //   setLoading(true)
  //   try {
  //
  //     const response = await axios.get(`${ENP_URL}/VmmodlsApi`)
  //     setModelData(response.data)
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  //
  // const {Option} = Select
  //
  // useEffect(() => {
  //   loadData()
  //   // loadModel()
  // }, [])

  // const dataWithIndex = services?.data?.map((item: any, index: any) => ({
  //   ...item,
  //   key: index,
  // }))
  const equipModel = location?.state?.txmodl
  const dataByID = services?.data?.filter((service: any) => {
    return service?.model?.trim() === equipModel?.trim()
  });

  console.log(dataByID)


  const handleInputChange = () => {
    // setSearchText(e.target.value)
    // if (e.target.value === '') {
    //   queryClient.invalidateQueries('services')
    // }
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

  const url = `${ENP_URL}/Services`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      name: values.name,
      model: equipModel,
    }


    try {
      const response = await axios.post(url, data)
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      await queryClient.invalidateQueries('services')
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
          {/* <Link to={'/setup/work-type'}>
            <span className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Models
            </span>
          </Link> */}
          <h3 style={{fontWeight: "bolder"}}>{routeParams.id}</h3>
          <br></br>
          <button className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
                  onClick={() => navigate(-1)}>Back to Service Types
          </button>
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
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                Add
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                Upload
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataByID} loading={loading}/>
          <Modal
            title='Add Service'
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
            {/* <AddServiceForm /> */}
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
                <Input/>
              </Form.Item>
              {/* <Form.Item label='Model' name='modelID'>
                <Input />
              </Form.Item> */}
              {/* <Form.Item name='model' label='Model'>
                <Select placeholder='Search to Select'>
                  {modeldData.map((item: any) => (
                    <Option key={item.txmodel} value={item.txmodel}>
                      {item.txmodel}
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

export {ServicesPage}
