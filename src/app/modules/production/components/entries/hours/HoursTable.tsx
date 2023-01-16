import {Button, Input, TableColumnsType} from 'antd'
import {Space, Table, Form} from 'antd'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useQuery } from "react-query";
import {KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL, fetchEquips, fetchHours, fetchModels} from '../../../../../urls'

interface DataType {
  key: React.Key
  name: string
  platform: string
  version: string
  upgradeNum: number
  creator: string
  createdAt: string
}

// interface ExpandedDataType {
//   // key: React.Key
//   id: string
//   date: string
//   name: string
//   pread: string
//   cread: string
// }

const items = [
  {key: '1', label: 'Action 1'},
  {key: '2', label: 'Action 2'},
]

const HoursPage: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [editingRow, setEditingRow] = useState(null)
  const [dataSource, setDataSource] = useState([])
  // const [edit, setEdit] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: any) => record.key === editingKey;
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      // loadData()
    }
  }

  const edit = (record:any & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
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
  const {data:allHours} = useQuery('hours', fetchHours, {cacheTime:5000})
  const {data:equipData} = useQuery('equip-count', fetchEquips, {cacheTime:5000})
  const countNumberOfEquipment = (model: any) => {
    //count number of model
    let count = 0
    equipData?.data.forEach((item: any) => {
      if (item.modlName === model) {
        count++
      }
    })
    return count
  }
  // const getRelatedFleets = (model: any) => {
  //   //count number of model
  //   let count = null
  //   equipData?.data.forEach((item: any) => {
  //     if (item.modlName === model) {
  //       // count++
  //     }
  //   })
  //   return count
  // }

  
  const expandedRowRender = () => {
    
    const columns= [
      // {title: 'ID', dataIndex: 'id', key: 'id'},
      {title: 'FleetID', dataIndex: 'fleetId', key: 'fleetId'},
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text:any, record:any) => {
          if (editingRow === record) {
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

      // {
      //   title: 'Prv. Reading',
      //   dataIndex: 'previousReading',
      //   key: 'previousReading',
      //   // render: (text:any, record:any) => {
      //   //   if (editingRow === record.key) {
      //   //     return (
      //   //       <Form.Item name='previousReading'>
      //   //         <Input />
      //   //       </Form.Item>
      //   //     )
      //   //   } else {
      //   //     return <p>{text}</p>
      //   //   }
      //   // },
      // },
      {
        title: 'Cur. Reading',
        dataIndex: 'currentReading',
        key: 'currentReading',
        render: (text:any, record:any) => {
          if (editingRow === record) {
            return (
              <Form.Item name='currentReading'>
                <Input />
              </Form.Item>
            )
          } else {
            return <p> {text}</p>
          }
        },
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_:any, record: any) => (
          <Space>
            <Button
              onClick={() => {
                setEditingRow(record)
                form.setFieldsValue({
                  date: record.date,
                  previousReading: record.previousReading,
                  currentReading: record.currentReading
                })
              }}
            >
              Edit
            </Button>
            <Button onClick={onDone} htmlType='submit' danger>
              Done
            </Button>
          </Space>
        ),
      },
    ]
    const save =  (key:any) => {
      try {
        const row = (form.validateFields());
  
        const newData = [...allHours?.data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          console.log(newData)
          setEditingKey('');
        } else {
          // newData.push(row);
          // setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    
    let rowData:any =[...allHours?.data]
    const onDone = (values: any) => {
      
      const updatedDataSource: any = [...allHours?.data]
      updatedDataSource.splice(editingRow, 1, {...values, id: editingRow})
      console.log(updatedDataSource)
      setEditingRow(null)
    }

    // console.log(rowData)

    return (
      <Form form={form} onFinish={save}>
        <Table columns={columns} rowKey="id" dataSource={allHours?.data} pagination={false} />
      </Form>
    )
  }

  const columns: any = [
    // {title: 'ID', dataIndex: 'id', key: 'id'},
    {title: 'Manufacturer', dataIndex: 'txmanf', key: 'txmanf'},
    {title: 'Model', dataIndex: 'txmodel', key: 'txmodel'},
    {
      title: 'Number of vehicles',
      key:'txmodel', 
      render: (row: any) => {
        return countNumberOfEquipment(row.txmodel)
      }
    }
  ]
 
  const {data:mainData} = useQuery('main-data', fetchModels, {cacheTime:5000})

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
          expandable={{expandedRowRender, defaultExpandedRowKeys: ['txmodl']}}
          rowKey='txmodl'
          loading={loading}
          dataSource={mainData?.data}
        />
      </div>
    </>
  )
}

export {HoursPage}
