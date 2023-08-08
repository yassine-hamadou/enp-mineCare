import {Button, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Table} from 'antd'
import {useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {deleteService, postService} from '../../../../../urls'
import {useMutation, useQueryClient} from 'react-query'
import {useAuth} from "../../../../auth";
import {useForm} from "antd/es/form/Form";

const ServicesPage = () => {
    const {tenant} = useAuth()
    const [gridData, setGridData] = useState<any>([])
    const [searchText] = useState('')
    let [filteredData] = useState([])
    const [submitLoading, setSubmitLoading] = useState(false)
    const {mutate: addService} = useMutation((data: any) => postService(data, tenant), {
        onSuccess: () => {
            queryClient.invalidateQueries('services')
            form.resetFields()
            setIsModalOpen(false)
            setSubmitLoading(false)
            message.success('Service added successfully')
        },
        onError: (error) => {
            setSubmitLoading(false)
            message.error('Something went wrong').then(r => r)
            console.log(error)
        },
    })
    const {mutate: removeService, isLoading: isDeleteLoading,} = useMutation(deleteService, {
        onSuccess: () => {
            queryClient.refetchQueries(['equipmodels']).then(
              message.success('Service deleted successfully')
            )
        },
        onError: (error: any) => {
            message.error('Something went wrong').then(r => r)
            console.log(error)
        },
    })
    const [form] = useForm()
    const queryClient: any = useQueryClient()

    const routeParams: any = useParams();
    const navigate = useNavigate();
    const location: any = useLocation();

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
    const deleteData = (element: any) => {
        console.log("element", element)
        try {
            removeService(element?.id)
            queryClient.invalidateQueries('services').then(
              message.success('Service deleted successfully')
            )
        } catch (error) {
            message.error('Something went wrong').then(r => r)
            console.log(error)
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
        {title: 'Hours', dataIndex: 'intervalForPm'},
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
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                      <Button key={record?.id} className='btn btn-light-danger btn-sm'>
                          Delete
                      </Button>
                  </Popconfirm>
              </Space>
            ),
        },
    ]

    const equipModel = location?.state?.txmodl
    console.log("equipModel", equipModel)
    console.log("services list form state", location?.state)
    const dataByID = location?.state?.services?.filter((service: any) => {
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
        filteredData = dataWithIndex?.filter((value) => {
            return (
              value?.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
              value?.faultDesc.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setGridData(filteredData)
    }

    const onFinish = (values: any) => {
        setSubmitLoading(true)
        console.log("values", values)
        const data: any = {...values, model: equipModel}
        addService(data)
    }

    return (
      <KTCard>
          <KTCardBody className='py-4 '>
              <div className='table-responsive'>
                  {/* <Link to={'/setup/work-type'}>
            <span className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Models
            </span>
          </Link> */}
                  <h3 style={{fontWeight: "bolder"}}>{routeParams.id}</h3>
                  <br></br>
                  <button
                    className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
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
                  <Table columns={columns} dataSource={dataByID}/>
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
                          <Form.Item label='Hours' name='intervalForPm'>
                              <InputNumber/>
                          </Form.Item>
                      </Form>
                  </Modal>
              </div>
          </KTCardBody>
      </KTCard>
    )
}

export default ServicesPage
