import {Button, Input, Modal, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody, KTSVG } from '../../../../../../_metronic/helpers'
import { ColumnsType } from 'antd/lib/table'
import { AddServiceForm } from './AddServiceForm'
import { Link } from 'react-router-dom'



const ServicesPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [formData, setFormData]= useState({
    name:"",
    modelID:"",
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
      setIsModalOpen(false)
    }
    // Modal functions end

    const columns: any =[

    
    {
      title: 'Model',
      dataIndex: 'modelID',
      sorter: (a: any, b: any) => {
        if (a.modelID > b.modelID) {
          return 1
        }
        if (b.modelID > a.modelID) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Services',
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
      
      // dataIndex: 'faultDesc',
      // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
      fixed: 'right',
      width: 100,
      render: (_: any, record: any ) => (
        <Space size="middle">
          {/* <a href="sections" className="btn btn-light-info btn-sm">Sections</a> */}
          <Link to={'/setup/sections'}>
          <span  className="btn btn-light-info btn-sm">
          Sections
            </span></Link>
          <a href="#" className="btn btn-light-warning btn-sm">Update</a>
          <a href="#" className="btn btn-light-danger btn-sm">Delete</a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
    //console
      
    
    
  ]

  const dataSource: any = [
    {
      model: "PM-A",
      service: "Service PM-A"
    },
    {
      model: "PM-A",
      service: "Service PM-B"
    },
    {
      model: "PM-A",
      service: "Service PM-C"
    },
    {
      model: "PM-A",
      service: "Service PM-D"
    },
  
    {
      model: "PM-A",
      service: "Service PM-E"
    },
  
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get('http://localhost:4192/services')
      setGridData(response.data)
      // setGridData(dataSource)
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
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
            <a href='work-type'  className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
             Back to Models
            </a>
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
        <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading}/>
          <Modal title='Add Service' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddServiceForm />
      </Modal>
      </div>
      </KTCardBody>
    </div>
  )
}

export {ServicesPage}

