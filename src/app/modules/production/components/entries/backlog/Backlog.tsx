import React, {useState} from 'react'
import {
  Badge,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import TextArea from 'antd/lib/input/TextArea'
import {
  deleteBacklog,
  editBacklog,
  getBacklogs,
  getBacklogStatuses,
  getCompletedBacklogs,
  getCompletedBacklogsItems,
  getDowntypes,
  getEquipment,
  getPriority,
  getSources,
  getWorkOrderCategory,
  getWorkOrders,
  getWorkOrderTypes,
  makeBacklogCompleted,
  postBacklogs,
  postWorkOrder,
} from '../../../../../urls'
import {useAuth} from '../../../../auth'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import DevexpressDashboardComponent from '../../../../../pages/dashboard/DevexpressDashboardComponent'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import type {FilterValue, SorterResult} from 'antd/es/table/interface'

import type {ColumnsType, TablePaginationConfig} from 'antd/es/table'
import CompletedBacklogs from './CompletedBacklogs'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

const Backlog = () => {
  let columns: any[] = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      sorter: (a: any, b: any) => {
        if (a.equipmentId > b.equipmentId) {
          return 1
        }
        if (b.equipmentId > a.equipmentId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Reference No',
      dataIndex: 'referenceNo',
      sorter: (a: any, b: any) => {
        if (a.referenceNo > b.referenceNo) {
          return 1
        }
        if (b.referenceNo > a.referenceNo) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Work Order No',
      render: (text: any, record: any) => {
        return record?.workOrder?.referenceNo ? (
          record?.workOrder?.referenceNo
        ) : (
          <span className='badge badge-danger'>N/A</span>
        )
      },
    },
    {
      title: 'Backlog Date',
      dataIndex: 'bdate',
      sorter: (a: any, b: any) => {
        if (a.bdate > b.bdate) {
          return 1
        }
        if (b.bdate > a.bdate) {
          return -1
        }
        return 0
      },
      render: (text: any, record: any) => new Date(record?.bdate)?.toDateString(),
    },
    {
      title: 'Days',
      render: (text: any, record: any) => {
        return Math.round(parseFloat(dayjs().diff(dayjs(record?.bdate), 'day', true).toFixed(2)))
      },
    },
    {
      title: 'SMU',
      dataIndex: 'smu',
    },
    {
      title: 'Fault',
      dataIndex: 'fault',
    },
    {
      title: 'Task/Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Initiator',
      dataIndex: 'initiator',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: (a: any, b: any) => {
        if (a.source > b.source) {
          return 1
        }
        if (b.source > a.source) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'System',
      dataIndex: 'downType',
      sorter: (a: any, b: any) => {
        if (a.downType > b.downType) {
          return 1
        }
        if (b.downType > a.downType) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      // width: 170,
      width: 250,
      render: (text: any, record: any) => (
        <Space size='middle'>
          <button
            className={'btn btn-light-primary btn-sm'}
            title={'Edit'}
            onClick={() => handleEditClick({...record})}
          >
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-2' />
          </button>
          <button
            className='btn btn-light-success btn-sm'
            onClick={() => handleCompleteClick({...record})}
            title='Complete'
          >
            <KTSVG path={'/media/icons/duotune/general/gen037.svg'} className='svg-icon-2' />
          </button>
          <button
            className='btn btn-light-warning btn-sm'
            onClick={() => handleWorkOrderClick({...record})}
            title='Work Order'
            key={record?.id}
            id={record?.id}
            disabled={record?.workOrderId}
          >
            <KTSVG path={'/media/icons/duotune/coding/cod009.svg'} className='svg-icon-2' />
          </button>
        </Space>
      ),
    },
  ]
  const {data: completedBacklogsTotalItems, isLoading: completedBacklogsTotalItemsIsLoading} =
    useQuery('completedBacklogsTotalItems', () => getCompletedBacklogsItems(tenant))
  const {tenant} = useAuth()
  const [form] = Form.useForm()
  const [workOrderForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [isUpdating, setIsUpdating] = useState(false)
  const [data, setData] = useState([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: completedBacklogsTotalItems?.data,
    },
  })
  const queryClient = useQueryClient()
  const Option = Select.Option

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitWorkOrderLoading, setSubmitWorkOrderLoading] = useState(false)
  const [submitEditLoading, setSubmitEditLoading] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const {data: equipmentData, isLoading: equipmentIsLoading} = useQuery('equipments', () =>
    getEquipment(tenant)
  )

  const {data: sourceData, isLoading: sourceIsLoading} = useQuery('source', () =>
    getSources(tenant)
  )
  const {data: backlogStatus, isLoading: statusIsLoading} = useQuery('statuses', () =>
    getBacklogStatuses(tenant)
  )
  const {data: downTypeData} = useQuery('downtype', () => getDowntypes(tenant))
  console.log('source data', sourceData)
  console.log('equipment data', equipmentData)

  const {data: backlogData, isLoading: backlogIsLoading} = useQuery('backlog', () =>
    getBacklogs(tenant)
  )
  console.log('backlog data', backlogData)

  const {data: completedBacklogs, isLoading: completedBacklogsIsLoading} = useQuery(
    'completedBacklogs',
    () =>
      getCompletedBacklogs(
        tenant,
        tableParams.pagination?.current || 1,
        tableParams.pagination?.pageSize || 10
      ),
    {
      onSuccess: (data) => {
        console.log('completed backlogs', data)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: completedBacklogsTotalItems?.data,
          },
        })
      },
    }
  )
  const {mutate: addBacklog} = useMutation((data) => postBacklogs(data, tenant), {
    onSuccess: () => {
      setIsCompleting(false)
      setIsModalOpen(false)
      message.success('Backlog added successfully')
      queryClient.invalidateQueries('backlog')
      setSubmitLoading(false)
      form.resetFields()
    },
    onError: () => {
      message.error('Error adding backlog, Please try again')
      setSubmitLoading(false)
    },
  })
  const {mutate: completeBacklog} = useMutation(makeBacklogCompleted, {
    onSuccess: () => {
      message.success('Backlog completed successfully')
      queryClient.invalidateQueries('backlog')
      queryClient.invalidateQueries('completedBacklogs')
      setIsCompleting(false)
      setIsModalOpen(false)
      setSubmitLoading(false)
      form.resetFields()
    },
    onError: () => {
      message.error('Error completing backlog, Please try again')
      setSubmitLoading(false)
    },
  })

  const {mutate: removeBacklog} = useMutation(deleteBacklog, {
    onSuccess: () => {
      message.success('Backlog deleted successfully')
      queryClient.invalidateQueries('backlog')
    },
    onError: () => {
      message.error('Error deleting backlog, Please try again')
    },
  })
  const {mutate: updateBacklog} = useMutation(editBacklog, {
    onSuccess: () => {
      message.success('Backlog edited successfully')
      queryClient.invalidateQueries('backlog')
      setIsCompleting(false)
      setIsEditModalOpen(false)
      setSubmitEditLoading(false)
      editForm.resetFields()
    },
    onError: () => {
      message.error('Error editing backlog, Please try again')
      setSubmitEditLoading(false)
    },
  })
  const {data: workOrderTypeData} = useQuery('workOrderTypes', () => getWorkOrderTypes(tenant))
  const {data: workOrderCategoryData} = useQuery('workOrderCategory', () =>
    getWorkOrderCategory(tenant)
  )
  const {data: priorityData} = useQuery('priorities', () => getPriority(tenant))
  const {mutate: addWorkOrder} = useMutation((data) => postWorkOrder(data, tenant), {
    onSuccess: (workOrder) => {
      document.getElementById(workOrder?.data?.backlogId)?.setAttribute('disabled', 'true')
      message.success('WorkOrder created successfully')
      queryClient.invalidateQueries('workOrders')
      queryClient.invalidateQueries('backlog')
      workOrderForm.resetFields()
      setSubmitWorkOrderLoading(false)
      setIsWorkOrderModalOpen(false)
    },
    onError: () => {
      message.error('Error adding Work Order, Please try again')
      setSubmitWorkOrderLoading(false)
    },
  })
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    isCompleting ? completeBacklog({...values}) : addBacklog(values)
  }
  const onFinishWorkOrder = async (values: any) => {
    setSubmitWorkOrderLoading(true)
    addWorkOrder(values)
  }

  const onEditFinish = async (values: any) => {
    setSubmitEditLoading(true)
    updateBacklog(values)
  }
  const showModal = () => {
    setIsCompleting(false)
    setIsModalOpen(true)
    form.setFieldsValue({
      bdate: dayjs().subtract(1, 'day'),
      status: 'Reported',
    })
  }

  function handleCancel() {
    form.resetFields()
    setIsModalOpen(false)
    setIsCompleting(false)
  }
  function handleWorkOrderCancel() {
    workOrderForm.resetFields()
    setIsWorkOrderModalOpen(false)
  }

  function handleEditCancel() {
    editForm.resetFields()
    setIsEditModalOpen(false)
  }

  function handleCompleteClick(record: any) {
    setIsCompleting(true)
    setIsModalOpen(true)
    form.setFieldsValue({
      ...record,
      bdate: dayjs(record?.bdate),
      id: record?.id,
      referenceNo: record?.referenceNo,
      cdate: dayjs(),
    })
  }

  function handleEditClick(record: any) {
    setIsEditModalOpen(true)
    editForm.setFieldsValue({
      ...record,
      bdate: dayjs(record?.bdate),
      id: record?.id,
      referenceNo: record?.referenceNo,
      cdate: dayjs(),
    })
  }
  function handleWorkOrderClick(record: any) {
    //get action button in table to show loading state
    setIsWorkOrderModalOpen(true)

    workOrderForm.setFieldsValue({
      ...record,
      backlogId: record?.id,
      createdAt: dayjs(),
      scheduledDate: dayjs(),
      referenceNo: record?.referenceNo,
      equipmentDescription: equipmentData?.data?.find(
        (equipment: any) => equipment.equipmentId === record?.equipmentId
      )?.description,
    })
  }

  function handleDelete(record: any) {
    removeBacklog(record?.id)
  }
  const worker = {
    backlogDate: dayjs().subtract(1, 'day'),
    current: dayjs(),
  }
  const workerForWorkOrder = {
    current: dayjs(),
  }

  const handleTableChange = (pagination: TablePaginationConfig, sorter: SorterResult<any>) => {
    setTableParams({
      pagination,
      ...sorter,
    })
    setData(completedBacklogs?.data)
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  return (
    <KTCard>
      <KTCardBody>
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              label: (
                <Badge count={backlogData?.data?.length} overflowCount={10}>
                  <span className='me-4'>All Backlogs</span>
                </Badge>
              ),
              key: '1',
              children: (
                <>
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
                        className='btn btn-sm btn-primary'
                        onClick={() => showModal()}
                        title='Add New Backlog'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr075.svg'
                          className='svg-icon-2'
                        />
                        Add
                      </button>
                      <Link
                        className='btn btn-sm btn-info'
                        title={'Print Backlog'}
                        to={`/entries/backlog/print`}
                      >
                        <KTSVG
                          path='/media/icons/duotune/files/fil004.svg'
                          className='svg-icon-2'
                        />
                        Print
                      </Link>
                    </Space>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={backlogData?.data}
                    bordered
                    loading={backlogIsLoading}
                    rowKey={(record: any) => record?.id}
                    scroll={{x: 2000}}
                  />
                </>
              ),
            },
            {
              label: (
                <Badge style={{backgroundColor: '#52c41a'}} count={0}>
                  <span className='me-4'>Completed Backlog</span>
                </Badge>
              ),
              key: '2',
              children: (
                <>
                  <CompletedBacklogs />
                </>
              ),
            },
            {
              label: (
                <Badge style={{backgroundColor: '#faad14'}} count={0}>
                  <span className='me-4'>Analysis</span>
                </Badge>
              ),
              key: '3',
              children: (
                <>
                  <DevexpressDashboardComponent dashboardId={'backlogs'} />
                </>
              ),
            },
          ]}
        />
        <Modal
          title={
            isCompleting ? (
              <div className={'mb-5'}>
                <span>Complete Backlog</span>
                <span className='text-danger'> {form.getFieldValue('referenceNo')}</span>
              </div>
            ) : (
              'Add Backlog'
            )
          }
          open={isModalOpen}
          onCancel={handleCancel}
          closable={true}
          footer={[
            <Button key='back' onClick={handleCancel} htmlType={'reset'}>
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
              {isCompleting ? 'Close Backlog' : 'Submit'}
            </Button>,
          ]}
        >
          <Form
            form={form}
            name='control-hooks'
            labelCol={{span: 8}}
            wrapperCol={{span: 14}}
            title={isCompleting ? `Complete Backlog` : 'Add Backlog'}
            onFinish={onFinish}
            layout={'horizontal'}
            initialValues={worker}
          >
            <Form.Item name='id' label='ID' hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name='equipmentId'
              label='Equipment ID'
              rules={[
                {
                  required: true,
                  message: 'Please select an equipment',
                },
              ]}
            >
              <Select
                disabled={isCompleting}
                showSearch
                placeholder='Select an equipment'
                loading={equipmentIsLoading}
                onSelect={(value) => {
                  const equipment = equipmentData?.data?.find(
                    (equipment: any) => equipment.equipmentId === value
                  )
                  form.setFieldsValue({
                    equipmentDescription: equipment?.description,
                  })
                }}
              >
                {equipmentData?.data?.map((equipment: any) => (
                  <Option value={equipment.equipmentId}>{equipment.equipmentId}</Option>
                ))}
              </Select>
            </Form.Item>
            {!isCompleting && (
              <Form.Item name='equipmentDescription' label='Equip. Description'>
                <Input disabled readOnly />
              </Form.Item>
            )}

            <Form.Item name='bdate' label='Backlog Date'>
              <DatePicker defaultValue={worker.backlogDate} disabled={isCompleting} />
            </Form.Item>
            <Form.Item name='smu' label='SMU'>
              <InputNumber disabled={isCompleting} min={0} />
            </Form.Item>
            <Form.Item name='fault' label='Fault' rules={[{required: true}]}>
              <TextArea disabled={isCompleting} />
            </Form.Item>
            <Form.Item name='downType' label='System'>
              <Select disabled={isCompleting} showSearch placeholder='Select System'>
                {downTypeData?.data?.map((downType: any) => (
                  <Option value={downType?.name}>{downType.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='priority' label='Priority'>
              <Select showSearch placeholder='Select a priority' disabled={isCompleting}>
                {priorityData?.data?.map((priority: any) => (
                  <Option value={priority?.name}>{priority.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='source' label='Source'>
              <Select showSearch placeholder='Select a source' disabled={isCompleting}>
                {sourceData?.data?.map((source: any) => (
                  <Option value={source?.name}>{source.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='initiator' label='Initiator'>
              <Input disabled={isCompleting} />
            </Form.Item>

            <Form.Item name='assignedTo' label='Assigned To'>
              <Input disabled={isCompleting} />
            </Form.Item>
            <Form.Item name='comment' label='Task/Comment'>
              <TextArea disabled={isCompleting} />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              {...(isCompleting && {
                rules: [
                  {
                    validator: async (_, status) => {
                      if (status !== 'Completed') {
                        return Promise.reject(new Error('Backlog Must Be Completed!'))
                      }
                    },
                  },
                ],
              })}
            >
              <Select
                showSearch
                placeholder='Select a Status'
                defaultValue={!isCompleting && 'Reported'}
              >
                {backlogStatus?.data?.map((status: any) => (
                  <Option value={status?.name}>{status.name}</Option>
                ))}
              </Select>
            </Form.Item>

            {isCompleting && (
              <>
                <Form.Item name='cdate' label='Completion Date'>
                  <DatePicker defaultValue={worker.current} />
                </Form.Item>
                <Form.Item
                  name='remarks'
                  label='Remarks'
                  rules={[{required: true, message: 'Please Enter Work Done and Comments!'}]}
                >
                  <TextArea placeholder='Work Done and Comments' />
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>
        {/*  Work Order Modal */}
        <Modal
          title={
            <div className={'mb-5'}>
              <span>Work Order For Backlog: </span>
              <span className='text-danger'> {workOrderForm.getFieldValue('referenceNo')}</span>
            </div>
          }
          open={isWorkOrderModalOpen}
          onCancel={handleWorkOrderCancel}
          closable={true}
          footer={[
            <Button key='back' onClick={handleWorkOrderCancel} htmlType={'reset'}>
              Cancel
            </Button>,
            <Button
              key='submit'
              htmlType='submit'
              type='primary'
              loading={submitWorkOrderLoading}
              onClick={() => {
                workOrderForm.submit()
              }}
            >
              Submit W/O
            </Button>,
          ]}
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={workOrderForm}
            name='control-hooks'
            title='Add'
            initialValues={workerForWorkOrder}
            onFinish={onFinishWorkOrder}
          >
            <Form.Item label='BacklogId' name='backlogId' hidden={true} required={true}>
              <InputNumber disabled={true} />
            </Form.Item>
            <Form.Item name='createdAt' label='Date'>
              <DatePicker defaultValue={dayjs()} disabled />
            </Form.Item>
            <Form.Item
              name='equipmentId'
              label='Equipment ID'
              rules={[
                {
                  required: true,
                  message: 'Please select an equipment',
                },
              ]}
            >
              <Select
                disabled={true}
                showSearch
                placeholder='Select an equipment'
                loading={equipmentIsLoading}
                onSelect={(value) => {
                  const equipment = equipmentData?.data?.find(
                    (equipment: any) => equipment.equipmentId === value
                  )
                  form.setFieldsValue({
                    equipmentDescription: equipment?.description,
                  })
                }}
              >
                {equipmentData?.data?.map((equipment: any) => (
                  <Select.Option value={equipment.equipmentId}>
                    {equipment.equipmentId}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='equipmentDescription' label='Equip. Description'>
              <Input disabled readOnly />
            </Form.Item>
            <Form.Item name='workOrderType' label='WorkOrder Type'>
              <Select showSearch placeholder='Select a WorkOrder Type' disabled={isUpdating}>
                {workOrderTypeData?.data?.map((workOrderType: any) => (
                  <Select.Option value={workOrderType?.name}>{workOrderType?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='workOrderCategory' label='WorkOrder Category'>
              <Select showSearch placeholder='Select a WorkOrder Category' disabled={isUpdating}>
                {workOrderCategoryData?.data?.map((workOrderCategory: any) => (
                  <Select.Option value={workOrderCategory?.name}>
                    {workOrderCategory.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='fault'
              label='Fault'
              rules={[
                {
                  required: true,
                  message: 'Please enter a fault',
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name='priority' label='Priority'>
              <Select showSearch placeholder='Select a Priority' disabled={isUpdating}>
                {priorityData?.data?.map((priority: any) => (
                  <Select.Option value={priority?.name}>{priority.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='requester' label='Requester'>
              <Input />
            </Form.Item>
            <Form.Item name='receiver' label='Receiver'>
              <Input />
            </Form.Item>
            <Form.Item
              name='workInstruction'
              label='Work Instruction'
              rules={[
                {
                  required: true,
                  message: 'Please enter an Instruction',
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name='permitRequired' label='Permit/HSE Req'>
              <Input />
            </Form.Item>
            <Form.Item
              name='scheduledDate'
              label='Scheduled Date'
              rules={[
                {
                  required: true,
                  message: 'Please select a date',
                },
                {
                  validator: async (_, date) => {
                    if (dayjs(date).isBefore(dayjs(), 'day')) {
                      return Promise.reject(new Error('Date cannot be in the past!'))
                    }
                  },
                },
              ]}
            >
              <DatePicker defaultValue={dayjs()} />
            </Form.Item>
            <Form.Item label='Tenant' name='tenantId' hidden required={true}>
              <Input
                placeholder='Enter Name'
                type='text'
                allowClear
                value={tenant}
                disabled={true}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={'Edit Backlog'}
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          closable={true}
          footer={[
            <Button key='back' onClick={handleEditCancel} htmlType={'reset'}>
              Cancel
            </Button>,
            <Button
              key='submit'
              htmlType='submit'
              type='primary'
              loading={submitEditLoading}
              onClick={() => {
                editForm.submit()
              }}
            >
              Edit
            </Button>,
          ]}
        >
          <Form
            form={editForm}
            name='control-hooks'
            labelCol={{span: 8}}
            wrapperCol={{span: 14}}
            title={'Edit Backlog'}
            onFinish={onEditFinish}
            layout={'horizontal'}
            initialValues={worker}
          >
            <Form.Item name='id' label='ID' hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name='equipmentId'
              label='Equipment ID'
              rules={[
                {
                  required: true,
                  message: 'Please select an equipment',
                },
              ]}
            >
              <Select
                disabled={true}
                showSearch
                placeholder='Select an equipment'
                loading={equipmentIsLoading}
                onSelect={(value) => {
                  const equipment = equipmentData?.data?.find(
                    (equipment: any) => equipment.equipmentId === value
                  )
                  form.setFieldsValue({
                    equipmentDescription: equipment?.description,
                  })
                }}
              >
                {equipmentData?.data?.map((equipment: any) => (
                  <Option value={equipment.equipmentId}>{equipment.equipmentId}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='bdate' label='Backlog Date'>
              <DatePicker defaultValue={worker.backlogDate} disabled={true} />
            </Form.Item>
            <Form.Item name='smu' label='SMU'>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name='fault' label='Fault' rules={[{required: true}]}>
              <TextArea />
            </Form.Item>
            <Form.Item name='downType' label='System'>
              <Select disabled={true} showSearch placeholder='Select System'>
                {downTypeData?.data?.map((downType: any) => (
                  <Option value={downType?.name}>{downType.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='priority' label='Priority'>
              <Select showSearch placeholder='Select a priority'>
                {priorityData?.data?.map((priority: any) => (
                  <Option value={priority?.name}>{priority.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='source' label='Source'>
              <Select showSearch placeholder='Select a source'>
                {sourceData?.data?.map((source: any) => (
                  <Option value={source?.name}>{source.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='initiator' label='Initiator'>
              <Input disabled />
            </Form.Item>

            <Form.Item name='assignedTo' label='Assigned To'>
              <Input />
            </Form.Item>
            <Form.Item name='comment' label='Task/Comment'>
              <TextArea />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              rules={[
                {
                  required: true,
                  message: 'Please select a status',
                },
                {
                  validator: async (_, status) => {
                    if (status === 'Completed') {
                      return Promise.reject(new Error('Backlog Cannot Be Completed Here!'))
                    }
                  },
                },
              ]}
            >
              <Select showSearch placeholder='Select a Status'>
                {backlogStatus?.data?.map((status: any) => (
                  <Option value={status?.name}>{status.name}</Option>
                ))}
              </Select>
            </Form.Item>

            {isCompleting && (
              <>
                <Form.Item name='cdate' label='Completion Date'>
                  <DatePicker defaultValue={worker.current} />
                </Form.Item>
                <Form.Item
                  name='remarks'
                  label='Remarks'
                  rules={[{required: true, message: 'Please Enter Work Done and Comments!'}]}
                >
                  <TextArea placeholder='Work Done and Comments' />
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default Backlog
