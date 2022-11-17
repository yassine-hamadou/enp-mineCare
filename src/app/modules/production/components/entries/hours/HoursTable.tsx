// import {Button, Popconfirm, Table, Modal, Space, Input} from 'antd'
// import 'antd/dist/antd.min.css'
// import axios from 'axios'
// import {useEffect, useState} from 'react'
// import { KTSVG } from '../../../../../../_metronic/helpers'
// import {AddFaultForm} from './AddHoursForm'

// const HoursTable = () => {
//   const [gridData, setGridData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searchText, setSearchText] = useState('')
//   let [filteredData] = useState([])

//   // Modal functions
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const showModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleOk = () => {
//     setIsModalOpen(false)
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }
//   // Modal functions end

//   const loadData = async () => {
//     setLoading(true)
//     // const response = await axios.get('https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
//     const response = await axios.get('http://208.117.44.15/SmWebApi/api/HourliesApi')
//     // console.log('api Response', response.data)
//     setGridData(response.data)
//     setLoading(false)
//   }

//   function handleDelete(element: any) {
//     const dataSource = [...gridData]
//     const filteredData = dataSource.filter((item: any) => item.fleetID !== element.fleetID)
//     setGridData(filteredData)
//   }
//   const handleInputChange = (e: any) => {
//     setSearchText(e.target.value)
//     if (e.target.value === '') {
//       loadData()
//     }
//   }

//   const globalSearch = () => {
//     // @ts-ignore
//     filteredData = dataWithVehicleNum.filter((value) => {
//       return (
//         value.entryId.toLowerCase().includes(searchText.toLowerCase()) ||
//         value.classCode.toLowerCase().includes(searchText.toLowerCase())
//       )
//     })
//     setGridData(filteredData)
//   }

//   const columns = [
//     {
//       title: 'FleetId',
//       dataIndex: 'fleetId',
//       key: 'fleetId',
//     },
//     {
//       title: 'Previous Reading',
//       dataIndex: 'previousReading',

//     },
//     {
//       title: 'Reading',
//       dataIndex: 'reading',

//     },
//     {
//       title: 'Daily HoursWorked',
//       dataIndex: 'dailyHoursWorked',

//     },
//     {
//       title: 'Reading Date',
//       dataIndex: 'readingDate',

//     },
//     // {
//     //   title: 'Date',
//     // },
//     // {
//     //   title: 'Daily Hours Worked',
//     // },
//     // {
//     //   title: 'New Reading',
//     // },
//     // {
//     //   title: 'Comment',
//     // },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: (_: any, record: any) =>
//         gridData.length >= 1 ? (
//           <>
//             <Popconfirm title='Sure to adjust'>
//               <Button type='primary' className='mx-3 mb-3'>
//                 Adjust Hours
//               </Button>
//             </Popconfirm>
//           </>
//         ) : null,
//     },
//   ]
//   useEffect(() => {
//     loadData()

//   }, [])

//   return (
//     <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
//       <div className='d-flex justify-content-between'>
//         <Space style={{marginBottom: 16}}>
//           <Input
//             placeholder='Enter Search Text'
//             onChange={handleInputChange}
//             type='text'
//             allowClear
//             value={searchText}
//           />
//           <Button type='primary' onClick={globalSearch}>
//             Search
//           </Button>
//         </Space>
//         <Space style={{marginBottom: 16}}>
//             <button type='button' className='btn btn-primary me-3' onClick={showModal}>
//               <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
//               Add
//             </button>
//             <button type='button' className='btn btn-light-primary me-3'>
//               <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
//               Upload
//             </button>
//             <button type='button' className='btn btn-light-primary me-3'>
//               <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              
//               Export
//             </button>
//         </Space>
//       </div>
//       <Table columns={columns} dataSource={gridData} bordered loading={loading} />
//       <Modal title='Add Hour' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <AddFaultForm />
//       </Modal>
//     </div>
//   )
// }

// export {HoursTable}


import { DownOutlined } from '@ant-design/icons';
import { Button, Input, TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';
import React, { useState } from 'react';
import { KTSVG } from '../../../../../../_metronic/helpers';

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

const HoursTable: React.FC = () => {
  const [searchText, setSearchText] = useState('')
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
      { title: 'Date', dataIndex: 'date', key: 'date' },
      
      { title: 'Prv. Reading', dataIndex: 'pread', key: 'pread' },
      { title: 'Cur. Reading', dataIndex: 'cread', key: 'cread' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          // <Space size="middle">
          //   <a>Pause</a>
          //   <a>Stop</a>
          //   <Dropdown menu={{ items }}>
          //     <a>
          //       More <DownOutlined />
          //     </a>
          //   </Dropdown>
          // </Space>
          <a href="#" className="btn btn-primary btn-sm">Edit</a>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'Test fleets',
        pread: '',
        cread: '',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Manufacturer', dataIndex: 'name', key: 'name' },
    { title: 'Model', dataIndex: 'platform', key: 'platform' },
    { title: 'Number of vehicles', dataIndex: 'version', key: 'version' },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

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
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
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

export {HoursTable}
