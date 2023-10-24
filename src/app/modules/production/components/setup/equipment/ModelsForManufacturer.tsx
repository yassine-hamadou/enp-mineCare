import {Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../auth'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {
  deleteModel,
  getManufacturers,
  getModelClasses,
  getModels,
  postModel,
  putModel,
} from '../../../../../urls'

const ModelsForManufacturer = () => {
  const {tenant} = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {data: modelData, isLoading: isModelDataLoading} = useQuery('models', () =>
    getModels(tenant)
  )

  const {data: modelClassData, isLoading: isModelClassLoading} = useQuery('modelClassQuery', () =>
    getModelClasses(tenant)
  )

  const {data: manufacturers, isLoading: isManuLoading} = useQuery('manufacturersQuery', () =>
    getManufacturers(tenant)
  )

  const {mutate: addModel} = useMutation((data: any) => postModel(data, tenant), {
    onSuccess: () => {
      message.success('Model Added Successfully')
      queryClient.invalidateQueries('models')
      form.resetFields()
      setSubmitLoading(false)
      setIsModalOpen(false)
      setIsUpdating(false)
    },
    onError: () => {
      message.error('Something went wrong')
      setSubmitLoading(false)
    },
  })
  const {mutate: updateModel} = useMutation((data) => putModel(data, tenant), {
    onSuccess: () => {
      message.success('Model Updated Successfully')
      queryClient.invalidateQueries('modelQuery')
      form.resetFields()
      setSubmitLoading(false)
      setIsModalOpen(false)
      setIsUpdating(false)
    },
    onError: () => {
      message.error('Something went wrong')
      setSubmitLoading(false)
    },
  })
  const {mutate: removeModel} = useMutation((id: any) => deleteModel(id), {
    onSuccess: () => {
      message.success('Model Deleted Successfully')
      queryClient.invalidateQueries('modelQuery')
    },
    onError: () => {
      message.error('Something went wrong')
    },
  })
  const dataFromManufacturer: any = useLocation().state
  // dataFromManufacturer is an array of models
  // const models = dataFromManufacturer[0].models

  const columns: any = [
    {
      title: 'Model ID',
      dataIndex: 'modelId',
      visible: false,
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => {
        if (a.modelId > b.modelId) {
          return 1
        }
        if (b.modelId > a.modelId) {
          return -1
        }
        return 0
      },
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
      },
    },
    {
      title: 'Equipment Type',
      dataIndex: 'modelClass',
      sorter: (a: any, b: any) => {
        if (a.modelClass?.name > b.modelClass?.name) {
          return 1
        }
        if (b.modelClass?.name > a.modelClass?.name) {
          return -1
        }
        return 0
      },
      render: (modelClass: any) => {
        console.log('modelClass', modelClass)
        return <span>{modelClass?.name}</span>
      },
    },
    {
      title: 'Action',
      render: (_: any) => (
        <Space size='middle'>
          <button
            className={'btn btn-light-primary'}
            onClick={() => {
              setIsUpdating(true)
              setIsModalOpen(true)
              console.log('model', _)
              form.setFieldsValue(_)
            }}
          >
            Edit
          </button>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(_)}>
            <button className={'btn btn-light-danger'}>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  function handleDelete(record: any) {
    removeModel(record?.modelId)
    setIsUpdating(false)
  }

  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    isUpdating
      ? updateModel(values)
      : addModel({...values, manufacturerId: dataFromManufacturer[0].manufacturerId})
    setIsUpdating(false)
  }
  console.log('dataFromManufacturer', dataFromManufacturer)

  function handleCancel() {
    form.resetFields()
    setIsModalOpen(false)
    setIsUpdating(false)
  }

  return (
    <KTCard>
      <KTCardBody>
        <div className='row mb-0'>
          <div className='mb-3'>
            <h3 className='mb-0'>
              <span className='text-danger'> {dataFromManufacturer[0].name}</span>
            </h3>
          </div>
          <div>
            <button
              className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
              onClick={() => {
                navigate(-1)
              }}
            >
              <i className='la la-arrow-left' />
              Back
            </button>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              // onChange={handleInputChange}
              type='text'
              allowClear
            />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button
              type='button'
              className='btn btn-primary me-3'
              onClick={() => {
                form.resetFields()
                setIsModalOpen(true)
                setIsUpdating(false)
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns?.filter((column: any) => column.visible !== false)}
          bordered
          loading={isModelDataLoading}
          dataSource={modelData?.data?.filter(
            (model: any) => model.manufacturerId === dataFromManufacturer[0].manufacturerId
          )}
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
            {isUpdating && (
              <Form.Item
                name='modelId'
                label='model Id'
                // rules={[{required: true}]}
                hidden={true}
              >
                <Input placeholder='Enter model Id' />
              </Form.Item>
            )}
            <Form.Item name='code' label='Code' rules={[{required: true}]}>
              <Input placeholder='Enter Code' />
            </Form.Item>
            <Form.Item name='name' label='Name' rules={[{required: true}]}>
              <Input placeholder='Enter Name' />
            </Form.Item>
            <Form.Item name='modelClassId' label='Equipment Type' rules={[{required: true}]}>
              <Select placeholder='Select Equipment Type' allowClear loading={isModelClassLoading}>
                {modelClassData?.data?.map((modelClass: any) => (
                  <Select.Option key={modelClass.modelClassId} value={modelClass.modelClassId}>
                    {modelClass.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='manufacturerId'
              label='Manufacturer'
              // rules={[{required: true}]}
              hidden={!isUpdating}
            >
              <Select placeholder='Change Manufacturer' allowClear loading={isManuLoading}>
                {manufacturers?.data?.map((manufacturer: any) => (
                  <Select.Option
                    key={manufacturer.manufacturerId}
                    value={manufacturer.manufacturerId}
                  >
                    {manufacturer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default ModelsForManufacturer

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
// import {deleteModel, getModelClasses, getModels, postModel, putModel} from "../../../../../urls";
// import {
//     DataTypeProvider,
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
// import {useLocation} from "react-router-dom";
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Input from '@mui/material/Input';
//
//
// const getRowId = (row: any) => row?.modelId;
//
// const ModelsForManufacturer = () => {
//     const {tenant} = useAuth()
//     const queryClient = useQueryClient()
//     const dataFromManufacturer: any = useLocation().state
//     console.log("dataFromManufacturer", dataFromManufacturer)
//     const models = dataFromManufacturer[0].models
//     console.log("models", models)
//     const {data: modelData, isLoading} = useQuery('modelQuery',
//       () => getModels(tenant))
//
//     const {data: modelClassData, isLoading: isModelClassLoading} = useQuery('modelClassQuery',
//       () => getModelClasses(tenant))
//
//     console.log("modelData", modelData)
//     const {mutate: addModel} = useMutation(
//       (data: any) => postModel(data?.map(
//         (model: any) => {
//             return {
//                 ...model,
//                 manufacturerId: dataFromManufacturer[0].manufacturerId,
//             }
//         }
//       ), tenant), {
//           onSuccess: () => {
//               message.success('Model Added Successfully')
//               queryClient.invalidateQueries('modelQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: updateModel} = useMutation(
//       (data) => putModel(data, tenant), {
//           onSuccess: () => {
//               message.success('Model Updated Successfully')
//               queryClient.invalidateQueries('modelQuery')
//           },
//           onError: () => {
//               message.error('Something went wrong')
//           }
//       })
//     const {mutate: removeModel} = useMutation((id: any) => deleteModel(id), {
//         onSuccess: () => {
//             message.success('Model Deleted Successfully')
//             queryClient.invalidateQueries('modelQuery')
//         },
//         onError: () => {
//             message.error('Something went wrong')
//         }
//     })
//     const [columns] = useState([
//         {name: 'modelId', title: 'Model ID', editable: false, isUnique: true, isIdentifier: true},
//         {name: 'code', title: 'Code'},
//         {name: 'name', title: 'Name'},
//         {name: 'modelClass', title: 'Model Class'},
//     ]);
//     const [editingStateColumnExtensions] = useState([
//         {columnName: 'modelId', editingEnabled: false, isUnique: true, isIdentifier: true}
//     ]);
//
//     const commitChanges = (props: any) => {
//
//         console.log("added", props)
//         // let changedRows;
//         if (props.added) {
//             addModel(props.added)
//         }
//         if (props.changed) {
//             console.log("changed", props.changed)
//         }
//         if (props.deleted) {
//             removeModel(props.deleted[0])
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
//       <Popconfirm title={`Sure to delete this model?`} onConfirm={() => props.onExecute()}>
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
//
//
//     const [modelClassColumns] = useState(['modelClass']);
//     const ModelClassFormatter = ({row: {modelClass}}: any) => {
//         return (
//           <span>
//                 {modelClass?.name}
//             </span>
//         );
//     }
//
//     const ModelClassEditor = ({value, onValueChange}: any) => (
//       <Select
//         input={<Input/>}
//         value={value ? value.modelClassId : ''}
//         onChange={(event: any) => {
//             onValueChange({
//                 modelClassId: event.target.value,
//             })
//         }}
//         style={{width: '100%'}}
//         defaultValue={''}
//       >
//           {modelClassData?.data?.map((modelClass: any) => (
//             <MenuItem key={modelClass.modelClassId} value={modelClass.modelClassId}>
//                 {modelClass.name}
//             </MenuItem>
//           ))}
//       </Select>
//     );
//     const ModelClassNameProvider = (props: any) => (
//       <DataTypeProvider
//         formatterComponent={ModelClassFormatter}
//         editorComponent={ModelClassEditor}
//         {...props}
//       />
//     );
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
//                   rows={modelData?.data ? modelData?.data?.filter(
//                     (model: any) => model.manufacturerId === dataFromManufacturer[0].manufacturerId
//                   ) : []}
//                   columns={columns}
//                   getRowId={getRowId}
//                 >
//                     <ModelClassNameProvider
//                       for={modelClassColumns}
//                     />
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
//                     <Table
//                     />
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
// export {ModelsForManufacturer};
