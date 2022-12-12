import {Button, Input, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'
import {useQuery} from 'react-query'
import {index} from 'devexpress-reporting/designer/controls/metadata/pivotgrid/pivotgridfield'

const FleetPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const {data: Vmmodls}: any = useQuery('Vmmodls', () => axios.get(`${ENP_URL}/VmmodlsApi`))

  const findManufacturer = (modlName: any) => {
    const vmManufacturer = Vmmodls?.data.find((element: any) => element?.txmodel === modlName)
    return vmManufacturer?.txmanf
  }

  const columns: any = [
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
    {
      title: 'Manufacturer',
      render: (record: any) => {
        return findManufacturer(record.modlName)
      },
    },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
      const response = await axios.get(`${ENP_URL}/VmequpsApi`)
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
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
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
              <button type='button' className='btn btn-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataWithVehicleNum} bordered loading={loading} />
        </div>
      </KTCardBody>
    </div>
  )
}

export {FleetPage}
