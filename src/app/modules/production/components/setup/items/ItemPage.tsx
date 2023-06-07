import {Button, Form, Input, message, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {ENP_URL, fetchGroups} from '../../../../../urls'
import axios from 'axios'
import {useQuery} from 'react-query'

const ItemsPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const params: any = useParams();
  // Modal functions
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();

  let [itemName, setItemName] = useState<any>("")
  let [modelName, setModelName] = useState<any>("")
  let [serviceName, setServiceName] = useState<any>("")
  let [sectionName, setSectionName] = useState<any>("")

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
      const response = await axios.delete(`${ENP_URL}/Items/${element.id}`)
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
      title: 'Group Items',
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
          <Link to={`/setup/itemValue/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Values</span>
          </Link>
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>

        </Space>
      ),
    },
    //console
  ]


  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/Items`)
      setGridData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      let res = await getItemName(params.id)
      setItemName(res.name)
    })();
    (async () => {
      let res = await getModel()
      setModelName(res.section.service.model)
    })();
    (async () => {
      let res = await getModel()
      setServiceName(res.section.service.name)
    })();
    (async () => {
      let res = await getModel()
      setSectionName(res.section.name)
    })();
    loadData()

  }, [])

  const dataWithIndex = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))

  const {data: allGroups} = useQuery('groups', fetchGroups, {cacheTime: 60000000})

  const getModel = () => {
    let newName = null
    const itemTest = allGroups?.data.find((item: any) =>
      item.id.toString() === params.id
    )
    newName = itemTest
    return newName
  }
  console.log(getModel())
  const getItemName = async (param: any) => {

    let newName = null
    const itemTest = await allGroups?.data.find((item: any) =>
      item.id.toString() === param
    )
    newName = await itemTest
    return newName
  }

  const dataByID = dataWithIndex.filter((section: any) => {
    return section.groupId.toString() === params.id
  })
  console.log(dataByID)
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }
  const url = `${ENP_URL}/Items`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      name: values.name,
      groupId: params.id,
    }
    console.log(data)
    try {
      const response: any = await axios.post(url, data).then(
        (response) => {

          //Create a default Item Value for the new item
          const data = {
            itemId: response.data.id,
            name: "Default",
          }

          //Create the default item value
          try {
            axios.post(`${ENP_URL}/ItemValue`, data).then(
              (response) => {
                message.success("Item created successfully")
              }
            )
          } catch (e) {
            message.error("Error creating default value")
          }
        }
      )
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

  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithIndex.filter((value) => {
      return (
        value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.itemName.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  return (
    <KTCard>
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
          <br></br>
          <h3 style={{fontWeight: "bolder"}}>
            {modelName}
            <span style={{color: "blue", fontSize: "22px", fontWeight: "normal"}}> &gt; </span>
            {serviceName}
            <span style={{color: "blue", fontSize: "22px", fontWeight: "normal"}}> &gt; </span>
            {sectionName}
            <span style={{color: "blue", fontSize: "22px", fontWeight: "normal"}}> &gt; </span>
            {itemName}
          </h3>
          <br></br>
          <button className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
                  onClick={() => navigate(-1)}>Back Groups
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
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataByID} loading={loading}/>
          <Modal
            title='Add Items'
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
              title='Add items'
              onFinish={onFinish}
            >
              <Form.Item label='Name' name='name' rules={[{required: true}]}>
                <Input/>
              </Form.Item>

            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export {ItemsPage}
