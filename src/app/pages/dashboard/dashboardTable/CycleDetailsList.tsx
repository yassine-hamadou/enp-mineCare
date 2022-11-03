import {Button, Input, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { SortOrder } from "antd/lib/table/interface";
import { SortAscendingOutlined } from "@ant-design/icons";

const DashboardTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'key',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'classCode',
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
      title: 'Description',
      dataIndex: 'classDesc',
      sorter: (a: any, b: any) => {
        if (a.classDesc > b.classDesc) {
          return 1
        }
        if (a.classDesc < b.classDesc) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Number of Vehicles',
      dataIndex: 'vehicleNum',
      sorter: (a: any, b: any) => a.vehicleNum - b.vehicleNum,
    },
    {
      title: 'Number of Down Time',
      dataIndex: 'downTime',
      sorter: (a: any, b: any) => a.downTime - b.downTime,
    },
    {
      title: 'Number of Hours',
      dataIndex: 'numOfHrs',
      sorter: (a: any, b: any) => a.numOfHrs - b.numOfHrs,
    },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmclasApi'
      )
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
        value.classDesc.toLowerCase().includes(searchText.toLowerCase()) ||
        value.classCode.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

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
          <Button type='primary' className='mb-3'>
            Export
          </Button>
          <Button type='primary' className='mb-3'>
            Upload
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading} />
    </div>
  )
}

export {DashboardTable}
