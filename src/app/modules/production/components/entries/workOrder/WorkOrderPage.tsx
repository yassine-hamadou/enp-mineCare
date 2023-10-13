import {useMutation, useQuery, useQueryClient} from 'react-query'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {
  deleteWorkOrder,
  editWorkOrder,
  getEquipment,
  getPriority,
  getWorkOrderCategory,
  getWorkOrders,
  getWorkOrderTypes,
  patchWorkOrder,
  postWorkOrder,
} from '../../../../../urls'
import {useAuth} from '../../../../auth'
import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import TextArea from 'antd/lib/input/TextArea'
import {ProFormMoney} from '@ant-design/pro-components'
import {Link} from 'react-router-dom'

const WorkOrderPage = () => {
  const {tenant} = useAuth()
  const queryClient: any = useQueryClient()
  const {data: workOrders, isLoading} = useQuery('workOrders', () => getWorkOrders(tenant))
  const {data: equipmentData, isLoading: equipmentIsLoading} = useQuery('equipments', () =>
    getEquipment(tenant)
  )
  const {data: workOrderTypeData} = useQuery('workOrderTypes', () => getWorkOrderTypes(tenant))
  const {data: workOrderCategoryData} = useQuery('workOrderCategory', () =>
    getWorkOrderCategory(tenant)
  )
  const {data: priorityData} = useQuery('priorities', () => getPriority(tenant))
  const {mutate: addWorkOrder} = useMutation((data) => postWorkOrder(data, tenant), {
    onSuccess: () => {
      message.success('WorkOrder added successfully')
      queryClient.invalidateQueries('workOrders')
      form.resetFields()
      setIsModalOpen(false)
    },
    onError: () => {
      message.error('Error adding Work Order, Please try again')
    },
  })
  const {mutate: updateWorkOrder} = useMutation('updateWorkOrder', (data) => patchWorkOrder(data), {
    onSuccess: () => {
      message.success('WorkOrder Completed successfully')
      queryClient.invalidateQueries('workOrders')
      form.resetFields()
      setIsModalOpen(false)
      setIsUpdating(false)
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Error updating Work Order, Please try again')
      setSubmitLoading(false)
    },
  })
  const {mutate: editWorkOrderRequest} = useMutation(
    'editWorkOrder',
    (data) => editWorkOrder(data),
    {
      onSuccess: () => {
        message.success('WorkOrder updated successfully')
        queryClient.invalidateQueries('workOrders')
        editForm.resetFields()
        setIsEditModalOpen(false)
        setEditSubmitLoading(false)
        setIsEditing(false)
      },
      onError: () => {
        message.error('Error updating Work Order, Please try again')
        setEditSubmitLoading(false)
      },
    }
  )
  const {mutate: removeWorkOrder} = useMutation(deleteWorkOrder, {
    onSuccess: () => {
      message.success('WorkOrder deleted successfully')
      queryClient.invalidateQueries('workOrders')
    },
    onError: () => {
      message.error('Error deleting Work Order, Please try again')
    },
  })
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: 'Reference No',
      dataIndex: 'referenceNo',
      width: 200,
    },
    {
      title: 'Corresponding Backlog No',
      render: (_: any, record: any) => {
        return record?.backlog?.referenceNo || <span className='badge badge-danger'>N/A</span>
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: 200,

      render: (date: any) => {
        return new Date(date).toDateString()
      },
    },
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      width: 200,
    },
    {
      title: 'Equip. Description',
      dataIndex: 'equipmentDescription',
      width: 200,
    },
    {
      title: 'WorkOrder Type',
      dataIndex: 'workOrderType',
      width: 200,
    },
    {
      title: 'WorkOrder Category',
      dataIndex: 'workOrderCategory',
      width: 200,
    },
    {
      title: 'Fault',
      dataIndex: 'fault',
      width: 200,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: 200,
    },
    {
      title: 'Requester',
      dataIndex: 'requester',
      width: 200,
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      width: 200,
    },
    {
      title: 'Work Instruction',
      dataIndex: 'workInstruction',
      width: 200,
    },
    {
      title: 'Permit/HSE Req',
      dataIndex: 'permitRequired',
      width: 200,
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      width: 200,
      render: (date: any) => {
        return new Date(date).toDateString()
      },
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button
            className={'btn btn-sm btn-light-primary'}
            onClick={() => {
              setIsEditModalOpen(true)
              editForm.setFieldsValue({
                ...record,
                createdAt: dayjs(record.createdAt),
                scheduledDate: dayjs(record.scheduledDate),
                startDate: dayjs(),
                referenceNo: record?.referenceNo,
              })
            }}
            title={'Edit Work Order'}
          >
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-2' />
          </button>
          <button
            className={'btn btn-sm btn-light-success'}
            onClick={() => {
              setIsModalOpen(true)
              form.setFieldsValue({
                ...record,
                createdAt: dayjs(record.createdAt),
                scheduledDate: dayjs(record.scheduledDate),
                startDate: dayjs(),
                referenceNo: record?.referenceNo,
                completionDate: dayjs(),
              })
              setIsUpdating(true)
            }}
            title={'Complete Work Order'}
          >
            <KTSVG path={'/media/icons/duotune/general/gen037.svg'} className='svg-icon-2' />
          </button>

          <Link
            className={'btn btn-sm btn-light-info'}
            title={'Print Work Order'}
            to={`/entries/work-order/print/${record.id}`}
            state={record}
          >
            <KTSVG path='/media/icons/duotune/files/fil004.svg' className='svg-icon-2' />
          </Link>
        </Space>
      ),
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [editSubmitLoading, setEditSubmitLoading] = useState(false)

  function handleCancel() {
    setIsModalOpen(false)
    form.resetFields()
    setIsUpdating(false)
  }

  function handleEditCancel() {
    setIsEditModalOpen(false)
    editForm.resetFields()
    setEditSubmitLoading(false)
  }

  function handleModalSubmit() {
    form.submit()
  }

  function handleEditModalSubmit() {
    editForm.submit()
  }

  function onFinish(values: any) {
    setSubmitLoading(true)
    isUpdating ? updateWorkOrder(values) : addWorkOrder(values)
  }
  function onEditFinish(values: any) {
    setEditSubmitLoading(true)
    console.log('values edit', values)
    editWorkOrderRequest(values)
  }

  function openAdd() {
    setIsUpdating(false)
    setIsModalOpen(true)
  }

  /////////////////////////////////////////////////////
  /////////////////////Search//////////////////////////
  /////////////////////////////////////////////////////
  const [gridData, setGridData] = useState([])
  const [beforeSearch, setBeforeSearch] = useState([])
  useEffect(() => {
    const data = workOrders?.data || []
    setGridData(data)
    setBeforeSearch(data)
  }, [workOrders?.data])

  const globalSearch = (searchValue: string) => {
    //searchValue is the value of the search input
    const searchResult = beforeSearch?.filter((item: any) => {
      return Object.values(item).join('').toLowerCase().includes(searchValue?.toLowerCase())
    }) //search the grid data
    setGridData(searchResult) //set the grid data to the search result
  }
  const handleInputChange = (e: any) => {
    globalSearch(e.target.value)
    if (e.target.value === '') {
      setGridData(beforeSearch)
    }
  }
  /////////////////////////////////////////////////////
  /////////////////////Search//////////////////////////
  /////////////////////////////////////////////////////
  const worker = {
    current: dayjs(),
  }
  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              type='text'
              allowClear
              onChange={handleInputChange}
            />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={openAdd}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={gridData}
          loading={isLoading}
          scroll={{x: 1900}}
        />
        <Modal
          title={
            isUpdating ? (
              <div className={'mb-5'}>
                <span> Complete Work Order</span>
                <span className='text-danger'> {form.getFieldValue('referenceNo')}</span>
              </div>
            ) : (
              'Add Work Order'
            )
          }
          open={isModalOpen}
          onCancel={handleCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitLoading} onClick={handleModalSubmit}>
                {isUpdating ? 'Complete' : 'Save'}
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={form}
            name='control-hooks'
            title='Add'
            onFinish={onFinish}
          >
            {isUpdating && (
              <Form.Item label='Code' name='id' hidden={true} required={true}>
                <InputNumber disabled={true} />
              </Form.Item>
            )}
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
                disabled={isUpdating}
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
            {!isUpdating && (
              <Form.Item name='equipmentDescription' label='Equip. Description'>
                <Input disabled readOnly />
              </Form.Item>
            )}
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
              <TextArea disabled={isUpdating} />
            </Form.Item>
            {!isUpdating && (
              <>
                <Form.Item name='priority' label='Priority'>
                  <Select showSearch placeholder='Select a Priority' disabled={isUpdating}>
                    {priorityData?.data?.map((priority: any) => (
                      <Select.Option value={priority?.name}>{priority.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name='requester' label='Requester'>
                  <Input disabled={isUpdating} />
                </Form.Item>
                <Form.Item name='receiver' label='Receiver'>
                  <Input disabled={isUpdating} />
                </Form.Item>
              </>
            )}
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
              <TextArea disabled={isUpdating} />
            </Form.Item>
            {!isUpdating && (
              <>
                <Form.Item name='permitRequired' label='Permit/HSE Req'>
                  <Input />
                </Form.Item>
                <Form.Item name='scheduledDate' label='Scheduled Date'>
                  <DatePicker defaultValue={dayjs()} />
                </Form.Item>
              </>
            )}
            {isUpdating && (
              <>
                <Form.Item
                  name='workDone'
                  label='Work Done'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Work Done',
                    },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item name='smu' label='SMU'>
                  <InputNumber />
                </Form.Item>
                <Form.Item name='startDate' label='Start Date'>
                  <DatePicker defaultValue={dayjs()} />
                </Form.Item>
                <Form.Item
                  name='completionDate'
                  label='Completion Date'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Completion Date',
                    },
                    {
                      validator: async (_, completionDate) => {
                        if (
                          completionDate &&
                          completionDate.isBefore(form.getFieldValue('startDate'))
                        ) {
                          throw new Error('Completion Date must be after Start Date')
                        }
                      },
                    },
                  ]}
                >
                  <DatePicker defaultValue={worker?.current} />
                </Form.Item>
                <Form.Item name='tools' label='Tools & Equipments'>
                  <TextArea />
                </Form.Item>
                <Form.Item
                  name='parts'
                  label='Parts & Materials'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Parts & Materials',
                    },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item name='cost' label='Parts/Matl Cost'>
                  <ProFormMoney
                    name='cost'
                    locale='en-EG'
                    initialValue={0.0}
                    min={0.0}
                    width={'sm'}
                  />
                </Form.Item>
              </>
            )}
            {isUpdating && (
              <Form.Item label='Tenant' name='tenantId' hidden required={true}>
                <Input
                  placeholder='Enter Name'
                  type='text'
                  allowClear
                  value={tenant}
                  disabled={true}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
        <Modal
          title={'Edit Work Order'}
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={editSubmitLoading} onClick={handleEditModalSubmit}>
                Edit
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={editForm}
            name='control-hooks'
            title='Add'
            onFinish={onEditFinish}
          >
            <Form.Item label='Code' name='id' hidden={true} required={true}>
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
                  editForm.setFieldsValue({
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
              <Select showSearch placeholder='Select a WorkOrder Type'>
                {workOrderTypeData?.data?.map((workOrderType: any) => (
                  <Select.Option value={workOrderType?.name}>{workOrderType?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='workOrderCategory' label='WorkOrder Category'>
              <Select showSearch placeholder='Select a WorkOrder Category'>
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
              <Select showSearch placeholder='Select a Priority'>
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
            <Form.Item name='scheduledDate' label='Scheduled Date'>
              <DatePicker defaultValue={dayjs()} />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default WorkOrderPage
