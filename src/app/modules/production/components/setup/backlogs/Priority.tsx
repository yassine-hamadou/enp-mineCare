import {useMutation, useQuery} from "react-query";
import {Button, Form, Input, message, Modal, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import {addPriorities, getPriorities, updatePriorities} from "../../../../../urls";
import {useAuth} from "../../../../auth";
import React, {useState} from "react";

const Priority = () => {
  const {tenant} = useAuth()
  const {data: priorities, isLoading} = useQuery('priorities', getPriorities)
  const {mutate: addPriority} = useMutation('addPriority', (data) => addPriorities(data, tenant), {
    onSuccess: () => {
      message.success('Priority added successfully')
    },
    onError: () => {
      message.error('Error adding priority, Please try again')
    }
  })
  const {mutate: updatePriority} = useMutation('updatePriority', updatePriorities, {
    onSuccess: () => {
      message.success('Priority updated successfully')
    },
    onError: () => {
      message.error('Error updating priority, Please try again')
    }
  })

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      render: () => (
        <Space size='middle'>
          <Button type='primary' ghost onClick={
            () => {
              setIsModalOpen(true)
              setIsUpdating(true)
              form.setFieldsValue({
                code: 'test',
                name: 'test'
              })
            }
          }>
            Edit
          </Button>
          <Button type={'primary'} danger>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)


  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleModalSubmit() {
    form.submit();
  }

  function onFinish(values: any) {
    setSubmitLoading(true)
    console.log(values)
    try {
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      isUpdating ? updatePriority(values) : addPriority(values)
      setIsUpdating(false)
    } catch (error: any) {
      setSubmitLoading(false)
      setIsUpdating(false)
      return error.statusText
    }
  }

  return (
    <KTCard>
      <KTCardBody>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              // onChange={handleInputChange}
              type='text'
              allowClear
            />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={() => setIsModalOpen(true)}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={priorities?.data}
          loading={isLoading}
        />
        <Modal
          title='Add'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitLoading}
                      onClick={handleModalSubmit}>
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={form}
            name='control-hooks'
            title='Add'
            onFinish={onFinish}
          >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input
                placeholder='Enter Name'
                type='text'
                allowClear
              />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
};

export default Priority;
