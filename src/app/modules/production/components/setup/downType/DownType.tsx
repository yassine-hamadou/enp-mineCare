import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Table} from 'antd'
import React, {useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL, getDowntypes} from '../../../../../urls'
import {useQuery} from 'react-query'
import {useAuth} from '../../../../auth'
import {Link} from "react-router-dom";
import axios from "axios";

const DownTypePage = () => {
  const {tenant} = useAuth()
  const [searchText, setSearchText] = useState('')
  const {data: downTypes, isLoading} = useQuery('downTypes', () => getDowntypes(tenant))
  const [gridData, setGridData] = useState([])
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
      const response = await axios.delete(`${ENP_URL}/DownType/${element.id}`)
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
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        if (a.id > b.id) {
          return 1
        }
        if (b.id > a.id) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name - b.name,
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
  const dataWithIndex = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      // loadData()
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
              <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                Add
              </button>
            </Space>


          </div>
          <Table columns={columns} dataSource={downTypes?.data} bordered loading={isLoading}/>
          <Modal
            title='Down Type Entry'
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

              <Form.Item name='Downtype' label='Name' rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}
export {DownTypePage}
