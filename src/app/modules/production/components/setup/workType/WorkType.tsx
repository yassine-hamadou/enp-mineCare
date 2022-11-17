import {Button, Input, Modal, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {AddWorkTypeForm} from './AddWorkTypeForm'

const WorkTypePage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  // let [filteredData] = useState([])
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

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'classCode',
      key: 'classCode',
      onFilter: (value: any, record: any) => {
        return String(record.classCode).toLowerCase().includes(value.toLowerCase())
      },
      sorter: (a: any, b: any) => {
        if (a.classCode > b.classCode) {
          return 1
        }
        if (b.classCode > a.classCode) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Number of Vehicles',
      dataIndex: 'classDesc',
      key: 'classDesc',
      sorter: (a: any, b: any) => {
        if (a.classCode > b.classCode) {
          return 1
        }
        if (b.classCode > a.classCode) {
          return -1
        }
        return 0
      },
      // onFilter:(value:any, record:any)=>{
      //   return String(record.vehicleNum).toLowerCase().includes(value.toLowerCase())
      // },
    },

    {
      title: 'Action',

      // dataIndex: 'faultDesc',
      // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a href="service" className="btn btn-light-info btn-sm">Services</a> */}
          <Link to={'/setup/service'}>
            <span className='btn btn-light-info btn-sm'>Service</span>
          </Link>
          <a href='#' className='btn btn-light-warning btn-sm '>
            Update
          </a>
          <a href='#' className='btn btn-light-danger btn-sm'>
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
      const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmclasApi')
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // const dataWithVehicleNum = gridData.map((item: any, index) => ({
  //   ...item,
  //   vehicleNum: Math.floor(Math.random() * 20) + 1,
  //   downTime: `${Math.floor(Math.random() * 100) + 1}`,
  //   numOfHrs: Math.floor(Math.random() * 20) + 1,
  //   key: index,
  // }))

  // const handleInputChange = (e: any) => {
  //   setSearchText(e.target.value)
  //   if (e.target.value === '') {
  //     loadData()
  //   }
  // }

  // const globalSearch = () => {
  //   // @ts-ignore
  //   filteredData = dataWithVehicleNum.filter((value) => {
  //     return (
  //       value.classDesc.toLowerCase().includes(searchText.toLowerCase()) ||
  //       value.classCode.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //   })
  //   setGridData(filteredData)
  // }

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
              <Input.Search
                placeholder='Search...'
                onSearch={(value) => {
                  setSearchText(value)
                }}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  if (e.target.value === '') {
                    loadData()
                  }
                }}
                type='text'

                // value={searchText}
              />
              {/* <Button type='primary' onClick={globalSearch}>
              Search
            </Button> */}
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
          <Table columns={columns} dataSource={gridData} loading={loading} />
          <Modal title='Add Item' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <AddWorkTypeForm />
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {WorkTypePage}
