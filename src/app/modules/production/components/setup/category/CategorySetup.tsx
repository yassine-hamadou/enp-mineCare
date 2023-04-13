import {Button, Form, Input, Modal, Space, Table} from 'antd'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {ENP_URL} from '../../../../../urls'
import {useQuery} from "react-query";
import {useState} from "react";

const CategorySetup = () => {
  const {
    data: listOfCategory,
    isLoading: categoryLoading
  } = useQuery('category', () => axios.get(`${ENP_URL}/categories`))

  const columns: any = [
    {
      title: 'Code',
    },
    {
      title: 'Name',
    },
  ]


  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm] = Form.useForm();

  function handleCategoryCancel() {
    setIsCategoryModalOpen(false);
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <KTCardBody className='py-4 '>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input
              placeholder='Enter Search Text'
              type='text'
              allowClear
            />
            <Button type='primary'>
              Search
            </Button>
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={
              () => setIsCategoryModalOpen(true)
            }>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
              Add
            </button>
          </Space>
        </div>
        <Table columns={columns} dataSource={listOfCategory?.data} bordered loading={categoryLoading}/>
        <Modal title='Add Category' open={isCategoryModalOpen} onCancel={handleCategoryCancel}>
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={categoryForm}
            name='control-hooks'
            title='Add Category'
            // onFinish={onFinish}
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
    </div>
  )
}

export {CategorySetup}
