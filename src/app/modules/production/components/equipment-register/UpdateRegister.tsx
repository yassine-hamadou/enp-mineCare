import {Link, useLocation, useNavigate} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
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
  Tabs,
} from 'antd'
import React, {useState} from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {
  addComponentToEquipment,
  ENP_URL,
  fetchFaults,
  getEquipmentHoursEntry,
  getModels,
  patchEquipment,
  patchEquipmentGeneralInfo,
} from '../../../../urls'
import {useAuth} from '../../../auth'
import {fetchSchedules} from '../entries/equipment/calendar/requests'
import {calculateAverageDailyUsage} from './calculateAverageDailyUsage'
import {getPMObjects} from '../setup/service/sequence/getPM'

const UpdateRegister = () => {
  let navigate = useNavigate()
  const [gridData, setGridData] = useState([])
  const location = useLocation()
  let [showModal, setShowModal] = useState(false)
  const [showMeterModal, setShowMeterModal] = useState(false)
  const [showAgreementModal, setShowAgreementModal] = useState(false)
  const [componentSubmitLoading, setComponentSubmitLoading] = useState(false)
  const {tenant} = useAuth()
  const queryClient = useQueryClient()
  const {mutate: addComponent} = useMutation(addComponentToEquipment, {
    onSuccess: (data: any) => {
      queryClient.refetchQueries('equipments').then(() => {
        message.success('Component added successfully')
      })
      setComponentsGridData((prev: any) => [...prev, data?.data])
      setComponentSubmitLoading(false)
    },
    onError: () => {
      message.error('Error adding component')
      setComponentSubmitLoading(false)
    },
  })
  const {mutate: updateEquipment, isLoading: updateInProgress} = useMutation(
    (data: any) => patchEquipment(data),
    {
      onSuccess: () => {
        queryClient.removeQueries('equipments')
        message.success('Equipment updated successfully')
        navigate('/equipment-register')
      },
      onError: () => {
        message.error('Error updating equipment')
      },
    }
  )

  const {mutate: updateEquipmentGeneralInfo, isLoading: updateEquipmentGeneralInfoLoading} =
    useMutation((data: any) => patchEquipmentGeneralInfo(data), {
      onSuccess: () => {
        queryClient.removeQueries('equipments')
        message.success('Equipment updated successfully')
        navigate('/equipment-register')
      },
      onError: (error: any) => {
        message.error('Error updating equipment')
      },
    })

  const {data: listOfAgreements, isLoading: isAgreementLoading} = useQuery('agreements', () =>
    axios.get(`${ENP_URL}/agreements`)
  )

  const {data: getEquipmentLatestHour, isLoading: equipHourLoading} = useQuery(
    'getEquipmentLatestHour',
    () => getEquipmentHoursEntry(tenant, equipmentData?.equipmentId?.trim(), 'PM Reading')
  )

  const {data: listOfFaults, isLoading: isFaultLoading} = useQuery('faults', () =>
    fetchFaults(tenant)
  )

  const {data: listOfModels} = useQuery('models', () => getModels(tenant))

  const {data: listOfPlannedMaintenance, isLoading: isMaintenanceLoading} = useQuery(
    'listOfPlannedMaintenance',
    () => fetchSchedules(tenant)
  )

  const {Option} = Select
  console.log('list of models', listOfModels)
  const handleCancel = () => {
    setShowModal(false)
  }
  const handleMeterCancel = () => {
    setShowMeterModal(false)
  }
  const handleAgreementCancel = () => {
    setShowAgreementModal(false)
  }

  const onComponentFinish = (values: any) => {
    setComponentSubmitLoading(true)
    const data = {
      ...values,
      tenantId: tenant,
    }
    addComponent(data)
    setShowModal(false)
  }
  const deletesData = async (element: any) => {
    try {
      const response = await axios.delete(`${ENP_URL}/Components/${element.id}`)
      const newData = gridData.filter((item: any) => item.id !== element.id)
      setGridData(newData)
      return response.status
    } catch (e) {
      return e
    }
  }

  function handleDelete(element: any) {
    deletesData(element)
  }

  const componentColumns: any = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
    },
    {
      title: 'Part Number',
      dataIndex: 'partNumber',
    },
    {
      title: 'Install Date',
      dataIndex: 'installDate',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Reason for Change',
      dataIndex: 'reasonForChange',
    },
    {
      title: 'Last C/D Date',
      dataIndex: 'lastChangeDate',
      // render: (date: any) => new Date(date).toDateString(),
    },
    {
      title: 'Component Hours',
      dataIndex: 'componentHours',
    },
    {
      title: 'Action',
      fixed: 'right',
      Width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <a href='#' className='btn btn-light-primary btn-sm'>
            Update
          </a>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
            <button onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
              Delete
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const metersColumns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Latest Reading Date',
      dataIndex: 'date',
      render: (date: any) => new Date(date).toDateString(),
    },
    {
      title: 'Previous Reading',
      dataIndex: 'previousReading',
    },
    {
      title: 'Current Reading',
      dataIndex: 'currentReading',
    },
  ]
  const faultColumns: any = [
    {
      title: 'Down Type',
      dataIndex: 'downType',
    },
    {
      title: 'Down Date',
      dataIndex: 'downtime',
      render: (date: any) => new Date(date).toDateString(),
    },
    {
      title: 'Custodian',
      dataIndex: 'custodian',
    },
    {
      title: 'Location',
      dataIndex: 'locationId',
    },
  ]
  const agreementColumns: any = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Agreement Date',
      dataIndex: 'agreementDate',
    },
  ]
  const maintenanceColumns: any = [
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      render: (serviceType: any) => serviceType?.name,
    },
    {
      title: 'Responsible',
      dataIndex: 'responsible',
    },
    {
      title: 'Location',
      dataIndex: 'locationId',
    },
    {
      title: 'Start Date',
      dataIndex: 'timeStart',
      render: (date: any) => new Date(date).toDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'timeEnd',
      render: (date: any) => new Date(date).toDateString(),
    },
  ]
  const bookingsColumns: any = [
    {
      title: 'Start Date',
    },
    {
      title: 'End Date',
    },
    {
      title: 'Location',
    },
  ]
  const pmIntervalColumns: any = [
    {
      title: 'Current Reading',
      dataIndex: 'hoursEntries',
      render: (hoursEntries: any) => hoursEntries[0]?.currentReading ?? 0,
    },
    {
      title: 'Hours Worked Since Last PM',
      dataIndex: 'hoursEntries',
      render: (hoursEntries: any) => {
        const latestHourFromNormalReading = hoursEntries[0]?.currentReading ?? 0
        const latestHourFromPM = getEquipmentLatestHour?.data[0]?.currentReading
        const hoursWorkedSinceLastPM = latestHourFromNormalReading - latestHourFromPM
        if (isNaN(hoursWorkedSinceLastPM) || isNaN(latestHourFromPM)) {
          return <span className={'badge badge-danger'}>No PM Yet!</span> //No Initial Reading
        }
        return <span className={'badge badge-success'}>{hoursWorkedSinceLastPM}</span>
      },
    },
    {
      title: 'Average Daily Usage',
      // dataIndex: 'equipmentId',
      render: () => {
        const latestHour = getEquipmentLatestHour?.data
        console.log('latest hour', latestHour)
        const averageDailyUsage = calculateAverageDailyUsage(equipmentData, latestHour)
        if (isNaN(averageDailyUsage)) {
          return <span className={'badge badge-danger'}>Invalid!</span>
        } else if (averageDailyUsage < 0) {
          return <span className={'badge badge-danger'}>Latest Reading Not Updated!</span>
        }
        //if average is infinity then hoursWorkedSinceLastPM / hoursSinceLastPM is a division by zero,
        // so we wait till hoursSinceLastPM becomes more than zero meaning waiting 1hour later
        else if (averageDailyUsage === Infinity) {
          return <span className={'badge badge-light-danger'}>Not available at the moment!</span>
        }
        return <span className={'badge badge-success'}>{averageDailyUsage.toFixed(2)}</span>
      },
    },
    {
      title: 'Estimated Maintenance Date',
      render: () => {
        const latestHour = getEquipmentLatestHour?.data
        console.log('latest hour', latestHour)
        const averageDailyUsage = calculateAverageDailyUsage(equipmentData, latestHour)
        if (isNaN(averageDailyUsage)) {
          return <span className={'badge badge-danger'}>Invalid!</span>
        } else if (averageDailyUsage < 0) {
          return <span className={'badge badge-danger'}>Awaiting Latest Reading Update!</span>
        }
        const pmObjects = getPMObjects(
          equipmentData?.hoursEntries[0]?.currentReading,
          equipmentData?.model?.services?.map((service: any) => {
            return {
              name: service?.name,
              hours: service?.intervalForPm,
            }
          })
        )
        const serviceCycle = equipmentData?.model?.services?.map((service: any) => {
          return {
            name: service?.name,
            hours: service?.intervalForPm,
          }
        })
        const currentReading = equipmentData?.hoursEntries[0]?.currentReading
        let nextPMReading

        for (
          let i = currentReading;
          getPMObjects(i, serviceCycle)?.hours === pmObjects?.hours;
          i++
        ) {
          nextPMReading = i
        }
        console.log('pm objects', pmObjects)

        //calculate number of days to reach to the nextPMReading based on the averageDailyUsage
        const daysToNextPMReading = (nextPMReading - currentReading) / averageDailyUsage
        console.log('days to next pm reading', daysToNextPMReading)
        const estimatedMaintenanceDate = dayjs().add(daysToNextPMReading, 'day')
        return pmObjects?.predictedPm?.name ? (
          <div>
            <span>{`${dayjs(estimatedMaintenanceDate)?.format('DD/MM/YYYY')}`}</span>&nbsp;
            <span className={'badge badge-success'}>{`at ${nextPMReading + 1}`}</span>
          </div>
        ) : (
          <span className={'badge badge-danger'}>No Service Cycle Setup</span>
        )
      },
    },
    {
      title: 'Incoming Planned Maintenance',
      dataIndex: 'hoursEntries',
      render: (hoursEntries: any) => {
        const latestHour = getEquipmentLatestHour?.data
        console.log('latest hour', latestHour)
        const averageDailyUsage = calculateAverageDailyUsage(equipmentData, latestHour)
        if (isNaN(averageDailyUsage)) {
          return <span className={'badge badge-danger'}>Invalid!</span>
        }
        console.log('curremt usage', equipmentData?.hoursEntries[0]?.currentReading)
        const pmObjects = getPMObjects(
          equipmentData?.hoursEntries[0]?.currentReading,
          equipmentData?.model?.services?.map((service: any) => {
            return {
              name: service?.name,
              hours: service?.intervalForPm,
            }
          })
        )
        console.log('pm objects', pmObjects)

        return pmObjects?.predictedPm?.name ? (
          <span className={'badge badge-success'}>{pmObjects?.predictedPm?.name}</span>
        ) : (
          <span className={'badge badge-danger'}>No Service Cycle Setup</span>
        )
      },
    },
  ]

  const [updateDetailsForm] = Form.useForm()
  const [generalInfoUpdateForm] = Form.useForm()
  const [componentUpdateForm] = Form.useForm()
  const [meterUpdateForm] = Form.useForm()
  const [agreementUpdateForm] = Form.useForm()

  const equipmentsQuery: any = queryClient.getQueryData(['equipments'])
  console.log('equipments', equipmentsQuery)
  const equipsData = equipmentsQuery?.data
  console.log('equipment', equipsData)

  const equipmentData: any = location.state
  //put equimentData in an array  and pass it to the datasource
  const equipmentDataArray = [equipmentData]
  console.log('equipment data', equipmentDataArray)
  const componentEquipData = equipsData
    ? equipsData?.find((equip: any) => equip.equipmentId === equipmentData.equipmentId)
    : equipmentData
  const [gridComponentsData, setComponentsGridData] = useState<any>(componentEquipData?.components)

  updateDetailsForm.setFieldsValue({
    id: equipmentData?.id,
    equipmentId: equipmentData?.equipmentId?.trim(),
    serialNumber: equipmentData?.serialNumber?.trim(),
    description: equipmentData?.description?.trim(),
    manufactureDate: dayjs(equipmentData?.manufactureDate),
    purchaseDate: dayjs(equipmentData?.purchaseDate),
    endOfLifeDate: dayjs(equipmentData?.endOfLifeDate),
    modelId: equipmentData?.modelId,
    facode: equipmentData?.facode?.trim(),
  })
  generalInfoUpdateForm.setFieldsValue({
    id: equipmentData?.id,
    note: equipmentData?.note,
    warrantyStartDate: dayjs(equipmentData?.warrantyStartDate),
    warrantyEndDate: dayjs(equipmentData?.warrantyEndDate),
    universalCode: equipmentData?.universalCode,
    meterType: equipmentData?.meterType,
    adjustment: equipmentData?.adjustment,

    // initialReading: equipmentData?.initialReading,
  })
  componentUpdateForm.setFieldsValue({
    equipmentId: equipmentData?.equipmentId?.trim(),
  })
  meterUpdateForm.setFieldsValue({
    equipmentId: equipmentData?.equipmentId?.trim(),
  })
  agreementUpdateForm.setFieldsValue({
    equipmentId: equipmentData?.equipmentId?.trim(),
  })

  function onUpdateDetailsFinish() {
    console.log('update details form', updateDetailsForm.getFieldsValue())
    const data = {
      ...updateDetailsForm.getFieldsValue(),
    }
    updateEquipment(data)
  }

  function onUpdateGeneralInfoFinish() {
    console.log('update general info form', generalInfoUpdateForm.getFieldsValue())
    const data = {
      ...generalInfoUpdateForm.getFieldsValue(),
    }
    updateEquipmentGeneralInfo(data)
  }

  // @ts-ignore
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='row mb-0'>
            <div className='mb-3'>
              <h3 className='mb-0'>
                Equipment
                <span className='text-danger'> {equipmentData.equipmentId}</span>
              </h3>
            </div>
            <div>
              <Link to='/equipment-register'>
                <button className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                  <i className='la la-arrow-left' />
                  Equipment Register
                </button>
              </Link>
            </div>
          </div>
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                label: `Details`,
                key: '1',
                children: (
                  <>
                    <Form
                      name={'add-equip-register'}
                      layout={'vertical'}
                      form={updateDetailsForm}
                      onFinish={onUpdateDetailsFinish}
                      labelCol={{span: 8}}
                      wrapperCol={{span: 24}}
                      title='Update Equipment'
                    >
                      <Form.Item name='id' label='ID' hidden={true} rules={[{required: true}]}>
                        <Input type='text' disabled className='form-control form-control-solid' />
                      </Form.Item>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item
                            name='equipmentId'
                            label='Equipment ID'
                            rules={[{required: true}]}
                          >
                            <Input
                              type='text'
                              className='form-control form-control-solid'
                              disabled
                            />
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='serialNumber' label='Serial Number'>
                            <Input type='text' className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item name='facode' label='Fixed Asset Code'>
                            <Input type='text' className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='modelId' label='Model'>
                            <Select
                              placeholder='Select Model'
                              className='form-select form-select-solid py-1 px-0'
                              showSearch
                              value={equipmentData?.modelId}
                              defaultValue={equipmentData?.modelId}
                            >
                              {listOfModels?.data?.map((item: any) => (
                                <Option
                                  key={item?.modelId}
                                  value={item?.modelId}
                                  defaultValue={item?.modelId}
                                  selected={item?.modelId === equipmentData?.modelId}
                                  defaultChecked={item?.modelId === equipmentData?.modelId}
                                >
                                  {item.name}{' '}
                                  <span className='text-muted'>
                                    ({item?.manufacturer?.name?.trim()})
                                  </span>
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item name='manufactureDate' label='Manufacture Date'>
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='purchaseDate' label='Purchase Date'>
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                      </div>

                      <div className='row mb-0'>
                        <div className='col-5 mb-7'>
                          <Form.Item name='description' label='Description'>
                            <Input.TextArea
                              placeholder='Enter Description'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                        </div>
                        <div className='col-3 mb-7'>
                          <Form.Item name='endOfLifeDate' label='End Of Life Date'>
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                      </div>
                      <Button type='primary' htmlType='submit' loading={updateInProgress}>
                        Submit
                      </Button>
                    </Form>
                  </>
                ),
              },
              {
                label: `General Information`,
                key: '2',
                children: (
                  <>
                    <Form
                      name={'general-info'}
                      layout={'vertical'}
                      form={generalInfoUpdateForm}
                      onFinish={onUpdateGeneralInfoFinish}
                      labelCol={{span: 8}}
                      wrapperCol={{span: 24}}
                      title='Add General Info'
                    >
                      <Form.Item name='id' label='ID' hidden={true} rules={[{required: true}]}>
                        <Input type='text' disabled className='form-control form-control-solid' />
                      </Form.Item>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item name='meterType' label='Meter Type' rules={[{required: true}]}>
                            <Select
                              className='form-select form-select-solid px-0'
                              style={{width: '100%', padding: '0.4rem 0.75rem'}}
                            >
                              <Select.Option value='HOUR'>HOUR</Select.Option>
                              <Select.Option value='Km'>KiloMeter (Km)</Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='adjustment' label='Adjustment'>
                            <InputNumber
                              className='form-control form-control-solid py-2'
                              max={99999}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item name='warrantyEndDate' label='Warranty End Date'>
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='warrantyStartDate' label='Warranty Start Date'>
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='row mb-0'>
                        <div className='col-4 mb-7'>
                          <Form.Item name='note' label='Note'>
                            <Input.TextArea className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                        <div className='col-4 mb-7'>
                          <Form.Item name='universalCode' label='Universal Code'>
                            <Input type='text' className='form-control form-control-solid' />
                          </Form.Item>
                        </div>
                      </div>
                      <Button
                        type='primary'
                        htmlType='submit'
                        loading={updateEquipmentGeneralInfoLoading}
                      >
                        Submit
                      </Button>
                    </Form>
                  </>
                ),
              },
              {
                label: `Components`,
                key: '3',
                children: (
                  <>
                    <Modal
                      title='Add Component'
                      open={showModal}
                      onCancel={handleCancel}
                      closable={true}
                      footer={null}
                    >
                      <Form
                        layout={'vertical'}
                        form={componentUpdateForm}
                        onFinish={onComponentFinish}
                        labelCol={{span: 8}}
                        wrapperCol={{span: 24}}
                        title='Add Component'
                      >
                        <Form.Item
                          name='equipmentId'
                          className={'d-none'}
                          label='Equipment ID'
                          rules={[{required: true}]}
                        >
                          <Input
                            readOnly
                            disabled
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item
                          name='serialNumber'
                          label='Serial Number'
                          rules={[{required: true}]}
                        >
                          <Input
                            placeholder='Enter Serial Number'
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='quantity' label='Quantity' rules={[{required: true}]}>
                          <InputNumber
                            placeholder='Enter Quantity'
                            min={1}
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item
                          name='description'
                          label='Description'
                          rules={[{required: true}]}
                        >
                          <Input.TextArea
                            placeholder='Enter Description'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item
                          name='installDate'
                          label='Install Date'
                          rules={[{required: true}]}
                        >
                          <DatePicker showTime className='form-control form-control-solid' />
                        </Form.Item>
                        <Form.Item name='partNumber' label='Part Number' rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder='Enter Part Number'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item
                          name='reasonForChange'
                          label='Reason For Change'
                          rules={[{required: true}]}
                        >
                          <Input.TextArea
                            placeholder='Enter the reason for change'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item
                          name='lastChangeDate'
                          label='Last Change Date'
                          rules={[{required: true}]}
                        >
                          <DatePicker showTime className='form-control form-control-solid' />
                        </Form.Item>
                        <Form.Item
                          name='componentHours'
                          label='Component Hours'
                          rules={[{required: true}]}
                        >
                          <InputNumber type='number' className='form-control form-control-solid' />
                        </Form.Item>
                        <Button type='primary' htmlType='submit' loading={componentSubmitLoading}>
                          Submit
                        </Button>
                      </Form>
                    </Modal>
                    <div className='d-flex justify-content-between'>
                      <Space style={{marginBottom: 16}}></Space>
                      <Space style={{marginBottom: 16}}>
                        <Button type={'primary'} onClick={() => setShowModal(true)}>
                          Add Component
                        </Button>
                      </Space>
                    </div>
                    <Table columns={componentColumns} bordered dataSource={gridComponentsData} />
                  </>
                ),
              },
              {
                label: `Faults`,
                key: '5',
                children: (
                  <>
                    <Table
                      bordered
                      columns={faultColumns}
                      dataSource={listOfFaults?.data?.filter(
                        (item: any) => item.fleetId?.trim() === equipmentData?.equipmentId?.trim()
                      )}
                      loading={isFaultLoading}
                    />
                  </>
                ),
              },
              {
                label: `Meters`,
                key: '4',
                children: (
                  <>
                    <Table
                      bordered
                      columns={metersColumns}
                      // dataSource={listOfMeters?.data?.filter((item: any) => item.fleetId?.trim() === equipmentData?.equipmentId?.trim())}
                      dataSource={
                        equipmentData?.hoursEntries?.length > 0 ? equipmentData?.hoursEntries : []
                      }
                    />
                  </>
                ),
              },
              {
                label: `Planned Maintenance (PM)`,
                key: 'pm',
                children: (
                  <>
                    <Table
                      bordered
                      columns={pmIntervalColumns}
                      // convert equipmentData from an object to an array and pass it to datasource
                      dataSource={equipmentDataArray}
                    />
                  </>
                ),
              },

              {
                label: `Scheduled Maintenance`,
                key: '6',
                children: (
                  <>
                    <Table
                      bordered
                      columns={maintenanceColumns}
                      dataSource={listOfPlannedMaintenance?.data?.filter(
                        (item: any) => item.fleetId?.trim() === equipmentData?.equipmentId?.trim()
                      )}
                      loading={isMaintenanceLoading}
                    />
                  </>
                ),
              },
              {
                label: `Bookings`,
                key: '7',
                children: (
                  <>
                    <Table bordered columns={bookingsColumns} dataSource={[]} />
                  </>
                ),
              },
              {
                label: `Agreements`,
                key: '8',
                children: (
                  <>
                    <div className='d-flex justify-content-between'>
                      <Space style={{marginBottom: 16}}>
                        <Button type={'primary'} onClick={() => setShowAgreementModal(true)}>
                          Add Agreement
                        </Button>
                      </Space>
                      <Modal
                        title='Add Agreement'
                        open={showAgreementModal}
                        onCancel={handleAgreementCancel}
                        closable={true}
                        footer={null}
                      >
                        <Form
                          layout={'vertical'}
                          form={meterUpdateForm}
                          // onFinish={onfinish}
                          labelCol={{span: 8}}
                          wrapperCol={{span: 24}}
                          title='Add Meter'
                        >
                          <Form.Item
                            name='equipmentId'
                            className={'d-none'}
                            label='Equipment ID'
                            rules={[{required: true}]}
                          >
                            <Input
                              readOnly
                              disabled
                              type='text'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                          <Form.Item
                            name='agreementDate'
                            label='Agreement Date'
                            rules={[{required: true}]}
                          >
                            <DatePicker className='form-control form-control-solid' />
                          </Form.Item>
                          <Form.Item
                            name='description'
                            label='Description'
                            rules={[{required: true}]}
                          >
                            <Input.TextArea
                              placeholder='Enter Description'
                              className='form-control form-control-solid'
                            />
                          </Form.Item>
                          <Button type='primary' htmlType='submit'>
                            Submit
                          </Button>
                        </Form>
                      </Modal>
                    </div>
                    <Table
                      bordered
                      columns={agreementColumns}
                      dataSource={listOfAgreements?.data?.filter(
                        (item: any) => item.fleetId?.trim() === equipmentData?.equipmentId?.trim()
                      )}
                      loading={isAgreementLoading}
                    />
                  </>
                ),
              },
            ]}
          />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default UpdateRegister
