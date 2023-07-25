import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd'
import React, {useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {deleteLocation, ENP_URL, getLocations, postLocation, putLocation} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useAuth} from "../../../../auth";
// import {Table,} from '@devexpress/dx-react-grid-material-ui';
// import Button from '@mui/material/Button';

const LocationPage = () => {
    const {tenant} = useAuth()
    const queryClient = useQueryClient()
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [form] = Form.useForm()
    const {data: locationData, isLoading} = useQuery('locationQuery',
      () => getLocations(tenant))
    const {mutate: addLocation} = useMutation(
      (data) => postLocation(data, tenant), {
          onSuccess: () => {
              message.success('Location Added Successfully')
              queryClient.invalidateQueries('locationQuery')
          },
          onError: () => {
              message.error('Something went wrong')
          }
      })
    const {mutate: updateLocation} = useMutation(
      (data) => putLocation(data, tenant), {
          onSuccess: () => {
              message.success('Location Updated Successfully')
              queryClient.invalidateQueries('locationQuery')
          },
          onError: () => {
              message.error('Something went wrong')
          }
      })
    const {mutate: removeLocation} = useMutation((id: any) => deleteLocation(id), {
        onSuccess: () => {
            message.success('Location Deleted Successfully')
            queryClient.invalidateQueries('locationQuery')
        },
        onError: () => {
            message.error('Something went wrong')
        }
    })

    const [isModalOpen, setIsModalOpen] = useState(false)


    const onFinish = async (values: any) => {
        setSubmitLoading(true)
    }
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
    const deleteData = async (element: any) => {
        try {
            const response = await axios.delete(`${ENP_URL}/Location/${element.id}`)
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

    const columns: any = [
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
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => {
                if (a.description > b.description) {
                    return 1
                }
                if (b.description > a.description) {
                    return -1
                }
                return 0
            }
        },
        {
            title: 'Action',
            fixed: 'right',
            width: 100,
            render: (_: any, record: any) => (
              <Space size='middle'>
                  <a href='#' className='btn btn-light-primary btn-sm' onClick={
                      () => {
                          form.setFieldsValue(record)
                          showModal()
                      }
                  }>
                      Edit
                  </a>
                  <Popconfirm title={`Sure to delete ${record.name}?`} onConfirm={() => handleDelete(record)}>
                      <a href='#' className='btn btn-light-danger btn-sm'>
                          Delete
                      </a>
                  </Popconfirm>
              </Space>
            ),
        },
    ]


    return (
      <div
        style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
          <KTCardBody className='py-4 '>
              <div className='table-responsive'>
                  <div className='d-flex justify-content-between'>
                      <Space style={{marginBottom: 16}}>
                          <Input
                            placeholder='Enter Search Text'
                            // onChange={handleInputChange}
                            type='text'
                            allowClear
                            value={searchText}
                          />
                          <Button type='primary'>
                              Search
                          </Button>
                      </Space>
                      <Space style={{marginBottom: 16}}>
                          <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
                              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                              Add
                          </button>
                      </Space>
                  </div>
                  <Table columns={columns} dataSource={locationData?.data} bordered/>
                  <Modal
                    title='Location Entry'
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
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
                    ]}
                  >
                      <Form
                        labelCol={{span: 7}}
                        wrapperCol={{span: 14}}
                        layout='horizontal'
                        form={form}
                        name='control-hooks'
                        onFinish={onFinish}
                      >


                          <Form.Item name='Location' label='Name' rules={[{required: true}]}>
                              <Input/>
                          </Form.Item>
                      </Form>
                  </Modal>
              </div>
          </KTCardBody>
      </div>
    )
}

export {LocationPage}


// const getRowId = (row: any) => row?.id;
//
// const LocationPage = () => {
//     const {tenant} = useAuth()
//     const queryClient = useQueryClient()
//     const {data: locationData, isLoading} = useQuery('locationQuery',
//       () => getLocations(tenant))
//     const {mutate: addLocation} = useMutation(
//       (data) => postLocation(data, tenant), {
//           onSuccess: () => {
//               message.success('Location Added Successfully')
//               queryClient.invalidateQueries('locationQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: updateLocation} = useMutation(
//       (data) => putLocation(data, tenant), {
//           onSuccess: () => {
//               message.success('Location Updated Successfully')
//               queryClient.invalidateQueries('locationQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: removeLocation} = useMutation((id: any) => deleteLocation(id), {
//         onSuccess: () => {
//             message.success('Location Deleted Successfully')
//             queryClient.invalidateQueries('locationQuery')
//         },
//         onError: () => {
//             message.error('Something went wrong')
//         }
//     })
//     const [columns] = useState([
//         {name: 'id', title: 'ID', editable: false},
//         {name: 'name', title: 'Name'},
//         {name: 'description', title: 'Description'},
//     ]);
//     const [editingStateColumnExtensions] = useState([
//         {columnName: 'id', editingEnabled: false},
//     ]);
//
//     const commitChanges = (props: any) => {
//
//         // console.log("added", props.added[0])
//         // let changedRows;
//         if (props.added) {
//             addLocation(props.added)
//         }
//         if (props.changed) {
//             console.log("changed", props.changed)
//         }
//         if (props.deleted) {
//             removeLocation(props.deleted[0])
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
//       <Popconfirm title={`Sure to delete this location?`} onConfirm={() => props.onExecute()}>
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
//                   rows={locationData?.data ? locationData?.data : []}
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
// export {LocationPage};
