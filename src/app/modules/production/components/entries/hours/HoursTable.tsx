import {Button, Popconfirm, Table, Modal, Space, Input} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
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
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
    console.log('api Response', response.data)
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
        value.classDesc.toLowerCase().includes(searchText.toLowerCase()) ||
        value.classCode.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const columns = [
    {
      title: 'FleetId',
      dataIndex: 'fleetID',
      key: 'fleetID',
    },
    // {
    //   title: 'Model',
    //   dataIndex: 'modlName',
    // },
    // {
    //   title: 'Description',
    //   dataIndex: 'modlClass',
    // },
    {
      title: 'Previous Reading',
    },
    {
      title: 'Date',
    },
    {
      title: 'Daily Hours Worked',
    },
    {
      title: 'New Reading',
    },
    {
      title: 'Comment',
    },
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

  return (
    <div>
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
          <Button type='primary' onClick={showModal}>
            Add
          </Button>
          <Button type='primary' className='mx-3'>
            Export
          </Button>
          <Button type='primary'>Upload</Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
      <Modal title='Add Fault' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddFaultForm />
      </Modal>
    </div>
  )
}

export {HoursTable}
