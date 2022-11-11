import {Button, Input, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody } from '../../../../../../_metronic/helpers'

const FleetPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

  const columns: any = [
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => a.key - b.key,
    // },
    {
      title: 'FleetID',
      dataIndex: 'fleetID',
      sorter: (a: any, b: any) => {
        if (a.fleetID > b.fleetID) {
          return 1
        }
        if (b.fleetID > a.fleetID) {
          return -1
        }
        return 0
      },
    },
    
    {
      title: 'Model Name',
      dataIndex: 'modlName',
      sorter: (a: any, b: any) => a.modlName - b.modlName,
    },
    {
      title: 'Model Class',
      dataIndex: 'modlClass',
      sorter: (a: any, b: any) => a.modlClass - b.modlClass,
    },
    
    
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
      const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmequpsApi')
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
        value.fleetID.toLowerCase().includes(searchText.toLowerCase()) ||
        value.modlName.toLowerCase().includes(searchText.toLowerCase()) ||
        value.modlClass.toLowerCase().includes(searchText.toLowerCase())
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
          <Button type='primary' className='mb-3'>
            Export
          </Button>
          {/* <Button type='primary' className='mb-3'>
            Upload
          </Button> */}
        </Space>
      </div>
      <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading}/>
    </div>
    </KTCardBody>
    </KTCard>
  )
}

export {FleetPage}

