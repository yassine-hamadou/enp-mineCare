import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { KTCardBody, KTSVG } from "../../../../../../_metronic/helpers";
// import { AddWorkTypeForm } from './AddWorkTypeForm'
import { Link } from "react-router-dom";
import { AddSectionForm } from "./AddSectionForm";


const SectionsPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])




  const dataSource: any = [
    {
      service: "PM-A",
      section: "Section 1 - Engine"
    },
    {
      service: "PM-A",
      section: "Section 2 - Transmission/Hydraulic/Axles"
    },
    {
      service: "PM-A",
      section: "Section 3 - Body/Frame"
    },
    {
      service: "PM-A",
      section: "Section 4 - Operation/Cap"
    },
  
  ]

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
    // {
    //   title: 'Service Code',
    //   dataIndex: 'service',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => {
    //     if (a.service > b.service) {
    //       return 1
    //     }
    //     if (b.service > a.service) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    
    {
      title: 'Section',
      dataIndex: 'section',
      sorter: (a: any, b: any) => {
        if (a.section > b.section) {
          return 1
        }
        if (b.section > a.section) {
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
          {/* <a href="groups" className="btn btn-light-info btn-sm">Groups</a> */}
          <Link to={'/setup/groups'}>
          <span className="btn btn-light-info btn-sm">
            Groups
            </span></Link>
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

      // const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmclasApi')

      // setGridData(response.data)
      setGridData(dataSource)
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
        value.service.toLowerCase().includes(searchText.toLowerCase()) ||
        value.section.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  return (
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
      {/* <div style={{backgroundColor:'white'}}> */}
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
        <Link to={"/setup/service"}>
            <span  className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Services
            </span>
        </Link>
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
        <Table columns={columns} dataSource={dataWithVehicleNum} />
        <Modal title='Add Section' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <AddSectionForm />
        </Modal>
      </div>
      </KTCardBody>
     
    </div>
  )
}

export {SectionsPage}

