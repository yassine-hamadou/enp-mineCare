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
    },
    {
      title: 'Description',
      dataIndex: 'vmClass',
    },
    {
      title: 'Down Type',
      dataIndex: 'downType',
    },
    {
      title: 'Custodian',
      dataIndex: 'custodian',
    },
    {
      title: 'Location',
      dataIndex: 'locationId',
    },
    {
      title: 'Resolution Type',
      dataIndex: 'resolutionType',
    },
    {
      title: 'Down Status',
      dataIndex: 'downStatus',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
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
            <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Export
          </button>
        </Space>
      </div>
      {/*@ts-ignore*/}
      <Table
        columns={columns}
        dataSource={gridData}
        bordered
        loading={loading}
        rowKey={(record) => record.entryId}
      />
    </div>
  )
}

export {ResolutionTable}
