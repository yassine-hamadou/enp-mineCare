import React, {useState} from 'react';
import {KTCard, KTCardBody, KTSVG} from "../../../../../../../_metronic/helpers";
import {Button, Form, Input, InputNumber, message, Modal, Space, Table} from "antd";
import useForm from 'antd/es/form/hooks/useForm';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getPMObjects} from "./getPM";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteSequence, getSequences, postSequence} from "../../../../../../urls";
import {useAuth} from "../../../../../auth";

const Sequence = () => {
  const queryClient: any = useQueryClient()
  const {tenant} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [gridData, setGridData] = useState<any>([])
  const routeParams: any = useParams();
  const {
    data: sequences,
    isLoading,
    isError,
  } = useQuery(['sequences'], () => getSequences(routeParams?.modelId?.replaceAll('/', '2%F'), tenant), {

    retry: false,
  })
  const {
    mutate: removeSequence,
    isLoading: isDeleteLoading
  } = useMutation((model: any) => deleteSequence(tenant, model), {
    onSuccess: () => {
      queryClient.refetchQueries(['sequences']).then(
        message.success('Sequence deleted successfully')
      )
    },
    onError: (error: any) => {
      message.error('Something went wrong').then(r => r)
      console.log(error)
    }
  })
  const {mutate: addSequence} = useMutation(postSequence, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sequences'])
      form.resetFields()
      setIsModalOpen(false)
      setSubmitLoading(false)
      message.success('Sequence added successfully')
    },
    onError: (error) => {
      setSubmitLoading(false)
      message.error('Something went wrong')
      console.log("error", error)
    }
  })
  const [form] = useForm()

  const navigate = useNavigate();
  const location: any = useLocation();
  const servicesForThisModel = location?.state?.services?.map((service: any) => {
    return {
      name: service.name,
      hours: service.intervalForPm,
    }
  })
  console.log("sequencesfor model", sequences?.data)

  const showModal = () => {
    setIsModalOpen(true)
  }

  function handleCancel() {
    setIsModalOpen(false)
  }

  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    let sequence = []
    let hours = values.hoursInterval
    for (let i = 0; i < values.frequency; i++) {
      sequence.push({
        sequenceName: getPMObjects(hours, servicesForThisModel)?.name,
        interval: hours,
        equipModel: routeParams?.modelId,
        tenantId: tenant
      })
      console.log("hours", hours)
      hours += values.hoursInterval
    }
    console.log("sequence", sequence)
    addSequence(sequence)
  }


  const columns = [
    {
      title: 'Service Type',
      dataIndex: 'sequenceName',
    },
    {
      title: 'Hours',
      dataIndex: 'interval',
    }
  ]

  return (
    <KTCard>
      <KTCardBody>
        <h3 style={{fontWeight: "bolder"}}>{routeParams?.modelId}</h3>
        <br></br>
        <button className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
                onClick={() => navigate(-1)}>Back to Service Types
        </button>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Search...'
              type='text'
            />
            <Button type='primary'>Search</Button>
          </Space>
          <Space style={{marginBottom: 16}}>
            {sequences?.data?.length === 0 ? (
              <button type='button' className='btn btn-light-primary me-3' onClick={showModal}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
                Add
              </button>
            ) : (
              <Button type='primary' danger size={"large"} className='btn btn-light-danger me-3'
                      loading={isDeleteLoading}
                      onClick={() => removeSequence(routeParams?.modelId)}>
                Delete Sequence
              </Button>
            )
            }
          </Space>
        </div>
        <Table
          bordered
          dataSource={!isError ? sequences?.data : []}
          columns={columns}
          loading={isLoading}
          pagination={{pageSize: 50}}
          scroll={{x: 1000}}
        />
        <Modal
          title={'Add Sequence'}
          open={isModalOpen}
          onCancel={handleCancel}
          closable={true}
          footer={[
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key='submit'
              htmlType='submit'
              type='primary'
              loading={submitLoading}
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
            name='control-hooks'
            labelCol={{span: 8}}
            wrapperCol={{span: 14}}
            title={'Add Sequence'}
            onFinish={onFinish}
            layout={'horizontal'}
          >
            <Form.Item name='hoursInterval' label='Interval' rules={[{required: true}]}>
              <InputNumber min={0}/>
            </Form.Item>
            <Form.Item name='frequency' label='Frequency' rules={[{required: true}]}>
              <InputNumber min={0} max={100}/>
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  );
};

export default Sequence;


