import {Button, DatePicker, Input, InputNumber, message, Modal, Select, TableColumnsType} from 'antd'
import {Space, Table, Form} from 'antd'
import React, {useEffect, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {KTSVG} from '../../../../../../_metronic/helpers'
import {addHours, fetchEquips, fetchHours} from '../../../../../urls'
import {useLocation} from "react-router-dom";

const HoursPage: React.FC = () => {

  const modelClassSelected: any = useLocation().state
  // modelClassSelected is an array of models
  const modelsForModelClassSelected = modelClassSelected[0].models
  const allEquipForModelClassSelected = modelsForModelClassSelected.map((model: any) => model.equipment) // array of arrays of objects
  const allEquipForModelClassSelectedFlat = allEquipForModelClassSelected.flat() // array of objects

  //another way to do it
  // const allEquipForModelClassSelectedFlat = modelsForModelClassSelected.reduce((acc: any, model: any) => {
  //   return acc.concat(model.equipment)
  // }, [])

  console.log("allEquipForModelClassSelectedFlat", allEquipForModelClassSelectedFlat)

  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {data: allHours, isLoading} = useQuery('hours', fetchHours)
  console.log('allHours', allHours)
  const {mutate: mutateHours} = useMutation(addHours, {
    onSuccess: () => {
      setIsModalOpen(false)
      form.resetFields()
      message.success('Hours added successfully')
      queryClient.invalidateQueries('hours')
    },
    onError: (error: any) => {
      message.error(error.message)
      throw error.ErrorBoundary
    }
  })
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  function handleFinish() {
    form.validateFields().then((values: any) => {
      console.log(values)
      const data = {
        ...values,
        fleetId: values.equipmentId,
      }
      mutateHours(data)
    })
  }

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        }}
      >
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              // onChange={handleInputChange}
              type='text'
              allowClear
              // value={searchText}
            />
            <Button type='primary'>Search</Button>
          </Space>
          <Space style={{marginBottom: 16}}>
            <button
              type='button'
              className='btn btn-primary me-3'
              onClick={showModal}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
              Add
            </button>
          </Space>
        </div>
        <Table
          bordered
          loading={isLoading}
          dataSource={
            allHours?.data?.filter((hour: any) => {
              // return only the hours for the selected model class
              return allEquipForModelClassSelectedFlat?.find((equip: any) => {
                  return equip.equipmentId === hour.fleetId
                }
              )
            })
          }
          rowKey='id'
        >
          <Table.Column title='Equipment ID' dataIndex='fleetId'/>
          <Table.Column title='Model' dataIndex='model'/>
          <Table.Column title='Description' dataIndex='description'/>
          <Table.Column title='Date' dataIndex='date' render={
            (date: string) => {
              return new Date(date).toDateString()
            }
          }/>
          <Table.Column title='Previous Reading' dataIndex='previousReading'/>
          <Table.Column title='Current Reading' dataIndex='currentReading'/>
        </Table>
      </div>
      <Modal title='Add Hours' open={isModalOpen} onCancel={handleCancel}
             closable={true}
             footer={[
               <Button key='back' onClick={handleCancel}>
                 Cancel
               </Button>,
               <Button
                 key='submit'
                 type='primary'
                 htmlType='submit'
                 // loading={submitLoading}
                 onClick={() => {
                   form.submit()
                 }}
               >
                 Submit
               </Button>,
             ]}
      >
        <Form
          form={form}
          name={'addHours'}
          labelCol={{span: 24}}
          wrapperCol={{span: 24}}
          onFinish={handleFinish}
        >
          <Form.Item label='Equipment ID' name='equipmentId'
                     rules={[{required: true, message: 'Please select an equipment'}]}
          >
            <Select
              placeholder='Select an Equipment'
              showSearch
              className='form-control form-control-solid'
            >
              {
                allEquipForModelClassSelectedFlat?.map((equip: any) => {
                  return <Select.Option
                    value={equip.equipmentId}
                    key={equip.equipmentId}
                  >{equip.equipmentId}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'
                     rules={[{required: true, message: 'Please select a date'}]}>
            <DatePicker
              className='form-control form-control-solid'
            />
          </Form.Item>
          <div className='row'>
            <div className='col-6'>
              <Form.Item label='Previous Reading' name='previousReading'
                         rules={[{required: true, message: 'Please select hours'}]}>
                <InputNumber
                  className='form-control form-control-solid'
                  min={0}
                  placeholder='Previous Reading'
                />
              </Form.Item>
            </div>
            <div className='col-6'>
              <Form.Item label='Current Reading' name='currentReading'
                         rules={[{required: true, message: 'Please select hours'}]}>
                <InputNumber
                  min={0}
                  className='form-control form-control-solid'
                  placeholder='Current Reading'
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export {HoursPage}
