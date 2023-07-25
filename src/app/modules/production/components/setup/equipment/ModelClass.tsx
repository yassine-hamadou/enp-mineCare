import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteModelClass, getModelClasses, postModelClass, putModelClass} from "../../../../../urls";
import {useAuth} from "../../../../auth";


const ModelClass = () => {
    const {tenant} = useAuth()
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const {data: modelClassData, isLoading: modelClassDataLoading} = useQuery('modelClassQuery',
      () => getModelClasses(tenant))
    console.log("modelClassData", modelClassData)
    const {mutate: addModelClass} = useMutation(
      (data) => postModelClass(data, tenant), {
          onSuccess: () => {
              message.success('ModelClass Added Successfully')
              queryClient.invalidateQueries('modelClassQuery')
              form.resetFields()
              setSubmitLoading(false)
              setIsModalOpen(false)
              setIsUpdating(false)
          },
          onError: () => {
              message.error('Something went wrong')
              setSubmitLoading(false)
          }
      })
    const {mutate: updateModelClass} = useMutation(
      (data) => putModelClass(data, tenant), {
          onSuccess: () => {
              message.success('ModelClass Updated Successfully')
              queryClient.invalidateQueries('modelClassQuery')
              form.resetFields()
              setSubmitLoading(false)
              setIsModalOpen(false)
              setIsUpdating(false)
          },
          onError: () => {
              message.error('Something went wrong')
              setSubmitLoading(false)
          }
      })
    const {mutate: removeModelClass} = useMutation((id: any) => deleteModelClass(id), {
        onSuccess: () => {
            message.success('ModelClass Deleted Successfully')
            queryClient.invalidateQueries('modelClassQuery')
            setSubmitLoading(false)
        },
        onError: () => {
            message.error('Something went wrong')
            setSubmitLoading(false)
        }
    })

    function handleDelete(record: any) {
        if (record?.models?.length > 0) {
            message.error('Model Class is in use')
            return
        }
        removeModelClass(record?.modelClassId)
        setIsUpdating(false)
    }

    const onFinish = async (values: any) => {
        setSubmitLoading(true)
        isUpdating ? updateModelClass(values) : addModelClass(values)
        setIsUpdating(false)
    }

    function handleCancel() {
        form.resetFields()
        setIsModalOpen(false)
        setIsUpdating(false)
        setSubmitLoading(false)
    }


    const columns: any = [
        {
            title: 'ModelClass ID',
            dataIndex: 'modelClassId',
            sorter: (a: any, b: any) => {
                if (a.modelClassId > b.modelClassId) {
                    return 1
                }
                if (b.modelClassId > a.modelClassId) {
                    return -1
                }
                return 0
            },
            defaultSortOrder: 'descend'
        },
        {
            title: 'Code',
            dataIndex: 'code',
            sorter: (a: any, b: any) => {
                if (a.code > b.code) {
                    return 1
                }
                if (b.code > a.code) {
                    return -1
                }
                return 0
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Action',
            render: (_: any) => (
              <Space size='middle'>
                  <button className={'btn btn-light-primary'} onClick={() => {
                      setIsUpdating(true)
                      setIsModalOpen(true)
                      form.setFieldsValue(_)
                  }
                  }>
                      Edit
                  </button>
                  <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(_)}>
                      <button className={'btn btn-light-danger'}>
                          Delete
                      </button>
                  </Popconfirm>
              </Space>
            )
        }
    ]

    return (
      <KTCard>
          <KTCardBody>
              <div className='d-flex justify-content-between'>
                  <Space style={{marginBottom: 16}}>
                      <Input
                        placeholder='Enter Search Text'
                        type='text'
                        allowClear
                      />
                  </Space>
                  <Space style={{marginBottom: 16}}>
                      <button type='button' className='btn btn-primary me-3' onClick={
                          () => {
                              form.resetFields()
                              setIsModalOpen(true)
                              setIsUpdating(false)
                          }
                      }>
                          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                          Add
                      </button>
                  </Space>
              </div>
              <Table
                columns={columns}
                bordered
                dataSource={modelClassData?.data}
                loading={modelClassDataLoading}
              />
              <Modal
                title={isUpdating ? 'Edit' : 'Add'}
                open={isModalOpen}
                onCancel={handleCancel}
                closable={true}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                      key='submit'
                      htmlType='submit'
                      type='primary'
                      loading={submitLoading}
                      onClick={() => {
                          form.submit()
                      }}
                    >
                        Submit
                    </Button>,
                ]}
              >
                  <Form
                    form={form}
                    name='control-hooks'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 14}}
                    title={isUpdating ? 'Update' : 'Add'}
                    onFinish={onFinish}
                    layout={'horizontal'}
                  >
                      {isUpdating &&
                          <Form.Item
                              name='modelClassId'
                              label='Model Class Id'
                            // rules={[{required: true}]}
                              hidden={true}
                          >
                              <Input placeholder='Enter model class Id'/>
                          </Form.Item>}
                      <Form.Item
                        name='code'
                        label='Code'
                        rules={[{required: true}]}
                      >
                          <Input placeholder='Enter Code'/>
                      </Form.Item>
                      <Form.Item
                        name='name'
                        label='Name'
                        rules={[{required: true}]}
                      >
                          <Input placeholder='Enter Name'/>
                      </Form.Item>
                  </Form>
              </Modal>
          </KTCardBody>
      </KTCard>
    )
}

export {ModelClass}


// import React, {useState} from 'react';
// import Paper from '@mui/material/Paper';
// import {
//     Grid,
//     PagingPanel,
//     SearchPanel,
//     Table,
//     TableEditColumn,
//     TableEditRow,
//     TableHeaderRow,
//     Toolbar,
// } from '@devexpress/dx-react-grid-material-ui';
// import {useAuth} from "../../../../auth";
// import {useMutation, useQuery, useQueryClient} from "react-query";
// import {deleteModelClass, getModelClasses, postModelClass, putModelClass} from "../../../../../urls";
// import {
//     EditingState,
//     IntegratedFiltering,
//     IntegratedPaging,
//     IntegratedSorting,
//     PagingState,
//     SearchState,
//     SortingState
// } from '@devexpress/dx-react-grid';
// import {ErrorBoundary} from "@ant-design/pro-components";
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import {message, Popconfirm} from "antd";
//
// const getRowId = (row: any) => row?.modelClassId;
//
// const ModelClass = () => {
//     const {tenant} = useAuth()
//     const queryClient = useQueryClient()
//     const {data: modelClassData, isLoading} = useQuery('modelClassQuery',
//       () => getModelClasses(tenant))
//     console.log("modelClassData", modelClassData)
//     const {mutate: addModelClass} = useMutation(
//       (data) => postModelClass(data, tenant), {
//           onSuccess: () => {
//               message.success('ModelClass Added Successfully')
//               queryClient.invalidateQueries('modelClassQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: updateModelClass} = useMutation(
//       (data) => putModelClass(data, tenant), {
//           onSuccess: () => {
//               message.success('ModelClass Updated Successfully')
//               queryClient.invalidateQueries('modelClassQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: removeModelClass} = useMutation((id: any) => deleteModelClass(id), {
//         onSuccess: () => {
//             message.success('ModelClass Deleted Successfully')
//             queryClient.invalidateQueries('modelClassQuery')
//         },
//         onError: () => {
//             message.error('Something went wrong')
//         }
//     })
//     const [columns] = useState([
//         {name: 'modelClassId', title: 'Model Class ID'},
//         {name: 'code', title: 'Code'},
//         {name: 'name', title: 'Name'},
//     ]);
//     const [editingStateColumnExtensions] = useState([
//         {columnName: 'modelClassId', editingEnabled: false},
//     ]);
//
//     const commitChanges = (props: any) => {
//         // console.log("added", props.added[0])
//         // let changedRows;
//         if (props.added) {
//             addModelClass(props.added)
//         }
//         if (props.changed) {
//             console.log("changed", props.changed)
//         }
//         if (props.deleted) {
//             removeModelClass(props.deleted[0])
//         }
//     };
//
//     const AddButton = (props: any) => (
//       <div style={{textAlign: 'center'}}>
//           <Button
//             color="primary"
//             onClick={props.onExecute}
//             title="Create new row"
//           >
//               New
//           </Button>
//       </div>
//     );
//
//     const EditButton = (props: any) => (
//       <IconButton onClick={props.onExecute} title="Edit row" size="large">
//           <EditIcon/>
//       </IconButton>
//     );
//
//     const DeleteButton = (props: any) => (
//       <Popconfirm title={`Sure to delete this modelClass?`} onConfirm={() => props.onExecute()}>
//           <IconButton
//             title="Delete row"
//             size="large"
//           >
//               <DeleteIcon/>
//           </IconButton>
//       </Popconfirm>
//     );
//
//     const CommitButton = (props: any) => (
//       <IconButton onClick={props.onExecute} title="Save changes" size="large">
//           <SaveIcon/>
//       </IconButton>
//     );
//
//     const CancelButton = (props: any) => (
//       <IconButton color="secondary" onClick={props.onExecute} title="Cancel changes" size="large">
//           <CancelIcon/>
//       </IconButton>
//     );
//
//     const commandComponents: any = {
//         add: AddButton,
//         edit: EditButton,
//         delete: DeleteButton,
//         commit: CommitButton,
//         cancel: CancelButton,
//     };
//
//     const Command = (props: any) => {
//         const {id} = props;
//         // @ts-ignore
//         const CommandButton = commandComponents[id];
//         return (
//           <CommandButton
//             onExecute={props.onExecute}
//           />
//         );
//     };
//     return (
//       isLoading ?
//         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//             <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//             </div>
//         </div> :
//         <ErrorBoundary>
//             <Paper
//               style={
//                   {boxShadow: '2px 2px 15px rgba(0,0,0,0.08)'}
//               }
//             >
//                 <Grid
//                   rows={modelClassData?.data ? modelClassData?.data : []}
//                   columns={columns}
//                   getRowId={getRowId}
//                 >
//                     <SortingState/>
//                     <PagingState/>
//                     <EditingState
//                       columnExtensions={editingStateColumnExtensions}
//                       onCommitChanges={commitChanges}
//                     />
//                     <SearchState defaultValue=""/>
//                     <IntegratedFiltering/>
//                     <IntegratedSorting/>
//                     <IntegratedPaging/>
//                     {/*<IntegratedSummary/>*/}
//                     <Table/>
//                     <TableHeaderRow showSortingControls/>
//                     <TableEditRow/>
//                     <TableEditColumn
//                       showAddCommand
//                       showEditCommand
//                       showDeleteCommand
//                       commandComponent={Command}
//                     />
//                     <Toolbar/>
//                     <SearchPanel/>
//                     <PagingPanel
//                       pageSizes={[5, 10, 50]}
//                     />
//                 </Grid>
//             </Paper>
//         </ErrorBoundary>
//     );
// };
// export {ModelClass};
