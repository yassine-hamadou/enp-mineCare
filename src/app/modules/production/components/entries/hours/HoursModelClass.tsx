import type {ProColumns} from '@ant-design/pro-components'
import {EditableProTable, ErrorBoundary, ProCard} from '@ant-design/pro-components'
import {Button, Form, Input, InputNumber, message, Modal, Space, Tabs} from 'antd'
import React, {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {addHours, editHour, getEquipment} from '../../../../../urls'
import {useNavigate} from 'react-router-dom'
import {throwError} from '@syncfusion/ej2-base'
import {useAuth} from '../../../../auth'
import dayjs from 'dayjs'
import DevexpressDashboardComponent from '../../../../../pages/dashboard/DevexpressDashboardComponent'

type DataSourceType = {
  id: React.Key | undefined
  date: string
  currentReading: number
  allowRowSubmit: boolean
  equipmentId: React.Key
  state?: string
  children?: DataSourceType[]
}

const HoursModelClass: any = () => {
  const {tenant} = useAuth()
  // const {data: defaultData, isLoading} = useQuery('all-hours', () => getHours(tenant), {
  //     refetchOnWindowFocus: false
  // })

  const [editModal, setEditModal] = useState(false)
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const {data: defaultData, isLoading} = useQuery('equipments', () => getEquipment(tenant))

  const {mutate: mutateHours, isLoading: isHoursMutationLoading} = useMutation(addHours, {
    onSuccess: () => {
      navigate('/')
      message.success('Hours Entries Saved successfully').then((r) => r)
      queryClient.invalidateQueries('all-hours').then((r) => r)
    },
    onError: (error: any) => {
      message.error(error.message).then((r) => r)

      throwError(error.message)
    },
  })

  const {mutate: editHourReading, isLoading: isEditLoading} = useMutation(editHour, {
    onSuccess: () => {
      setEditModal(false)
      message.success('Hours Edited successfully')
      queryClient.invalidateQueries('all-hours').then((r) => r)
      queryClient.invalidateQueries('equipments').then((r) => r)
      editForm.resetFields()
    },
    onError: (error: any) => {
      message.error(error.message)
      throwError(error.message)
    },
  })

  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(() => defaultData?.data)

  const [record, setRecord] = useState<DataSourceType | any>(undefined)

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData?.data?.map((item: any) => item.equipmentId?.trim())
  )
  const [rowValues, setRowValues] = useState<any>({})
  // useEffect(() => {
  // setEditableRowKeys(() => defaultData?.data?.map((item: any) => item.equipmentId))
  // Object.values(allSubmi).every((item: any) => item === true) ? setAllowSubmit(true) : setAllowSubmit(false)
  function handleEdit(record: DataSourceType) {
    setEditModal(true)
    console.log('record', record)
    editForm.setFieldsValue(record)
  }

  // }, [defaultData?.data]);
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      editable: false,
      sorter: (a: any, b: any) => {
        if (a.equipmentId < b.equipmentId) {
          return -1
        }
        if (a.equipmentId > b.equipmentId) {
          return 1
        }
        return 0
      },
    },
    {
      title: 'Previous Reading Date',
      dataIndex: 'date',
      // valueType: 'date',
      editable: false,
      // fieldProps: {
      //     format: 'DD-MM-YYYY',
      // },
      render: (date: any) => {
        console.log('date', date)
        if (dayjs(date).isSame(dayjs('1970-01-01'))) {
          return <span className={'badge badge-light-danger'}>Not Available</span>
        } else return dayjs(date).format('DD-MM-YYYY')
      },
    },
    {
      title: 'Previous Reading',
      dataIndex: 'currentReading',
      readonly: true,
      editable: false,
      sorter: (a: any, b: any) => a.currentReading - b.currentReading,
    },
    {
      title: 'Adjustment',
      dataIndex: 'adjustment',
      valueType: 'digit',
      editable: false,
    },
    {
      title: 'Current Reading Date',
      valueType: 'date',
      dataIndex: 'today',

      onCell: (record) => {
        return {
          onFocus: (value) => {
            setRecord(record)
            console.log('record during date', record)
          },
        }
      },
      formItemProps: {
        rules: [
          {
            validator(rule, value) {
              //new
              if (!value) {
                return Promise.reject('Please select a date')
              } else if (dayjs(value).isBefore(dayjs(record?.date))) {
                return Promise.reject('Date cannot be before previous reading date')
              } else if (dayjs(value).isAfter(dayjs())) {
                return Promise.reject('Date cannot be after today')
              } else {
                return Promise.resolve('Resolved')
              }
            }, //end of validator
          },
        ],
      },
      fieldProps: (form, {rowKey, rowIndex, entity}) => {
        // get this row's current reading
        console.log('entity', entity)
        console.log('rowIndex', rowIndex)

        const prevReadingOnTable = entity?.currentReading
        const prevReadingDateOnTable = entity?.date

        // Get the value of the "Current Reading" field
        const currentReadingEntered = form.getFieldValue(`${rowKey}`)?.zeroReading
        // Get the value of the "Current Reading Date" field
        const currentReadingDateEntered = form.getFieldValue(`${rowKey}`)?.today

        // Perform cross-field validation
        if (currentReadingEntered && currentReadingDateEntered) {
          if (dayjs(currentReadingDateEntered).isBefore(dayjs(prevReadingDateOnTable))) {
            entity.allowRowSubmit = false
          } else if (dayjs(currentReadingDateEntered).isAfter(dayjs())) {
            entity.allowRowSubmit = false
          } else entity.allowRowSubmit = currentReadingEntered > prevReadingOnTable
        }
      },
    },
    {
      title: 'Current Reading',
      valueType: 'digit',
      dataIndex: 'zeroReading',
      onCell: (record) => {
        return {
          onChange: () => {
            setRecord(record)
            console.log('record being changed', record)
          },
        }
      },
      formItemProps: {
        rules: [
          {
            validator(rule, value) {
              //new code
              if (!value) {
                return Promise.reject('Please enter a reading')
              } else if (value <= record?.currentReading) {
                return Promise.reject('Reading should be more than previous reading')
              } else {
                let formattedTodayDate = dayjs(record?.today).format()
                let formattedPreviousDate = dayjs(record?.date).format()
                console.log('formattedTodayDate', formattedTodayDate)
                console.log('formattedPreviousDate', formattedPreviousDate)
                let totalHoursBetweenLastReadingAndTodayDate = dayjs(formattedTodayDate).diff(
                  dayjs(formattedPreviousDate),
                  'hour'
                )
                console.log(
                  'totalHoursBetweenLastReadingAndTodayDate',
                  totalHoursBetweenLastReadingAndTodayDate
                )
                if (value > record?.currentReading + totalHoursBetweenLastReadingAndTodayDate) {
                  return Promise.reject(
                    `Reading cannot be more than ${
                      record?.currentReading + totalHoursBetweenLastReadingAndTodayDate
                    }`
                  )
                } else {
                  return Promise.resolve()
                }
              }
            },
          },
        ],
      },
      fieldProps: (form, {rowKey, rowIndex, entity}) => {
        // get this row's current reading
        console.log('rowKey ', rowKey)
        console.log('entity', entity)
        console.log('rowIndex', rowIndex)

        const prevReadingOnTable = entity?.currentReading
        const prevReadingDateOnTable = entity?.date

        // Get the value of the "Current Reading" field
        const currentReadingEntered = form.getFieldValue(`${rowKey}`)?.zeroReading
        // Get the value of the "Current Reading Date" field
        const currentReadingDateEntered = form.getFieldValue(`${rowKey}`)?.today

        // Perform cross-field validation
        let formattedTodayDate = dayjs(currentReadingDateEntered).format()
        let formattedPreviousDate = dayjs(prevReadingDateOnTable).format()
        let totalHoursBetweenLastReadingAndTodayDate = dayjs(formattedTodayDate).diff(
          dayjs(formattedPreviousDate),
          'hour'
        )
        entity.allowRowSubmit = !!(
          currentReadingEntered &&
          currentReadingDateEntered &&
          !dayjs(currentReadingDateEntered).isBefore(dayjs(prevReadingDateOnTable)) &&
          !dayjs(currentReadingDateEntered).isAfter(dayjs()) &&
          !(
            currentReadingEntered >
            prevReadingOnTable + totalHoursBetweenLastReadingAndTodayDate
          ) &&
          !(currentReadingEntered < prevReadingOnTable)
        )
      },

      // fieldProps: (form, {rowKey, rowIndex}) => {
      //get this row's current reading
      // const currentReading = form.getFieldValue(`${rowKey}`)
      //validate that the current reading is greater than the previous reading
      // },
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      editable: false,
      render: (text, record, _, action) => {
        return [
          <button
            key='edit'
            type='button'
            className={record?.id ? 'btn btn-primary' : 'btn btn-danger disabled'}
            onClick={() => {
              handleEdit(record)
            }}
          >
            {record?.id ? 'Edit Last Reading' : 'No Reading'}
          </button>,
        ]
      },
    },
  ]

  const saveAndContinue = async (rowsToBeSubmitted: any) => {
    console.log('rowsToBeSubmitted', rowsToBeSubmitted)
    console.log('datasource', dataSource)
    try {
      rowsToBeSubmitted?.map((item: any) => {
        if (item.zeroReading) {
          mutateHours({
            fleetId: item.fleetId,
            previousReading: item.currentReading,
            date: new Date(item.today),
            currentReading: item.zeroReading,
            tenantId: tenant,
            adjustment: item.adjustment,
            comment: item.comment,
            entrySource: 'Normal Reading',
          })
        }
        return 0
      })
    } catch (error) {
      // Handle form validation error
      message.error('Kindly resolve all issues before submitting!').then((r) => r)
    }
  }

  const [searchText, setSearchText] = useState('')

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
  }
  const filterData = (data: any) => {
    if (!searchText) {
      return data
    }
    return data?.filter((item: any) => {
      // return Object.values(item).join('').toLowerCase().includes(searchText?.toLowerCase())
      return item?.equipmentId?.toLowerCase().includes(searchText?.toLowerCase())
    })
  }
  const [editForm] = Form.useForm()

  function onEditFinish() {
    console.log('editForm', editForm.getFieldsValue())
    const data = {
      id: editForm.getFieldValue('id'),
      readingPatch: editForm.getFieldValue('readingPatch'),
    }
    console.log('data', data)
    editHourReading(data)
  }

  return (
    <Tabs
      defaultActiveKey='1'
      items={[
        {
          label: <span className='me-4'>Hours Entry</span>,
          key: '1',
          children: (
            <ProCard>
              <div className='d-flex justify-content-between'>
                <Space
                  key='search'
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Input
                    placeholder='Enter Search Text'
                    onChange={handleInputChange}
                    type='text'
                    allowClear
                    value={searchText}
                  />
                </Space>
                <Space
                  key='button'
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Button
                    type='primary'
                    className={'btn btn-success'}
                    size={'large'}
                    key='save'
                    onClick={
                      record
                        ? () => {
                            const rowsToBeSubmitted = dataSource?.filter(
                              (item: any) => item.allowRowSubmit === true
                            )
                            console.log('rowsToBeSubmitted', rowsToBeSubmitted)
                            console.log('datasource outside save', dataSource)
                            if (rowsToBeSubmitted?.length > 0) {
                              saveAndContinue(rowsToBeSubmitted)
                            } else {
                              message
                                .error('Kindly resolve all issues before submitting!')
                                .then((r) => r)
                            }
                            // if (allowSubmit) {
                            //     saveAndContinue()
                            // } else {
                            //     message.error('Kindly resolve all issues before submitting!').then(r => r)
                            // }
                          }
                        : () => {
                            message.error('No Hours Entered').then((r) => r)
                          }
                    }
                    loading={isHoursMutationLoading}
                  >
                    Save
                  </Button>
                </Space>
              </div>
              <ErrorBoundary>
                <EditableProTable<DataSourceType>
                  columns={columns}
                  loading={isLoading}
                  rowKey='equipmentId'
                  scroll={{
                    x: 1200,
                  }}
                  pagination={{
                    pageSize: 30,
                    showSizeChanger: false,
                  }}
                  value={filterData(
                    defaultData?.data?.map((item: any) => {
                      const equipmentLatestHour =
                        item?.hoursEntries?.length > 0 ? item?.hoursEntries[0] : undefined
                      console.log('equipmentLatestHour', equipmentLatestHour)
                      if (equipmentLatestHour) {
                        return {
                          id: equipmentLatestHour?.id,
                          equipmentId: equipmentLatestHour?.fleetId?.trim(),
                          fleetId: equipmentLatestHour?.fleetId?.trim(),
                          adjustment: item?.adjustment,
                          comment: '',
                          currentReading: equipmentLatestHour?.currentReading,
                          date: equipmentLatestHour?.date,
                          entrySource: 'Normal Reading',
                          previousReading: equipmentLatestHour?.previousReading,
                          previousReadingDate: new Date(),
                          zeroReading: 0,
                          yesterday: dayjs().subtract(1, 'day').format(),
                          today: new Date(),
                          allowRowSubmit: false, // Allow row submit only if all fields are valid
                          ...rowValues[equipmentLatestHour?.fleetId?.trim()],

                          // ...equipmentLatestHour,
                          // adjustment: 0,
                          // comment: 'Enter Comment',
                          // equipmentId: equipmentLatestHour.fleetId,
                          // zeroReading: 0,
                          // today: new Date(),
                          // allowRowSubmit: false, // Allow row submit only if all fields are valid
                          // ...rowValues[item.equipmentId], //necessary for to get the value of the row when the user enters a value
                        }
                      } else {
                        return {
                          id: undefined,
                          equipmentId: item?.equipmentId?.trim(),
                          fleetId: item?.equipmentId?.trim(),
                          adjustment: item?.adjustment,
                          comment: '',
                          currentReading: item?.initialReading ? item?.initialReading : 0,
                          date: new Date('1970-01-01'),
                          entrySource: 'Normal Reading',
                          previousReading: 0,
                          previousReadingDate: new Date(),
                          zeroReading: 0,
                          today: new Date(),
                          allowRowSubmit: false, // Allow row submit only if all fields are valid
                          ...rowValues[item.equipmentId?.trim()], //necessary for to get the value of the row when the user enters a value
                        }
                      }
                    })
                  )}
                  onChange={setDataSource}
                  //do not show add button
                  recordCreatorProps={false}
                  editable={{
                    type: 'multiple',
                    editableKeys: editableKeys
                      ? editableKeys
                      : defaultData?.data?.map((item: any) => item.equipmentId?.trim()),
                    onValuesChange: (record, recordList) => {
                      setRecord(record)
                      setDataSource(recordList)
                      setRowValues((prevRowValues: any) => {
                        return {
                          ...prevRowValues,
                          //@ts-ignore
                          [record?.equipmentId?.trim()]: record, // Assuming each row has a unique `id` field
                        }
                      }) // Store the latest value for the changed row
                    },
                    onChange: setEditableRowKeys,
                  }}
                />
                <Modal
                  title='Edit Last Reading'
                  open={editModal}
                  onCancel={() => {
                    setEditModal(false)
                    editForm.resetFields()
                  }}
                  closable={true}
                  footer={[
                    <Button
                      key='back'
                      onClick={() => {
                        setEditModal(false)
                        editForm.resetFields()
                      }}
                    >
                      Cancel
                    </Button>,
                    <Button
                      key='submit'
                      type='primary'
                      htmlType='submit'
                      loading={isEditLoading}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        editForm.submit()
                      }}
                    >
                      Submit
                    </Button>,
                  ]}
                >
                  <Form
                    form={editForm}
                    name='control-hooks'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 14}}
                    title='Edit Last Reading'
                    onFinish={onEditFinish}
                  >
                    <Form.Item label='Entry ID' name='id'>
                      <Input disabled style={{color: 'black'}} />
                    </Form.Item>
                    <Form.Item label='Equipment ID' name='equipmentId'>
                      <Input disabled style={{color: 'black'}} />
                    </Form.Item>
                    <Form.Item label='Reading before' hidden name='previousReading'>
                      <Input disabled style={{color: 'black'}} />
                    </Form.Item>
                    <Form.Item label='Previous Reading To Edit' name='currentReading'>
                      <InputNumber disabled style={{color: 'black'}} />
                    </Form.Item>
                    <Form.Item
                      label='Replace With'
                      name='readingPatch'
                      required
                      rules={[
                        ({getFieldValue}) => ({
                          validator(_, value) {
                            if (!value) {
                              return Promise.reject('Please enter a reading')
                            } else {
                              if (value <= getFieldValue('previousReading')) {
                                return Promise.reject(
                                  `Reading should be more than ${getFieldValue('previousReading')}`
                                )
                              } else if (value > getFieldValue('currentReading')) {
                                return Promise.reject(
                                  `Reading cannot be more than ${getFieldValue('currentReading')}`
                                )
                              } else {
                                return Promise.resolve()
                              }
                            }
                          },
                        }),
                      ]}
                    >
                      <InputNumber style={{color: 'black'}} />
                    </Form.Item>
                  </Form>
                </Modal>
              </ErrorBoundary>
            </ProCard>
          ),
        },
        {
          label: <span className='me-4'>Analysis</span>,
          key: '2',
          children: (
            <>
              <DevexpressDashboardComponent dashboardId={'hoursAnalysis'} />
            </>
          ),
        },
      ]}
    />
  )
}

export default HoursModelClass
