import {useAuth} from '../../../../auth'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {
  deleteLubeDispensing,
  fetchCompartments,
  getDispensingReasons,
  getEquipment,
  getLubeDispensings,
  getLubeTypes,
  getSources,
  postLubeDispensing,
  putLubeDispensing,
} from '../../../../../urls'
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
import TextArea from 'antd/lib/input/TextArea'
import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
const WorkOrderCreate = () => {
  const {tenant} = useAuth()

  const {data: defaultData, isLoading} = useQuery('equipments', () => getEquipment(tenant), {
    refetchOnWindowFocus: false,
  })

  const {data: sources, isLoading: isSourcesLoading} = useQuery('sources', () => getSources(tenant))

  const {data: lubeDispensingReasons, isLoading: isLubeDispensingReasonsLoading} = useQuery(
    'lubeDispensingReasons',
    () => getDispensingReasons(tenant)
  )

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      hidden: true,
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
      },
    },
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      width: 200,
      sorter: {
        compare: (a: any, b: any) => a.equipmentId - b.equipmentId,
      },
    },
    {
      title: 'Equipment Description',
      dataIndex: 'equipment',
      width: 200,
      render: (equipment: any) => {
        return <span>{equipment?.description}</span>
      },
    },
    {
      title: 'Reference No.',
      dataIndex: 'referenceNo',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.referenceNo < b.referenceNo) {
          return -1
        }

        if (a.referenceNo > b.referenceNo) {
          return 1
        }
        return 0
      },
    },
    {
      title: 'Date',
      dataIndex: 'dispensingDate',
      width: 200,
      render: (dispensingDate: any) => {
        return <span>{dayjs(dispensingDate).format('DD/MM/YYYY')}</span>
      },
      sorter: {
        compare: (a: any, b: any) => {
          return dayjs(a.dispensingDate).unix() - dayjs(b.dispensingDate).unix()
        },
      },
    },
    {
      title: 'SMU',
      dataIndex: 'smu',
      width: 200,
    },
    {
      title: 'Lube Type',
      dataIndex: 'lubeTypeNavigation',
      width: 200,
      render: (lubeType: any) => {
        return <span>{lubeType?.name}</span>
      },
    },
    {
      title: 'Lube Description',
      dataIndex: 'lubeTypeNavigation',
      width: 200,
      render: (lubeType: any) => {
        return <span>{lubeType?.lubeDescription}</span>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 200,
    },
    {
      title: 'Source',
      dataIndex: 'sourceNavigation',
      width: 200,
      render: (source: any) => {
        return <span>{source?.name}</span>
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reasonNavigation',
      width: 200,
      render: (reason: any) => {
        return <span>{reason?.name}</span>
      },
    },
    {
      title: 'Compartments',
      dataIndex: 'compartmentNavigation',
      width: 200,
      render: (compartment: any) => {
        return <span>{compartment?.name}</span>
      },
    },
    {
      title: 'Issued By',
      dataIndex: 'issueBy',
      width: 200,
    },
    {
      title: 'Received By',
      dataIndex: 'receivedBy',
      width: 200,
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      width: 200,
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button
            className='btn btn-sm btn-light-primary'
            onClick={() => {
              setIsModalOpen(true)
              setIsEditing(true)
              console.log('record', record)
              form.setFieldsValue({
                id: record.id,
                equipmentId: record.equipmentId,
                equipmentDescription: record.equipment?.description,
                dispensingDate: dayjs(record.dispensingDate),
                lubeDescription: record.lubeTypeNavigation?.lubeDescription,
                smu: record.smu,
                lubeType: record.lubeType,
                quantity: record.quantity,
                source: record.source,
                reason: record.reason,
                compartment: record.compartment,
                issueBy: record.issueBy,
                receivedBy: record.receivedBy,
                comment: record.comment,
              })
            }}
          >
            Edit
          </button>
          <Popconfirm
            title={`Are you sure you want to delete 
                ${record.equipmentId} 
                ?`}
            onConfirm={() => {
              removeLubeDispensing(record.id)
            }}
          >
            <button className='btn btn-light-danger btn-sm'>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  //////////////////////////////////////////////
  ///////////Modal Form////////////////////////
  /////////////////////////////////////////////
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const {mutate: addDispensing} = useMutation((data) => postLubeDispensing(data, tenant), {
    onSuccess: () => {
      setIsModalOpen(false)
      message.success('Dispensing added successfully')
      queryClient.invalidateQueries('lubeDispensing')
      setSubmitLoading(false)
      form.resetFields()
      setIsEditing(false)
    },
    onError: () => {
      message.error('Error adding backlog, Please try again')
      setSubmitLoading(false)
    },
  })
  const {data: lubeDispensings, isLoading: isLubeDispensingLoading} = useQuery(
    'lubeDispensing',
    () => getLubeDispensings(tenant),
    {
      refetchOnWindowFocus: false,
    }
  )
  const {mutate: editDispensing} = useMutation((data: any) => putLubeDispensing(data, tenant), {
    onSuccess: () => {
      message.success('Dispensing edited successfully')
      queryClient.invalidateQueries('lubeDispensing')
      setIsModalOpen(false)
      setSubmitLoading(false)
      form.resetFields()
      setIsEditing(false)
    },
    onError: () => {
      message.error('Error updating backlog, Please try again')
      setSubmitLoading(false)
    },
  })

  const {mutate: removeLubeDispensing} = useMutation(deleteLubeDispensing, {
    onSuccess: () => {
      message.success('Dispensing deleted successfully')
      queryClient.invalidateQueries('lubeDispensing')
    },
    onError: () => {
      message.error('Error deleting backlog, Please try again')
    },
  })
  const {data: allCompartment} = useQuery('compartment', () => fetchCompartments(tenant), {
    cacheTime: 5000,
  })
  const {data: LubeTypes, isLoading: isLubeTypesLoading} = useQuery(
    'lubeTypes',
    () => getLubeTypes(tenant),
    {
      refetchOnWindowFocus: false,
    }
  )
  function handleCancel() {
    form.resetFields()
    setIsModalOpen(false)
    setIsEditing(false)
  }

  const onFinish = async (values: any) => {
    console.log('values', values)
    const dataToSubmit: any = {
      // dispensingDate: values.dispensingDate,
      // equipmentId: values.equipmentId,
      // smu: values.smu,
      // lubeType: values.lubeType,
      // quantity: values.quantity,
      // source: values.source,
      // reason: values.reason,
      // compartment: values.compartment,
      // issueBy: values.issueBy,
      // receivedBy: values.receivedBy,
      // comment: values.comment,
      ...values,
    }
    const dataToEdit: any = {
      id: values.id,
      // dispensingDate: values.dispensingDate,
      // equipmentId: values.equipmentId,
      // smu: values.smu,
      // lubeType: values.lubeType,
      // quantity: values.quantity,
      // source: values.source,
      // reason: values.reason,
      // compartment: values.compartment,
      // issueBy: values.issueBy,
      // receivedBy: values.receivedBy,
      // comment: values.comment,
    }
    setSubmitLoading(true)
    isEditing ? editDispensing({...values, tenantId: tenant}) : addDispensing(dataToSubmit)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  //////////////////////////////////////////////
  ///////////END Modal Form////////////////////////
  /////////////////////////////////////////////

  /////////////////////////////////////////////////////
  /////////////////////Search//////////////////////////
  /////////////////////////////////////////////////////
  const [gridData, setGridData] = useState([])
  const [beforeSearch, setBeforeSearch] = useState([])
  useEffect(() => {
    const data = lubeDispensings?.data || []
    setGridData(data)
    setBeforeSearch(data)
  }, [lubeDispensings?.data])

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
    dispensingDate: dayjs().subtract(1, 'day'),
  }
  console.log('lube', lubeDispensings?.data)

  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              onChange={handleInputChange}
              type='text'
              allowClear
            />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={() => showModal()}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>

        <Table
          //hidden
          columns={columns}
          dataSource={gridData}
          loading={isLubeDispensingLoading}
          // bordered
          scroll={{x: 1900}}
        />
        <Modal
          title={isEditing ? 'Edit Dispensing' : 'Add Lube Dispensing'}
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
            title={isEditing ? 'Update Dispensing' : 'Add Dispensing'}
            onFinish={onFinish}
            layout={'horizontal'}
            initialValues={worker}
          >
            {isEditing && (
              <Form.Item name='id' hidden={true}>
                <InputNumber disabled={true} />
              </Form.Item>
            )}
            <Form.Item
              name='equipmentId'
              label='Equipment ID'
              rules={[
                {
                  required: true,
                  message: 'Please select Equipment ID!',
                },
              ]}
            >
              <Select
                showSearch
                style={{width: 200}}
                placeholder='Select a Equipment ID'
                loading={isLoading}
                disabled={isEditing}
                onSelect={(value) => {
                  const equipment = defaultData?.data?.find(
                    (equipment: any) => equipment.equipmentId === value
                  )
                  form.setFieldsValue({
                    equipmentDescription: equipment?.description,
                  })
                }}
              >
                {defaultData?.data?.map((equipment: any) => (
                  <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                    {equipment.equipmentId}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='dispensingDate' label='Dispensing Date'>
              <DatePicker defaultValue={dayjs().subtract(1, 'day')} />
            </Form.Item>
            <Form.Item name='equipmentDescription' label='Equipment Description'>
              <Input disabled readOnly />
            </Form.Item>
            <Form.Item name='smu' label='SMU'>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='lubeType'
              label='Lube Type'
              rules={[
                {
                  required: true,
                  message: 'Please select Lube Type!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder='Select a Lube Type'
                loading={isLoading}
                onSelect={(value) => {
                  const lubeType = LubeTypes?.data?.find((lubeType: any) => lubeType.id === value)
                  form.setFieldsValue({
                    lubeDescription: lubeType?.lubeDescription,
                  })
                }}
              >
                {LubeTypes?.data?.map((LubeType: any) => (
                  <Select.Option key={LubeType.id} value={LubeType.id}>
                    {LubeType.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='lubeDescription' label='Lube Description'>
              <Input disabled readOnly />
            </Form.Item>
            <Form.Item
              name='quantity'
              label='Quantity'
              rules={[
                {
                  required: true,
                  message: 'Please input quantity!',
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name='source' label='Source'>
              <Select showSearch placeholder='Select a Source' loading={isLoading}>
                {sources?.data?.map(
                  (sources: any) =>
                    sources?.name && (
                      <Select.Option key={sources.id} value={sources.id}>
                        {sources.name}
                      </Select.Option>
                    )
                )}
              </Select>
            </Form.Item>
            <Form.Item name='reason' label='Reason'>
              <Select showSearch placeholder='Select a Reason' loading={isLoading}>
                {lubeDispensingReasons?.data?.map(
                  (lubeDispensingReason: any) =>
                    lubeDispensingReason?.name && (
                      <Select.Option key={lubeDispensingReason.id} value={lubeDispensingReason.id}>
                        {lubeDispensingReason.name}
                      </Select.Option>
                    )
                )}
              </Select>
            </Form.Item>
            <Form.Item name='compartment' label='Compartment'>
              <Select showSearch placeholder='Select a Compartment' loading={isLoading}>
                {allCompartment?.data.map((compartment: any) => (
                  <Select.Option key={compartment.id} value={compartment.id}>
                    {compartment.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='issueBy' label='Issued By'>
              <Input />
            </Form.Item>
            <Form.Item name='receivedBy' label='Received By'>
              <Input />
            </Form.Item>
            <Form.Item name='comment' label='Comment'>
              <TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default WorkOrderCreate
