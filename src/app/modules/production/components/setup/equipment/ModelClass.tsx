import {Button, Input, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React from "react";


const data = [
  {
    key: '001',
    code: '001',
    name: '14HM',
  },
  {
    key: '002',
    code: '002',
    name: '12HM',
  }
]
const ModelClass = () => {
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
            <Button type='primary' ghost>
                Edit
            </Button>
            <Button type={'primary'} danger>
                Delete
            </Button>
        </Space>
        )
    }
  ]

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
            <button type='button' className='btn btn-primary me-3' onClick={() => console.log()}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          bordered
            dataSource={data}
        />
      </KTCardBody>
        </KTCard>
    )
}

export default ModelClass
