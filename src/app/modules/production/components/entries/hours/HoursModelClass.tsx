// import {Input, Space, Table} from "antd";
// import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
// import React from "react";
// import {Link} from "react-router-dom";
// import {getModelClasses} from "../../../../../urls";
// import {useQuery} from "react-query";
//
//
// const HoursModelClass = () => {
// const {data: modelClasses, isLoading} = useQuery('ModelClasses', getModelClasses)
//
// const columns: any = [
//   {
//     title: 'Code',
//     dataIndex: 'modelClassId',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Action',
//     render: (_: any, record: any) => (
//       <Space size='middle'>
//         <Link
//           to={`${record.modelClassId}`}
//           state={
//             modelClasses?.data?.filter(
//               (modelClass: any) => modelClass.modelClassId === record.modelClassId
//             )
//           }
//         >
//           <button type='button' className='btn btn-light-primary me-3'>
//             Equip Hours
//           </button>
//         </Link>
//         {/*<button type='button' className='btn btn-light-danger me-3'>*/}
//         {/*Delete*/}
//         {/*</button>*/}
//       </Space>
//     )
//   }
// ]
//
// return (
//   <KTCard>
//     <KTCardBody>
//       <div className='d-flex justify-content-between'>
//         <Space style={{marginBottom: 16}}>
//           <Input
//             placeholder='Enter Search Text'
//             type='text'
//             allowClear
//           />
//         </Space>
//       </div>
//       <Table
//         columns={columns}
//         bordered
//         dataSource={modelClasses?.data}
//         loading={isLoading}
//       />
//     </KTCardBody>
//   </KTCard>
// )
// }
//
// export default HoursModelClass


// import {Button, Input} from 'antd'
// import {Space, Table, Form} from 'antd'
// import axios from 'axios'
// import React, {useEffect, useState} from 'react'
// import {useQuery} from "react-query";
// import {KTSVG} from '../../../../../../_metronic/helpers'
// import {ENP_URL, fetchEquips, fetchHours, fetchModels} from '../../../../../urls'
//
// interface DataType {
//   key: React.Key
//   name: string
//   platform: string
//   version: string
//   upgradeNum: number
//   creator: string
//   createdAt: string
// }
//
// // interface ExpandedDataType {
// //   // key: React.Key
// //   id: string
// //   date: string
// //   name: string
// //   pread: string
// //   cread: string
// // }
//
// const items = [
//   {key: '1', label: 'Action 1'},
//   {key: '2', label: 'Action 2'},
// ]
//
// const HoursPage: React.FC = () => {
//   const [searchText, setSearchText] = useState('')
//   const [editingRow, setEditingRow] = useState(null)
//   const [dataSource, setDataSource] = useState([])
//   // const [edit, setEdit] = useState(false)
//   const [form] = Form.useForm()
//   const [loading, setLoading] = useState(false)
//
//   const [editingKey, setEditingKey] = useState('');
//   const isEditing = (record: any) => record.key === editingKey;
//   const handleInputChange = (e: any) => {
//     setSearchText(e.target.value)
//     if (e.target.value === '') {
//       // loadData()
//     }
//   }
//
//   const edit = (record: any & { key: React.Key }) => {
//     form.setFieldsValue({name: '', age: '', address: '', ...record});
//     setEditingKey(record.key);
//   };
//
//   const cancel = () => {
//     setEditingKey('');
//   };
//   const [isModalOpen, setIsModalOpen] = useState(false)
//
//   const showModal = () => {
//     setIsModalOpen(true)
//   }
//
//   const handleOk = () => {
//     setIsModalOpen(false)
//   }
//
//   const handleCancel = () => {
//     // form.resetFields()
//     setIsModalOpen(false)
//   }
//   const {data: allHours} = useQuery('hours', fetchHours, {cacheTime: 5000})
//   const {data: equipData} = useQuery('equip-count', fetchEquips, {cacheTime: 5000})
//   const countNumberOfEquipment = (model: any) => {
//     //count number of model
//     let count = 0
//     equipData?.data.forEach((item: any) => {
//       if (item.modlName === model) {
//         count++
//       }
//     })
//     return count
//   }
//   // const getRelatedFleets = (model: any) => {
//   //   //count number of model
//   //   let count = null
//   //   equipData?.data.forEach((item: any) => {
//   //     if (item.modlName === model) {
//   //       // count++
//   //     }
//   //   })
//   //   return count
//   // }
//
//
//   // const expandedRowRender = () => {
//   //
//   // }
//   const columns = [
//     // {title: 'ID', dataIndex: 'id', key: 'id'},
//     {title: 'FleetID', dataIndex: 'fleetId', key: 'fleetId'},
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text: any, record: any) => {
//         if (editingRow === record) {
//           return (
//             <Form.Item name='date'>
//               <Input/>
//             </Form.Item>
//           )
//         } else {
//           return <p>{text}</p>
//         }
//       },
//     },
//
//     // {
//     //   title: 'Prv. Reading',
//     //   dataIndex: 'previousReading',
//     //   key: 'previousReading',
//     //   // render: (text:any, record:any) => {
//     //   //   if (editingRow === record.key) {
//     //   //     return (
//     //   //       <Form.Item name='previousReading'>
//     //   //         <Input />
//     //   //       </Form.Item>
//     //   //     )
//     //   //   } else {
//     //   //     return <p>{text}</p>
//     //   //   }
//     //   // },
//     // },
//     {
//       title: 'Cur. Reading',
//       dataIndex: 'currentReading',
//       key: 'currentReading',
//       render: (text: any, record: any) => {
//         if (editingRow === record) {
//           return (
//             <Form.Item name='currentReading'>
//               <Input/>
//             </Form.Item>
//           )
//         } else {
//           return <p> {text}</p>
//         }
//       },
//     },
//     {
//       title: 'Action',
//       dataIndex: 'operation',
//       key: 'operation',
//       render: (_: any, record: any) => (
//         <Space>
//           <Button
//             onClick={() => {
//               setEditingRow(record)
//               form.setFieldsValue({
//                 date: record.date,
//                 previousReading: record.previousReading,
//                 currentReading: record.currentReading
//               })
//             }}
//           >
//             Edit
//           </Button>
//           <Button onClick={onDone} htmlType='submit' danger>
//             Done
//           </Button>
//         </Space>
//       ),
//     },
//   ]
//   const save = (key: any) => {
//     try {
//       const row = (form.validateFields());
//
//       const newData = [...allHours?.data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row,
//         });
//         console.log(newData)
//         setEditingKey('');
//       } else {
//         // newData.push(row);
//         // setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };
//
//   // let rowData: any = [...allHours?.data]
//   const onDone = (values: any) => {
//
//     const updatedDataSource: any = [...allHours?.data]
//     updatedDataSource.splice(editingRow, 1, {...values, id: editingRow})
//     console.log(updatedDataSource)
//     setEditingRow(null)
//   }
//
//   // console.log(rowData)
//
//
//   const {data: mainData} = useQuery('main-data', fetchModels, {cacheTime: 5000})
//
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '5px',
//           boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
//         }}
//       >
//         <div className='d-flex justify-content-between'>
//           <Space style={{marginBottom: 16}}>
//             <Input
//               placeholder='Enter Search Text'
//               onChange={handleInputChange}
//               type='text'
//               allowClear
//               value={searchText}
//             />
//             <Button type='primary'>Search</Button>
//           </Space>
//           <Space style={{marginBottom: 16}}>
//             <button type='button' className='btn btn-light-primary me-3'>
//               <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
//               Export
//             </button>
//           </Space>
//         </div>
//         <Form form={form} onFinish={save}>
//           <Table columns={columns} rowKey="id" dataSource={allHours?.data} pagination={false}/>
//         </Form>
//       </div>
//     </>
//   )
// }
//
// export {HoursPage}


//////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////


// import React, {useContext, useEffect, useRef, useState} from 'react';
// import type {InputRef} from 'antd';
// import {Button, Form, Input, message, Popconfirm, Space, Table} from 'antd';
// import type {FormInstance} from 'antd/es/form';
// import {useMutation, useQuery, useQueryClient} from "react-query";
// import {addHours, addHoursTemp, fetchHours, getEquipment, putHours} from "../../../../../urls";
// import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
//
// const EditableContext = React.createContext<FormInstance<any> | null>(null);
//
// interface Item {
//   id: number
//   fleetId: string
//   date: string
//   previousReading: number
//   currentReading: number
// }
//
// interface EditableRowProps {
//   index: number;
// }
//
// const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };
//
// interface EditableCellProps {
//   title: React.ReactNode;
//   editable: boolean;
//   children: React.ReactNode;
//   dataIndex: keyof Item;
//   record: Item;
//   handleSave: (record: Item) => void;
// }
//
// const EditableCell: React.FC<EditableCellProps> = ({
//                                                      title,
//                                                      editable,
//                                                      children,
//                                                      dataIndex,
//                                                      record,
//                                                      handleSave,
//                                                      ...restProps
//                                                    }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext)!;
//
//   useEffect(() => {
//     if (editing) {
//       inputRef.current!.focus();
//     }
//   }, [editing]);
//
//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({[dataIndex]: record[dataIndex]});
//   };
//
//   const save = async () => {
//     // try {
//     //   message.success('Saved successfully')
//     //   const values = await form.validateFields();
//     //
//     //   toggleEdit();
//     //   handleSave({...record, ...values});
//     // } catch (errInfo) {
//     //   console.log('Save failed:', errInfo);
//     // }
//
//
//     const values = await form.validateFields();
//     toggleEdit();
//     handleSave({...record, ...values});
//
//   };
//
//   let childNode = children;
//
//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{margin: 0}}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save}/>
//       </Form.Item>
//     ) : (
//       <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
//         {children}
//       </div>
//     );
//   }
//
//   return <td {...restProps}>{childNode}</td>;
// };
//
// type EditableTableProps = Parameters<typeof Table>[0];
//
//
// type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
//
// const HoursPage: React.FC = () => {
//
//   const queryClient = useQueryClient()
//   const {data: allHours, isLoading: isHoursLoading} = useQuery('all-hours', fetchHours)
//   const {data: allEquipment, isLoading: isEquipmentLoading} = useQuery('all-equipment', getEquipment)
//
//   const {mutate: mutateHour} = useMutation(addHoursTemp, {
//     onSuccess: () => {
//       message.success('Saved successfully').then(r => r)
//       queryClient.invalidateQueries('all-hours').then(r => r)
//     },
//     onError: (error: any) => {
//       message.error(error.message).then(r => r)
//     }
//   })
//
//   // const handleDelete = (key: React.Key) => {
//   //   return null
//   // };
//
//
//   const defaultColumns = [
//     {
//       title: 'Equipment ID',
//       dataIndex: 'fleetId',
//       sorter: (a: any, b: any) => {
//         if (a.fleetId < b.fleetId) {
//           return -1
//         }
//         if (a.fleetId > b.fleetId) {
//           return 1
//         }
//         return 0
//       }
//     },
//     {
//       title: 'Previous Reading Date',
//       dataIndex: 'date',
//       render: (date: string) => {
//         return new Date(date).toDateString()
//       }
//     },
//     {
//       title: 'Previous Reading',
//       dataIndex: 'previousReading',
//       sorter: (a: any, b: any) => a.previousReading - b.previousReading,
//     },
//     {
//       title: 'Current Reading Date',
//       dataIndex: 'date',
//       sorter: (a: any, b: any) => {
//         if (a.date < b.date) {
//           return -1
//         }
//         if (a.date > b.date) {
//           return 1
//         }
//         return 0
//       },
//       render: () => {
//         return new Date().toDateString()
//       }
//     },
//     {
//       title: 'Current Reading',
//       dataIndex: 'currentReading',
//       render: (currentReading: number, record: any) => {
//         return 0
//       },
//       width: '30%',
//       onCell: (record: any) => ({
//         record: record,
//         dataIndex: 'currentReading',
//         editable: true,
//         handleSave,
//       })
//     },
//     // {
//     //   title: 'operation',
//     //   dataIndex: 'operation',
//     //   render: (_: any, record: any) =>
//     //     allHours?.data.length >= 1 ? (
//     //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
//     //         <Button type={'primary'} danger>Delete</Button>
//     //       </Popconfirm>
//     //     ) : null,
//     // },
//   ];
//
//
//   const handleSave = (row: any) => {
//     // console.log('row', row)
//     // const newData = [...allHours?.data];
//     // const index = newData.findIndex((item) => row.key === item.key);
//     // const item = newData[index];
//     // newData.splice(index, 1, {
//     //   ...item,
//     //   ...row,
//     // });
//     // setDataSource(newData);
//     const newData: {
//       // id: number
//       fleetId: string
//       date: string
//       previousReading: number
//       currentReading: number
//     } = {
//       // id: row.id,
//       fleetId: row.fleetId,
//       date: row.date,
//       previousReading: row.previousReading,
//       currentReading: row.currentReading
//     }
//
//     //Do not mutate if data has not changed
//     // const queryData: any = queryClient.getQueryData('all-hours')
//     //
//     // const oldData: any = queryData?.data?.find((row: any) => row.id === newData.id)
//     // console.log('rowData', oldData)
//     // console.log('queryData', queryData)
//     // if (oldData?.currentReading === newData.currentReading) {
//     //   return
//     // }
//     mutateHour(newData)
//   };
//
//   const components = {
//     body: {
//       row: EditableRow,
//       cell: EditableCell,
//     },
//   };
//
//   // const columns = defaultColumns.map((col) => {
//   //   if (!col.editable) {
//   //     return col;
//   // {/*  }*/}
//   // {/*  return {*/}
//   // eslint-disable-next-line no-lone-blocks
//   // {/*    ...col,*/}
//   //     onCell: (record: any) => ({
//   //       record,
//   //       editable: col.editable,
//   //       dataIndex: col.dataIndex,
//   //       title: col.title,
//   //       handleSave,
//   //     }),
//   //   };
//   // });
//
//   const [gridData, setGridData] = useState<any>([])
//   const [beforeSearch, setBeforeSearch] = useState<any>([])
//
//   useEffect(() => {
//     setBeforeSearch(allHours?.data)
//     setGridData(allHours?.data)
//   }, [allHours?.data])
//   const globalSearch = (searchValue: string) => {
//     //searchValue is the value of the search input
//     const searchResult = beforeSearch?.filter((item: any) => {
//       // console.log('item', item)
//       return (
//         item.fleetId.toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.previousReading.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.currentReading.toString().toLowerCase().includes(searchValue.toLowerCase())
//       )
//     })//search the grid data
//     console.log('searchResult', searchResult)
//     setGridData(searchResult) //set the grid data to the search result
//   }
//   const handleInputChange = (e: any) => {
//     // console.log('e.target.value', e.target.value)
//     globalSearch(e.target.value)
//     if (e.target.value === '') {
//       setGridData(beforeSearch)
//     }
//   }
//
//
//   return (
//     <KTCard>
//       <KTCardBody>
//         <div className='d-flex justify-content-between'>
//           <Space style={{marginBottom: 16}}>
//             <Input
//               placeholder='Enter Search Text'
//               type='text'
//               allowClear
//               onChange={handleInputChange}
//             />
//           </Space>
//           <Space style={{marginBottom: 16}}>
//             {/*<button type='button' className='btn btn-primary me-3' onClick={() => console.log()}>*/}
//             {/*  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>*/}
//             {/*  Add*/}
//             {/*</button>*/}
//           </Space>
//         </div>
//         <Table
//           components={components}
//           bordered
//           loading={isHoursLoading}
//           dataSource={gridData}
//           columns={defaultColumns as ColumnTypes}
//         />
//       </KTCardBody>
//     </KTCard>
//   );
// };
//
// export {HoursPage};


/////////////////////////////////////////////
////////////////////////////////////////////
/////`HoursPage.tsx`////////////////////////


import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable, ErrorBoundary, ProCard, ProFormField} from '@ant-design/pro-components';
import {Button, Input, InputNumber, message, Space} from 'antd';
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {addHours, fetchHours, getEquipment} from "../../../../../urls";
import {useNavigate} from "react-router-dom";
import {KTCard} from "../../../../../../_metronic/helpers";
import {throwError} from "@syncfusion/ej2-base";

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

// const defaultData: DataSourceType[] = new Array(20).fill(1).map((_, index) => {
//   return {
//     id: (Date.now() + index).toString(),
//     title: `title${index}`,
//     decs: 'description',
//     state: 'open',
//     created_at: '1590486176000',
//   };
// });


const HoursPage = () => {
  const {data: defaultData, isLoading} = useQuery('all-hours', fetchHours, {
    refetchOnWindowFocus: false
  })

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // const {data: allEquipment} = useQuery('all-equipment', getEquipment)

  const {mutate: mutateHours, isLoading: isHoursMutationLoading} =
    useMutation(addHours, {
      onSuccess: () => {
        navigate('/')
        message.success('Hours Entries Saved successfully').then(r => r)
        queryClient.invalidateQueries('all-hours').then(r => r)
      },
      onError: (error: any) => {
        message.error(error.message).then(r => r)
        throwError(error.message)
      }
    })

  const [dataSource, setDataSource] =
    useState<readonly DataSourceType[]>(() => defaultData?.data);

  const [record, setRecord] =
    useState<DataSourceType | undefined>(undefined);

  const [editableKeys, setEditableRowKeys] =
    useState<React.Key[]>(() => defaultData?.data?.map((item: any) => item.id));
  console.log('editableKeys', editableKeys)
  // const equipHours: [] = allEquipment?.data?.map((equip: any) => {
  //   defaultData?.data?.map((hours: any) => {
  //       console.log('equip', equip)
  //       console.log('hours', hours)
  //       if (equip.equipmentId.trim() === hours.fleetId.trim()) {
  //         return {
  //           ...hours,
  //           fleetId: equip.equipmentId
  //         }
  //       }
  //     }
  //   )
  // })
  // console.log("sdsd", equipHours)


  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Equipment ID',
      dataIndex: 'fleetId',
      // width: '30%',
      editable: false,
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       whitespace: true,
      //       message: 'message',
      //     },
      //     {
      //       message: 'message',
      //       pattern: /[0-9]/,
      //     },
      //     {
      //       max: 16,
      //       whitespace: true,
      //       message: '1',
      //     },
      //     {
      //       min: 6,
      //       whitespace: true,
      //       message: '6',
      //     },
      //   ],
      // },
    },
    // {
    //   title: 'Model & Manufacturer',
    //   key: 'state',
    //   dataIndex: 'state',
    //   valueType: 'select',
    //   valueEnum: {
    //     all: {text: 'text', status: 'Default'},
    //     open: {
    //       text: 'text',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: 'text',
    //       status: 'Success',
    //     },
    //   },
    // },
    {
      title: 'Previous Reading Date',
      dataIndex: 'date',
      valueType: 'date',
      fieldProps: {
        format: 'DD-MM-YYYY',
      },
      editable: false,
    },
    {
      title: 'Previous Reading',
      dataIndex: 'currentReading',
      editable: false,
    },
    {
      title: 'Current Reading Date',
      valueType: 'date',
      dataIndex: 'today',
      fieldProps: {
        format: 'DD-MM-YYYY',
      }
    },
    {
      title: 'Current Reading',
      valueType: 'digit',
      dataIndex: 'zeroReading',
    },

  ];
  const saveAndContinue = () => {
    dataSource?.map((item: any) => {
      if (item.zeroReading) {
        mutateHours({
          fleetId: item.fleetId,
          previousReading: item.currentReading,
          date: item.today,
          currentReading: item.zeroReading,
        })
      }
    })
  }
  return (
    // <KTCard>
    <ProCard>
      {/*<ConfigProvider locale={en_US}>*/}
      <div className='d-flex justify-content-between'>
        <Space
          key="search"
          style={{
            marginBottom: 16,
          }}
        >
          <Input
            placeholder='Enter Search Text'
            // onChange={handleInputChange}
            type='text'
            allowClear
            // value={searchText}
          />
          <Button type='primary'>Search</Button>
        </Space>
        <Space
          key="button"
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            size={'large'}
            key="save"
            onClick={record ? saveAndContinue : () => {
              message.error('No Hours Entered').then(r => r)
            }}
            // onClick={saveAndContinue}
            loading={isHoursMutationLoading}
          >
            Save
          </Button>
        </Space>
      </div>
      <ErrorBoundary>
        <EditableProTable<DataSourceType>
          // headerTitle="Batch Entries"
          columns={columns}
          loading={isLoading}
          rowKey="id"
          scroll={{
            x: 960,
          }}
          pagination={{
            pageSize: 30,
          }}
          // value={defaultData?.data?.map(
          //   (item: any) => {
          //     return {
          //       ...item,
          //       zeroReading: 0,
          //       today: new Date(),
          //     }
          //   }
          // )}
          value={defaultData?.data?.map(
            (item: any) => {
              return {
                ...item,
                zeroReading: 0,
                today: new Date(),
              }
            }
          )}
          // onChange={setDataSource}

          //do not show add button
          recordCreatorProps={false}
          // toolBarRender={() => {
          //   return [];
          // }}
          editable={{
            type: 'multiple',
            editableKeys: defaultData?.data?.map((item: any) => item.id),
            onValuesChange: (record, recordList) => {
              setRecord(record)
              setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ErrorBoundary>
      {/*<ProCard title="titleCard" headerBordered collapsible defaultCollapsed>*/}
      {/*  <ProFormField*/}
      {/*    ignoreFormItem*/}
      {/*    fieldProps={{*/}
      {/*      style: {*/}
      {/*        width: '100%',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    mode="read"*/}
      {/*    valueType="jsonCode"*/}
      {/*    text={JSON.stringify(dataSource)}*/}
      {/*  />*/}
      {/*</ProCard>*/}
      {/*</ConfigProvider>*/}
    </ProCard>
    // </KTCard>
  );
};

export {HoursPage};
