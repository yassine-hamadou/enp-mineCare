import {Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {KTSVG} from "../../../../../../_metronic/helpers";
import TextArea from "antd/lib/input/TextArea";
import {conditionObj} from "devexpress-reporting/designer/controls/metadata/properties/formattingrules";
import Link from "antd/lib/typography/Link";

const FaultTable = () => {
    const [gridData, setGridData] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSolveModalOpen, setIsSolveModalOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [faultType, setFaultType] = useState([])
    const [location, setLocation] = useState([])
    const [custodian, setCustodian] = useState([])
    const [form] = Form.useForm()
    const [formSolve] = Form.useForm()
    const [selectedRowForSolve, setSelectedRowForSolve] = useState<any>()
    const [solveFormValues, setSolveFormValues] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)



    const handleInputChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === '') {
            loadData()
        }
    }
    // Modal functions

    const showModal = () => {
        setIsModalOpen(true)
    }


    const showModalSolve = () => {
        setIsSolveModalOpen(true)
    }
    // Modal functions end
    const loadData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://localhost:3001/FaultEntriesApi'
                // 'http://localhost:3001/FaultEntriesApi'
            )

            //Formatting date to the received data
            const dataReceivedfromAPI = {
                get withFormatDate() {
                    return response.data.map((item: any, index: number) => ({
                        ...item,
                        key: index,

                        //Calculating duration: Present Time MINUS Time the fault was reported
                        duration: `${dhm(new Date().getTime() - new Date(item.downtime).getTime())}`,
                        formattedDate: new Date(item.downtime).toLocaleString(),
                    }))
                }
            }
            console.log("Datafrom apt", dataReceivedfromAPI.withFormatDate)
            setGridData(dataReceivedfromAPI.withFormatDate)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            return error.statusText
        }
    }

    function dhm(t: any) {
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor((t - d * cd) / ch),
            m = Math.round((t - d * cd - h * ch) / 60000),
            pad = function (n: any) {
                return n < 10 ? '0' + n : n;
            };
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return `${d} Day(s) ${pad(h)} Hour(s) ${pad(m)} Minute(s)`;
    }
    const deleteData = async (element: any) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/FaultEntriesApi/${element.entryId}`
            )
            // update the local state so that react can refecth and re-render the table with the new data
            const newData = gridData.filter((item: any) => item.entryId !== element.entryId)
            setGridData(newData)
            return response.status
        } catch (e) {
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
                if (a.fleetId < b.fleetId) return -1;
                if (a.fleetId > b.fleetId) return 1;
                return 0;
            }
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
            sorter: (a: any, b: any) => new Date(a.downtime).getTime() - new Date(b.downtime).getTime()
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
            dataIndex: 'duration'
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
                                    fleetId: record.fleetId,
                                    model: record.vmModel,
                                    desc: record.vmClass,
                                    dType: record.downType,
                                    custodian: record.custodian,
                                    location: record.locationId,
                                    dtime: record.duration
                                })
                                handleSolve(record)
                            }}
                        >
                            Solve
                        </button>
                        <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
                            <button className='btn btn-light-danger btn-sm'>
                                Delete
                            </button>
                        </Popconfirm>
                    </>
                ) : null,
        }
    ]

    function handleCancel() {
        form.resetFields()
        setIsModalOpen(false)
    }

    function handleSolveCancel() {
        formSolve.resetFields()
        setIsSolveModalOpen(false)
    }

    const {Option} = Select

    function handleSolve(record: any) {
        showModalSolve();
        setSelectedRowForSolve(record)
        console.log("record in handle solve", selectedRowForSolve)
    }


    // {/* Start Elements to Post */}
    // const url = 'http://localhost:3001/FaultEntriesApi'
    const url = 'http://localhost:3001/FaultEntriesApi'
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
            loadData()
            return response.statusText
        } catch (error: any) {
            setSubmitLoading(false)
            return error.statusText
        }
    }

    const onSolveFinish = async (values: any) => {
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
            loadData()
            return response.statusText
        } catch (error: any) {
            setSubmitLoading(false)
            return error.statusText
        }
    }

    // {/* End Elements to Post */}




    const loadEqupData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://localhost:3001/VmequpsApi'
            )
            setDataSource(response.data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            return error.statusText
        }
    }

    const loadFaultType = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/vmfaltsapi'
            )
            setFaultType(response.data)
        } catch (error: any) {
            return error.statusText
        }
    }

    const loadLocation = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/IclocsApi'
            )
            setLocation(response.data)
        } catch (error: any) {
            return error.statusText
        }
    }

    const loadCustodian = async () => {
        const response = await axios.get(
            'http://localhost:3001/VmemplsApi'
        )
        setCustodian(response.data)
    }

    useEffect(() => {
        loadData()
        loadEqupData()
        loadFaultType()
        loadLocation()
        loadCustodian()
    }, [])
    useEffect(() => {
        setSolveFormValues(selectedRowForSolve)
    }, [selectedRowForSolve])

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
console.log("selectedRowForSolve", selectedRowForSolve)
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)'
        }}>
            <div className='d-flex justify-content-between'>
                <Space style={{marginBottom: 16}}>
                    <Input
                        placeholder='Enter Search Text'
                        onChange={handleInputChange}
                        type='text'
                        allowClear
                        value={searchText}
                    />
                    <Button type='primary'>
                        Search
                    </Button>
                </Space>
                <Space style={{marginBottom: 16}}>
                    <button type='button' className='btn btn-primary me-3' onClick={showModal}>
                        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                        Add
                    </button>
                    <button type='button' className='btn btn-light-primary me-3'>
                        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                        Upload
                    </button>
                    <button type='button' className='btn btn-light-primary me-3'>
                        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>

                        Export
                    </button>
                </Space>
            </div>
            <Table columns={columns} dataSource={gridData} bordered loading={loading}/>
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
                        <Input readOnly/>
                    </Form.Item>
                    <Form.Item name='desc' label='Description'>
                        <Input readOnly/>
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
                    <Form.Item name='' label='Fault/Work Done details' >
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
            <Modal
                title='Solve'
                open={isSolveModalOpen}
                onCancel={handleSolveCancel}
                closable={true}
                footer={[
                    <Button>
                        Defect
                    </Button>,
                    <Button key='back' onClick={handleSolveCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        htmlType='submit'
                        loading={submitLoading}
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            formSolve.submit()
                        }}
                    >
                        Solve
                    </Button>,
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
                    <Form.Item name='fleetId' label='fleetID' rules={[{required: true}]}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name='model' label='Model'>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name='desc' label='Description'>
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item name='dType' label='Down Type' rules={[{required: true}]}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name='dtime' label='Duration' rules={[{required: true}]}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name='dstatus' label='Down Status' rules={[{required: true}]}>
                        <Select placeholder='Select Down Status'>
                            <Option value={'progress'}>In Progress</Option>
                            <Option value={'awaiting'}>Awaiting Parts</Option>
                            <Option value={'awaitinglabour'}>Awaiting Labour</Option>
                            <Option value={'completed'}>Completed</Option>
                            <Option value={'others'}>Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Custodian' name='custodian' rules={[{required: true}]}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label='Location' name='location' rules={[{required: true}]}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name='comment' label='Comment' >
                        <TextArea />
                    </Form.Item>
                    <Form.Item name='timeStarted' label='Time Started' >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name='timeCompleted' label='Time Completed' >
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export {FaultTable}
