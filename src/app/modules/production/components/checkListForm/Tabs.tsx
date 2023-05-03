import {Empty, Button, message, Steps, theme, Form, Select, Input, InputNumber, DatePicker, Modal} from "antd";
import {useLocation, useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import React, {CSSProperties, useState} from "react";
import {CheckListForm} from "./CheckListForm";
import TextArea from "antd/lib/input/TextArea";
import {useForm} from "antd/es/form/Form";
import {ErrorBoundary} from "@ant-design/pro-components";
import {fetchServices} from "../../../../urls";


const TabsTest: React.FC = () => {
  //Get the service type with useQueryClient
  const {data: AllServiceTypes} = useQuery("serviceType", fetchServices);
  // const loadSchedule: any = useQueryClient().getQueryData("loadSchedule");
  console.log("serviceType", AllServiceTypes);
  //Get the service type id from the url
  const params = useParams()
  const location: any = useLocation();
  const state = location.state
  const fleetId: any = state?.schedule?.fleetId
  const referenceId: any = state?.schedule?.referenceId
  console.log("fleetId", fleetId)
  console.log("state", state)

  console.log("paramsss", params)
  const serviceId: any = state.schedule?.serviceTypeId
  //Get the service type name from the service type id
  const serviceType = AllServiceTypes?.data?.find((s: any) => s.id === parseInt(serviceId))
  const sections = serviceType?.sections

  console.log("sections", sections)

  const [checkListForm] = useForm();
  const steps = sections?.map((s: any) => {
    return {
      title: String(`${s.name}`).toUpperCase(),
      //passing the form hook from here to the child component so that we can use it to submit the form from here
      content: <CheckListForm sections={s} form={checkListForm} equipmentId={fleetId} referenceId={referenceId}/>,
    }
  })


  const {token} = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [defectModalOpen, setDefectModalOpen] = useState(false);
  const [defectForm] = Form.useForm();

  defectForm.setFieldsValue({
    fleetId: `${params.fleetId}`,
  })

  const submitForm = () => {
    checkListForm.submit()
  }
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((step: any) => ({
    key: step.title,
  }));
  const contentStyle: CSSProperties = {
    lineHeight: '260px',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // borderTop: `1px dashed ${token.colorBorder}`,
    paddingTop: 20,
    marginTop: 20,
  };

  function handleCancel() {
    setDefectModalOpen(false);
  }

  let [submitLoading, setSubmitLoading] = useState(false);
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
            <Input disabled style={{color: 'black'}}/>
          </Form.Item>
          <Form.Item name='expectedDate' label='Expected Date' rules={[{required: true}]}>
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item name='item' label='Item' rules={[{required: true}]}>
            <TextArea/>
          </Form.Item>
          <Form.Item name='comment' label='Comment' rules={[{required: true}]}>
            <TextArea/>
          </Form.Item>
        </Form>
      </Modal>
      <ErrorBoundary>
        <KTCard>
          <KTCardBody>
            <Steps current={current} items={items}/>
            <div style={contentStyle}>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              <Button
                style={{
                  margin: '0 8px',
                }}
                onClick={() => {
                  setDefectModalOpen(true)
                }}
              >
                Defect
              </Button>
              {current > 0 && (
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => {
                  checkListForm.validateFields().then(() => {
                    submitForm()
                    next()
                  }).catch((err) => {
                    message.error({content: "Please fill all the required fields", duration: 2})
                  })
                }
                }>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
            </div>

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
          <span><b>No sections found. Kindly setup new sections for the above service type.</b></span>
        }
      >
      </Empty>
    </>
  )
}

export {TabsTest}
