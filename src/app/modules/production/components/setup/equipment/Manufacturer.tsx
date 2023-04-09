import {Input, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React from "react";
import {Link} from "react-router-dom";



const data = [
    {
        key: '1',
        code: '001',
        name: 'Toyota',
    },
    {
        key: '2',
        code: '002',
        name: 'Mercedes',
    }
]
const Manufacturer = () => {
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
        render: (_: any, record: any) => (
            <Space size='middle'>
                <Link to={`model/${record.code}`}>
                  <button type='button' className='btn btn-light-primary me-3'>
                    Models
                  </button>
                </Link>
                {/*<button type='button' className='btn btn-light-danger me-3'>*/}
                {/*Delete*/}
                {/*</button>*/}
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

export default Manufacturer
