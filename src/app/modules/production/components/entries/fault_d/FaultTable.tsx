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
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'
import {disableCursor, enableCursor} from '@fullcalendar/react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {ResolutionTable} from '../resolution/ResolutionTable'

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
  const [location, setLocation] = useState([])
  const [custodian, setCustodian] = useState([])
  const [form] = Form.useForm()
  const [formSolve] = Form.useForm()
  const [formDefect] = Form.useForm()
  const [selectedRowForSolve, setSelectedRowForSolve] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitSolveLoading, setSubmitSolveLoading] = useState(false)
  const [submitDefectLoading, setSubmitDefectLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  let QueryClient = useQueryClient()
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

  const {data: allFaultsEntries} = useQuery(
    'faults',
    () => axios.get(`${ENP_URL}/FaultEntriesApi`),
    {
      onSuccess: (data) => {
        const tableData = data?.data.map((item: any, index: number) => ({
          ...item,
          key: index,

          //Calculating duration: Present Time MINUS Time the fault was reported
          duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
          formattedDate: new Date(item.downtime).toLocaleString(),
        }))
        setGridData(tableData)
        setLoading(false)
      },
      onError: (error: any) => {
        setLoading(false)
        return error.statusText
      },
    }
  )

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
      title: 'FleetId',
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
      title: 'Down Date and Time',
      dataIndex: 'formattedDate',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => new Date(a.downtime).getTime() - new Date(b.downtime).getTime(),
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
      render: (_: any, record: any) =>
        gridData.length >= 1 ? (
          <>
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
                  dtime: record.duration,
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
          </>
        ) : null,
    },
  ]

  function handleCancel() {
    form.resetFields()
    setIsModalOpen(false)
  }

  function handleSolveCancel() {
    formSolve.resetFields()
    setIsSolveModalOpen(false)
  }

  function handleDefectCancel() {
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
      downtime: new Date().toISOString(),
      locationId: values.location,
      custodian: values.custodian,
    }
    const dataWithId = {...data, entryId: uuidv4()}
    try {
      const response = await axios.post(url, dataWithId)
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      //invalidate the query to refetch the data
      QueryClient.invalidateQueries('faults')
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

  const onSolveFinish = async (values: any) => {
    console.log('Solve values', values)
    setSubmitSolveLoading(true)
    const data = {
      entryId: values.entryId,
      // fleetId: values.fleetId,
      // vmModel: values.model,
      // vmClass: values.desc,
      // downType: values.dType,
      // downtime: values.dtime,
      // locationId: values.location,
      // custodian: values.custodian,
      //New columns being filled to the table
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
  }
  const onDefectFinish = async (values: any) => {
    // setSubmitDefectLoading(true)
    const data = {
      fleetId: values.fleetId,
      vmModel: values.model,
      vmClass: values.desc,
      downType: values.dType,
      downtime: new Date().toISOString(),
      locationId: values.location,
      custodian: values.custodian,
    }
    const dataWithId = {...data, entryId: uuidv4()}
    try {
      // const response = await axios.post(url, dataWithId)
      // setSubmitDefectLoading(false)
      formDefect.resetFields()
      setIsDefectModalOpen(false)
      // return response.statusText
    } catch (error: any) {
      // setSubmitDefectLoading(false)
      // return error.statusText
    }
  }
  // {/* End Elements to Post */}

  const loadEqupData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/VmequpsApi`)
      setDataSource(response.data)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      return error.statusText
    }
  }
  const loadFaultType = async () => {
    try {
      const response = await axios.get(`${ENP_URL}/vmfaltsapi`)
      setFaultType(response.data)
    } catch (error: any) {
      return error.statusText
    }
  }

  const loadLocation = async () => {
    try {
      const response = await axios.get(`${ENP_URL}/IclocsApi`)
      setLocation(response.data)
    } catch (error: any) {
      return error.statusText
    }
  }
  const loadCustodian = async () => {
    const response = await axios.get(`${ENP_URL}/VmemplsApi`)
    setCustodian(response.data)
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
    loadLocation()
    loadCustodian()
  }, [])

  /*
      Function that gets called whenever a fleetID is selected from the dropdown;
      this function search for the fleetID in the dataSource and returns the fleet object,
      then set the model and description of the fleet in the form
    */
  const onFleetIdChange = (fleetChosen: any) => {
    dataSource.map((item: any) =>
      item.fleetID === fleetChosen
        ? form.setFieldsValue({
            model: item.modlName,
            desc: item.modlClass,
          })
        : null
    )
  }
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
            label: `All Faults`,
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
                      Upload
                    </button>
                    <button type='button' className='btn btn-light-primary me-3'>
                      <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                      Export
                    </button>
                  </Space>
                </div>
                <Table
                  columns={columns}
                  dataSource={gridData.filter((fault: any) => fault.status === 0)}
                  bordered
                  loading={isSolveLoading ? isSolveLoading : loading}
                  rowKey={(record: any) => record.entryId}
                />
              </>
            ),
          },
          {
            label: `Resolution`,
            key: '2',
            children: (
              <>
                <ResolutionTable />
              </>
            ),
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
          <Form.Item name='fleetId' label='fleetID' rules={[{required: true}]}>
            <Select placeholder='Select a fleetID' onChange={onFleetIdChange}>
              {dataSource.map((item: any) => (
                <Option key={item.fleetID} value={item.fleetID}>
                  {item.fleetID} - {item.modlName} - {item.modlClass}
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
          <Form.Item name='hours' label='Fleet Hours' rules={[{required: true}]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name='dType' label='Down Type' rules={[{required: true}]}>
            <Select placeholder='Select Down Type'>
              {faultType.map((item: any) => (
                <Option key={uuidv4()} value={item.faultDesc}>
                  {item.faultDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='DateTime' label='Down Date and Time' rules={[{required: true}]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='DateTimereported' label='Time Reported' rules={[{required: true}]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='' label='Fault/Work Done details'>
            <TextArea />
          </Form.Item>
          <Form.Item name='mType' label='Maintenance Type' rules={[{required: true}]}>
            <Select placeholder='Maintenance Type'>
              <Option value={'Scheduled'}>Scheduled</Option>
              <Option value={'Unscheduled'}>Unscheduled</Option>
              <Option value={'Operational'}>Operational</Option>
              <Option value={'Damages'}>Damages</Option>
              <Option value={'Warranty'}>Warranty</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Custodian' name='custodian' rules={[{required: true}]}>
            <Select>
              {custodian.map((item: any) => (
                <Option
                  // @ts-ignore
                  value={item.emplCode}
                  key={uuidv4()}
                >
                  {item.emplCode} - {item.emplName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Location' name='location' rules={[{required: true}]}>
            <Select>
              {location.map((item: any) => (
                <Option
                  // @ts-ignore
                  value={item.locationCode}
                  key={uuidv4()}
                >
                  {item.locationCode} - {item.locationDesc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/*Add Fault End*/}

      {/*Solve*/}
      <Modal
        title='Solve'
        open={isSolveModalOpen}
        onCancel={handleSolveCancel}
        closable={true}
        footer={[
          <Space style={{display: 'flex', justifyContent: 'space-between'}}>
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
              Defect
            </Button>
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
                Solve
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
          <Form.Item name='fleetId' label='fleetID'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item name='entryId' label='EntryID' hidden>
            <Input disabled />
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
          <Form.Item name='dtime' label='Duration'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item label='Custodian' name='custodian'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item label='Location' name='location'>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
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
            <Select placeholder='Resolution Type'>
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
            <Select placeholder='Select Down Status'>
              <Option value={'progress'}>In Progress</Option>
              <Option value={'awaiting'}>Awaiting Parts</Option>
              <Option value={'awaitinglabour'}>Awaiting Labour</Option>
              <Option value={'completed'}>Completed</Option>
              <Option value={'others'}>Others</Option>
            </Select>
          </Form.Item>
          <Form.Item name='comment' label='Comment' rules={[{required: true}]}>
            <TextArea />
          </Form.Item>
          <Form.Item
            id='SolveTimeStarted'
            name='timeStarted'
            label='Time Started'
            rules={[{required: true}]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            id='solveTimeCompleted'
            name='timeCompleted'
            label='Time Completed'
            rules={[{required: true}]}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
      {/*Solve End*/}

      {/*Defect*/}
      <Modal
        title='Defect'
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
            Submit Defect
          </Button>,
        ]}
      >
        <Form
          form={formDefect}
          name='control-hooks'
          labelCol={{span: 8}}
          wrapperCol={{span: 14}}
          title='Defect'
          onFinish={onDefectFinish}
        >
          <Form.Item name='fleetId' label='Fleet ID' rules={[{required: true}]}>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item name='Defect Date' label='Expected Date' rules={[{required: true}]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='Item' label='Item' rules={[{required: true}]}>
            <TextArea />
          </Form.Item>
          <Form.Item name='Comment' label='Comment' rules={[{required: true}]}>
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export {FaultTable}
