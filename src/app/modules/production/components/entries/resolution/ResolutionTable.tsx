import {Button, Input, Space, Table} from 'antd'
import {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useQueryClient} from 'react-query'
import {dhm} from '../fault_d/FaultTable'

const ResolutionTable = () => {
  let initialData: any = useQueryClient().getQueryData('faults')
  const [gridData, setGridData] = useState(
    initialData?.data.filter((fault: any) => fault.status === 1)
  )
  const [loading] = useState(false)

  const columns: any = [
    {
      title: 'FleetID',
      dataIndex: 'fleetId',
      key: 'fleetId',
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
      sorter: (a: any, b: any) => {
        if (a.vmModel > b.vmModel) {
          return 1
        }
        if (b.vmModel > a.vmModel) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Description',
      dataIndex: 'vmClass',
      sorter: (a: any, b: any) => {
        if (a.vmClass > b.vmClass) {
          return 1
        }
        if (b.vmClass > a.vmClass) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Down Type',
      dataIndex: 'downType',
      sorter: (a: any, b: any) => {
        if (a.downType > b.downType) {
          return 1
        }
        if (b.downType > a.downType) {
          return -1

        }
        return 0
      }
    },
    {
      title: 'Custodian',
      dataIndex: 'custodian',
      sorter: (a: any, b: any) => {
        if (a.custodian > b.custodian) {
          return 1
        }
        if (b.custodian > a.custodian) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Location',
      dataIndex: 'locationId',
      sorter: (a: any, b: any) => {
        if (a.locationId > b.locationId
        ) {
          return 1
        }
        if (b.locationId > a.locationId) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Resolution Type',
      dataIndex: 'resolutionType',
      sorter: (a: any, b: any) => {
        if (a.resolutionType > b.resolutionType) {
          return 1
        }
        if (b.resolutionType > a.resolutionType) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Down Status',
      dataIndex: 'downStatus',
      sorter: (a: any, b: any) => {
        if (a.downStatus > b.downStatus) {
          return 1
        }
        if (b.downStatus > a.downStatus) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      sorter: (a: any, b: any) => {
        if (a.comment > b.comment) {
          return 1
        }
        if (b.comment > a.comment) {
          return -1
        }
        return 0
      }
    },
    {
      title: 'Time Started',
      dataIndex: 'wtimeStart',
      render: (record: any) => {
        return new Date(record).toLocaleString()
      },
    },
    {
      title: 'Time Completed',
      dataIndex: 'wtimeEnd',
      render: (record: any) => {
        return new Date(record).toLocaleString()
      },
    },
    {
      title: 'Duration',
      render: (record: any) => {
        return dhm(new Date(record.wtimeEnd).getTime() - new Date(record.wtimeStart).getTime())
      },
    },
  ]
  const handleInputChange = (e: any) => {
    globalSearch(e.target.value)
    if (e.target.value === '') {
      setGridData(initialData?.data.filter((fault: any) => fault.status === 1))
    }
  }

  const globalSearch = (searchText: string) => {
    let search = initialData?.data.filter((value: any) => {
      return (
        value.fleetId.toLowerCase().includes(searchText.toLowerCase()) ||
        value.vmModel.toLowerCase().includes(searchText.toLowerCase()) ||
        value.vmClass.toLowerCase().includes(searchText.toLowerCase()) ||
        value.downType.toLowerCase().includes(searchText.toLowerCase()) ||
        value.custodian.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(search.filter((fault: any) => fault.status === 1))
  }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3 className='mb-0'>Last 7 Days</h3>
      </div>
      <div className='d-flex justify-content-between'>
        <Space style={{marginBottom: 16}}>
          <Input
            placeholder='Enter Search Text'
            onChange={handleInputChange}
            type='text'
            allowClear
          />
        </Space>
        <Space style={{marginBottom: 16}}>
          <button type='button' className='btn btn-primary me-3'>
            <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
            Export
          </button>
        </Space>
      </div>
      {/*@ts-ignore*/}
      <Table
        columns={columns}
        //filter data for last 7 days
        dataSource={
          gridData?.filter((fault: any) => {
            return (
              new Date(fault.wtimeEnd).getTime() >
              new Date().getTime() - 7 * 24 * 60 * 60 * 1000
            )
          }) || []
        }
        bordered
        loading={loading}
        rowKey={(record) => record.entryId}
      />
    </div>
  )
}

export {ResolutionTable}
