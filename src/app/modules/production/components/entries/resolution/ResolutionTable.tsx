import {Button, Popconfirm, Table, Modal} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'

const ResolutionTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)

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

  return (
    <div>
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
    </div>
  )
}

export {ResolutionTable}
