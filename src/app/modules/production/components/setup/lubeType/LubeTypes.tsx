import {Button, Form, Input, message, Modal, Space, Table} from 'antd'
import {useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {deleteLubeType, ENP_URL, fetchBrands, getLubeTypes, postLubeType} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from '../../../../auth'

const LubeTypes = () => {
  const {tenant} = useAuth()
  const queryClient = useQueryClient()
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const {data: lubeTypes, isLoading} = useQuery('lubeTypes', () => getLubeTypes(tenant))
  const {mutate: addLubeType} = useMutation((data) => postLubeType(data, tenant), {
    onSuccess: () => {
      message.success('Lube type added successfully')
      queryClient.invalidateQueries('lubeTypes')
      form.resetFields()
      setIsModalOpen(false)
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Error adding lube type, Please try again')
      setSubmitLoading(false)
    },
  })
  const {mutate: deleteData} = useMutation((lubeTypeId: any) => deleteLubeType(lubeTypeId), {
    onSuccess: () => {
      message.success('Lube type deleted successfully')
      queryClient.invalidateQueries('lubeTypes')
    },
    onError: () => {
      message.error('Error deleting lube type, Please try again')
    },
  })
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

  function handleDelete(id: any) {
    deleteData(id)
  }

  const columns: any = [
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
      title: 'Description',
      dataIndex: 'lubeDescription',
    },
    {
      title: 'Action',

      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <a href='#' className='btn btn-light-warning btn-sm'>
            Edit
          </a>
          <a onClick={() => handleDelete(record?.id)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
  ]

  const {data: allBrands} = useQuery('brands', fetchBrands, {cacheTime: 5000})

  const dataWithVehicleNum = allBrands?.data.map((item: any, index: any) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      fetchBrands()
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
  const url = `${ENP_URL}/LubeBrands`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)

    try {
      addLubeType(values)
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
            </Space>
          </div>
          <Table columns={columns} dataSource={lubeTypes?.data} />
          <Modal
            title='Add Lube type'
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
            {/* <AddServiceForm /> */}
            <Form
              labelCol={{span: 7}}
              wrapperCol={{span: 14}}
              layout='horizontal'
              form={form}
              name='control-hooks'
              title='Add Brand'
              onFinish={onFinish}
            >
              <Form.Item label='Name' name='name' rules={[{required: true}]}>
                <Input />
              </Form.Item>
              <Form.Item label='Desccription' name='lubeDescription' rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export default LubeTypes
