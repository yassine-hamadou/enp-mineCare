import {Button, Popconfirm, Table, Modal, Space, Input} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers'
import {AddFaultForm} from './AddHoursForm'

const HoursTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

  // Modal functions
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const loadData = async () => {
    setLoading(true)
    // const response = await axios.get('https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
    const response = await axios.get('http://208.117.44.15/SmWebApi/api/HourliesApi')
    // console.log('api Response', response.data)
    setGridData(response.data)
    setLoading(false)
  }

  function handleDelete(element: any) {
    const dataSource = [...gridData]
    const filteredData = dataSource.filter((item: any) => item.fleetID !== element.fleetID)
    setGridData(filteredData)
  }
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
        value.entryId.toLowerCase().includes(searchText.toLowerCase()) ||
        value.classCode.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const columns = [
    {
      title: 'FleetId',
      dataIndex: 'fleetId',
      key: 'fleetId',
    },
    {
      title: 'Previous Reading',
      dataIndex: 'previousReading',

    },
    {
      title: 'Reading',
      dataIndex: 'reading',

    },
    {
      title: 'Daily HoursWorked',
      dataIndex: 'dailyHoursWorked',

    },
    {
      title: 'Reading Date',
      dataIndex: 'readingDate',

    },
    // {
    //   title: 'Date',
    // },
    // {
    //   title: 'Daily Hours Worked',
    // },
    // {
    //   title: 'New Reading',
    // },
    // {
    //   title: 'Comment',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) =>
        gridData.length >= 1 ? (
          <>
            <Popconfirm title='Sure to adjust'>
              <Button type='primary' className='mx-3 mb-3'>
                Adjust Hours
              </Button>
            </Popconfirm>
          </>
        ) : null,
    },
  ]
  useEffect(() => {
    loadData()

  }, [])

  return (
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
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
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
      <Modal title='Add Hour' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddFaultForm />
      </Modal>
    </div>
  )
}

export {HoursTable}
