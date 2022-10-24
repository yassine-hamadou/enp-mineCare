import {Table} from 'antd'
import {v4 as uuidv4} from 'uuid'
import {useState, useEffect} from 'react'
import axios from 'axios'

const DashboardTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'classCode',
    },
    {
      title: 'Description',
      dataIndex: 'classDesc',
    },
    {
      title: 'Number of Vehicles',
      dataIndex: 'vehicleNum',
    },
    {
      title: 'Number of Down Time',
      dataIndex: 'downTime',
    },
    {
      title: 'Number of Hours',
      dataIndex: 'NumOfHrs',
    },
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

  const dataWithVehicleNum = gridData.map((item: any, index) => ({
    ...item,
    vehicleNum: Math.floor(Math.random() * 20) + 1,
    downTime: `${Math.floor(Math.random() * 100) + 1}`,
    NumOfHrs: `${Math.floor(Math.random() * 20) + 1} Hours`,
    key: index,
  }))

  return (
    <div>
      <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading} />
    </div>
  )
}

export {DashboardTable}
