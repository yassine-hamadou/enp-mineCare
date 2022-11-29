import {Button, Input, TableColumnsType} from 'antd'
import {Space, Table, Form} from 'antd'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

import {KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'

interface DataType {
  key: React.Key
  name: string
  platform: string
  version: string
  upgradeNum: number
  creator: string
  createdAt: string
}

interface ExpandedDataType {
  key: React.Key
  date: string
  name: string
  pread: string
  cread: string
}

const items = [
  {key: '1', label: 'Action 1'},
  {key: '2', label: 'Action 2'},
]

const HoursPage: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [editingRow, setEditingRow] = useState(null)
  const [dataSource, setDataSource] = useState([])
  const [edit, setEdit] = useState(false)
  const [form] = Form.useForm()
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      // loadData()
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    // form.resetFields()
    setIsModalOpen(false)
  }
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {title: 'FleetId', dataIndex: 'name', key: 'name'},
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name='date'>
                <Input />
              </Form.Item>
            )
          } else {
            return <p>{text}</p>
          }
        },
      },

      {
        title: 'Prv. Reading',
        dataIndex: 'pread',
        key: 'pread',
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name='pread'>
                <Input />
              </Form.Item>
            )
          } else {
            return <p>{text}</p>
          }
        },
      },
      {
        title: 'Cur. Reading',
        dataIndex: 'cread',
        key: 'cread',
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name='cread'>
                <Input />
              </Form.Item>
            )
          } else {
            return <p>{text}</p>
          }
        },
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record: any) => (
          <Space>
            <Button
              onClick={() => {
                setEditingRow(record.key)
                form.setFieldsValue({
                  date: record.date,
                  pread: record.pread,
                  cread: record.cread,
                })
              }}
            >
              Edit
            </Button>
            <Button htmlType='submit' danger>
              Done
            </Button>
          </Space>
        ),
      },
    ]

    const data: any = []
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'Test fleets',
        pread: '',
        cread: '',
      })
    }

    // const loadData = async () => {
    //   setLoading(true)
    //   try {
    //     // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
    //     const response = await axios.get(`${ENP_URL}/models`)
    //     setGridData(response.data)
    //     // setGridData(dataSource)
    //     setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const onFinish = (values: any) => {
      const updatedDataSource: any = [...data]
      updatedDataSource.splice(editingRow, 1, {...values, key: editingRow})
      setDataSource(updatedDataSource)
      setEditingRow(null)
    }

    return (
      <Form form={form} onFinish={onFinish}>
        <Table columns={columns} rowKey='id' dataSource={data} pagination={false} />
      </Form>
    )
  }

  const columns: any = [
    {title: 'ID', dataIndex: 'id', key: 'id'},
    {title: 'Manufacturer', dataIndex: 'manu', key: 'manu'},
    {title: 'Model', dataIndex: 'model', key: 'model'},
    {title: 'Number of vehicles', dataIndex: 'count', key: 'count'},
  ]
  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get(`${ENP_URL}/models`)
      setGridData(response.data)
      // setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  const data = [
    {
      id: '1',
      manu: 'Allightsykes',
      model: 'CP300i',
      count: 346,
    },
    {
      id: '2',
      manu: 'BOMAG',
      model: 'BW 216 D - 40',
      count: 142,
    },
    {
      id: '3',
      manu: 'CAT',
      model: 'CS76',
      count: 143,
    },
    {
      id: '4',
      manu: 'CUMMINS',
      model: 'C33D5',
      count: 131,
    },
    {
      id: '5',
      manu: 'LINCOLN',
      model: 'Air Vantage',
      count: 431,
    },
    {
      id: '6',
      manu: 'SANDVIK',
      model: 'DE810',
      count: 133,
    },
    {
      id: '7',
      manu: 'VOLVO',
      model: 'AF04',
      count: 342,
    },
  ]
  for (let i = 0; i < 3; ++i) {
    data.push({
      id: data[i].id,
      manu: data[i].manu,
      model: data[i].model,
      count: data[i].count,
    })
  }

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              onChange={handleInputChange}
              type='text'
              allowClear
              value={searchText}
            />
            <Button type='primary'>Search</Button>
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Export
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          expandable={{expandedRowRender, defaultExpandedRowKeys: ['id']}}
          rowKey='id'
          dataSource={data}
        />
      </div>
    </>
  )
}

export {HoursPage}
