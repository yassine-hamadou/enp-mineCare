import {Button, Input, Space, Table} from 'antd'
import {useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {getDowntypes} from '../../../../../urls'
import {useQuery} from 'react-query'
import {useAuth} from '../../../../auth'

const DownTypePage = () => {
  const {tenant} = useAuth()
  const [searchText, setSearchText] = useState('')
  const {data: downTypes, isLoading} = useQuery('downTypes', () => getDowntypes(tenant))

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        if (a.id > b.id) {
          return 1
        }
        if (b.id > a.id) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name - b.name,
    },
  ]


  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      // loadData()
    }
  }

  const globalSearch = () => {
    // // @ts-ignore
    // filteredData = dataWithVehicleNum.filter((value) => {
    //   return (
    //     value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
    //     value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
    //   )
    // })
    // setGridData(filteredData)
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
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={downTypes?.data} bordered loading={isLoading}/>
        </div>
      </KTCardBody>
    </div>
  )
}

export {DownTypePage}
