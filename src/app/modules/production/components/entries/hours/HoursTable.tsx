import { DownOutlined } from '@ant-design/icons';
import { padding } from '@mui/system';
import { Button, Input, TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table , Form} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KTSVG } from '../../../../../../_metronic/helpers';
import { ENP_URL } from '../../../../../urls';

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  pread: string;
  cread: string;
}

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];

const HoursPage: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [editingRow, setEditingRow] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const [gridData, setGridData] = useState([])
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
      { title: 'FleetId', dataIndex: 'name', key: 'name' },
      { 
        title: 'Date', 
        dataIndex: 'date', 
        key: 'date',
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name="date">
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
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
              <Form.Item name="pread">
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      { title: 'Cur. Reading', 
        dataIndex: 'cread', 
        key: 'cread',
        render: (text, record) => {
          if (editingRow === record.key) {
            return (
              <Form.Item name="cread">
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record:any) => (
          
          <Space>
            <Button
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  date: record.date,
                  pread: record.pread,
                  cread: record.cread,
                });
              }}
            >
              Edit 
            </Button>
            <Button  htmlType="submit" danger>Done</Button>
          </Space>
            
        ),
      },
    ];



    // useEffect(() => {
    //   const data = [];
    //   for (let i = 0; i < 7; i++) {
    //     data.push({
    //       key: i.toString(),
    //       date: '2014-12-24 23:12:00',
    //       name: 'Test fleets',
    //       pread: '',
    //       cread: '',
    //     });
    //   }
    //   setDataSource(data);
    // }, );

    const data:any = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'Test fleets',
        pread: '',
        cread: '',
      });
    }

    const onFinish = (values:any) => {
      const updatedDataSource:any = [...data];
      updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
      setDataSource(updatedDataSource);
      setEditingRow(null);
    };
    
    return <Form form={form} onFinish={onFinish}><Table columns={columns} dataSource={data} pagination={false} /></Form>;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Manufacturer', dataIndex: 'manu', key: 'manu' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Number of vehicles', dataIndex: 'count', key: 'count' },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  // const data: DataType[] = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     name: 'Screem',
  //     platform: 'iOS',
  //     version: '10',
  //     upgradeNum: 500,
  //     creator: 'Jack',
  //     createdAt: '2014-12-24 23:12:00',
  //   });
  // }
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

  return (
    <>
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
    <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              
              placeholder='Enter Search Text'
              onChange={handleInputChange}
              type='text'
              allowClear
              value={searchText}
            />
            <Button type='primary'>
              Search
            </Button>
          </Space>
          <Space style={{marginBottom: 16}}>
          
            <button type='button' className='btn btn-primary me-3' onClick={showModal}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Upload
            </button>
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              
              Export
            </button>
            
          </Space>
        </div>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['1'] }}
        dataSource={gridData}
      />
      {/* <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="middle"
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="small"
      /> */}
      </div>
    </>
  );
};

export {HoursPage}