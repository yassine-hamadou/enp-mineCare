import {Button, Cascader, DatePicker, Form, Input, InputNumber, message, Select, Steps} from 'antd'
import React, {useState} from 'react'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {getModelClasses, postEquipment} from '../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../auth'
import {
  ArrowRightOutlined,
  DetailsOutlined,
  DoneAllOutlined,
  InfoRounded,
} from '@mui/icons-material'
interface Option {
  value: string | number
  label: string
  children?: Option[]
}
const AddEquipRegister = () => {
  const {Step} = Steps
  let [form] = Form.useForm()
  let [generalInfo] = Form.useForm()
  const queryClient = useQueryClient()
  const {tenant} = useAuth()
  const {mutate: addEquipment, isLoading: submitLoading} = useMutation(
    (data) => postEquipment(data, tenant),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('equipments')
        message.success('Equipment Added Successfully')
        form.resetFields()
        generalInfo.resetFields()
        setCurrent(0)
      },
      onError: (error: any) => {
        message.error(error?.message)
        setCurrent(0)
      },
    }
  )
  const {data: listOfModelClass, isLoading: isModelClassloading} = useQuery('modelClassQuery', () =>
    getModelClasses(tenant)
  )
  console.log('listOfModelClass', listOfModelClass)

  function onDetailsFinish(values: any) {
    setDetailsState(values)
    setCurrent(1)
  }

  function onGeneralInfoFinish(values: any) {
    setGeneralInfoState(values)
    setCurrent(2)
  }

  function onFinish() {
    const formData = {
      ...detailsState,
      ...generalInfoState,
    }
    formData['modelId'] = formData['modelClass'][1]
    formData['modelClass'] = undefined
    const formDataWithoutUndefined = Object.keys(formData).reduce((acc: any, key: any) => {
      if (formData[key] !== undefined) {
        acc[key] = formData[key]
      }
      return acc
    }, {})
    addEquipment(formDataWithoutUndefined)
  }
  const DetailsForm = ({onDetailsFinish}: any) => {
    return (
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
            <Form.Item
              name='modelClass'
              className='form-control form-control-solid'
              label='Equip. Type / Model'
              rules={[
                {required: true},
                // {
                //   validator: async (_, value) => {
                //     //allow selecting only if the equipment id field is not empty
                //     if (form.getFieldValue('equipmentId') === undefined) {
                //       return Promise.reject(new Error('Please enter Equipment ID first!'))
                //     }
                //     if (value === undefined) {
                //       return Promise.reject(new Error('Please select Equipment Type!'))
                //     }
                //     return Promise.resolve()
                //   },
                // },
              ]}
            >
              {/*<Select*/}
              {/*  placeholder='Select Equipment Type'*/}
              {/*  className='form-control form-control-solid py-1 px-0'*/}
              {/*>*/}
              {/*  {listOfModelClass?.data?.map((item: any) => (*/}
              {/*    <Select.Option value={item?.modelClassId}>*/}
              {/*      {item.name}*/}
              {/*      /!*<span className='text-muted'>({item?.manufacturer?.name?.trim()})</span>*!/*/}
              {/*    </Select.Option>*/}
              {/*  ))}*/}
              {/*</Select>*/}
              <Cascader
                options={options}
                size={'large'}
                placeholder='Please select'
                loading={isModelClassloading}
                autoClearSearchValue={true}
              />
            </Form.Item>
          </div>

          <div className='col-4 mb-7'>
            <Form.Item
              name='equipmentId'
              label='Equipment ID'
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[a-zA-Z0-9]+$/),
                  message: 'Alphanumeric Equipment ID Required!',
                },
                {
                  validator: async (_, value) => {
                    //check if the equipment id first characters match with the model class code
                    if (value === undefined) {
                      return Promise.reject(new Error())
                    }

                    if (!form.getFieldValue('modelClass')) {
                      return Promise.reject(new Error('Please Select Equipment Type First!'))
                    }
                    const modelClassSelected = listOfModelClass?.data?.find((modelClass: any) => {
                      return modelClass?.modelClassId === form.getFieldValue('modelClass')[0]
                    })
                    if (listOfModelClass?.data) {
                      if (
                        !value
                          ?.trim()
                          ?.toLowerCase()
                          ?.startsWith(modelClassSelected?.code?.trim()?.toLowerCase())
                      ) {
                        return Promise.reject(
                          new Error(`Equipment ID should start with ${modelClassSelected?.code}!`)
                        )
                      }
                    }
                  },
                },
              ]}
              className='form-control form-control-solid'
            >
              <Input
                placeholder='Enter Equipment ID'
                // onChange={handleChange}
                type='text'
                size={'large'}
                style={{width: '100%'}}
              />
            </Form.Item>
          </div>
        </div>
        <div className='row mb-0'>
          <div className='col-4 mb-7'>
            <Form.Item name='FACode' label='Fixed Asset Code'>
              <Input
                placeholder='Enter Fixed Asset Code'
                type='text'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
          {/*<div className='col-2 mb-7'>*/}
          {/*  <Form.Item name='modelId' label='Model' rules={[{required: true}]}>*/}
          {/*    <Select*/}
          {/*      placeholder='Select Model'*/}
          {/*      className='form-control form-control-solid py-1 px-0'*/}
          {/*    >*/}
          {/*      {modelsUnderSelectedClass?.data?.map((item: any) => (*/}
          {/*        <Select.Option value={item?.modelId}>*/}
          {/*          {item.name}{' '}*/}
          {/*          <span className='text-muted'>({item?.manufacturer?.name?.trim()})</span>*/}
          {/*        </Select.Option>*/}
          {/*      ))}*/}
          {/*    </Select>*/}
          {/*  </Form.Item>*/}
          {/*</div>*/}
          <div className='col-4 mb-7'>
            <Form.Item
              name='serialNumber'
              label='Serial Number'
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[a-zA-Z0-9]+$/),
                  message: 'Alphanumeric Serial Number Required!',
                },
              ]}
            >
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
            <Form.Item name='PurchaseDate' label='Purchase Date'>
              <DatePicker
                placeholder='Select Purchase Date'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
          <div className='col-4 mb-7'>
            <Form.Item name='ManufactureDate' label='Manufacture Date'>
              <DatePicker
                placeholder='Select Manufacture Date'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
        </div>
        <div className='row mb-0'>
          <div className='col-5 mb-7'>
            <Form.Item name='Description' label='Description'>
              <Input.TextArea
                placeholder='Enter Description'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
          <div className='col-3 mb-7'>
            <Form.Item name='endOfLifeDate' label='End Of Life Date'>
              <DatePicker
                placeholder='Select End Of Life Date'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
        </div>
        <Button
          type='primary'
          style={{float: 'right'}}
          icon={<ArrowRightOutlined />}
          htmlType='submit'
        >
          Continue
        </Button>
      </Form>
    )
  }
  const GeneralInfoForm = ({onGeneralInfoFinish}: any) => {
    return (
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
            <Form.Item
              name='meterType'
              label='Meter Type'
              className='form-control form-control-solid'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch={true}
                placeholder='Select Meter Type'
                size={'large'}
                // style={{
                //   padding: '0.4rem 0.75rem',
                // }}
              >
                <Select.Option value='HOUR'>Hours</Select.Option>
                <Select.Option value='Km'>Km</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className='col-4 mb-7'>
            <Form.Item
              name='initialReading'
              label='Initial Reading'
              className='form-control form-control-solid '
              rules={[
                {
                  required: true,
                  message: 'Please input initial reading value!',
                },
              ]}
            >
              <InputNumber
                placeholder='Enter Initial Reading Value'
                size={'large'}
                className='w-100 '
                min={0}
                max={999999}
              />
            </Form.Item>
          </div>
        </div>
        <div className='row mb-0'>
          <div className='col-4 mb-7'>
            <Form.Item name='warrantyStartDate' label='Warranty Start Date'>
              <DatePicker
                placeholder='Select Warranty Start Date'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
          <div className='col-4 mb-7'>
            <Form.Item name='warrantyEndDate' label='Warranty End Date'>
              <DatePicker
                placeholder='Select Warranty End Date'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
        </div>
        <div className='row mb-0'>
          <div className='col-4 mb-7'>
            <Form.Item name='Note' label='Note'>
              <Input.TextArea
                placeholder='Enter Note'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
          <div className='col-4 mb-7'>
            <Form.Item name='universalCode' label='Universal Code'>
              <Input
                placeholder='Enter Universal Code'
                type='text'
                className='form-control form-control-solid'
              />
            </Form.Item>
          </div>
        </div>
        <Button
          type='primary'
          htmlType='submit'
          style={{float: 'right'}}
          icon={<ArrowRightOutlined />}
        >
          Continue
        </Button>
      </Form>
    )
  }
  const FinishForm = ({onFinish}: any) => {
    //you can use this form to show the summary of the data
    return (
      <>
        <h1 className={'align-center'}>Equipment Information Set!</h1>
        <Button type='primary' htmlType='submit' onClick={onFinish} loading={submitLoading}>
          Submit
        </Button>
      </>
    )
  }
  const forms = [
    <DetailsForm onDetailsFinish={onDetailsFinish} />,
    <GeneralInfoForm onGeneralInfoFinish={onGeneralInfoFinish} />,
    <FinishForm onFinish={onFinish} />,
  ]

  const [current, setCurrent] = useState(0)
  const [detailsState, setDetailsState] = useState<any>(null)
  const [generalInfoState, setGeneralInfoState] = useState<any>(null)

  const steps = [
    {
      title: 'Details',
      icon: <DetailsOutlined />,
      disabled: false,
    },
    {
      title: 'General Info',
      disabled: !detailsState,
      icon: <InfoRounded />,
    },
    {
      title: 'Finish',
      disabled: !generalInfoState,
      icon: <DoneAllOutlined />,
    },
  ]
  const items = steps.map((item, i) => (
    <Step key={i} title={item.title} icon={item.icon} disabled={item.disabled} />
  ))

  // const options: Option[] = listOfModelClass?.data
  //   ?.filter((item: any) =>
  //     item?.code?.toLowerCase()?.startsWith(form.getFieldValue('equipmentId')?.toLowerCase() ?? '')
  //   )
  //   ?.map((modelClass: any) => ({
  //     value: modelClass?.modelClassId,
  //     label: modelClass?.name,
  //     children: listOfModels?.data
  //       ?.filter((item: any) => item?.modelClassId === modelClass?.modelClassId)
  //       .map((item: any) => ({
  //         value: item?.modelId,
  //         label: item?.name,
  //       })),
  //   }))

  const options: Option[] = listOfModelClass?.data?.map((modelClass: any) => ({
    value: modelClass?.modelClassId,
    label: modelClass?.name,
    children: modelClass?.models?.map((item: any) => ({
      value: item?.modelId,
      label: item?.name,
    })),
  }))
  // @ts-ignore
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='row mb-0'>
            <Link to='/equipment-register'>
              <button className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                <i className='la la-arrow-left' />
                Equipment Register
              </button>
            </Link>
          </div>

          <Steps current={current} onChange={setCurrent} className='my-8'>
            {items}
          </Steps>
          {forms[current]}
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default AddEquipRegister
