import {Input, Space, Table} from "antd";
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import React from "react";
import {Link} from "react-router-dom";
import {getModelClasses} from "../../../../../urls";
import {useQuery} from "react-query";


const HoursModelClass = () => {
  const {data: modelClasses, isLoading} = useQuery('ModelClasses', getModelClasses)

  const columns: any = [
    {
      title: 'Code',
      dataIndex: 'modelClassId',
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
            to={`${record.modelClassId}`}
            state={
              modelClasses?.data?.filter(
                (modelClass: any) => modelClass.modelClassId === record.modelClassId
              )
            }
          >
            <button type='button' className='btn btn-light-primary me-3'>
              Equip Hours
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
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={modelClasses?.data}
          loading={isLoading}
        />
      </KTCardBody>
    </KTCard>
  )
}

export default HoursModelClass
