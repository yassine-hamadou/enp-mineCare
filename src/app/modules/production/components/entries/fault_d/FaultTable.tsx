import {Button, Form, Input, Modal, Popconfirm, Select, Space, Table} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {KTSVG} from "../../../../../../_metronic/helpers";

const FaultTable = () => {
    const [gridData, setGridData] = useState([]);
    const [searchText, setSearchText] = useState('')


    const handleInputChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === '') {
            loadData()
        }
    }
    // Modal functions
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    // Modal functions end
    const loadData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://208.117.44.15/SmWebApi/api/FaultEntriesApi'
                // 'http://208.117.44.15/SmWebApi/api/FaultEntriesApi'
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
    };
    const deleteData = async (element: any) => {
        try {
            const response = await axios.delete(
                `http://208.117.44.15/SmWebApi/api/FaultEntriesApi/${element.entryId}`
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
                        <Popconfirm title='Sure to solve'>
                            <a className='btn btn-light-success btn-sm'>
                                Solve
                            </a>
                        </Popconfirm>
                        <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
                            <a className='btn btn-light-danger btn-sm'>
                                Delete
                            </a>
                        </Popconfirm>
                    </>
                ) : null,
        },
    ]

    function handleCancel() {
        form.resetFields()
        setIsModalOpen(false)
    }

    const [dataSource, setDataSource] = useState([])
    const [faultType, setFaultType] = useState([])
    const [location, setLocation] = useState([])
    const [custodian, setCustodian] = useState([])
    const {Option} = Select
    const [form] = Form.useForm()

    // {/* Start Elements to Post */}
    const url = 'http://208.117.44.15/SmWebApi/api/FaultEntriesApi'
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
    // {/* End Elements to Post */}

    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)

    const loadEqupData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://208.117.44.15/SmWebApi/api/VmequpsApi'
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
                'http://208.117.44.15/SmWebApi/api/vmfaltsapi'
            )
            setFaultType(response.data)
        } catch (error: any) {
            return error.statusText
        }
    }

    const loadLocation = async () => {
        try {
            const response = await axios.get(
                'http://208.117.44.15/SmWebApi/api/IclocsApi'
            )
            setLocation(response.data)
        } catch (error: any) {
            return error.statusText
        }
    }

    const loadCustodian = async () => {
        const response = await axios.get(
            'http://208.117.44.15/SmWebApi/api/VmemplsApi'
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
                    <Form.Item name='dType' label='Down Type' rules={[{required: true}]}>
                        <Select placeholder='Select Down Type'>
                            {faultType.map((item: any) => (
                                <Option key={uuidv4()} value={item.faultDesc}>
                                    {item.faultDesc}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='mType' label='Maintenance Type' rules={[{required: true}]}>
                        <Select placeholder='Maintenance Type'>
                            <Option value={'Scheduled'}>Scheduled</Option>
                            <Option value={'Unscheduled'}>Unscheduled</Option>
                            <Option value={'Operational'}>Operational</Option>
                            <Option value={'Damages'}>Damages</Option>
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
        </div>
    )
}

export {FaultTable}
