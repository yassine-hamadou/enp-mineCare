import {Button, DatePicker, Empty, Form, Input, Modal, Space, theme} from 'antd'
import {useLocation, useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import React, {CSSProperties, useState} from 'react'
import {CheckListForm} from './CheckListForm'
import TextArea from 'antd/lib/input/TextArea'
import {useForm} from 'antd/es/form/Form'
import {ErrorBoundary} from '@ant-design/pro-components'
import {fetchServices} from '../../../../urls'
import {useAuth} from '../../../auth'

import './CheckListForm.css'

const TabsTest: React.FC = () => {
  const {tenant} = useAuth()
  const {data: AllServiceTypes} = useQuery('serviceType', () => fetchServices(tenant))
  // const loadSchedule: any = useQueryClient().getQueryData("loadSchedule");
  console.log('serviceType', AllServiceTypes)
  //Get the service type id from the url
  const params = useParams()
  const location: any = useLocation()
  const state = location.state
  const fleetId: any = state?.schedule?.fleetId
  const referenceId: any = state?.schedule?.referenceId
  console.log('fleetId', fleetId)
  console.log('state', state)

  console.log('paramsss', params)
  const serviceId: any = state?.schedule?.serviceTypeId
  //Get the service type name from the service type id
  const serviceType = AllServiceTypes?.data?.find((s: any) => s.id === parseInt(serviceId))
  const sections = serviceType?.sections

  console.log('sections', sections)

  const [checkListForm] = useForm()
  const steps = sections?.map((s: any) => {
    return {
      title: String(`${s?.name}`).toUpperCase(),
      //passing the form hook from here to the child component so that we can use it to submit the form from here
      content: (
        <CheckListForm
          sections={s}
          form={checkListForm}
          equipmentId={fleetId}
          referenceId={referenceId}
        />
      ),
    }
  })

  const {token} = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [defectModalOpen, setDefectModalOpen] = useState(false)
  const [defectForm] = Form.useForm()

  defectForm.setFieldsValue({
    fleetId: `${params.fleetId}`,
  })

  const submitForm = () => {
    checkListForm.submit()
  }
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps?.map((step: any) => ({
    key: step.title,
  }))
  const contentStyle: CSSProperties = {
    lineHeight: '260px',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // borderTop: `1px dashed ${token.colorBorder}`,
    paddingTop: 20,
    marginTop: 20,
  }

  function handleCancel() {
    setDefectModalOpen(false)
  }

  let [submitLoading] = useState(false)
  // @ts-ignore
  return sections?.length > 0 ? (
    <>
      <Modal
        title='Defect Entry'
        open={defectModalOpen}
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
              defectForm.submit()
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={defectForm}
          name='control-hooks'
          labelCol={{span: 8}}
          wrapperCol={{span: 14}}
          title='Defect'
          // onFinish={onFinish}
        >
          <Form.Item name='fleetId' label='Fleet ID' rules={[{required: true}]}>
            <Input disabled style={{color: 'black'}} />
          </Form.Item>
          <Form.Item name='expectedDate' label='Expected Date' rules={[{required: true}]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name='item' label='Item' rules={[{required: true}]}>
            <TextArea />
          </Form.Item>
          <Form.Item name='comment' label='Comment' rules={[{required: true}]}>
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <ErrorBoundary>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            {/*
                      Print the webpage on button click but remove the button from the
                        print preview by using the media query
                      */}
            <button
              type='button'
              className='btn btn-light-primary me-3 no-print'
              onClick={() => {
                window.print()
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Print
            </button>
          </Space>
        </div>

        <KTCard>
          <KTCardBody>
            <div className='d-flex justify-content-center mb-7'>
              <span className='fst-itali fs-5 text-danger'>
                Please read each label carefully and select the appropriate option
              </span>
            </div>
            {/*<Steps current={current} items={items}/>*/}
            {/*<div style={contentStyle}>{steps[current].content}</div>*/}
            {steps?.map((step: any, index: any) => {
              return <div style={contentStyle}>{steps[index].content}</div>
            })}

            {/*<div*/}
            {/*  style={{*/}
            {/*      marginTop: 24,*/}
            {/*  }}*/}
            {/*>*/}
            {/*    <Button*/}
            {/*      style={{*/}
            {/*          margin: '0 8px',*/}
            {/*      }}*/}
            {/*      onClick={() => {*/}
            {/*          setDefectModalOpen(true)*/}
            {/*      }}*/}
            {/*    >*/}
            {/*        Backlog*/}
            {/*    </Button>*/}
            {/*    {current > 0 && (*/}
            {/*      <Button*/}
            {/*        style={{*/}
            {/*            margin: '0 8px',*/}
            {/*        }}*/}
            {/*        onClick={() => prev()}*/}
            {/*      >*/}
            {/*          Previous*/}
            {/*      </Button>*/}
            {/*    )}*/}
            {/*    {current < steps.length - 1 && (*/}
            {/*      <Button type="primary" onClick={() => {*/}
            {/*          checkListForm.validateFields().then(() => {*/}
            {/*              submitForm()*/}
            {/*              next()*/}
            {/*          }).catch(() => {*/}
            {/*              message.error({content: "Please fill all the required fields", duration: 2})*/}
            {/*          })*/}
            {/*      }*/}
            {/*      }>*/}
            {/*          Next*/}
            {/*      </Button>*/}
            {/*    )}*/}
            {/*    {current === steps.length - 1 && (*/}
            {/*      <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
            {/*          Done*/}
            {/*      </Button>*/}
            {/*    )}*/}
            {/*</div>*/}
          </KTCardBody>
        </KTCard>
      </ErrorBoundary>
    </>
  ) : (
    <>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={
          <span
            style={{
              color: 'black',
            }}
          >
            <b>
              No sections found. Kindly setup sections for service type{' '}
              <span style={{color: 'red'}}>{serviceType?.name}</span> under model{' '}
              <span style={{color: 'red'}}>{serviceType?.model}</span>{' '}
            </b>
          </span>
        }
      ></Empty>
    </>
  )
}

export default TabsTest
