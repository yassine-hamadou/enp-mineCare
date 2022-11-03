import {Button, Popconfirm, Table, Modal} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'

const ResolutionTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/FaultEntriesApi')
    setGridData(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    console.log('Inside use-effect', gridData)
  }, [])

  const columns = [
    {
      title: 'FleetId',
      dataIndex: 'fleetID',
      key: 'fleetID',
    },
    {
      title: 'Model',
      dataIndex: 'modlName',
    },
    {
      title: 'Description',
      dataIndex: 'modlClass',
    },
    {
      title: 'Work Type',
    },
    {
      title: 'Comment',
    },
    {
      title: 'Time Start',
    },
    {
      title: 'Time End',
    },
    {
      title: 'Duration',
    },
  ]

  return (
    <div>
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
    </div>
  )
}

export {ResolutionTable}
