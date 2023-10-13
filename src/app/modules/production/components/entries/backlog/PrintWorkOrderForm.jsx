import {Col, DatePicker, Divider, Form, Input, Row, Select, Space} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'

import {useLocation} from 'react-router'
import TextArea from 'antd/lib/input/TextArea'
import {PrinterOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'
import '../../../../production/components/checkListForm/CheckListForm.css'
import React from 'react'

const PrintWorkOrderForm = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const workOrder = location?.state
  console.log('workOrder', workOrder)

  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <button
              type='button'
              className='btn btn-info no-print'
              onClick={() => {
                window.print()
              }}
            >
              Print &nbsp;
              <PrinterOutlined className='svg-icon-2' />
            </button>
          </Space>
        </div>
        <Form className='form kt_modal_add_plan_form' form={form} layout='vertical'>
          {/* begin::Scroll */}
          <div className='d-flex justify-content-center'>
            <h1>
              <strong>{String('Work Order Form').toUpperCase()}</strong>
            </h1>
          </div>
          <Divider />
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='workOrder' label='Work No'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.referenceNo ?? 'Empty'}
                  placeholder={`${workOrder?.referenceNo ?? 'Empty'}`}
                  disabled={true}
                  // readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='equipmentId' label='Equipment ID'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.equipmentId ?? 'Empty'}
                  placeholder={`${workOrder?.equipmentId ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='workOrderType' label='WO Type'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.workOrderType ?? 'Empty'}
                  placeholder={`${workOrder?.workOrderType ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='equipmentDescription' label='Equipment Description'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.equipmentDescription ?? 'Empty'}
                  placeholder={`${workOrder?.equipmentDescription ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='WO Category' label='Work Order Category'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.workOrderCategory ?? 'Empty'}
                  placeholder={`${workOrder?.workOrderCategory ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='SMU' label='SMU'>
                <Input
                  className=' fs-4'
                  defaultValue={workOrder?.smu ?? 'Empty'}
                  placeholder={`${workOrder?.smu}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name='fault' label='Fault'>
                <TextArea
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.fault ?? 'Empty'}
                  placeholder={`${workOrder?.fault ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name='workInstruction' label='Work Instruction'>
                <TextArea
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.workInstruction ?? 'Empty'}
                  placeholder={`${workOrder?.workInstruction ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='priority' label='Priority'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.priority ?? 'Empty'}
                  placeholder={`${workOrder?.priority ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='PermitRequired' label='Permit/HSE Required'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.permitRequired ?? 'Empty'}
                  placeholder={`${workOrder?.permitRequired ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='Requester' label='Requester'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.requester ?? 'Empty'}
                  placeholder={`${workOrder?.requester ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='Receiver' label='Receiver'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={workOrder?.receiver ?? 'Empty'}
                  placeholder={`${workOrder?.receiver ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name='WorkDone' label='Work Done'>
                <TextArea className=' fs-4 text-black' rows={7} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={4}>
              <Form.Item name='scheduledDate' label='Scheduled Date'>
                <Input
                  className=' fs-4 text-black'
                  defaultValue={dayjs(workOrder?.scheduledDate).format('YYYY-MM-DD')}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name='startDate'
                label={<span>Date Started&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>}
              >
                <Input
                  className=' fs-4 text-black'
                  // defaultValue={workOrder?.startDate ?? 'Empty'}
                  // placeholder={`${workOrder?.startDate ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='completionDate' label='Completion Date'>
                <Input
                  className=' fs-4 text-black'
                  // defaultValue={workOrder?.completionDate ?? 'Empty'}
                  // placeholder={`${workOrder?.completionDate ?? 'Empty'}`}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='tools' label='Special Tools & Equipment'>
                <TextArea className=' fs-4 text-black' disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='parts' label='Parts & Matl. Used'>
                <TextArea className=' fs-4 text-black' disabled={true} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name='pr/reference' label='PR/PO Reference'>
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='tcost' label='Total Cost'>
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='Techs/Enginners' label='Techs/Enginners'>
                <TextArea className=' fs-4 text-black' disabled={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='Commens' label='Comments'>
                <TextArea className=' fs-4 text-black' disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='signature' label='Tech. Name'>
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='signature' label="Supervisor's Name">
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name='signature' label='Signature'>
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='signature' label='Signature'>
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </KTCardBody>
    </KTCard>
  )
}

export {PrintWorkOrderForm}
