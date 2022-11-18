// import { DownOutlined } from '@ant-design/icons';
// import { Button, Input, TableColumnsType } from 'antd';
// import { Badge, Dropdown, Space, Table } from 'antd';
// import React, { useState } from 'react';
// import { KTSVG } from '../../../../../../_metronic/helpers';

// interface DataType {
//   key: React.Key;
//   name: string;
//   platform: string;
//   version: string;
//   upgradeNum: number;
//   creator: string;
//   createdAt: string;
// }

// interface ExpandedDataType {
//   key: React.Key;
//   date: string;
//   name: string;
//   pread: string;
//   cread: string;
// }

// const items = [
//   { key: '1', label: 'Action 1' },
//   { key: '2', label: 'Action 2' },
// ];

// const LubePage: React.FC = () => {
//   const [searchText, setSearchText] = useState('')
//   const handleInputChange = (e: any) => {
//     setSearchText(e.target.value)
//     if (e.target.value === '') {
//       // loadData()
//     }
//   }
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const showModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleOk = () => {
//     setIsModalOpen(false)
//   }

//   const handleCancel = () => {
//     // form.resetFields()
//   setIsModalOpen(false)

//   }
//   const expandedRowRender = () => {
//     const columns: TableColumnsType<ExpandedDataType> = [
//       { title: 'FleetId', dataIndex: 'name', key: 'name' },
//       { title: 'Date', dataIndex: 'date', key: 'date' },
      
//       { title: 'Prv. Reading', dataIndex: 'pread', key: 'pread' },
//       { title: 'Cur. Reading', dataIndex: 'cread', key: 'cread' },
//       {
//         title: 'Action',
//         dataIndex: 'operation',
//         key: 'operation',
//         render: () => (
//           // <Space size="middle">
//           //   <a>Pause</a>
//           //   <a>Stop</a>
//           //   <Dropdown menu={{ items }}>
//           //     <a>
//           //       More <DownOutlined />
//           //     </a>
//           //   </Dropdown>
//           // </Space>
//           <a href="#" className="btn btn-primary btn-sm">Edit</a>
//         ),
//       },
//     ];

//     const data = [];
//     for (let i = 0; i < 3; ++i) {
//       data.push({
//         key: i.toString(),
//         date: '2014-12-24 23:12:00',
//         name: 'Test fleets',
//         pread: '',
//         cread: '',
//       });
//     }
//     return <Table columns={columns} dataSource={data} pagination={false} />;
//   };

//   const columns: TableColumnsType<DataType> = [
//     { title: 'Manufacturer', dataIndex: 'name', key: 'name' },
//     { title: 'Model', dataIndex: 'platform', key: 'platform' },
//     { title: 'Number of vehicles', dataIndex: 'version', key: 'version' },
//     // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
//     // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
//     // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
//     // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
//   ];

//   const data: DataType[] = [];
//   for (let i = 0; i < 3; ++i) {
//     data.push({
//       key: i.toString(),
//       name: 'Screem',
//       platform: 'iOS',
//       version: '10',
//       upgradeNum: 500,
//       creator: 'Jack',
//       createdAt: '2014-12-24 23:12:00',
//     });
//   }

//   return (
//     <>
//     <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
//     <div className='d-flex justify-content-between'>
//           <Space style={{marginBottom: 16}}>
//             <Input
              
//               placeholder='Enter Search Text'
//               onChange={handleInputChange}
//               type='text'
//               allowClear
//               value={searchText}
//             />
//             <Button type='primary'>
//               Search
//             </Button>
//           </Space>
//           <Space style={{marginBottom: 16}}>
          
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
            
//           </Space>
//         </div>
//       <Table
//         columns={columns}
//         expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
//         dataSource={data}
//       />
//       {/* <Table
//         columns={columns}
//         expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
//         dataSource={data}
//         size="middle"
//       />
//       <Table
//         columns={columns}
//         expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
//         dataSource={data}
//         size="small"
//       /> */}
//       </div>
//     </>
//   );
// };

// export {LubePage}


import {Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Space, Table} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { KTCard, KTCardBody, KTSVG } from '../../../../../../_metronic/helpers'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { ENP_URL } from '../../../../../urls'



const LubePage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()


    // Modal functions
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
      setIsModalOpen(true)
    }
  
    const handleOk = () => {
      setIsModalOpen(false)
    }
  
    const handleCancel = () => {
      form.resetFields()
    setIsModalOpen(false)

    }
    // Modal functions end
    const deleteData = async (element: any) => {
      try {
          const response = await axios.delete(
              `${ENP_URL}/services/${element.id}`
          )
          // update the local state so that react can refecth and re-render the table with the new data
          const newData = gridData.filter((item: any) => item.id !== element.id)
          setGridData(newData)
          return response.status
      } catch (e) {
          return e
      }
  }


  function handleDelete(element: any) {
    deleteData(element)
  }

    const columns: any =[

    
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
      title: 'Model',
      dataIndex: 'modelID',
      sorter: (a: any, b: any) => {
        if (a.modelID > b.modelID) {
          return 1
        }
        if (b.modelID > a.modelID) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Compartment',
      dataIndex: 'compartment',
      sorter: (a: any, b: any) => {
        if (a.compartment > b.compartment) {
          return 1
        }
        if (b.compartment > a.compartment) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Change Out Interval',
      dataIndex: 'changeIn',
      sorter: (a: any, b: any) => {
        if (a.changeIn > b.changeIn) {
          return 1
        }
        if (b.changeIn > a.changeIn) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      sorter: (a: any, b: any) => {
        if (a.capacity > b.capacity) {
          return 1
        }
        if (b.capacity > a.capacity) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Action',
      
      // dataIndex: 'faultDesc',
      // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
      fixed: 'right',
      width: 100,
      render: (_: any, record: any ) => (
        <Space size="middle">
          {/* <a href="sections" className="btn btn-light-info btn-sm">Sections</a> */}
          {/* <Link to={`/setup/sections/${record.id}`}>
          <span  className="btn btn-light-info btn-sm">
          Sections
            </span></Link> */}
          <a href="#" className="btn btn-light-warning btn-sm">Update</a>
          <a onClick={() => handleDelete(record)} className="btn btn-light-danger btn-sm">Delete</a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
  ]
  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      const response = await axios.get(`${ENP_URL}/lubes`)
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
        value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }
  const url = 'http://localhost:4192/lubes'
    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        const data = {
            compartment: values.compartment,
            modelID: values.modelID,
            status: values.status,
            changeIn: values.changeIn,
            capacity: values.capacity,
            
        }
       
        try {
            const response = await axios.post(url, data)
            setSubmitLoading(false)
            form.resetFields()
            setIsModalOpen(false)
            loadData()
            return response.statusText
        } catch (error: any) {
            setSubmitLoading(false)
            return error.statusText
        }
    }

  return (
    <div style={{backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'2px 2px 15px rgba(0,0,0,0.08)'}}>
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
        <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading}/>
          <Modal title='Add Lube' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
          footer={[
            <Button key='back' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        htmlType='submit'
                        loading={submitLoading}
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            form.submit()
                        }}
                    >
                        Submit
                    </Button>,
          ]}>
          {/* <AddServiceForm /> */}
          <Form 
          labelCol={{span: 7}} 
          wrapperCol={{span: 14}} 
          layout='horizontal' 
          form={form}
          name='control-hooks' 
          title='Add Service' 
          onFinish={onFinish}>
       
        <Form.Item label='FleetId'>
        <Select 
        showSearch 
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'Not Identified',
          },
          {
            value: '2',
            label: 'Closed',
          },
          {
            value: '3',
            label: 'Communicated',
          },
          
        ]}
        />
        </Form.Item>
        <Form.Item label='Compartment'>
        <Select 
        showSearch 
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'Not Identified',
          },
          {
            value: '2',
            label: 'Closed',
          },
          {
            value: '3',
            label: 'Communicated',
          },
          
        ]}
        />
        </Form.Item>
        
       <Form.Item label='Change Interval' name='changeIn' >
        <InputNumber readOnly />
      </Form.Item>
       <Form.Item label='Capacity' name='capacity' >
        <InputNumber readOnly />
      </Form.Item>
      <Form.Item label='Refill Type'>
        <Select 
        showSearch 
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'Not Identified',
          },
          {
            value: '2',
            label: 'Top Up - Normal',
          },
          {
            value: '3',
            label: 'Top Up - Hose Burst',
          },
          {
            value: '4',
            label: 'Component C/O',
          },
          {
            value: '5',
            label: 'PM Refill',
          },
          
          {
            value: '6',
            label: 'Refill',
          },
          
        ]}
        />
        </Form.Item>
      <Form.Item name='volume' label='Volume' rules={[{required: true}]}>
            <InputNumber/>
      </Form.Item>
      <Form.Item name='pHours' label='Previous Hours'>
            <InputNumber readOnly/>
      </Form.Item>
      <Form.Item name='cHours' label='Current Hours' rules={[{required: true}]}>
            <InputNumber/>
      </Form.Item>
      <Form.Item name='refillDate' label='Refill Date' rules={[{required: true}]}>
            <DatePicker showTime />
      </Form.Item>
      {/* <Form.Item label='Status' name='status' rules={[{required: true}]}>
        <Radio.Group >
          <Radio value={1}>Active</Radio>
          <Radio value={2}>InActive</Radio>
        </Radio.Group>
      </Form.Item> */}
      
    </Form>
        </Modal>
      </div>
      </KTCardBody>
    </div>
  )
}

export {LubePage}

function uuidv4() {
  throw new Error('Function not implemented.')
}

