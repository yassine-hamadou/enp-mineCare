import {Button, Form, Input, InputNumber, Modal, Space, Table} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'

const CustodianPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  let [filteredData] = useState([])

  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)


  const onFinish = async (values: any) => {
    setSubmitLoading(true)
  }
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
  const deleteData = async (element: any) => {
    try {
      const response = await axios.delete(`${ENP_URL}/Custodian/${element.id}`)
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
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => a.key - b.key,
    // },
    {
      title: 'Code',
      dataIndex: 'emplCode',
      sorter: (a: any, b: any) => {
        if (a.emplCode > b.emplCode) {
          return 1
        }
        if (b.emplCode > a.emplCode) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Custodian Name',
      dataIndex: 'emplName',
      sorter: (a: any, b: any) => a.emplName - b.emplName,
    },

    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>
        </Space>
      ),
    },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/VmemplsApi`)
      // const response = await axios.get('https://app.sipconsult.net/SmWebApi/api/VmemplsApi')
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
    vehicleNum: Math.floor(Math.random() * 20) + 1,
    downTime: `${Math.floor(Math.random() * 100) + 1}`,
    numOfHrs: Math.floor(Math.random() * 20) + 1,
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
        value.emplCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.emplName.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
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
              <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                Add
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading} />
          <Modal
            title='Custodian Entry'
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


              <Form.Item name='Custodian' label='Name' rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {CustodianPage}
