import {Button, Popconfirm, Table, Modal, Space, Input} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers'

const ResolutionTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://208.117.44.15/SmWebApi/api/FaultEntriesApi')

      //Formatting date to the received data
      const dataReceivedfromAPI = {
        get withFormatDate() {
          return response.data.map((item: any, index: number) => ({
            ...item,
            key: index,
            //Calculating duration: Present Time - Time fault was reported
            duration: `${Math.floor(
              (new Date().getTime() - new Date(item.downtime).getTime()) / (1000 * 3600 * 24)
            )} Day(s)`,
            formattedDate: new Date(item.downtime).toLocaleString(),
          }))
        },
      }
      setGridData(dataReceivedfromAPI.withFormatDate)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      return error.statusText
    }
  }

  useEffect(() => {
    loadData()
    console.log('Inside use-effect', gridData)
  }, [])

  const columns: any = [
    {
      title: 'FleetID',
      dataIndex: 'fleetId',
      key: 'key',
      sorter: (a: any, b: any) => {
        if (a.fleetId > b.fleetId) {
          return 1
        }
        if (b.fleetId > a.fleetId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Model',
      dataIndex: 'vmModel',
    },
    {
      title: 'Description',
      dataIndex: 'vmClass',
    },
    {
      title: 'Work Type',
    },
    {
      title: 'Comment',
    },
    {
      title: 'Time Start',
      dataIndex: 'formattedDate',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => new Date(a.downtime).getTime() - new Date(b.downtime).getTime(),
    },
    {
      title: 'Time End',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
  ]
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
      <div className='d-flex justify-content-between'>
        <Space style={{marginBottom: 16}}>
          <Input
            placeholder='Enter Search Text'
            onChange={handleInputChange}
            type='text'
            allowClear
            value={searchText}
          />
          <Button type='primary'>
            Search
          </Button>
        </Space>
        <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              
              Export
            </button>
          
        </Space>
      </div>
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
    </div>
  )
}

export {ResolutionTable}
