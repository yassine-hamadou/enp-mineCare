import {Button, DatePicker, Form, Input, message, Select, Tabs} from "antd";
import React, {useState} from "react";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {getModels, postEquipment} from "../../../../urls";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Link} from "react-router-dom";
import {useAuth} from "../../../auth";
import {
    CopyOutlined,
    DeleteOutlined,
    HeartOutlined,
    HomeOutlined,
    PlusOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined
} from "@ant-design/icons";


const IconMap = {
    PlusOutlined,
    HeartOutlined,
    DeleteOutlined,
    CopyOutlined,
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
};
const initialValue = {
    copyIconProps: {
        show: true,
        Icon: 'CopyOutlined',
        tooltipText: '复制此行',
    },
    deleteIconProps: {
        show: true,
        Icon: 'DeleteOutlined',
        tooltipText: '删除此行',
    },
    creatorButtonProps: {
        show: true,
        creatorButtonText: '新建一行',
        position: 'button',
        type: 'dashed',
        icon: 'PlusOutlined',
    },
};
const AddEquipRegister = () => {
    let [form] = Form.useForm();
    let [generalInfo] = Form.useForm();
    const queryClient = useQueryClient()
    const {tenant} = useAuth()
    const {data: listOfModels} = useQuery('listOfModels', () => getModels(tenant))
    const {mutate: addEquipment} = useMutation((data) => postEquipment(data, tenant), {
        onSuccess: () => {
            queryClient.invalidateQueries('listOfEquipment')
            message.success('Equipment Added Successfully')
            form.resetFields()
        },
        onError: (error: any) => {
            message.error(error?.message)
        }
    })

    function onDetailsFinish(values: any) {
        console.log('onfinish1');
        console.log(listOfModels?.data)
        console.log(values)
        const dataToPost = {
            ...values,
            modelId: values.model,
            tenantId: tenant,
        }
        console.log("dataToPost", dataToPost)
        addEquipment(dataToPost)
    }

    function onGeneralInfoFinish(values: any) {
        console.log('onfinish');
        console.log(values)
        addEquipment(values)
    }

    const [stateValue, setStateValue] = useState({});
    return <>
        <KTCard>
            <KTCardBody>
                <div className='row mb-0'>
                    <Link to='/equipment-register'>
                        <button
                          className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                            <i className='la la-arrow-left'/>
                            Equipment Register
                        </button>
                    </Link>

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
                                  form={form}
                                  onFinish={onDetailsFinish}
                                  labelCol={{span: 8}}
                                  wrapperCol={{span: 24}}
                                  title='Add Equipment'

                                >
                                    <div className='row mb-0'>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='equipmentId' label='Equipment ID'
                                                       rules={[{required: true}]}>
                                                <Input
                                                  placeholder='Enter Equipment ID'
                                                  type='text'
                                                  className='form-control form-control-solid'
                                                  style={{width: '100%'}}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='serialNumber' label='Serial Number'
                                                       rules={[{required: true}]}>
                                                <Input
                                                  placeholder='Enter Serial Number'
                                                  type='text'
                                                  className='form-control form-control-solid'

                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className='row mb-0'>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='FACode' label='Fixed Asset Code'
                                                       rules={[{required: true}]}>
                                                <Input
                                                  placeholder='Enter Fixed Asset Code'
                                                  type='text'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='model' label='Model'
                                                       rules={[{required: true}]}>
                                                <Select
                                                  showSearch={true}
                                                  placeholder='Select Model'
                                                  className='form-control form-control-solid py-1'
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
                                            <Form.Item name='PurchaseDate' label='Purchase Date'
                                                       rules={[{required: true}]}>
                                                <DatePicker
                                                  placeholder='Select Purchase Date'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='ManufactureDate' label='Manufacture Date'
                                                       rules={[{required: true}]}>
                                                <DatePicker
                                                  placeholder='Select Manufacture Date'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className='row mb-0'>
                                        <div className='col-5 mb-7'>
                                            <Form.Item name='Description' label='Description'
                                                       rules={[{required: true}]}>
                                                <Input.TextArea
                                                  placeholder='Enter Description'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-3 mb-7'>
                                            <Form.Item name='endOfLifeDate' label='End Of Life Date'
                                                       rules={[{required: true}]}>
                                                <DatePicker
                                                  placeholder='Select End Of Life Date'
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
                                  form={generalInfo}
                                  onFinish={onGeneralInfoFinish}
                                  labelCol={{span: 8}}
                                  wrapperCol={{span: 24}}
                                  title='Add General Info'
                                >
                                    <div className='row mb-0'>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='universalCode' label='Universal Code'
                                                       rules={[{required: true}]}>
                                                <Input
                                                  placeholder='Enter Universal Code'
                                                  type='text'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='Meter Type' label='Meter Type (Hours, Km)'
                                                       rules={[{required: true}]}>
                                                <Select
                                                  showSearch={true}
                                                  placeholder='Select Meter Type'
                                                  className='form-control form-control-solid py-1'
                                                >
                                                    <Select.Option value='HOUR'>Hours</Select.Option>
                                                    <Select.Option value='Km'>Km</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>

                                    </div>
                                    <div className='row mb-0'>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='warrantyStartDate' label='Warranty Start Date'
                                                       rules={[{required: true}]}>
                                                <DatePicker
                                                  placeholder='Select Warranty Start Date'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='warrantyEndDate' label='Warranty End Date'
                                                       rules={[{required: true}]}>
                                                <DatePicker
                                                  placeholder='Select Warranty End Date'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>

                                    </div>
                                    <div className='row mb-0'>
                                        <div className='col-4 mb-7'>
                                            <Form.Item name='Note' label='Note' rules={[{required: true}]}>
                                                <Input.TextArea
                                                  placeholder='Enter Note'
                                                  className='form-control form-control-solid'
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Button
                                      type='primary'
                                      htmlType='submit'
                                      onClick={
                                          () => {
                                              console.log(generalInfo.getFieldsValue());
                                          }}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </>
                          ),
                      },
                  ]}
                />
            </KTCardBody>
        </KTCard>

    </>
}

export default AddEquipRegister

