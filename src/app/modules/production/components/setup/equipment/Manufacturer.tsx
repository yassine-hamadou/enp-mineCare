import {Input, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React from "react";
import {Link} from "react-router-dom";
import {getManufacturers} from "../../../../../urls";
import {useQuery} from "react-query";


const Manufacturer = () => {
  const {data: manufacturers, isLoading} = useQuery('Manufacturers', getManufacturers)

  const columns: any = [
    {
      title: 'Code',
      dataIndex: 'manufacturerId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link
            to={`${record.manufacturerId}`}
            state={
              manufacturers?.data?.filter(
                (manufacturer: any) => manufacturer.manufacturerId === record.manufacturerId
              )
            }
          >
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
              type='text'
              allowClear
            />
          </Space>
          <Space style={{marginBottom: 16}}>
            <button type='button' className='btn btn-primary me-3' onClick={() => console.log()}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={manufacturers?.data}
          loading={isLoading}
        />
      </KTCardBody>
    </KTCard>
  )
}

export default Manufacturer
