import {Link, useLocation} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Space, Table, Tabs} from "antd";
import React, {useState} from "react";
import dayjs from 'dayjs';
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {addComponentToEquipment, ENP_URL, fetchFaults, getModels} from "../../../../urls";
import {useAuth} from "../../../auth";
import {fetchSchedules} from "../entries/equipment/calendar/requests";

const UpdateRegister = () => {
  const location = useLocation();
  let [showModal, setShowModal] = useState(false);
  const [showMeterModal, setShowMeterModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [componentSubmitLoading, setComponentSubmitLoading] = useState(false);
  const {tenant} = useAuth();
  const queryClient = useQueryClient();
  const {mutate: addComponent} = useMutation(addComponentToEquipment, {
    onSuccess: (data) => {
      queryClient.refetchQueries('equipments').then(() => {
        message.success('Component added successfully');
      })
      setComponentsGridData((prev: any) => [...prev, data?.data]);
      setComponentSubmitLoading(false);
    },
    onError: () => {
      message.error('Error adding component');
      setComponentSubmitLoading(false);
    }
  })

  const {
    data: listOfAgreements,
    isLoading: isAgreementLoading
  } = useQuery('agreements', () => axios.get(`${ENP_URL}/agreements`));

  const {data: listOfMeters, isLoading} = useQuery('meters', () => axios.get(`${ENP_URL}/hoursentry`));

  const {
    data: listOfFaults,
    isLoading: isFaultLoading
  } = useQuery('faults', () => fetchFaults(tenant));

  const {data: listOfModels} = useQuery('listOfModels', getModels)

  const {
    data: listOfPlannedMaintenance,
    isLoading: isMaintenanceLoading
  } = useQuery('listOfPlannedMaintenance', () => fetchSchedules(tenant));

  console.log('list of models', listOfModels);
  const handleCancel = () => {
    setShowModal(false);
  }
  const handleMeterCancel = () => {
    setShowMeterModal(false);
  }
  const handleAgreementCancel = () => {
    setShowAgreementModal(false);
  }

  const onComponentFinish = (values: any) => {
    setComponentSubmitLoading(true);
    const data = {
      ...values,
      tenantId: tenant,
    }
    addComponent(data);
    setShowModal(false);
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
  ]
  const metersColumns: any = [
    // {
    //   title: 'Equipment ID',
    //   dataIndex: 'fleetId'
    // },
    {
      title: 'Date',
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
    }
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
    }
  ]
  const maintenanceColumns: any = [
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      render: (serviceType: any) => serviceType?.name
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
    }
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
    }
  ]


  const [updateDetailsForm] = Form.useForm();
  const [generalInfoUpdateForm] = Form.useForm();
  const [componentUpdateForm] = Form.useForm();
  const [meterUpdateForm] = Form.useForm();
  const [agreementUpdateForm] = Form.useForm();

  const equipmentsQuery: any = queryClient.getQueryData(['equipments'])
  console.log('equipments', equipmentsQuery);
  const equipsData = equipmentsQuery?.data;
  console.log('equipment', equipsData);
  const equipmentData: any = location.state;
  console.log('equipment data', equipmentData);
  const componentEquipData = equipsData ? equipsData?.find((equip: any) => equip.equipmentId === equipmentData.equipmentId) : equipmentData;
  const [gridComponentsData, setComponentsGridData] = useState<any>(componentEquipData?.components);


  updateDetailsForm.setFieldsValue({
    equipmentId: equipmentData.equipmentId.trim(),
    serialNumber: equipmentData.serialNumber.trim(),
    description: equipmentData.description.trim(),
    manufactureDate: dayjs(equipmentData.manufactureDate),
    purchaseDate: dayjs(equipmentData.purchaseDate),
    endOfLifeDate: dayjs(equipmentData.endOfLifeDate),
    faCode: equipmentData.fixedAssetsCode?.trim(),
  })
  generalInfoUpdateForm.setFieldsValue({
    note: equipmentData.note,
    warrantyStartDate: dayjs(equipmentData.warrantyStartDate),
    warrantyEndDate: dayjs(equipmentData.warrantyEndDate),
    universalCode: equipmentData.universalCode,
    meterType: equipmentData.meterType,
  })
  componentUpdateForm.setFieldsValue({
    equipmentId: equipmentData.equipmentId.trim(),
  })
  meterUpdateForm.setFieldsValue({
    equipmentId: equipmentData.equipmentId.trim(),
  })
  agreementUpdateForm.setFieldsValue({
    equipmentId: equipmentData.equipmentId.trim(),
  })

  return <>
    <KTCard>
      <KTCardBody>
        <div className='row mb-0'>
          <div className='mb-3'>
            <h3 className='mb-0'>Equipment
              <span className='text-danger'> {equipmentData.equipmentId}</span>
            </h3>
          </div>
          <div className=''>
            <Link to='/equipment-register'>
              <button className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                <i className='la la-arrow-left'/>
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
                    // onFinish={onfinish}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 24}}
                    title='Update Equipment'
                  >
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='equipmentId' label='Equipment ID' rules={[{required: true}]}>
                          <Input
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='serialNumber' label='Serial Number' rules={[{required: true}]}>
                          <Input
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='fACode' label='Fixed Asset Code' rules={[{required: true}]}>
                          <Input
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='model' label='Model'
                                   rules={[{required: true}]}>
                          <Select
                            placeholder='Select Model'
                            className='form-select form-select-solid py-1 px-0'
                            showSearch
                            defaultValue={equipmentData.modelId}
                          >
                            {listOfModels?.data?.map((item: any) => (
                                <Select.Option
                                  value={item.modelId}>{item.manufacturer?.name} - {item.name}</Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='manufactureDate' label='Manufacture Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='purchaseDate' label='Purchase Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>

                    </div>

                    <div className='row mb-0'>
                      <div className='col-5 mb-7'>
                        <Form.Item name='description' label='Description' rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder='Enter Description'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-3 mb-7'>
                        <Form.Item name='endOfLifeDate' label='End Of Life Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Button
                      type='primary'
                      htmlType='submit'
                    >
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
                    // onFinish={onfinish}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 24}}
                    title='Add General Info'
                  >
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='universalCode' label='Universal Code' rules={[{required: true}]}>
                          <Input
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='meterType' label='Meter Type (Hours, Km)' rules={[{required: true}]}>
                          <Select
                            className='form-select form-select-solid py-1 px-0'
                            style={{width: '100%'}}
                          >
                            <Select.Option value='HOUR'>HOUR</Select.Option>
                            <Select.Option value='KILOMETER'>KiloMeter (Km)</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='warrantyEndDate' label='Warranty End Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                      <div className='col-4 mb-7'>
                        <Form.Item name='warrantyStartDate' label='Warranty Start Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className='row mb-0'>
                      <div className='col-4 mb-7'>
                        <Form.Item name='note' label='Note' rules={[{required: true}]}>
                          <Input.TextArea
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <Button
                      type='primary'
                      htmlType='submit'
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
                      <Form.Item name='serialNumber' label='Serial Number' rules={[{required: true}]}>
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
                      <Form.Item name='description' label='Description' rules={[{required: true}]}>
                        <Input.TextArea
                          placeholder='Enter Description'
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Form.Item name='installDate' label='Install Date' rules={[{required: true}]}>
                        <DatePicker
                          showTime
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Form.Item name='partNumber' label='Part Number' rules={[{required: true}]}>
                        <Input.TextArea
                          placeholder='Enter Part Number'
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Form.Item name='reasonForChange' label='Reason For Change' rules={[{required: true}]}>
                        <Input.TextArea
                          placeholder='Enter the reason for change'
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Form.Item name='lastChangeDate' label='Last Change Date' rules={[{required: true}]}>
                        <DatePicker
                          showTime
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Form.Item name='componentHours' label='Component Hours' rules={[{required: true}]}>
                        <InputNumber
                          type='number'
                          className='form-control form-control-solid'
                        />
                      </Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        loading={componentSubmitLoading}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Modal>
                  <div className='d-flex justify-content-between'>
                    <Space style={{marginBottom: 16}}>
                      {/*<Input.Search*/}
                      {/*    placeholder='Search Component'*/}
                      {/*    onSearch={value => console.log(value)}*/}
                      {/*    // style={{ width: 200 }}*/}
                      {/*/>*/}
                    </Space>
                    <Space style={{marginBottom: 16}}>
                      <Button
                        type={"primary"}
                        onClick={() => setShowModal(true)}>
                        Add Component
                      </Button>
                    </Space>
                  </div>
                  <Table
                    columns={componentColumns}
                    bordered
                    dataSource={gridComponentsData}
                  />
                </>
              ),
            },
            {
              label: `Meters`,
              key: '4',
              children: (
                <>
                  <div className='d-flex justify-content-between'>
                    <Space style={{marginBottom: 16}}>
                      <Button type={"primary"} onClick={() => setShowMeterModal(true)}>Add Meter</Button>
                    </Space>
                    <Modal
                      title='Add Meter'
                      open={showMeterModal}
                      onCancel={handleMeterCancel}
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
                        <Form.Item name='equipmentId' className={'d-none'} label='Equipment ID'
                                   rules={[{required: true}]}>
                          <Input
                            readOnly
                            disabled
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='date' label='Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='previousReading' label='Previous Reading' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Previous Reading'
                            type='number'
                            min={0}
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='currentReading' label='Current Reading' rules={[{required: true}]}>
                          <Input
                            placeholder='Enter Current Reading'
                            type='number'
                            min={0}
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                        >
                          Submit
                        </Button>
                      </Form>
                    </Modal>
                  </div>
                  <Table
                    bordered
                    columns={metersColumns}
                    dataSource={listOfMeters?.data?.filter((item: any) => item.fleetId.trim() === equipmentData?.equipmentId.trim())}
                    loading={isLoading}
                  />
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
                    dataSource={listOfFaults?.data?.filter((item: any) => item.fleetId.trim() === equipmentData?.equipmentId.trim())}
                    loading={isFaultLoading}
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
                    dataSource={listOfPlannedMaintenance?.data?.filter((item: any) => item.fleetId.trim() === equipmentData?.equipmentId.trim())}
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
                  <Table
                    bordered
                    columns={bookingsColumns}
                    dataSource={[]}
                  />
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
                      <Button type={"primary"} onClick={() => setShowAgreementModal(true)}>Add Agreement</Button>
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
                        <Form.Item name='equipmentId' className={'d-none'} label='Equipment ID'
                                   rules={[{required: true}]}>
                          <Input
                            readOnly
                            disabled
                            type='text'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='agreementDate' label='Agreement Date' rules={[{required: true}]}>
                          <DatePicker
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Form.Item name='description' label='Description' rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder='Enter Description'
                            className='form-control form-control-solid'
                          />
                        </Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                        >
                          Submit
                        </Button>
                      </Form>
                    </Modal>
                  </div>
                  <Table
                    bordered
                    columns={agreementColumns}
                    dataSource={listOfAgreements?.data?.filter((item: any) => item.fleetId.trim() === equipmentData?.equipmentId.trim())}
                    loading={isAgreementLoading}
                  />
                </>
              ),
            }
          ]}
        />
        <Modal
          title='Add Meter'
          open={showMeterModal}
          onCancel={handleMeterCancel}
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
            <Form.Item name='equipmentId' className={'d-none'} label='Equipment ID'
                       rules={[{required: true}]}>
              <Input
                readOnly
                disabled
                type='text'
                className='form-control form-control-solid'
              />
            </Form.Item>
            <Form.Item name='date' label='Date' rules={[{required: true}]}>
              <DatePicker
                className='form-control form-control-solid'
              />
            </Form.Item>
            <Form.Item name='previousReading' label='Previous Reading' rules={[{required: true}]}>
              <Input
                placeholder='Enter Previous Reading'
                type='number'
                min={0}
                className='form-control form-control-solid'
              />
            </Form.Item>
            <Form.Item name='currentReading' label='Current Reading' rules={[{required: true}]}>
              <Input
                placeholder='Enter Current Reading'
                type='number'
                min={0}
                className='form-control form-control-solid'
              />
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  </>
}

export default UpdateRegister
