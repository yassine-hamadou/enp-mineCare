import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { KTCard, KTCardBody, KTSVG } from "../../../../_metronic/helpers";
import { ENP_URL } from "../../../urls";

const DashboardTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'key',
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: 'Equipment Manufacturer',
      dataIndex: 'txmanf',
      sorter: (a: any, b: any) => {
        if (a.txmanf > b.txmanf) {
          return 1
        }
        if (b.txmanf > a.txmanf) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Model',
      dataIndex: 'txmodel',
      sorter: (a: any, b: any) => {
        if (a.txmodel > b.txmodel) {
          return 1
        }
        if (a.txmodel < b.txmodel) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Number of Equipments',
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
      const response = await axios.get(`${ENP_URL}/VmmodlsApi`)
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
        value.txmodel.toLowerCase().includes(searchText.toLowerCase()) ||
        value.txmanf.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  return (
    <KTCard>
      <KTCardBody>
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
        <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading} />
      </KTCardBody>
    </KTCard>
  )
}

export {DashboardTable}
