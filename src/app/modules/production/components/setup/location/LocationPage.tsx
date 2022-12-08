import {Button, Input, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'

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
      const response = await axios.get(`${ENP_URL}/IclocsApi`)
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

  const keys = ['locationCode', 'locationDesc']
  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithVehicleNum.filter((value) => {
      return keys.some((key) => value[key].toLowerCase())

      // value.locationCode.toLowerCase().includes(searchText.toLowerCase()) ||
      // value.locationDesc.toLowerCase().includes(searchText.toLowerCase())
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
          {/* <div >
        <Pagination total={dataWithVehicleNum.length} itemRender={itemRender} />
      </div> */}
        </div>
      </KTCardBody>
    </div>
  )
}

export {LocationPage}
