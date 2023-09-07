import React from 'react';
import {Space, Table, Tag} from "antd";
import {useQuery} from "react-query";
import {getEquipment, getModels} from "../../../../../urls";
import {getTenant} from "../../../../auth";
import {Link} from 'react-router-dom';

const EquipWithPendingSetup = () => {
    const columns: any = [
        {
            title: 'Model Code',
            dataIndex: 'code',
            sorter: (a: any, b: any) => {
                if (a.code > b.code) {
                    return 1
                }
                if (b.code > a.code) {
                    return -1
                }
                return 0
            },
            defaultSortOrder: 'ascend',
            render: (code: any) => {
                return (
                  <Tag
                    color='blue'
                  >
                      {code?.toUpperCase()}
                  </Tag>
                )
            }
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            render: (manufacturer: any) => {
                return (
                  manufacturer?.name?.toUpperCase()
                )
            }
        },
        {
            title: 'Action',
            fixed: 'right',
            width: 100,
            render: (record: any) => (
              <Space size='middle'>
                  <Link
                    to={`/setup/service/${record?.code?.replaceAll('/', '%2F')}`} state={
                      {
                          ...record,
                          txmanf: record?.manufacturer,
                          txmodl: record?.code,
                      }}
                  >
                      <span className='btn btn-light-info btn-sm'>Service Cycle</span>
                  </Link>
              </Space>
            ),
        }
    ]
    const {
        data: modelData,
        isLoading: modelLoading
    } = useQuery('models', () => getModels(getTenant()))
    const {
        data: equipmentData,
        isLoading: equipmentLoading
    } = useQuery('equipments', () => getEquipment(getTenant()))
    console.log("equipmentData", equipmentData)

    return (
      <>
          <Table
            bordered
            columns={columns}
            rowKey={'modelId'}
            loading={modelLoading}
            dataSource={modelData?.data?.filter((model: any) => {
                console.log('model', model)
                // @ts-ignore
                return model?.services?.length === 0
            })}
          />
      </>
    );
};

export default EquipWithPendingSetup;

