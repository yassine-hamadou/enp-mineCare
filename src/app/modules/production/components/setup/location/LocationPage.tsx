import {Button, Input, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { KTCard, KTCardBody } from '../../../../../../_metronic/helpers'

const LocationPage = () => {
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
      title: 'Code',
      dataIndex: 'locationCode',
      sorter: (a: any, b: any) => {
        if (a.locationCode > b.locationCode) {
          return 1
        }
        if (b.locationCode > a.locationCode) {
          return -1
        }
        return 0
      },
    },
    
    {
      title: 'Name',
      dataIndex: 'locationDesc',
      sorter: (a: any, b: any) => a.locationDesc - b.locationDesc,
    },
    
    
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://208.117.44.15/SmWebApi/api/IclocsApi')
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

  const keys =["locationCode","locationDesc"];
  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithVehicleNum.filter((value) => {
      return (
        keys.some((key)=>value[key].toLowerCase())

        // value.locationCode.toLowerCase().includes(searchText.toLowerCase()) ||
        // value.locationDesc.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

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
      {/* <div >
        <Pagination total={dataWithVehicleNum.length} itemRender={itemRender} />
      </div> */}

    </div>
    </KTCardBody>
    </KTCard>
  )
}

export {LocationPage}

