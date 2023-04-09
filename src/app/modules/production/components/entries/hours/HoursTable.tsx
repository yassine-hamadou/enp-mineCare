import {Button, DatePicker, Input, InputNumber, Modal, Select, TableColumnsType} from 'antd'
import {Space, Table, Form} from 'antd'
import React, {useEffect, useState} from 'react'
import {useQuery} from "react-query";
import {KTSVG} from '../../../../../../_metronic/helpers'
import {fetchEquips, fetchHours, fetchModels} from '../../../../../urls'

const HoursPage: React.FC = () => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const {data: allHours, isLoading} = useQuery('hours', fetchHours, {cacheTime: 5000})
  const {data: equips, isLoading: equipsLoading} = useQuery('equips', fetchEquips, {cacheTime: 5000})

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
        <Table bordered loading={isLoading} dataSource={
          allHours?.data
        }>
          <Table.Column title='Equipment ID' dataIndex='fleetId'/>
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
      >
        <Form form={form}
              name={'addHours'}
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
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
                equips?.data?.map((equip: any) => {
                  return <Select.Option
                    value={equip.fleetID}
                    key={equip.fleetID}
                  >{equip.fleetID} - {equip.modlName} - {equip.modlClass}</Select.Option>
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
