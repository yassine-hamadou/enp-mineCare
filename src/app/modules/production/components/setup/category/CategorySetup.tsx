import {Button, Form, Input, message, Modal, Space, Table} from 'antd'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {getCategories, postCategories} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useState} from "react";

const CategorySetup = () => {

  const queryClient = useQueryClient()
  const [submitLoading, setSubmitLoading] = useState(false)

  const {
    data: listOfCategory,
    isLoading: categoryLoading
  } = useQuery('category', getCategories)

  const {mutate: addCategory} = useMutation(postCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries('category')
      setIsCategoryModalOpen(false)
      setSubmitLoading(false)
      message.success('Category added successfully')
      categoryForm.resetFields()
    },
    onError: (error: any) => {
      setSubmitLoading(false)
      message.error(error.message)
    }
  })
  const columns: any = [
    {
      title: 'Code',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      render: (text: any, record: any) => (
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


  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm] = Form.useForm();

  function handleCategoryCancel() {
    setIsCategoryModalOpen(false);
  }

  function handleCategorySubmit() {
    categoryForm.submit();
  }

  function onFinish(values: any) {
    setSubmitLoading(true)
    console.log(values)
    addCategory(values)
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
        <Modal
          title='Add Category'
          open={isCategoryModalOpen}
          onCancel={handleCategoryCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleCategoryCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitLoading} onClick={handleCategorySubmit}>
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={categoryForm}
            name='control-hooks'
            title='Add Category'
            onFinish={onFinish}
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
