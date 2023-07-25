// import React, {useState} from "react";
// import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Space, Table} from "antd";
// import {KTCard, KTCardBody, KTSVG} from "../../../../../../../_metronic/helpers";
// import {useForm} from "antd/es/form/Form";
// import {useMutation, useQuery, useQueryClient} from "react-query";
// import {
//   deleteGroundEngagingTools,
//   getEquipment,
//   getGroundEngagingTools,
//   postGroundEngagingTools,
//   putGroundEngagingTools
// } from "../../../../../../urls";
// import TextArea from "antd/lib/input/TextArea";
// import dayjs from "dayjs";
// import {uuid} from "@ant-design/plots/es/utils";
// import {useAuth} from "../../../../../auth";
//
// export default function GroundEngagingTools() {
//   const {tenant} = useAuth()
//   const queryClient = useQueryClient()
//   const [getForm] = useForm();
//   const [editGetForm] = useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [dataToEdit, setDataToEdit] = useState<any>();
//   const {data: equipmentData} = useQuery('equipments', () => getEquipment(tenant));
//   const {
//     data: groundETData,
//     isLoading: getLoading
//   } = useQuery('groundEngagingTools', () => getGroundEngagingTools(tenant));
//   const {mutate: postGroundTool} = useMutation(postGroundEngagingTools, {
//     onSuccess: () => {
//       setSubmitLoading(false);
//       getForm.resetFields();
//       setIsModalOpen(false);
//       queryClient.invalidateQueries('groundEngagingTools').then(
//         () => {
//           message.success('Ground Engaging Tool Added Successfully')
//         }
//       )
//     }, onError: (e: any) => {
//       setSubmitLoading(false);
//       message.error(e.message)
//     }
//   })
//   const {mutate: editGet} = useMutation(putGroundEngagingTools, {
//
//     onSuccess: () => {
//       setSubmitLoading(false);
//       editGetForm.resetFields();
//       setOpenEditModal(false);
//       queryClient.invalidateQueries('groundEngagingTools').then(
//         () => {
//           message.success('Ground Engaging Tool Edited Successfully')
//         }
//       )
//     },
//     onError: (e: any) => {
//       setSubmitLoading(false);
//       message.error(e.message)
//     }
//   })
//   const {mutate: deleteGet} = useMutation(deleteGroundEngagingTools, {
//     onSuccess: () => {
//       setDeleteLoading(false);
//       queryClient.invalidateQueries('groundEngagingTools').then(
//         () => {
//           message.success('Ground Engaging Tool Deleted Successfully')
//         }
//       )
//     },
//     onError: (e: any) => {
//       setDeleteLoading(false);
//       message.error(e.message)
//     }
//   })
//   const [batch, setBatch] = useState<any[]>([]);
//   const columns: any = [
//     {
//       title: "Equipment ID",
//       dataIndex: "equipmentId"
//     },
//     {
//       title: "Previous Hours",
//       dataIndex: "previousHours"
//     },
//     {
//       title: "Current Hours",
//       dataIndex: "currentHours"
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity"
//     },
//     {
//       title: "Reason",
//       dataIndex: "reason"
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text: any, record: any) => {
//         return new Date(record.date).toDateString()
//       }
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: `${uuid()}`,
//       render: (text: any, record: any) => (
//         <Space size="small">
//           <Button type="primary" className="me-3" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button type="primary" className="me-3" danger onClick={() => handleDelete(record)}
//                   loading={deleteLoading}>
//             Delete
//           </Button>
//         </Space>
//       )
//     }
//   ];
//
//   const handleEdit = (values: any) => {
//     setOpenEditModal(true);
//     editGetForm.setFieldsValue({
//       equipmentId: values.equipmentId,
//       previousHours: values.previousHours,
//       currentHours: values.currentHours,
//       quantity: values.quantity,
//       reason: values.reason,
//       date: dayjs(values.date)
//     })
//     setDataToEdit(values);
//   }
//   const handleDelete = (values: any) => {
//     Modal.confirm({
//
//         title: 'Delete this Ground Engaging Tool?',
//         maskClosable: true,
//         okType: 'danger',
//         onOk() {
//           // deleteGet(values.id);
//           //remove from batch
//           console.log('values', values);
//           console.log('batch', batch);
//           const newBatch = batch.filter((item: any) => item.id !== values.id);
//           setBatch(newBatch);
//         },
//       }
//     )
//   }
//
//   const onEditFinish = () => {
//     setSubmitLoading(true);
//     const dataToSubmit = {
//       id: dataToEdit.id,
//       equipmentId: editGetForm.getFieldValue('equipmentId'),
//       previousHours: editGetForm.getFieldValue('previousHours'),
//       currentHours: editGetForm.getFieldValue('currentHours'),
//       quantity: editGetForm.getFieldValue('quantity'),
//       reason: editGetForm.getFieldValue('reason'),
//       date: new Date(editGetForm.getFieldValue('date').$d).toISOString()
//     }
//     console.log('dataToSubmit', dataToSubmit);
//     editGet(dataToSubmit);
//   }
//
//   const handleEditCancel = () => {
//     setOpenEditModal(false);
//   }
//
//
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//
//   const onFinish = (values: any) => {
//     setSubmitLoading(true);
//     console.log('done', values);
//     const data = {
//       equipmentId: values.equipmentId,
//       previousHours: 0,
//       currentHours: values.currentHours,
//       quantity: values.quantity,
//       reason: values.reason,
//       date: new Date(values.date.$d).toISOString(),
//       tenantId: tenant
//     }
//     console.log('data', data);
//     // postGroundTool(data);
//     setBatch([...batch, data]);
//     setSubmitLoading(false);
//     getForm.resetFields();
//     setIsModalOpen(false);
//   }
//
//
//   return (
//     <>
//       <KTCard>
//         <KTCardBody>
//           <div className="d-flex justify-content-between">
//             <Space style={{marginBottom: 16}}>
//               <Input
//                 placeholder="Enter Search Text"
//                 // onChange={handleInputChange}
//                 type="text"
//                 allowClear
//               />
//             </Space>
//             <Space style={{marginBottom: 16}}>
//               <button type="button" className="btn btn-primary me-3" onClick={() => showModal()}>
//                 <KTSVG
//                   path="/media/icons/duotune/arrows/arr075.svg"
//                   className="svg-icon-2"
//                 />
//                 Add
//               </button>
//               {batch.length > 0 && (
//                 //save batch
//                 <button type="button" className="btn btn-success me-3" onClick={() => {
//                   console.log('batch', batch);
//                   try {
//                     batch.map((row: any) => {
//                       postGroundTool(row);
//                     })
//                     setBatch([]);
//                   } catch (e) { // statements to handle any exceptions
//                     console.log('e', e);
//                   }
//                 }
//                 }>
//                   <KTSVG
//                     path="/media/icons/duotune/arrows/arr080.svg"
//                     className="svg-icon-2"
//                   />
//                   Save
//                 </button>
//
//               )}
//               <Modal
//                 title="Add GET Ground Engaging Tool"
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 footer={[
//                   <Button key='back' onClick={handleCancel}>
//                     Cancel
//                   </Button>,
//                   <Button
//                     key='submit'
//                     type='primary'
//                     htmlType='submit'
//                     loading={submitLoading}
//                     onClick={() => {
//                       getForm.submit()
//                     }}
//                   >
//                     Submit
//                   </Button>,
//                 ]}
//               >
//                 <Form
//                   form={getForm}
//                   name='control-hooks'
//                   labelCol={{span: 8}}
//                   wrapperCol={{span: 14}}
//                   title='Add GET Ground Engaging Tool'
//                   onFinish={onFinish}
//                 >
//                   <Form.Item
//                     name='equipmentId'
//                     label='Equipment ID'
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Please select Equipment ID'
//                       }
//                     ]}
//                   >
//                     <Select
//                       placeholder='Select Equipment ID'
//                       className={'w-100'}
//                       allowClear
//                       showSearch
//                     >
//                       {equipmentData?.data?.map((equipment: any) => {
//                         return (
//                           <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
//                             {equipment.equipmentId}
//                           </Select.Option>
//                         );
//                       })}
//                     </Select>
//                   </Form.Item>
//                   <Form.Item
//                     name='previousHours'
//                     label='Previous Hours'
//                   >
//                     <InputNumber min={1}
//                                  className={'w-100'}
//                                  disabled
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='currentHours'
//                     label='Current Hours'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Current Hours'
//                     }]}
//                   >
//                     <InputNumber min={1} className={'w-100'}/>
//                   </Form.Item>
//                   <Form.Item
//                     name='date'
//                     label='Date'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Date'
//                     }]}
//                   >
//                     <DatePicker
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='quantity'
//                     label='Quantity'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Quantity'
//                     }]}
//                   >
//                     <InputNumber
//                       min={1}
//                       className={'w-100'}
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='reason'
//                     label='Reason'
//                     rules={[{
//                       required: true,
//                       message: 'Please Type Reason'
//                     }]}
//                   >
//                     <TextArea
//                       className={'w-100'}
//                     />
//                   </Form.Item>
//                 </Form>
//               </Modal>
//
//               <Modal
//                 title={`Edit: ${editGetForm.getFieldValue('equipmentId')}`}
//                 open={openEditModal}
//                 onCancel={handleEditCancel}
//                 footer={[
//                   <Button key='back' onClick={handleEditCancel}>
//                     Cancel
//                   </Button>,
//                   <Button
//                     key='submit'
//                     type='primary'
//                     htmlType='submit'
//                     loading={submitLoading}
//                     onClick={() => {
//                       editGetForm.submit()
//                     }}
//                   >
//                     Submit
//                   </Button>,
//                 ]}
//               >
//                 <Form
//                   form={editGetForm}
//                   name='control-hooks'
//                   labelCol={{span: 8}}
//                   wrapperCol={{span: 14}}
//                   title={`Edit Ground Engaging Tool`}
//                   onFinish={onEditFinish}
//                 >
//                   <Form.Item
//                     name='equipmentId'
//                     label='Equipment ID'
//                     hidden
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Please select Equipment ID'
//                       }
//                     ]}
//                   >
//                     <Select
//                       placeholder='Select Equipment ID'
//                       className={'w-100'}
//                       allowClear
//                       showSearch
//                       disabled={true}
//                     >
//                       {equipmentData?.data?.map((equipment: any) => {
//                           return (
//                             <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
//                               {equipment.equipmentId}
//                             </Select.Option>
//                           );
//
//                         }
//                       )}
//                     </Select>
//                   </Form.Item>
//
//                   <Form.Item
//                     name='previousHours'
//                     label='Previous Hours'
//                   >
//                     <InputNumber
//                       min={1}
//                       className={'w-100'}
//                       disabled
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='currentHours'
//                     label='Current Hours'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Current Hours'
//                     }]}
//                   >
//                     <InputNumber min={1} className={'w-100'}/>
//                   </Form.Item>
//                   <Form.Item
//                     name='date'
//                     label='Date'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Date'
//                     }]}
//                   >
//                     <DatePicker
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='quantity'
//                     label='Quantity'
//                     rules={[{
//                       required: true,
//                       message: 'Please select Quantity'
//                     }]}
//                   >
//                     <InputNumber
//                       min={1}
//                       className={'w-100'}
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name='reason'
//                     label='Reason'
//                     rules={[{
//                       required: true,
//                       message: 'Please Type Reason'
//                     }]}
//                   >
//                     <TextArea
//                       className={'w-100'}
//                     />
//                   </Form.Item>
//                 </Form>
//               </Modal>
//             </Space>
//           </div>
//           <Table
//             columns={columns}
//             //filter data for last 7 days
//             // dataSource={groundETData?.data}
//             dataSource={batch}
//             bordered
//             loading={getLoading}
//             rowKey={() => uuid()}
//           />
//         </KTCardBody>
//       </KTCard>
//     </>
//   );
// }


import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable, ProForm,} from '@ant-design/pro-components';
import {DatePicker, InputNumber, message, Select} from 'antd';
import React, {useState} from 'react';
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {useQuery} from "react-query";
import {getEquipment, getHours} from "../../../../../../urls";
import {useAuth} from "../../../../../auth";
import TextArea from "antd/lib/input/TextArea";

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


const defaultData: any = [];


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const {data: equipmentData} = useQuery('equipments', () => getEquipment(tenant));
    const {data: hoursData, isLoading} = useQuery('all-hours', () => getHours(tenant), {
        refetchOnWindowFocus: false
    })
    const columns: ProColumns<any>[] = [
        {
            title: "Equipment ID",
            dataIndex: "equipmentId",
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                console.log('form', form.getFieldValue('equipmentId'))
                console.log('_', _)
                return (
                  <Select
                    placeholder='Select Equipment ID'
                    className={'w-100'}
                    allowClear
                    showSearch
                    onChange={(value) => {
                        const rowData = form.getFieldsValue(); // Get the values of all form fields in the row
                        console.log('rowData', rowData) //rowData is an object with key value pairs

                        // Object.values(rowData)[0].previousHours = 12; //set previous hours in this row

                        //set previous hours in this row
                        const equipment = hoursData?.data?.find((equipment: any) => equipment?.fleetId === value);
                        //@ts-ignore
                        rowData[recordKey].previousHours = equipment?.previousReading ? equipment?.previousReading : 0; //set previous hours in this row
                        console.log('equiData', value)
                        console.log('hours', hoursData)
                        console.log('equipment outseide', equipment)
                        if (equipment) {
                            form.setFieldsValue({ // Set the value of the "previousHours" field
                                ...rowData,
                            });
                        }
                    }}
                  >
                      {equipmentData?.data?.map((equipment: any) => {
                            return (
                              <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                                  {equipment.equipmentId}
                              </Select.Option>
                            );
                        }
                      )}
                  </Select>
                );
            }
        },
        {
            title: "Item/Type of GET",
            dataIndex: "itemType",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <TextArea required className="w-100 text-black"/>;
            }
        },
        {
            title: "Previous Hours",
            dataIndex: "previousHours",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            },
        },
        {
            title: "Current Hours",
            dataIndex: "currentHours",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber required min={1} className="w-100 text-black"/>;
            },

        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber required min={1} className="w-100 text-black"/>;
            },
        },
        {
            title: "Reason",
            dataIndex: "reason",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <TextArea required className="w-100 text-black"/>;
            },
        },
        {
            title: "Date",
            dataIndex: "date",
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <DatePicker format={'DD-MM-YYYY'}/>;
            },
        },
        {
            title: 'Action',
            valueType: 'option',
        },
    ];

    const {tenant} = useAuth();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
      defaultData.map((item: any) => item.id),
    );
    const [form] = ProForm.useForm();
    return (
      <KTCard>
          <KTCardBody>
              <ProForm
                form={form}
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values);
                    message.success('success');
                    form.resetFields();
                }}
              >
                  <ProForm.Item name="dataSource" trigger="onValuesChange">
                      <EditableProTable<any>
                        rowKey="id"
                        toolBarRender={false}
                        columns={columns}
                        bordered
                        recordCreatorProps={{
                            newRecordType: 'dataSource',
                            position: 'top',
                            record: () => ({
                                id: Date.now(),
                            }),
                        }}
                        editable={{
                            type: 'multiple',
                            editableKeys,
                            onChange: setEditableRowKeys,
                            actionRender: (row, _, dom) => {
                                return [dom.delete];
                            },
                        }}
                      />
                  </ProForm.Item>
              </ProForm>
          </KTCardBody>
      </KTCard>
    );
};
