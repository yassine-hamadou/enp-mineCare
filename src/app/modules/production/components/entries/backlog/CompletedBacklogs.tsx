import React, {useEffect, useState} from 'react'
import qs from 'qs'
import {Table} from 'antd'
import dayjs from 'dayjs'
import {useQuery} from 'react-query'
import {getCompletedBacklogs, getCompletedBacklogsItems} from '../../../../../urls'
import {useAuth} from '../../../../auth'

const CompletedBacklogs = () => {
  const {tenant} = useAuth()
  let completedColumns: any[] = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      sorter: (a: any, b: any) => {
        if (a.equipmentId > b.equipmentId) {
          return 1
        }
        if (b.equipmentId > a.equipmentId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Reference No',
      dataIndex: 'referenceNo',
      sorter: (a: any, b: any) => {
        if (a.referenceNo > b.referenceNo) {
          return 1
        }
        if (b.referenceNo > a.referenceNo) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Work Order No',
      dataIndex: 'workOrderId',
      render: (text: any, record: any) => {
        return record?.workOrderId ? (
          record?.workOrder?.referenceNo
        ) : (
          <span className='badge badge-danger'>N/A</span>
        )
      },
    },
    {
      title: 'BDate',
      dataIndex: 'bdate',
      sorter: (a: any, b: any) => {
        if (a.bdate > b.bdate) {
          return 1
        }
        if (b.bdate > a.bdate) {
          return -1
        }
        return 0
      },
      render: (text: any, record: any) => new Date(record?.bdate)?.toDateString(),
    },
    {
      title: 'CDate',
      dataIndex: 'cdate',
      sorter: (a: any, b: any) => {
        if (a.cdate > b.cdate) {
          return 1
        }
        if (b.cdate > a.cdate) {
          return -1
        }
        return 0
      },
      render: (text: any, record: any) => new Date(record?.cdate)?.toDateString(),
    },
    {
      title: 'SMU',
      dataIndex: 'smu',
    },
    {
      title: 'Fault',
      dataIndex: 'fault',
    },
    {
      title: 'Task/Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Initiator',
      dataIndex: 'initiator',
    },
    {
      title: 'Days',
      render: (text: any, record: any) => {
        if (record?.cdate >= record?.bdate) {
          return Math.round(
            parseFloat(dayjs(record?.cdate).diff(dayjs(record?.bdate), 'day', true).toFixed(2))
          )
        }
        return 'N/A'
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: (a: any, b: any) => {
        if (a.source > b.source) {
          return 1
        }
        if (b.source > a.source) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'System',
      dataIndex: 'downType',
      sorter: (a: any, b: any) => {
        if (a.downType > b.downType) {
          return 1
        }
        if (b.downType > a.downType) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
    },
  ]

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const {data: completedBacklogsTotalItems} = useQuery('completedBacklogsTotalItems', () =>
    getCompletedBacklogsItems(tenant)
  )

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: completedBacklogsTotalItems?.data,
    },
  })

  const {
    data: completedBacklogs,
    isLoading: completedBacklogsLoading,
    isRefetching,
  } = useQuery(
    ['completedBacklogs', tableParams?.pagination?.current, tableParams?.pagination?.pageSize],
    () =>
      getCompletedBacklogs(
        tenant,
        tableParams?.pagination?.current,
        tableParams?.pagination?.pageSize
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    setData(completedBacklogs?.data)
  }, [completedBacklogs])
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
  return (
    <Table
      columns={completedColumns}
      bordered
      rowKey={(record: any) => record?.id}
      scroll={{x: 1500}}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={completedBacklogsLoading || isRefetching}
      onChange={handleTableChange}
    />
  )
}
export default CompletedBacklogs
