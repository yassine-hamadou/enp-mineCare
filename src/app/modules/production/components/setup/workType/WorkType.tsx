import {Button, Input, Modal, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody } from '../../../../../../_metronic/helpers'
import { AddWorkTypeForm } from './AddWorkTypeForm'
import { ColumnsType } from 'antd/lib/table'
const WorkTypePage = () => {
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
  const columns: any =[
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => a.key - b.key,
    // },
    {
      title: 'Code',
      dataIndex: 'faultCode',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => {
        if (a.faultCode > b.faultCode) {
          return 1
        }
        if (b.faultCode > a.faultCode) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Name',
      dataIndex: 'faultDesc',
      sorter: (a: any, b: any) => {
        if (a.faultDesc > b.faultDesc) {
          return 1
        }
        if (b.faultDesc > a.faultDesc) {
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
            <a href="service" className="btn btn-light-info btn-sm">Services</a>
            <a href="#" className="btn btn-light-warning btn-sm ">Update</a>
            <a href="#" className="btn btn-light-danger btn-sm">Delete</a>
          </Space>
      ),
    },
    //console



  ]
  const loadData = async () => {
    setLoading(true)
    try {

      const response = await axios.get('http://208.117.44.15/SmWebApi/api/FaultEntriesApi')

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
  return (
      <KTCard>
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
                <Button type='primary' className='mb-3' onClick={showModal}>
                  Add
                </Button>
                <Button type='primary' className='mb-3'>
                  Export
                </Button>
                <Button type='primary' className='mb-3'>
                  Upload
                </Button>
              </Space>
            </div>
            <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading}/>
            <Modal title='Add WorkType' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <AddWorkTypeForm />
            </Modal>
          </div>
        </KTCardBody>
      </KTCard>
  )
}
export {WorkTypePage}