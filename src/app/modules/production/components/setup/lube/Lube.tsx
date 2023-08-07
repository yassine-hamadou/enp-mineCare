import {Button, Input, InputNumber, message, Select, Space, Tabs,} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {
    addHours,
    ENP_URL,
    fetchBrands,
    fetchCompartments,
    fetchLubeBrands,
    fetchLubeConfigs,
    fetchLubeGrade,
    fetchRefillTypes,
    getEquipment,
    getHours
} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {EditableProTable, ErrorBoundary, ProCard, ProColumns, ProForm} from "@ant-design/pro-components";
import {useAuth} from "../../../../auth";
import {useNavigate} from "react-router-dom";
import {throwError} from "@syncfusion/ej2-base";
import dayjs from "dayjs";
import DevexpressDashboardComponent from "../../../../../pages/dashboard/DevexpressDashboardComponent";

const Lube = () => {
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    let [filteredData] = useState([])
    const [submitLoading, setSubmitLoading] = useState(false)
    // const [form] = Form.useForm()
    const [capa, setCapa] = useState("")
    console.log("capa", capa)
    const [newCompartData, setNewCompartData] = useState([])
    const {Option} = Select
    const [messageApi, contextHolder] = message.useMessage();
    const [warnApi, messageHolder] = message.useMessage();

    // Modal functions
    const [isModalOpen, setIsModalOpen] = useState(false)
    //
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false)
    }
    // Modal functions end
    const deleteData = async (element: any) => {
        try {
            const response = await axios.delete(`${ENP_URL}/LubeEntry/${element.id}`)
            // update the local state so that react can refecth and re-render the table with the new data
            const newData = gridData.filter((item: any) => item.id !== element.id)
            setGridData(newData)
            return response.status
        } catch (e) {
            return e
        }
    }

    function handleDelete(element: any) {
        deleteData(element)
    }

    // const columns: any = [
    //     {
    //         title: 'Fleet ID',
    //         dataIndex: 'fleetId',
    //         sorter: (a: any, b: any) => {
    //             if (a.fleetId > b.fleetId) {
    //                 return 1
    //             }
    //             if (b.fleetId > a.fleetId) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Compartment',
    //         key: 'compartmentId',
    //         render: (row: any) => {
    //             return getCompartmentName(row.compartmentId)
    //         },
    //         sorter: (a: any, b: any) => {
    //             if (a.compartmentId > b.compartmentId) {
    //                 return 1
    //             }
    //             if (b.compartmentId > a.compartmentId) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Brand',
    //         key: 'brandId',
    //         render: (row: any) => {
    //             return getBrandName(row.brandId)
    //         },
    //         sorter: (a: any, b: any) => {
    //             if (a.brandId > b.brandId) {
    //                 return 1
    //             }
    //             if (b.brandId > a.brandId) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Grade',
    //         key: 'gradeId',
    //         render: (row: any) => {
    //             return getGradeName(row.gradeId)
    //         },
    //         sorter: (a: any, b: any) => {
    //             if (a.gradeId > b.gradeId) {
    //                 return 1
    //             }
    //             if (b.gradeId > a.gradeId) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //
    //     {
    //         title: 'Chan. Out Inter.',
    //         dataIndex: 'changeOutInterval',
    //         sorter: (a: any, b: any) => {
    //             if (a.changeOutInterval > b.changeOutInterval) {
    //                 return 1
    //             }
    //             if (b.changeOutInterval > a.changeOutInterval) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Capacity',
    //         dataIndex: 'capacity',
    //         sorter: (a: any, b: any) => {
    //             if (a.capacity > b.capacity) {
    //                 return 1
    //             }
    //             if (b.capacity > a.capacity) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Ref. Type',
    //         key: 'refillTypeId',
    //         render: (row: any) => {
    //             return getGradeName(row.gradeId)
    //         },
    //         sorter: (a: any, b: any) => {
    //             if (a.refillTypeId > b.refillTypeId) {
    //                 return 1
    //             }
    //             if (b.refillTypeId > a.refillTypeId) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Volume',
    //         dataIndex: 'volume',
    //         sorter: (a: any, b: any) => {
    //             if (a.volume > b.volume) {
    //                 return 1
    //             }
    //             if (b.volume > a.volume) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Prev. Hours',
    //         dataIndex: 'previousHour',
    //         sorter: (a: any, b: any) => {
    //             if (a.previousHour > b.previousHour) {
    //                 return 1
    //             }
    //             if (b.previousHour > a.previousHour) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Cur. Hours',
    //         dataIndex: 'currentHour',
    //         sorter: (a: any, b: any) => {
    //             if (a.currentHour > b.currentHour) {
    //                 return 1
    //             }
    //             if (b.currentHour > a.currentHour) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Refill Date',
    //         dataIndex: 'refillDate',
    //         render: (date: any) => {
    //             return moment(date).format('DD-MM-YYYY')
    //         },
    //         sorter: (a: any, b: any) => {
    //             if (a.refillDate > b.refillDate) {
    //                 return 1
    //             }
    //             if (b.refillDate > a.refillDate) {
    //                 return -1
    //             }
    //             return 0
    //         },
    //     },
    //     {
    //         title: 'Action',
    //         // dataIndex: 'faultDesc',
    //         // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
    //         fixed: 'right',
    //         width: 100,
    //         render: (_: any, record: any) => (
    //           <Space size='middle'>
    //               {/* <a href="sections" className="btn btn-light-info btn-sm">Sections</a> */}
    //               {/* <Link to={`/setup/sections/${record.id}`}>
    //     <span  className="btn btn-light-info btn-sm">
    //     Sections
    //       </span></Link> */}
    //               <a href='#' className='btn btn-light-warning btn-sm'>
    //                   Update
    //               </a>
    //               <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
    //                   Delete
    //               </a>
    //               {/* <a>Edit </a> */}
    //           </Space>
    //         ),
    //     },
    // ]

    const loadData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${ENP_URL}/LubeEntry`)
            setGridData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    const {data: allEquips} = useQuery('equips', () => getEquipment(tenant), {cacheTime: 5000})
    const {data: refilltypes} = useQuery('refillTypes', () => fetchRefillTypes(tenant), {cacheTime: 5000})
    const {data: lubeBrands} = useQuery('lube-brands', fetchLubeBrands, {cacheTime: 5000})
    const {data: lubeConfigs} = useQuery('lube-configs', fetchLubeConfigs, {cacheTime: 5000})
    const {data: lubeGrades} = useQuery('lube-grades', fetchLubeGrade, {cacheTime: 5000})
    const {data: compartments} = useQuery('compartments', () => fetchCompartments(tenant), {cacheTime: 5000})


    const getBrandName = (brandId: any) => {
        //count number of model
        let brandName = null
        lubeBrands?.data.map((item: any) => {
            if (item.id === brandId) {
                brandName = item.name
            }
        })
        return brandName
    }
    const getGradeName = (gradeId: any) => {
        //count number of model
        let gradeName = null
        lubeGrades?.data.map((item: any) => {
            if (item.id === gradeId) {
                gradeName = item.name
            }
        })
        return gradeName
    }
    const getCompartmentName = (compartmentId: any) => {
        //count number of compartment
        let compartmentName = null
        compartments?.data.map((item: any) => {
            if (item.id === compartmentId) {
                compartmentName = item.name
            }
        })
        return compartmentName
    }

    const dataWithIndex = gridData.map((item: any, index) => ({
        ...item,
        key: index,
    }))

    const handleInputChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === '') {
            loadData()
        }
    }

    let compartData: any = null
    let model: any = ""
    const onFleetIdChange = (selected: any) => {
        console.log("selected", selected)
        console.log("allEquips?.data", allEquips?.data)

        model = allEquips?.data.find((item: any) => {
              console.log("item", item)
              console.log("item.equipmentId", item.equipmentId)
              return item.equipmentId.trim() === selected.trim()
          }
        )
        console.log("model", model)
        console.log("lubeConfigs", lubeConfigs)
        compartData = lubeConfigs?.data.filter((item: any) =>
          item.model.trim() === model?.model?.name?.trim()
        )

        // form.setFieldsValue({
        //     changeOutInterval: "",
        //     capacity: "",
        //     compartmentId: "",
        // })
        // form.resetFields(["changeOutInterval", "capacity", "compartmentId"])
        return setNewCompartData(compartData)
    }

    const warnUser = () => {
        message.error('No equipmentId selected or no compartment setup for the selected equipmentId!', 5);
    };

    const checkCompartment = () => {
        if (newCompartData.length === 0) {
            warnUser()
        }
    }

    const onCompartmentChange = (selected: any) => {
        newCompartData.map((item: any) => {

            if (item.compartmentId === selected) {
                form.setFieldsValue({
                    changeOutInterval: item.changeOutInterval,
                    capacity: item.capacity,
                })
                setCapa(item.capacity)
            } else {
                return ""
            }
        })
    }

    const volumeCheck = () => {
        messageApi.open({
            type: 'warning',
            content: 'Volume should not be more than capacity !!',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    };

    const onVolumeChange = (values: any) => {
        values > capa ? volumeCheck() : console.log("You go ahead ")

    }

    const globalSearch = () => {
        // @ts-ignore
        filteredData = dataWithIndex.filter((value) => {
            return (
              value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
              value.faultDesc.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setGridData(filteredData)
    }
    const url = `${ENP_URL}/LubeEntry`
    // const onFinish = async (values: any) => {
    //     setSubmitLoading(true)
    //     const data = {
    //         fleetId: values.fleetId.trim(),
    //         compartmentId: values.compartmentId,
    //         changeOutInterval: values.changeOutInterval,
    //         capacity: values.capacity,
    //         brandId: values.brandId,
    //         gradeId: values.gradeId,
    //         volume: values.volume,
    //         refillTypeId: values.refillTypeId,
    //         previousHour: 0,
    //         currentHour: values.currentHour,
    //         refillDate: new Date().toISOString(),
    //     }
    //
    //     try {
    //         const response = await axios.post(url, data)
    //         setSubmitLoading(false)
    //         form.resetFields()
    //         setIsModalOpen(false)
    //         loadData()
    //         setNewCompartData([])
    //         return response.statusText
    //     } catch (error: any) {
    //         setSubmitLoading(false)
    //         return error.statusText
    //     }
    // }

    const {data: equipmentData} = useQuery('equipments', () => getEquipment(tenant));
    const {data: hoursData, isLoading} = useQuery('all-hours', () => getHours(tenant), {
        refetchOnWindowFocus: false
    })
    const columns: ProColumns<any>[] = [
        {
            title: 'Fleet ID',
            dataIndex: 'equipmentId',
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                console.log('form', form.getFieldValue('equipmentId'))
                console.log('_', _)
                return (
                  <Select
                    placeholder='Select Equipment ID'
                    className={'w-100'}
                    allowClear
                    showSearch
                    onSelect={(value) => {
                        console.log('value', value)
                        onFleetIdChange(value)
                        const rowData = form.getFieldsValue(); // Get the values of all form fields in the row
                        console.log('rowData', rowData) //rowData is an object with key value pairs

                        // Object.values(rowData)[0].previousHours = 12; //set previous hours in this row

                        //set previous hours in this row
                        const equipment = hoursData?.data?.find((equipment: any) => equipment?.fleetId === value);
                        //@ts-ignore
                        rowData[recordKey].previousHours = equipment?.previousReading ? equipment?.previousReading : 0; //set previous hours in this row
                        console.log('equiData', value)
                        console.log('hours', hoursData)
                        console.log('equipment outseide', equipment)
                        if (equipment) {
                            form.setFieldsValue({ // Set the value of the "previousHours" field
                                ...rowData,
                            });
                        }
                    }}
                  >
                      {equipmentData?.data?.map((equipment: any) => {
                            return (
                              <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                                  {equipment.equipmentId}
                              </Select.Option>
                            );
                        }
                      )}
                  </Select>
                );
            }
        },
        {
            title: 'Compartment',
            dataIndex: 'compartmentId',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Compartment'
                    className={'w-100'}
                    allowClear
                    showSearch
                    onSelect={onCompartmentChange}
                    onClick={checkCompartment}
                    // onChange={(value) => {
                    //     const rowData = form.getFieldsValue(); // Get the values of all form fields in the row
                    //     console.log('rowData', rowData) //rowData is an object with key value pairs
                    //
                    //     // Object.values(rowData)[0].previousHours = 12; //set previous hours in this row
                    //
                    //     //set previous hours in this row
                    //     const equipment = hoursData?.data?.find((equipment: any) => equipment?.fleetId === value);
                    //     //@ts-ignore
                    //     rowData[recordKey].previousHours = equipment?.previousReading ? equipment?.previousReading : 0; //set previous hours in this row
                    //     console.log('equiData', value)
                    //     console.log('hours', hoursData)
                    //     console.log('equipment outseide', equipment)
                    //     if (equipment) {
                    //         form.setFieldsValue({ // Set the value of the "previousHours" field
                    //             ...rowData,
                    //         });
                    //     }
                    // }}
                  >
                      {newCompartData.map((item: any) => (
                          <Option key={item.id} value={item.compartmentId}>
                              {item.model} - {item.compartment.name}
                          </Option>
                        )
                      )} II9
                  </Select>
                );
            }
        },
        {
            title: 'Chan. Out Inter.',
            dataIndex: 'changeOutInterval',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber required min={1} className="w-100 text-black"/>;
            },
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber required className="w-100 text-black" value={
                    capa
                }/>;
            },
        },
        {
            title: 'Brand',
            dataIndex: 'brandId',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            },
        },
        {
            title: 'Grade',
            dataIndex: 'gradeId',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Equipment ID'
                    className={'w-100'}
                    allowClear
                    showSearch
                    onChange={(value) => {
                        const rowData = form.getFieldsValue(); // Get the values of all form fields in the row
                        console.log('rowData', rowData) //rowData is an object with key value pairs

                        // Object.values(rowData)[0].previousHours = 12; //set previous hours in this row

                        //set previous hours in this row
                        const equipment = hoursData?.data?.find((equipment: any) => equipment?.fleetId === value);
                        //@ts-ignore
                        rowData[recordKey].previousHours = equipment?.previousReading ? equipment?.previousReading : 0; //set previous hours in this row
                        console.log('equiData', value)
                        console.log('hours', hoursData)
                        console.log('equipment outseide', equipment)
                        if (equipment) {
                            form.setFieldsValue({ // Set the value of the "previousHours" field
                                ...rowData,
                            });
                        }
                    }}
                  >
                      {[]?.map((equipment: any) => {
                            return (
                              <Select.Option key={equipment.equipmentId} value={equipment.equipmentId}>
                                  {equipment.equipmentId}
                              </Select.Option>
                            );
                        }
                      )}
                  </Select>
                );
            },
        },
        {
            title: 'Ref. Type',
            dataIndex: 'refillTypeId',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            },
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            },
        },
        {
            title: 'Prev. Hours',
            dataIndex: 'previousHour',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            },
        },
        {
            title: 'Cur. Hours',
            dataIndex: 'currentHour',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            }
        },
        {
            title: 'Refill Date',
            dataIndex: 'refillDate',
            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                return <InputNumber min={1} className="w-100 text-black" disabled/>;
            }
        },
        {
            title: 'Action',
            valueType: 'option',
        },
    ];

    const {tenant} = useAuth();
    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };


    const defaultData: any = [];
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
      defaultData.map((item: any) => item.id),
    );
    const [form] = ProForm.useForm();
    return (
      <div
        style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
          {/*<KTCardBody className='py-4 '>*/}
          {/*    <div className='table-responsive'>*/}
          {/*        <div className='d-flex justify-content-between'>*/}
          {/*            <Space style={{marginBottom: 16}}>*/}
          {/*                <Input*/}
          {/*                  placeholder='Enter Search Text'*/}
          {/*                  onChange={handleInputChange}*/}
          {/*                  type='text'*/}
          {/*                  allowClear*/}
          {/*                  value={searchText}*/}
          {/*                />*/}
          {/*                <Button type='primary' onClick={globalSearch}>*/}
          {/*                    Search*/}
          {/*                </Button>*/}
          {/*            </Space>*/}
          {/*            <Space style={{marginBottom: 16}}>*/}
          {/*                <button type='button' className='btn btn-primary me-3' onClick={showModal}>*/}
          {/*                    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>*/}
          {/*                    Add*/}
          {/*                </button>*/}
          {/*                <button type='button' className='btn btn-light-primary me-3'>*/}
          {/*                    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>*/}
          {/*                    Upload*/}
          {/*                </button>*/}
          {/*                <button type='button' className='btn btn-light-primary me-3'>*/}
          {/*                    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>*/}
          {/*                    Export*/}
          {/*                </button>*/}
          {/*            </Space>*/}
          {/*        </div>*/}
          {/*        <Table columns={columns} dataSource={dataWithIndex} loading={loading}/>*/}
          {/*        <Modal*/}
          {/*          title='Lube Entry'*/}
          {/*          open={isModalOpen}*/}
          {/*          onOk={handleOk}*/}
          {/*          onCancel={handleCancel}*/}
          {/*          footer={[*/}
          {/*              <Button key='back' onClick={handleCancel}>*/}
          {/*                  Cancel*/}
          {/*              </Button>,*/}
          {/*              <Button*/}
          {/*                key='submit'*/}
          {/*                type='primary'*/}
          {/*                htmlType='submit'*/}
          {/*                loading={submitLoading}*/}
          {/*                onClick={() => {*/}
          {/*                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions*/}
          {/*                    form.submit()*/}
          {/*                }}*/}
          {/*              >*/}
          {/*                  Submit*/}
          {/*              </Button>,*/}
          {/*          ]}*/}
          {/*        >*/}
          {/*            <Form*/}
          {/*              labelCol={{span: 7}}*/}
          {/*              wrapperCol={{span: 14}}*/}
          {/*              layout='horizontal'*/}
          {/*              form={form}*/}
          {/*              name='control-hooks'*/}
          {/*              onFinish={onFinish}*/}
          {/*            >*/}
          {/*                {contextHolder}*/}
          {/*                {messageHolder}*/}
          {/*                <Form.Item name='fleetId' label='fleetId'>*/}
          {/*                    <Select showSearch={true} placeholder='Select' onChange={onFleetIdChange}>*/}
          {/*                        {allEquips?.data.map((item: any) => (*/}
          {/*                          <Option key={item.fleetID} value={item.fleetID}>*/}
          {/*                              {item.fleetID}- {item.modlName}*/}
          {/*                          </Option>*/}
          {/*                        ))}*/}
          {/*                    </Select>*/}
          {/*                </Form.Item>*/}

          {/*                <Form.Item label='Compartment' name='compartmentId' rules={[{required: true}]}>*/}
          {/*                    /!* {messageHolder} *!/*/}
          {/*                    <Select*/}
          {/*                      showSearch*/}
          {/*                      placeholder="Search to select"*/}
          {/*                      optionFilterProp="children"*/}
          {/*                      onChange={onCompartmentChange}*/}
          {/*                      onClick={checkCompartment}*/}
          {/*                    >*/}
          {/*                        {*/}
          {/*                            newCompartData.map((item: any) => (*/}
          {/*                              <Option key={item.id} value={item.compartmentId}>*/}
          {/*                                  {item.model} - {item.compartment.name}*/}
          {/*                              </Option>*/}
          {/*                            ))*/}
          {/*                        }*/}
          {/*                    </Select>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item label='Change Interval' name='changeOutInterval'>*/}
          {/*                    <InputNumber disabled={true}/>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item label='Capacity' name='capacity'>*/}
          {/*                    <InputNumber disabled={true}/>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item label='Refill Type' name='refillTypeId' rules={[{required: true}]}>*/}
          {/*                    <Select*/}
          {/*                      showSearch*/}
          {/*                      placeholder="Search to select"*/}
          {/*                      optionFilterProp="children"*/}
          {/*                    >*/}
          {/*                        {*/}
          {/*                            refilltypes?.data.map((refillType: any) => (*/}
          {/*                              <Option key={refillType.id} value={refillType.id}>*/}
          {/*                                  {refillType.name}*/}
          {/*                              </Option>*/}
          {/*                            ))*/}
          {/*                        }*/}
          {/*                    </Select>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item label='Brands' name='brandId' rules={[{required: true}]}>*/}
          {/*                    <Select*/}
          {/*                      showSearch*/}
          {/*                      placeholder="Search to select"*/}
          {/*                      optionFilterProp="children"*/}
          {/*                    >*/}
          {/*                        {*/}
          {/*                            lubeBrands?.data.map((brand: any) => (*/}
          {/*                              <Option key={brand.id} value={brand.id}>*/}
          {/*                                  {brand.name}*/}
          {/*                              </Option>*/}
          {/*                            ))*/}
          {/*                        }*/}
          {/*                    </Select>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item label='Grade' name='gradeId'>*/}
          {/*                    <Select*/}
          {/*                      showSearch*/}
          {/*                      placeholder="Search to select"*/}
          {/*                      optionFilterProp="children"*/}
          {/*                    >*/}
          {/*                        {*/}
          {/*                            lubeGrades?.data.map((grade: any) => (*/}
          {/*                              <Option key={grade.id} value={grade.id}>*/}
          {/*                                  {grade.name}*/}
          {/*                              </Option>*/}
          {/*                            ))*/}
          {/*                        }*/}
          {/*                    </Select>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item name='volume' label='Volume' rules={[{required: true}]}>*/}

          {/*                    <InputNumber onChange={onVolumeChange}/>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item name='previousHour' label='Previous Hours'>*/}
          {/*                    <InputNumber disabled={true}/>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item name='currentHour' label='Current Hours' rules={[{required: true}]}>*/}
          {/*                    <InputNumber/>*/}
          {/*                </Form.Item>*/}
          {/*                <Form.Item name='refillDate' label='Refill Date' rules={[{required: true}]}>*/}
          {/*                    <DatePicker showTime/>*/}
          {/*                </Form.Item>*/}
          {/*            </Form>*/}
          {/*        </Modal>*/}
          {/*    </div>*/}
          {/*</KTCardBody>*/}
          <KTCard>
              <KTCardBody>
                  <ProForm
                    form={form}
                    onFinish={async (values) => {
                        await waitTime(2000);
                        console.log(values);
                        message.success('success');
                        form.resetFields();
                    }}
                  >
                      <ProForm.Item name="dataSource" trigger="onValuesChange">
                          <EditableProTable<any>
                            rowKey="id"
                            toolBarRender={false}
                            columns={columns}
                            bordered
                            recordCreatorProps={{
                                newRecordType: 'dataSource',
                                position: 'top',
                                record: () => ({
                                    id: Date.now(),
                                }),
                            }}
                            editable={{
                                type: 'multiple',
                                editableKeys,
                                onChange: setEditableRowKeys,
                                actionRender: (row, _, dom) => {
                                    return [dom.delete];
                                },
                            }}
                          />
                      </ProForm.Item>
                  </ProForm>
              </KTCardBody>
          </KTCard>
      </div>
    )
}

export {Lube}


// import {Input, Space, Table} from "antd";
// import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
// import React from "react";
// import {Link} from "react-router-dom";
// import {getModelClasses} from "../../../../../urls";
// import {useQuery} from "react-query";
//
//
// const HoursModelClass = () => {
// const {data: modelClasses, isLoading} = useQuery('ModelClasses', getModelClasses)
//
// const columns: any = [
//   {
//     title: 'Code',
//     dataIndex: 'modelClassId',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Action',
//     render: (_: any, record: any) => (
//       <Space size='middle'>
//         <Link
//           to={`${record.modelClassId}`}
//           state={
//             modelClasses?.data?.filter(
//               (modelClass: any) => modelClass.modelClassId === record.modelClassId
//             )
//           }
//         >
//           <button type='button' className='btn btn-light-primary me-3'>
//             Equip Hours
//           </button>
//         </Link>
//         {/*<button type='button' className='btn btn-light-danger me-3'>*/}
//         {/*Delete*/}
//         {/*</button>*/}
//       </Space>
//     )
//   }
// ]
//
// return (
//   <KTCard>
//     <KTCardBody>
//       <div className='d-flex justify-content-between'>
//         <Space style={{marginBottom: 16}}>
//           <Input
//             placeholder='Enter Search Text'
//             type='text'
//             allowClear
//           />
//         </Space>
//       </div>
//       <Table
//         columns={columns}
//         bordered
//         dataSource={modelClasses?.data}
//         loading={isLoading}
//       />
//     </KTCardBody>
//   </KTCard>
// )
// }
//
// export default HoursModelClass


// import {Button, Input} from 'antd'
// import {Space, Table, Form} from 'antd'
// import axios from 'axios'
// import React, {useEffect, useState} from 'react'
// import {useQuery} from "react-query";
// import {KTSVG} from '../../../../../../_metronic/helpers'
// import {ENP_URL, fetchEquips, fetchHours, fetchModels} from '../../../../../urls'
//
// interface DataType {
//   key: React.Key
//   name: string
//   platform: string
//   version: string
//   upgradeNum: number
//   creator: string
//   createdAt: string
// }
//
// // interface ExpandedDataType {
// //   // key: React.Key
// //   id: string
// //   date: string
// //   name: string
// //   pread: string
// //   cread: string
// // }
//
// const items = [
//   {key: '1', label: 'Action 1'},
//   {key: '2', label: 'Action 2'},
// ]
//
// const HoursPage: React.FC = () => {
//   const [searchText, setSearchText] = useState('')
//   const [editingRow, setEditingRow] = useState(null)
//   const [dataSource, setDataSource] = useState([])
//   // const [edit, setEdit] = useState(false)
//   const [form] = Form.useForm()
//   const [loading, setLoading] = useState(false)
//
//   const [editingKey, setEditingKey] = useState('');
//   const isEditing = (record: any) => record.key === editingKey;
//   const handleInputChange = (e: any) => {
//     setSearchText(e.target.value)
//     if (e.target.value === '') {
//       // loadData()
//     }
//   }
//
//   const edit = (record: any & { key: React.Key }) => {
//     form.setFieldsValue({name: '', age: '', address: '', ...record});
//     setEditingKey(record.key);
//   };
//
//   const cancel = () => {
//     setEditingKey('');
//   };
//   const [isModalOpen, setIsModalOpen] = useState(false)
//
//   const showModal = () => {
//     setIsModalOpen(true)
//   }
//
//   const handleOk = () => {
//     setIsModalOpen(false)
//   }
//
//   const handleCancel = () => {
//     // form.resetFields()
//     setIsModalOpen(false)
//   }
//   const {data: allHours} = useQuery('hours', fetchHours, {cacheTime: 5000})
//   const {data: equipData} = useQuery('equip-count', fetchEquips, {cacheTime: 5000})
//   const countNumberOfEquipment = (model: any) => {
//     //count number of model
//     let count = 0
//     equipData?.data.forEach((item: any) => {
//       if (item.modlName === model) {
//         count++
//       }
//     })
//     return count
//   }
//   // const getRelatedFleets = (model: any) => {
//   //   //count number of model
//   //   let count = null
//   //   equipData?.data.forEach((item: any) => {
//   //     if (item.modlName === model) {
//   //       // count++
//   //     }
//   //   })
//   //   return count
//   // }
//
//
//   // const expandedRowRender = () => {
//   //
//   // }
//   const columns = [
//     // {title: 'ID', dataIndex: 'id', key: 'id'},
//     {title: 'FleetID', dataIndex: 'fleetId', key: 'fleetId'},
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text: any, record: any) => {
//         if (editingRow === record) {
//           return (
//             <Form.Item name='date'>
//               <Input/>
//             </Form.Item>
//           )
//         } else {
//           return <p>{text}</p>
//         }
//       },
//     },
//
//     // {
//     //   title: 'Prv. Reading',
//     //   dataIndex: 'previousReading',
//     //   key: 'previousReading',
//     //   // render: (text:any, record:any) => {
//     //   //   if (editingRow === record.key) {
//     //   //     return (
//     //   //       <Form.Item name='previousReading'>
//     //   //         <Input />
//     //   //       </Form.Item>
//     //   //     )
//     //   //   } else {
//     //   //     return <p>{text}</p>
//     //   //   }
//     //   // },
//     // },
//     {
//       title: 'Cur. Reading',
//       dataIndex: 'currentReading',
//       key: 'currentReading',
//       render: (text: any, record: any) => {
//         if (editingRow === record) {
//           return (
//             <Form.Item name='currentReading'>
//               <Input/>
//             </Form.Item>
//           )
//         } else {
//           return <p> {text}</p>
//         }
//       },
//     },
//     {
//       title: 'Action',
//       dataIndex: 'operation',
//       key: 'operation',
//       render: (_: any, record: any) => (
//         <Space>
//           <Button
//             onClick={() => {
//               setEditingRow(record)
//               form.setFieldsValue({
//                 date: record.date,
//                 previousReading: record.previousReading,
//                 currentReading: record.currentReading
//               })
//             }}
//           >
//             Edit
//           </Button>
//           <Button onClick={onDone} htmlType='submit' danger>
//             Done
//           </Button>
//         </Space>
//       ),
//     },
//   ]
//   const save = (key: any) => {
//     try {
//       const row = (form.validateFields());
//
//       const newData = [...allHours?.data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row,
//         });
//         console.log(newData)
//         setEditingKey('');
//       } else {
//         // newData.push(row);
//         // setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };
//
//   // let rowData: any = [...allHours?.data]
//   const onDone = (values: any) => {
//
//     const updatedDataSource: any = [...allHours?.data]
//     updatedDataSource.splice(editingRow, 1, {...values, id: editingRow})
//     console.log(updatedDataSource)
//     setEditingRow(null)
//   }
//
//   // console.log(rowData)
//
//
//   const {data: mainData} = useQuery('main-data', fetchModels, {cacheTime: 5000})
//
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '5px',
//           boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
//         }}
//       >
//         <div className='d-flex justify-content-between'>
//           <Space style={{marginBottom: 16}}>
//             <Input
//               placeholder='Enter Search Text'
//               onChange={handleInputChange}
//               type='text'
//               allowClear
//               value={searchText}
//             />
//             <Button type='primary'>Search</Button>
//           </Space>
//           <Space style={{marginBottom: 16}}>
//             <button type='button' className='btn btn-light-primary me-3'>
//               <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
//               Export
//             </button>
//           </Space>
//         </div>
//         <Form form={form} onFinish={save}>
//           <Table columns={columns} rowKey="id" dataSource={allHours?.data} pagination={false}/>
//         </Form>
//       </div>
//     </>
//   )
// }
//
// export {HoursPage}


//////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////


// import React, {useContext, useEffect, useRef, useState} from 'react';
// import type {InputRef} from 'antd';
// import {Button, Form, Input, message, Popconfirm, Space, Table} from 'antd';
// import type {FormInstance} from 'antd/es/form';
// import {useMutation, useQuery, useQueryClient} from "react-query";
// import {addHours, addHoursTemp, fetchHours, getEquipment, putHours} from "../../../../../urls";
// import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
//
// const EditableContext = React.createContext<FormInstance<any> | null>(null);
//
// interface Item {
//   id: number
//   fleetId: string
//   date: string
//   previousReading: number
//   currentReading: number
// }
//
// interface EditableRowProps {
//   index: number;
// }
//
// const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };
//
// interface EditableCellProps {
//   title: React.ReactNode;
//   editable: boolean;
//   children: React.ReactNode;
//   dataIndex: keyof Item;
//   record: Item;
//   handleSave: (record: Item) => void;
// }
//
// const EditableCell: React.FC<EditableCellProps> = ({
//                                                      title,
//                                                      editable,
//                                                      children,
//                                                      dataIndex,
//                                                      record,
//                                                      handleSave,
//                                                      ...restProps
//                                                    }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext)!;
//
//   useEffect(() => {
//     if (editing) {
//       inputRef.current!.focus();
//     }
//   }, [editing]);
//
//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({[dataIndex]: record[dataIndex]});
//   };
//
//   const save = async () => {
//     // try {
//     //   message.success('Saved successfully')
//     //   const values = await form.validateFields();
//     //
//     //   toggleEdit();
//     //   handleSave({...record, ...values});
//     // } catch (errInfo) {
//     //   console.log('Save failed:', errInfo);
//     // }
//
//
//     const values = await form.validateFields();
//     toggleEdit();
//     handleSave({...record, ...values});
//
//   };
//
//   let childNode = children;
//
//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{margin: 0}}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save}/>
//       </Form.Item>
//     ) : (
//       <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
//         {children}
//       </div>
//     );
//   }
//
//   return <td {...restProps}>{childNode}</td>;
// };
//
// type EditableTableProps = Parameters<typeof Table>[0];
//
//
// type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
//
// const HoursPage: React.FC = () => {
//
//   const queryClient = useQueryClient()
//   const {data: allHours, isLoading: isHoursLoading} = useQuery('all-hours', fetchHours)
//   const {data: allEquipment, isLoading: isEquipmentLoading} = useQuery('all-equipment', getEquipment)
//
//   const {mutate: mutateHour} = useMutation(addHoursTemp, {
//     onSuccess: () => {
//       message.success('Saved successfully').then(r => r)
//       queryClient.invalidateQueries('all-hours').then(r => r)
//     },
//     onError: (error: any) => {
//       message.error(error.message).then(r => r)
//     }
//   })
//
//   // const handleDelete = (key: React.Key) => {
//   //   return null
//   // };
//
//
//   const defaultColumns = [
//     {
//       title: 'Equipment ID',
//       dataIndex: 'fleetId',
//       sorter: (a: any, b: any) => {
//         if (a.fleetId < b.fleetId) {
//           return -1
//         }
//         if (a.fleetId > b.fleetId) {
//           return 1
//         }
//         return 0
//       }
//     },
//     {
//       title: 'Previous Reading Date',
//       dataIndex: 'date',
//       render: (date: string) => {
//         return new Date(date).toDateString()
//       }
//     },
//     {
//       title: 'Previous Reading',
//       dataIndex: 'previousReading',
//       sorter: (a: any, b: any) => a.previousReading - b.previousReading,
//     },
//     {
//       title: 'Current Reading Date',
//       dataIndex: 'date',
//       sorter: (a: any, b: any) => {
//         if (a.date < b.date) {
//           return -1
//         }
//         if (a.date > b.date) {
//           return 1
//         }
//         return 0
//       },
//       render: () => {
//         return new Date().toDateString()
//       }
//     },
//     {
//       title: 'Current Reading',
//       dataIndex: 'currentReading',
//       render: (currentReading: number, record: any) => {
//         return 0
//       },
//       width: '30%',
//       onCell: (record: any) => ({
//         record: record,
//         dataIndex: 'currentReading',
//         editable: true,
//         handleSave,
//       })
//     },
//     // {
//     //   title: 'operation',
//     //   dataIndex: 'operation',
//     //   render: (_: any, record: any) =>
//     //     allHours?.data.length >= 1 ? (
//     //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
//     //         <Button type={'primary'} danger>Delete</Button>
//     //       </Popconfirm>
//     //     ) : null,
//     // },
//   ];
//
//
//   const handleSave = (row: any) => {
//     // console.log('row', row)
//     // const newData = [...allHours?.data];
//     // const index = newData.findIndex((item) => row.key === item.key);
//     // const item = newData[index];
//     // newData.splice(index, 1, {
//     //   ...item,
//     //   ...row,
//     // });
//     // setDataSource(newData);
//     const newData: {
//       // id: number
//       fleetId: string
//       date: string
//       previousReading: number
//       currentReading: number
//     } = {
//       // id: row.id,
//       fleetId: row.fleetId,
//       date: row.date,
//       previousReading: row.previousReading,
//       currentReading: row.currentReading
//     }
//
//     //Do not mutate if data has not changed
//     // const queryData: any = queryClient.getQueryData('all-hours')
//     //
//     // const oldData: any = queryData?.data?.find((row: any) => row.id === newData.id)
//     // console.log('rowData', oldData)
//     // console.log('queryData', queryData)
//     // if (oldData?.currentReading === newData.currentReading) {
//     //   return
//     // }
//     mutateHour(newData)
//   };
//
//   const components = {
//     body: {
//       row: EditableRow,
//       cell: EditableCell,
//     },
//   };
//
//   // const columns = defaultColumns.map((col) => {
//   //   if (!col.editable) {
//   //     return col;
//   // {/*  }*/}
//   // {/*  return {*/}
//   // eslint-disable-next-line no-lone-blocks
//   // {/*    ...col,*/}
//   //     onCell: (record: any) => ({
//   //       record,
//   //       editable: col.editable,
//   //       dataIndex: col.dataIndex,
//   //       title: col.title,
//   //       handleSave,
//   //     }),
//   //   };
//   // });
//
//   const [gridData, setGridData] = useState<any>([])
//   const [beforeSearch, setBeforeSearch] = useState<any>([])
//
//   useEffect(() => {
//     setBeforeSearch(allHours?.data)
//     setGridData(allHours?.data)
//   }, [allHours?.data])
//   const globalSearch = (searchValue: string) => {
//     //searchValue is the value of the search input
//     const searchResult = beforeSearch?.filter((item: any) => {
//       // console.log('item', item)
//       return (
//         item.fleetId.toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.previousReading.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.currentReading.toString().toLowerCase().includes(searchValue.toLowerCase())
//       )
//     })//search the grid data
//     console.log('searchResult', searchResult)
//     setGridData(searchResult) //set the grid data to the search result
//   }
//   const handleInputChange = (e: any) => {
//     // console.log('e.target.value', e.target.value)
//     globalSearch(e.target.value)
//     if (e.target.value === '') {
//       setGridData(beforeSearch)
//     }
//   }
//
//
//   return (
//     <KTCard>
//       <KTCardBody>
//         <div className='d-flex justify-content-between'>
//           <Space style={{marginBottom: 16}}>
//             <Input
//               placeholder='Enter Search Text'
//               type='text'
//               allowClear
//               onChange={handleInputChange}
//             />
//           </Space>
//           <Space style={{marginBottom: 16}}>
//             {/*<button type='button' className='btn btn-primary me-3' onClick={() => console.log()}>*/}
//             {/*  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>*/}
//             {/*  Add*/}
//             {/*</button>*/}
//           </Space>
//         </div>
//         <Table
//           components={components}
//           bordered
//           loading={isHoursLoading}
//           dataSource={gridData}
//           columns={defaultColumns as ColumnTypes}
//         />
//       </KTCardBody>
//     </KTCard>
//   );
// };
//
// export {HoursPage};


/////////////////////////////////////////////
////////////////////////////////////////////
/////`HoursPage.tsx`////////////////////////


const LubePage: any = () => {
    const {tenant} = useAuth()
    const {data: defaultData, isLoading} = useQuery('equipmentQuery', () => getEquipment(tenant), {
        refetchOnWindowFocus: false
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {data: allEquipment} = useQuery('all-equipment', () => getEquipment(tenant))

    const {mutate: mutateHours, isLoading: isHoursMutationLoading} =
      useMutation(addHours, {
          onSuccess: () => {
              navigate('/')
              message.success('Hours Entries Saved successfully').then(r => r)
              queryClient.invalidateQueries('equipmentQuery').then(r => r)
          },
          onError: (error: any) => {
              message.error(error.message).then(r => r)
              throwError(error.message)
          }
      })

    const [dataSource, setDataSource] =
      useState(() => defaultData?.data);

    const [record, setRecord] =
      useState<any>(undefined);
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false)

    const [editableKeys, setEditableRowKeys] =
      useState<React.Key[]>(() => defaultData?.data?.map((item: any) => item.id));

    const [rowValues, setRowValues] = useState<any>({});
    const [allSubmi, setAllowsubmi] = useState<any>({});
    const {data: compartmentData} = useQuery('compartmentData', () => fetchCompartments(tenant))
    const {data: refilltypes, isLoading: refillTypesLoading} = useQuery('refillTypes', () => fetchRefillTypes(tenant))
    const {data: brandsData, isLoading: brandsDataLoading} = useQuery('brandsData', fetchBrands)
    const {data: gradesData, isLoading: gradesDataLoading} = useQuery('gradesData', fetchLubeGrade)
    // console.log('dataSource', defaultData)
    useEffect(() => {
        setEditableRowKeys(() => defaultData?.data?.map((item: any) => item.id))
        Object.values(allSubmi).every((item: any) => item === true) ? setAllowSubmit(true) : setAllowSubmit(false)
    }, [defaultData?.data, record, allSubmi]);

    const columns: ProColumns[] = [
        {
            title: 'Equipment ID',
            dataIndex: 'equipmentId',
            editable: false,
        },
        {
            title: 'Compartment',
            dataIndex: 'compartmentId',
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Compartment'
                    className={'w-100'}
                    allowClear
                    showSearch
                    onSelect={
                        (selected: any, b: any) => {
                            const item = record?.model?.lubeConfigs?.find((lubeConfig: any) => lubeConfig.compartmentId === selected)
                            const rowData: any = form.getFieldsValue();
                            //@ts-ignore
                            rowData[recordKey].capacity = item?.capacity;
                            //@ts-ignore
                            rowData[recordKey].changeOutInterval = item?.changeOutInterval;
                            form.setFieldsValue({ // Set the value of the "previousHours" field
                                ...rowData,
                            });

                        }
                    }
                    onClear={
                        () => {
                            const rowData: any = form.getFieldsValue();
                            //@ts-ignore
                            rowData[recordKey].capacity = undefined;
                            //@ts-ignore
                            rowData[recordKey].changeOutInterval = undefined;
                            form.setFieldsValue({ // Set the value of the "previousHours" field
                                ...rowData,
                            });
                        }
                    }
                    // onClick={checkCompartment}
                    // onChange={(value) => {
                    //     const rowData = form.getFieldsValue(); // Get the values of all form fields in the row
                    //     console.log('rowData', rowData) //rowData is an object with key value pairs
                    //
                    //     // Object.values(rowData)[0].previousHours = 12; //set previous hours in this row
                    //
                    //     //set previous hours in this row
                    //     const equipment = hoursData?.data?.find((equipment: any) => equipment?.fleetId === value);
                    //     //@ts-ignore
                    //     rowData[recordKey].previousHours = equipment?.previousReading ? equipment?.previousReading : 0; //set previous hours in this row
                    //     console.log('equiData', value)
                    //     console.log('hours', hoursData)
                    //     console.log('equipment outseide', equipment)
                    //     if (equipment) {
                    //         form.setFieldsValue({ // Set the value of the "previousHours" field
                    //             ...rowData,
                    //         });
                    //     }
                    // }}
                  >
                      {record?.model?.lubeConfigs?.map((lubeConfig: any) => (
                          <Select.Option key={lubeConfig.id} value={lubeConfig.compartmentId}>
                              {compartmentData?.data?.find((compartment: any) => compartment.id === lubeConfig.compartmentId)?.name}
                          </Select.Option>
                        )
                      )}
                  </Select>
                )
            }
        },
        {
            title: 'Change Out Interval',
            dataIndex: 'changeOutInterval',
            valueType: 'digit',
            readonly: true,
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            valueType: 'digit',
            readonly: true,
        },
        {
            title: 'Refill Type',
            dataIndex: 'refillTypeId',
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Refill Type'
                    className={'w-100'}
                    allowClear
                    showSearch
                    loading={refillTypesLoading}
                  >
                      {refilltypes?.data?.map((refillType: any) => (
                          <Select.Option key={refillType.id} value={refillType.id}>
                              {refillType.name}
                          </Select.Option>
                        )
                      )}
                  </Select>
                )
            }
        },
        {
            title: 'Brands',
            dataIndex: 'brandId',
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Brand'
                    className={'w-100'}
                    allowClear
                    showSearch
                    loading={brandsDataLoading}
                  >
                      {brandsData?.data?.map((brand: any) => (
                          <Select.Option key={brand.id} value={brand.id}>
                              {brand.name}
                          </Select.Option>
                        )
                      )}
                  </Select>
                )
            }
        },
        {
            title: 'Grade',
            dataIndex: 'gradeId',
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                return (
                  <Select
                    placeholder='Select Grade'
                    className={'w-100'}
                    allowClear
                    showSearch
                    loading={brandsDataLoading}
                  >
                      {gradesData?.data?.map((grade: any) => (
                          <Select.Option key={grade.id} value={grade.id}>
                              {grade.name}
                          </Select.Option>
                        )
                      )}
                  </Select>
                )
            }
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            valueType: 'digit',
            onCell: (record) => {
                return {
                    onFocus: () => {
                        setRecord(record)
                    },
                }
            },
            fieldProps: {
                min: 0,
            },
            formItemProps: {
                rules: [
                    {
                        validator(rule, value): Promise<any> {
                            if (!record?.capacity) {
                                return Promise.reject('Please select a compartment')
                            } else {
                                if (!value) {
                                    setAllowsubmi((allowSubmit: any) => {
                                        return {
                                            ...allowSubmit,
                                            [record?.id]: false, // Assuming each row has a unique `id` field
                                        };
                                    })
                                    return Promise.reject('Please enter a volume');
                                } else if (value > record?.capacity) {
                                    setAllowsubmi((allowSubmit: any) => {
                                        return {
                                            ...allowSubmit,
                                            [record?.id]: false, // Assuming each row has a unique `id` field
                                        };
                                    })
                                    return Promise.reject('Volume should be less than capacity');
                                } else {
                                    if (record?.equipmentId && record?.compartmentId &&
                                      record?.refillTypeId && record?.brandId &&
                                      record?.gradeId && record?.volume && record?.previousHour && record?.currentHour) {
                                        setAllowsubmi((allowSubmit: any) => {
                                            return {
                                                ...allowSubmit,
                                                [record?.id]: true, // Assuming each row has a unique `id` field
                                            };
                                        })
                                        return Promise.resolve('Resolved');
                                    }
                                    return Promise.resolve('Resolved');
                                }
                            }
                        }
                    },
                ],
            }
        },
        {
            title: 'Previous Reading',
            dataIndex: 'previousHour',
            readonly: true,
            renderFormItem: (_, {type, defaultRender, recordKey, record, ...rest}, form) => {
                return (
                  <InputNumber
                    className={'w-100'}
                    disabled
                    defaultValue={record?.hoursEntries[0]?.currentReading}
                  />
                )
            }
        },
        {
            title: 'Current Reading',
            dataIndex: 'currentHour',
            valueType: 'digit',
            onCell: (record) => {
                return {
                    onFocus: () => {
                        setRecord(record)
                    },

                }
            },
            fieldProps: {
                min: 0,
            },
            formItemProps: {
                rules: [
                    {
                        validator(rule, value): Promise<any> {
                            if (!record?.hoursEntries[0]?.currentReading) {
                                return Promise.reject('No previous reading found')
                            } else {
                                if (!value) {
                                    setAllowsubmi((allowSubmit: any) => {
                                        return {
                                            ...allowSubmit,
                                            [record?.id]: false, // Assuming each row has a unique `id` field
                                        };
                                    })
                                    return Promise.reject('Please enter current hours');
                                } else if (value < record?.hoursEntries[0]?.currentReading) {
                                    setAllowsubmi((allowSubmit: any) => {
                                        return {
                                            ...allowSubmit,
                                            [record?.id]: false, // Assuming each row has a unique `id` field
                                        };
                                    })
                                    return Promise.reject('Current Reading should be greater than previous reading');
                                } else {
                                    //check if there is not any field with false value
                                    if (record?.equipmentId && record?.compartmentId &&
                                      record?.refillTypeId && record?.brandId &&
                                      record?.gradeId && record?.volume && record?.currentHour) {
                                        setAllowsubmi((allowSubmit: any) => {
                                            return {
                                                ...allowSubmit,
                                                [record?.id]: true, // Assuming each row has a unique `id` field
                                            };
                                        })
                                        return Promise.resolve('Resolved');
                                    }
                                    return Promise.resolve('Resolved');
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            title: 'Refill Date',
            valueType: 'date',
            dataIndex: 'refillDate',
            onCell: (record) => {
                return {
                    onFocus: () => {
                        setRecord(record)
                        console.log('record during date', record)
                    },

                }
            },
            formItemProps: {
                rules: [
                    {
                        validator(rule, value) {
                            console.log('rule', rule);
                            console.log('value', value);
                            if (!value) {
                                return Promise.reject('Please select a date');
                            } else if (dayjs(value).isAfter(dayjs())) {
                                return Promise.reject('Date cannot be after today');
                            } else {
                                return Promise.resolve('Resolved');
                            }
                        } //end of validator
                    }
                ]
            },
            fieldProps: (form, {rowKey, rowIndex, entity}) => {
                return {}
            }
        },
        // },

    ];
    const saveAndContinue = async (rowsToBeSubmitted: any) => {
        try {
            // rowsToBeSubmitted?.map((item: any) => {
            // if (item.zeroReading) {
            //     mutateHours({
            //         fleetId: item.fleetId,
            //         previousReading: item.currentReading,
            //         date: new Date(item.today),
            //         currentReading: item.zeroReading,
            //         tenantId: tenant,
            //         adjustment: item.adjustment,
            //         comment: item.comment
            //     })
            // }
            //     return 0
            //
            // })
//timeouts and dsiplay of success message
            setTimeout(() => {
                message.success('Lube entry saved successfully').then(r => r)
            }, 1000)
            navigate('/')

        } catch (error) {
            // Handle form validation error
            message.error('Kindly resolve all issues before submitting!').then(r => r)
        }

    }

    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: any) => {
        setSearchText(e.target.value);
    };
    const filterData = (data: any) => {
        if (!searchText) {
            return data;
        }
        return data.filter((item: any) => {
            return Object.values(item).join('').toLowerCase().includes(searchText?.toLowerCase())
        });
    };

    return (
      <Tabs
        defaultActiveKey='1'
        items={[
            {
                label: <span className='me-4'>Lube Entry</span>,
                key: '1',
                children: (
                  <ProCard>
                      <div className='d-flex justify-content-between'>
                          <Space
                            key="search"
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
                              <Button type='primary'>Search</Button>
                          </Space>
                          <Space
                            key="button"
                            style={{
                                marginBottom: 16,
                            }}
                          >
                              <Button
                                type="primary"
                                size={'large'}
                                key="save"
                                onClick={record ? () => {
                                      const rowsToBeSubmitted = dataSource?.filter((item: any) => item.allowRowSubmit === true)
                                      // if (rowsToBeSubmitted?.length > 0) {
                                      //     saveAndContinue(rowsToBeSubmitted)
                                      // } else {
                                      //     message.error('Kindly resolve all issues before submitting!').then(r => r)
                                      // }
                                      saveAndContinue(rowsToBeSubmitted)
                                  }
                                  : () => {
                                      message.error('No Lube Entered').then(r => r)
                                  }}
                                // loading={}
                              >
                                  Save
                              </Button>
                          </Space>
                      </div>
                      <ErrorBoundary>
                          <EditableProTable<any>
                            // headerTitle="Batch Entries"
                            columns={columns}
                            loading={isLoading}
                            cardBordered
                            rowKey="id"
                            scroll={{
                                x: 1700,
                            }}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                            }}
                            value={filterData(defaultData?.data?.map(
                              (item: any) => {
                                  return {
                                      ...item,
                                      today: new Date(),
                                      ...rowValues[item.id],
                                      allowRowSubmit: false
                                  }
                              }
                            ))}
                            onChange={setDataSource}
                            //do not show add button
                            recordCreatorProps={false}

                            editable={{
                                type: 'multiple',
                                editableKeys: editableKeys ? editableKeys : defaultData?.data?.map((item: any) => item.id),
                                onValuesChange: (record, recordList) => {
                                    setRecord(record)
                                    setDataSource(recordList)
                                    setRowValues((prevRowValues: any) => {
                                        return {
                                            ...prevRowValues,
                                            [record.id]: record, // Assuming each row has a unique `id` field
                                        };
                                    });
                                },
                                onChange: setEditableRowKeys,
                            }}
                          />
                      </ErrorBoundary>
                  </ProCard>
                ),
            },
            {
                label: <span className='me-4'>Analysis</span>,
                key: '2',
                children: (
                  <>
                      <DevexpressDashboardComponent dashboardId={'LubeAnalysis'}/>
                  </>
                ),
            },
        ]}
      />
    );
};

export default LubePage;

