import {
  Badge,
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
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {
  concatToFaultDetails,
  ENP_URL,
  fetchFaults,
  getCustodians,
  getDowntypes,
  getEquipment,
  getLocations,
  getPriority,
  getSources,
  postBacklogs,
} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {ResolutionTable} from '../resolution/ResolutionTable'
import {useAuth} from '../../../../auth'
import DevexpressDashboardComponent from '../../../../../pages/dashboard/DevexpressDashboardComponent'

export function dhm(t: any) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000)
  // pad = function (n: any) {
  //     return n < 10 ? '0' + n : n;
  // };
  if (m === 60) {
    h++
    m = 0
  }
  if (h === 24) {
    d++
    h = 0
  }
  return d * 24 + h + ` Hour(s) ${m} Minute(s)`
  // return `${d} Day(s) ${pad(h)} Hour(s) ${pad(m)} Minute(s)`;
}

const FaultTable = () => {
  const [gridData, setGridData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false)
  const [isDefectModalOpen, setIsDefectModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [faultType, setFaultType] = useState([])
  const [form] = Form.useForm()
  const [formSolve] = Form.useForm()
  const [formDefect] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitSolveLoading, setSubmitSolveLoading] = useState(false)
  const [submitDefectLoading, setSubmitDefectLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [detailsUpdate, setDetailsUpdate] = useState(false)
  const {data: downTypeData} = useQuery('downtype', () => getDowntypes(tenant))
  const {data: sourceData, isLoading: sourceIsLoading} = useQuery('source', () =>
    getSources(tenant)
  )
  const {data: priorityData, isLoading: priorityIsLoading} = useQuery('priority', () =>
    getPriority(tenant)
  )
  const {data: equipmentData, isLoading: equipmentIsLoading} = useQuery('equipments', () =>
    getEquipment(tenant)
  )
  const {data: locationData, isLoading: locationIsLoading} = useQuery('location', () =>
    getLocations(tenant)
  )
  const {data: custodianData, isLoading: custodianIsLoading} = useQuery('custodian', () =>
    getCustodians(tenant)
  )
  const {mutate: addBacklog} = useMutation('addBacklog', (data) => postBacklogs(data, tenant), {
    onSuccess: () => {
      setIsDefectModalOpen(false)
      message.success('Backlog added successfully')
      setSubmitDefectLoading(false)
      formDefect.resetFields()
    },
    onError: () => {
      message.error('Error adding backlog, Please try again')
      setSubmitDefectLoading(false)
    },
  })

  let QueryClient = useQueryClient()
  const {tenant} = useAuth()
  const handleInputChange = (e: any) => {
    globalSearch(e.target.value)
    if (e.target.value === '') {
      let initialData: any = QueryClient.getQueryData('faults')
      setGridData(
        initialData?.data
          .filter((fault: any) => fault.status === 0)
          .map((item: any, index: number) => ({
            ...item,
            key: index,

            //Calculating duration: Present Time MINUS Time the fault was reported
            duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
            formattedDate: new Date(item.downtime).toLocaleString(),
          }))
      )
    }
  }
  // Modal functions

  const showModal = () => {
    setIsModalOpen(true)
  }

  const showModalSolve = () => {
    setIsSolveModalOpen(true)
  }

  const detailsOpen = (record: any) => {
    setDetailsUpdate(true)
    console.log('record', record)
    formSolve.setFieldsValue({
      entryId: record.entryId,
      faultDetails: record.faultDetails,
    })
    showModalSolve()
  }
  const showModalDefect = () => {
    setIsDefectModalOpen(true)
  }

  const ApplyHover = () => {
    setIsHovering(true)
  }

  const RemoveHover = () => {
    setIsHovering(false)
  }
  // Modal functions end

  const {data: allFaultsEntries, isLoading} = useQuery('faults', () => fetchFaults(tenant))
  const {data: allEquipment} = useQuery('equipments', () => getEquipment(tenant))

  // const loadData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${ENP_URL}/FaultEntriesApi`);
  //
  //     //Formatting date to the received data
  //     const dataReceivedfromAPI = {
  //       get withFormatDate() {
  //         return response.data.map((item: any, index: number) => ({
  //           ...item,
  //           key: index,
  //
  //           //Calculating duration: Present Time MINUS Time the fault was reported
  //           duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
  //           formattedDate: new Date(item.downtime).toLocaleString()
  //         }));
  //       }
  //     };
  //     console.log("Datafrom apt", dataReceivedfromAPI.withFormatDate);
  //     setGridData(dataReceivedfromAPI.withFormatDate);
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //     return error.statusText;
  //   }
  // };

  const deleteData = async (element: any) => {
    setLoading(true)
    try {
      const response = await axios.delete(`${ENP_URL}/FaultEntriesApi/${element.entryId}`)
      // update the local state so that react can refecth and re-render the table with the new data
      const newData = gridData.filter((item: any) => item.entryId !== element.entryId)
      setGridData(newData)
      QueryClient.invalidateQueries('faults')

      message.success('Fault deleted successfully')
      setLoading(false)
      return response.status
    } catch (e) {
      message.error('Error deleting fault, Please try again')
      setLoading(false)
      return e
    }
  }

  function handleDelete(element: any) {
    deleteData(element)
  }

  // @ts-ignore
  const columns: any = [
    {
      title: 'Equipment ID',
      dataIndex: 'fleetId',
      key: 'key',
      sorter: (a: any, b: any) => {
        if (a.fleetId < b.fleetId) return -1
        if (a.fleetId > b.fleetId) return 1
        return 0
      },
    },
    {
      title: 'Model',
      dataIndex: 'vmModel',
      sorter: (a: any, b: any) => {
        if (a.vmModel > b.vmModel) {
          return 1
        }
        if (b.vmModel > a.vmModel) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Description',
      dataIndex: 'vmClass',
    },
    {
      title: 'Down Type',
      dataIndex: 'downType',
    },
    {
      title: 'Fault Details',
      dataIndex: 'faultDetails',
    },
    {
      title: 'Down Date and Time',
      dataIndex: 'formattedDate',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => new Date(a.downtime).getTime() - new Date(b.downtime).getTime(),
    },
    {
      title: 'Time reported',
      dataIndex: 'reportedDate',
      render: (reportedDate: any) =>
        reportedDate ? new Date(reportedDate).toLocaleString() : 'No Date',
    },
    {
      title: 'Custodian',
      dataIndex: 'custodian',
    },
    {
      title: 'Location',
      dataIndex: 'locationId',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <>
          <Space size='middle'>
            <button
              type={'button'}
              className='btn btn-light-primary btn-sm'
              onClick={() => detailsOpen(record)}
            >
              Details
            </button>
            <button
              className='btn btn-light-success btn-sm'
              onClick={() => {
                formSolve.setFieldsValue({
                  entryId: record.entryId,
                  fleetId: record.fleetId,
                  model: record.vmModel,
                  desc: record.vmClass,
                  dType: record.downType,
                  custodian: record.custodian,
                  location: record.locationId,
                  faultDetails: record.faultDetails,
                  dtime: record.duration,
                  downTime: new Date(record.downtime).toDateString(),
                })
                handleSolve(record)

                //set the defect fleet id to the selected row
                formDefect.setFieldsValue({
                  fleetId: record.fleetId,
                })
              }}
            >
              Solve
            </button>
            <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
              <button className='btn btn-light-danger btn-sm'>Delete</button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ]

  function handleCancel() {
    setDetailsUpdate(false)
    form.resetFields()
    setIsModalOpen(false)
  }

  function handleSolveCancel() {
    setDetailsUpdate(false)
    formSolve.resetFields()
    setIsSolveModalOpen(false)
  }

  function handleDefectCancel() {
    setDetailsUpdate(false)
    formDefect.resetFields()
    setIsDefectModalOpen(false)
  }

  function handleSolve(record: any) {
    showModalSolve()
  }

  function handleDefect(record: any) {
    showModalDefect()
  }

  // {/* Start Elements to Post */}
  const url = `${ENP_URL}/FaultEntriesApi`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      fleetId: values.fleetId,
      vmModel: values.model,
      vmClass: values.desc,
      downType: values.dType,
      downtime: new Date(values.DateTime.$d).toISOString(),
      locationId: values.location,
      custodian: values.custodian,
      faultDetails: values.faultDetails,
      reportedDate: new Date(values.ReportedDate.$d).toISOString(),
    }
    console.log('Success:', data)
    // return  data
    const dataWithId = {...data, entryId: uuidv4(), tenantId: tenant}
    try {
      const response = await axios.post(url, dataWithId)
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      //invalidate the query to refetch the data
      await QueryClient.invalidateQueries('faults')
      message.success('Fault reported successfully')
      return response.statusText
    } catch (error: any) {
      setSubmitLoading(false)
      message.error('Error reporting fault, Please try again')
      return error.statusText
    }
  }

  //react query
  const {
    mutate: solveFault,
    isLoading: isSolveLoading,
    data,
    error,
  } = useMutation(
    (values: any) =>
      axios.patch(
        `${ENP_URL}/FaultEntriesApi/${values.entryId}`,
        [
          {
            op: 'replace',
            path: '/comment',
            value: values.comment,
          },
          {
            op: 'replace',
            path: '/downStatus',
            value: values.downStatus,
          },
          {
            op: 'replace',
            path: '/resolutionId',
            value: values.resolutionId,
          },
          {
            op: 'replace',
            path: '/resolutionType',
            value: values.resolutionType,
          },
          {
            op: 'replace',
            path: '/wtimeStart',
            value: values.wtimeStart,
          },
          {
            op: 'replace',
            path: '/wtimeEnd',
            value: values.wtimeEnd,
          },
          {
            op: 'replace',
            path: '/status',
            value: values.status,
          },
        ],
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      ),
    {
      onSuccess: () => {
        console.log('Solved', data)
        //invalidate the query to refetch the data
        QueryClient.invalidateQueries('faults')
        message.success('Fault Solved Successfully!')
      },
      onError: () => {
        console.log('Error', error)
        message.error('Error Solving Fault')
      },
    }
  )

  const {mutate: addToFaultDetails} = useMutation(concatToFaultDetails, {
    onSuccess: () => {
      QueryClient.invalidateQueries('faults')
      setDetailsUpdate(false)
      formSolve.resetFields()
      setIsSolveModalOpen(false)
      setSubmitSolveLoading(false)
      message.success('Added to fault details successfully!')
    },
    onError: () => {
      message.error('Error adding to fault details')
      setSubmitSolveLoading(false)
    },
  })

  const onSolveFinish = async (values: any) => {
    setSubmitSolveLoading(true)
    if (!detailsUpdate) {
      console.log('Solve values', values)
      const data = {
        entryId: values.entryId,
        resolutionId: uuidv4(),
        resolutionType: values.resolutionType,
        downStatus: values.dStatus,
        comment: values.comment,
        wtimeStart: values.timeStarted,
        wtimeEnd: values.timeCompleted,
        status: 1,
      }
      try {
        //if time completed is less than time started, do not submit but rather
        //show an error message
        if (new Date(data.wtimeEnd).getTime() < new Date(data.wtimeStart).getTime()) {
          setSubmitSolveLoading(false) //stop loading
          formSolve.setFields(
            //set warning message
            [
              {
                name: 'timeCompleted',
                errors: ['Sorry Time completed cannot be less than Time Started'],
              },
            ]
          )
          return message.error('Sorry Time completed cannot be less than Time Started')
        }
        solveFault(data)

        console.log('Data, to repost in fault', data)
        console.log('Solve fault', solveFault)

        setSubmitSolveLoading(false)
        formSolve.resetFields()
        setIsSolveModalOpen(false)
      } catch (error: any) {
        console.log('Error in cath ', error)
        setSubmitSolveLoading(false)
        formSolve.resetFields()
        return error.statusText
      }
    } else {
      //if detailsUpdate is true, then we are updating the details of the fault
      //so we need to send a patch request
      try {
        //concate the existing fault details with the new ones
        const newDetails = values?.faultDetails + values?.addToFaultDetails + '\n|----End----|\n'
        console.log('New details', newDetails)
        const data = {
          entryId: values.entryId,
          faultDetails: newDetails,
        }
        addToFaultDetails(data)

        console.log('Data, to repost in fault', data)
        console.log('Solve fault', solveFault)

        setSubmitSolveLoading(false)
        formSolve.resetFields()
        setIsSolveModalOpen(false)
      } catch (error: any) {
        console.log('Error in cath ', error)
        setSubmitSolveLoading(false)
        formSolve.resetFields()
        return error.statusText
      }
    }
  }
  const onDefectFinish = async (values: any) => {
    setSubmitDefectLoading(true)
    // const data = {
    //   fleetId: values.fleetId,
    //   vmModel: values.model,
    //   vmClass: values.desc,
    //   downType: values.dType,
    //   downtime: new Date().toISOString(),
    //   locationId: values.location,
    //   custodian: values.custodian,
    // }
    // const dataWithId = {...data, entryId: uuidv4()}
    addBacklog(values)
  }
  // {/* End Elements to Post */}

  const loadEqupData = async () => {
    setLoading(true)
    try {
      const response = await fetchFaults(tenant)
      setDataSource(response.data)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      return error.statusText
    }
  }
  const loadFaultType = async () => {
    try {
      const response = await axios.get(`${ENP_URL}/downTypes/tenant/${tenant}`)
      setFaultType(response.data)
    } catch (error: any) {
      return error.statusText
    }
  }

  const globalSearch = (searchValue: string) => {
    //searchValue is the value of the search input
    let initialData: any = QueryClient.getQueryData('faults')
    const searchResult = initialData?.data
      .filter((item: any) => {
        return (
          item.fleetId.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.vmModel.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.vmClass.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.downType.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.custodian.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.locationId.toLowerCase().includes(searchValue.toLowerCase())
        )
      })
      .map((item: any, index: number) => ({
        ...item,
        key: index,

        //Calculating duration: Present Time MINUS Time the fault was reported
        duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
        formattedDate: new Date(item.downtime).toLocaleString(),
      }))
    setGridData(searchResult.filter((item: any) => item.status === 0)) //set the grid data to the search result
  }

  const {Option} = Select

  useEffect(() => {
    // loadData();
    loadEqupData()
    loadFaultType()
  }, [])

  /*
        Function that gets called whenever a fleetID is selected from the dropdown;
        this function search for the fleetID in the dataSource and returns the fleet object,
        then set the model and description of the fleet in the form
      */
  const onFleetIdChange = (fleetChosen: any) => {
    allEquipment?.data?.map((item: any) =>
      item.equipmentId === fleetChosen
        ? form.setFieldsValue({
            model: item?.model?.name,
            desc: item?.description,
          })
        : null
    )
  }
  // const faults = gridData.filter((fault: any) => fault.status === 0)

  const allFaults = allFaultsEntries?.data?.map((item: any, index: number) => ({
    ...item,
    key: index,
    //Calculating duration: Present Time MINUS Time the fault was reported
    duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
    formattedDate: new Date(item.downtime).toLocaleString(),
  }))

  const faults = allFaults?.filter((fault: any) => fault.status === 0)

  console.log('Faults', faults)

  // const numFaultsForBadge = allFaultsEntries?.data?.filter((fault: any) => fault.status === 0).length // Refactor this
  const numFaultsForBadge = faults?.length

  // Solved less  7 days ago
  // const solvedFaults = allFaultsEntries?.data?
  const solvedFaults = allFaults?.filter(
    (fault: any) =>
      fault.status === 1 &&
      new Date(fault.wtimeEnd).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  )
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <Tabs
        defaultActiveKey='1'
        items={[
          {
            label: (
              <Badge count={numFaultsForBadge ? numFaultsForBadge : 0}>
                <span className='me-4'>All Faults</span>
              </Badge>
            ),
            key: '1',
            children: (
              <>
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
                    <button type='button' className='btn btn-primary me-3' onClick={showModal}>
                      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      Add
                    </button>
                    <button type='button' className='btn btn-light-primary me-3'>
                      <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                      Export
                    </button>
                  </Space>
                </div>
                <Table
                  columns={columns}
                  dataSource={faults}
                  bordered
                  loading={isLoading}
                  rowKey={(record: any) => record.entryId}
                  scroll={{x: 1500}}
                  pagination={{
                    defaultPageSize: 10,
                  }}
                />
              </>
            ),
          },
          {
            label: (
              <Badge
                style={{backgroundColor: '#52c41a'}}
                count={solvedFaults ? solvedFaults.length : 0}
              >
                <span className='me-4'>Resolved Faults</span>
              </Badge>
            ),
            key: '2',
            children: (
              <>
                <ResolutionTable faults={allFaults} />
              </>
            ),
          },
          {
            label: <span className='me-4'>Analysis</span>,
            key: '3',
            children: <DevexpressDashboardComponent dashboardId={'faultSearchable'} />,
          },
        ]}
      />

      {/*Add Fault*/}
      <Modal
        title='Add Fault'
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
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
          form={form}
          name='control-hooks'
          labelCol={{span: 8}}
          wrapperCol={{span: 14}}
          title='Add Fault'
          onFinish={onFinish}
        >
          <Form.Item name='fleetId' label='Equipment ID' rules={[{required: true}]}>
            <Select showSearch placeholder='Select an Equipment' onChange={onFleetIdChange}>
              {allEquipment?.data?.map((item: any) => (
                <Option key={item.equipmentId} value={item.equipmentId}>
                  {item.equipmentId} - {item.model?.name} - {item.model?.modelClass?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='model' label='Model'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item name='desc' label='Description'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item name='hours' label='Equipment Hours' rules={[{required: true}]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='dType' label='Down Type' rules={[{required: true}]}>
            <Select placeholder='Select Down Type' showSearch={true}>
              {faultType?.map((item: any) => (
                <Option key={uuidv4()} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='DateTime'
            label='Down Date and Time'
            rules={[
              {required: true},
              ({getFieldValue}) => ({
                validator(rule, value) {
                  console.log('value', value)
                  // rule.warningOnly = true
                  if (!value) {
                    return Promise.reject()
                  } else if (value.$d.getTime() < new Date().getTime() - 7 * 24 * 60 * 60 * 1000) {
                    //give a warning if the date is more than 7 days old
                    return Promise.reject('Date is more than 7 days old')
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name='ReportedDate'
            label='Time Reported'
            rules={[
              {required: true},
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value) {
                    return Promise.reject()
                  } else if (value.$d.getTime() > new Date().getTime()) {
                    return Promise.reject('Reported Date more than Current Date')
                  } else if (value.$d.getTime() >= new Date(getFieldValue('DateTime')).getTime()) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject('Reported Date more than Down Date')
                  }
                  // return Promise.reject('Reported Date more than Down Date');
                },
              }),
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='faultDetails' label='Fault Details' rules={[{required: true}]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name='mType' label='Maintenance Type' rules={[{required: true}]}>
            <Select placeholder='Maintenance Type' showSearch={true}>
              <Option value={'Scheduled'}>Scheduled</Option>
              <Option value={'Unscheduled'}>Unscheduled</Option>
              <Option value={'Operational'}>Operational</Option>
              <Option value={'Damages'}>Damages</Option>
              <Option value={'Warranty'}>Warranty</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Custodian' name='custodian' rules={[{required: true}]}>
            <Select showSearch={true} loading={custodianIsLoading}>
              {custodianData?.data?.map((item: any) => (
                <Option
                  // @ts-ignore
                  value={item.id}
                  key={uuidv4()}
                >
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Location' name='location' rules={[{required: true}]}>
            <Select showSearch={true} loading={locationIsLoading}>
              {locationData?.data?.map((item: any) => (
                <Option
                  // @ts-ignore
                  value={item.id}
                  key={uuidv4()}
                >
                  {item?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/*Add Fault End*/}

      {/*Solve*/}
      <Modal
        title={detailsUpdate ? 'Add to fault details' : 'Solve Fault'}
        open={isSolveModalOpen}
        onCancel={handleSolveCancel}
        closable={true}
        footer={[
          <Space style={{display: 'flex', justifyContent: 'space-between'}}>
            {!detailsUpdate && (
              <Button
                onClick={showModalDefect}
                type='dashed'
                style={{
                  border: isHovering ? '1px solid orange' : '1px dashed orange',
                  color: isHovering ? 'orange' : 'black',
                }}
                onMouseEnter={ApplyHover}
                onMouseLeave={RemoveHover}
              >
                Backlog
              </Button>
            )}
            <Space>
              <Button key='back' onClick={handleSolveCancel}>
                Cancel
              </Button>
              <Button
                key='submit'
                type='primary'
                htmlType='submit'
                loading={submitSolveLoading}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  formSolve.submit()
                }}
              >
                {detailsUpdate ? 'Add Details' : 'Solve'}
              </Button>
            </Space>
          </Space>,
        ]}
      >
        <Form
          form={formSolve}
          name='control-hooks'
          labelCol={{span: 8}}
          wrapperCol={{span: 14}}
          title='Solve'
          onFinish={onSolveFinish}
        >
          <Form.Item name='entryId' label='EntryID' hidden>
            <Input disabled />
          </Form.Item>
          {!detailsUpdate && (
            <>
              <Form.Item name='fleetId' label='Equipment ID'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item name='model' label='Model'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item name='desc' label='Description'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>

              <Form.Item name='dType' label='Down Type'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item name='downTime' label='Down Time'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item name='dtime' label='Duration'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item label='Custodian' name='custodian'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
              <Form.Item label='Location' name='location'>
                <Input disabled style={{color: 'black'}} />
              </Form.Item>
            </>
          )}
          <Form.Item label={'Fault Details'} name='faultDetails'>
            <Input.TextArea rows={4} disabled style={{color: 'black'}} />
          </Form.Item>
          {detailsUpdate && (
            <>
              <Form.Item
                label={'Add to fault details'}
                name='addToFaultDetails'
                rules={[{required: true}]}
              >
                <Input.TextArea rows={4} style={{color: 'black'}} />
              </Form.Item>
            </>
          )}
          {!detailsUpdate && (
            <>
              <Form.Item
                name='resolutionType'
                label='Resolution Type'
                rules={[
                  {
                    required: true,
                    message: 'Resolution Type is required',
                  },
                ]}
              >
                <Select showSearch={true} placeholder='Resolution Type'>
                  <Option value={'Scheduled'}>Scheduled</Option>
                  <Option value={'Unscheduled'}>Unscheduled</Option>
                  <Option value={'Operational'}>Operational</Option>
                  <Option value={'Damages'}>Damages</Option>
                  <Option value={'Warranty'}>Warranty</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='dStatus'
                label='Down Status'
                rules={[{required: true, message: 'Down Status is required'}]}
              >
                <Select showSearch={true} placeholder='Select Down Status'>
                  <Option value={'progress'}>In Progress</Option>
                  <Option value={'awaiting'}>Awaiting Parts</Option>
                  <Option value={'awaitinglabour'}>Awaiting Labour</Option>
                  <Option value={'completed'}>Completed</Option>
                  <Option value={'others'}>Others</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='comment'
                label='Comment'
                rules={[{required: true, message: 'Comment is Required'}]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                id='SolveTimeStarted'
                name='timeStarted'
                label='Time Started'
                rules={[
                  {required: true, message: 'Time Started is required'},
                  ({getFieldValue}) => ({
                    validator(rule, value) {
                      console.log('value', value)
                      if (
                        !value ||
                        new Date(getFieldValue('downTime')).getTime() < value.$d.getTime()
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Time Started must be after Down Time')
                    },
                  }),
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                id='solveTimeCompleted'
                name='timeCompleted'
                label='Time Completed'
                rules={[
                  {required: true, message: 'Time Completed is required'},
                  ({getFieldValue}) => ({
                    validator(rule, value) {
                      if (
                        !value ||
                        value.$d.getTime() > new Date(getFieldValue('timeStarted')).getTime()
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Time Completed must be after Time Started')
                    },
                  }),
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      {/*Solve End*/}

      {/*Defect*/}
      <Modal
        title='Backlog'
        open={isDefectModalOpen}
        onCancel={handleDefectCancel}
        closable={true}
        footer={[
          <Button key='back' onClick={handleDefectCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            htmlType='submit'
            loading={submitDefectLoading}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              formDefect.submit()
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={formDefect}
          name='control-hooks'
          labelCol={{span: 8}}
          wrapperCol={{span: 14}}
          title={'Add Backlog'}
          onFinish={onDefectFinish}
          layout={'horizontal'}
        >
          <Form.Item name='id' label='ID' hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name='equipmentId' label='Equipment ID'>
            <Select showSearch placeholder='Select an equipment' loading={equipmentIsLoading}>
              {equipmentData?.data?.map((equipment: any) => (
                <Option value={equipment.equipmentId}>{equipment.equipmentId}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='bdate' label='Backlog Date'>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='item' label='Item' rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item name='note' label='Defect Description' rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item name='referenceId' label='Reference No'>
            <Input />
          </Form.Item>
          <Form.Item name='priority' label='Priority'>
            <Select showSearch placeholder='Select a priority' loading={priorityIsLoading}>
              {priorityData?.data?.map((priority: any) => (
                <Option value={priority?.priorityId}>{priority.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='source' label='Source'>
            <Select showSearch placeholder='Select a source' loading={sourceIsLoading}>
              {sourceData?.data?.map((source: any) => (
                <Option value={source?.id}>{source.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='downType' label='Down Type'>
            <Select showSearch placeholder='Select a down type'>
              {downTypeData?.data?.map((downType: any) => (
                <Option value={downType?.id}>{downType.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FaultTable
