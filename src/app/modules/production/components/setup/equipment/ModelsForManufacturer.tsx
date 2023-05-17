import {Button, Form, Input, Modal, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

const ModelsForManufacturer = () => {

  const dataFromManufacturer: any = useLocation().state
  // dataFromManufacturer is an array of models
  const models = dataFromManufacturer[0].models

  console.log("models", models)
  console.log("dataFromManufacturer", dataFromManufacturer)
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
      title: 'Picture',
      dataIndex: 'pictureLink',
    },
    {
      title: 'Action',
      render: (_: any) => (
        <Space size='middle'>
          <Button type='primary'>
            Edit
          </Button>
          <Button type='primary' danger>
            Delete
          </Button>
        </Space>
      )
    }
  ]


  const [isModelForManufacturerModalOpen, setIsModelForManufacturerModalOpen] = useState(false);
  const [modelForManufacturerForm] = Form.useForm();
  const [submitModelForManufacturerLoading, setSubmitModelForManufacturerLoading] = useState(false)

  function handleModelForManufacturerCancel() {
    setIsModelForManufacturerModalOpen(false);
  }

  function handleModelForManufacturerModalSubmit() {
    modelForManufacturerForm.submit();
  }

  function onModelFinish(values: any) {
    setSubmitModelForManufacturerLoading(true)
    console.log(values)
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
            <button type='button' className='btn btn-primary me-3'
                    onClick={() => setIsModelForManufacturerModalOpen(true)}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={models}
        />
        <Modal
          title='Add Model'
          open={isModelForManufacturerModalOpen}
          onCancel={handleModelForManufacturerCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleModelForManufacturerCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitModelForManufacturerLoading}
                      onClick={handleModelForManufacturerModalSubmit}>
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={modelForManufacturerForm}
            name='control-hooks'
            title='Add Model'
            onFinish={onModelFinish}
          >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input
                placeholder='Enter Category Name'
                type='text'
                allowClear
              />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </KTCard>
  )
}

export default ModelsForManufacturer
