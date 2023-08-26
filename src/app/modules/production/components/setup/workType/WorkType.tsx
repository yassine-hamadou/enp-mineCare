import {Button, Input, Space, Table} from 'antd'
import {Link} from 'react-router-dom'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {getModels} from '../../../../../urls'
import {useQuery} from "react-query";
import {useAuth} from "../../../../auth";

const WorkTypePage = () => {
    const {tenant} = useAuth()
    const {data: equipModels, isLoading: equipModelLoading} = useQuery('equipmodels',
      () => getModels(tenant)
    )
    console.log(equipModels)

    const columns: any = [
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            render: (manufacturer: any) => {
                return manufacturer?.name
            },
            sorter: (a: any, b: any) => {
                if (a.manufacturer?.name > b.manufacturer?.name) {
                    return 1
                }
                if (b.manufacturer?.name > a.manufacturer?.name) {
                    return -1
                }
                return 0
            },
        },

        {
            title: 'Model',
            dataIndex: 'code',
            key: 'code',
            sorter: (a: any, b: any) => {
                if (a.code > b.code) {
                    return 1
                }
                if (b.code > a.code) {
                    return -1
                }
                return 0
            },
        },

        {
            title: 'Action',

            // dataIndex: 'faultDesc',
            // sorter: (a: any, b: any) => a.faultDesc - b.faultDesc,
            fixed: 'right',
            width: 100,
            render: (_: any, record: any) => (
              <Space size='middle'>
                  <Link to={`/setup/sequence/${record.code?.replaceAll('/', '%2F')}`} state={
                      {
                          ...record,
                          txmanf: record.manufacturer,
                          txmodl: record.code,
                      }}
                  >
                      <span className='btn btn-light-success btn-sm'>Sequence</span>
                  </Link>
                  <Link to={`/setup/service/${record.code?.replaceAll('/', '%2F')}`} state={
                      {
                          ...record,
                          txmanf: record.manufacturer,
                          txmodl: record.code,
                      }
                  }>
                      <span className='btn btn-light-info btn-sm'>Service</span>
                  </Link>
                  <button className='btn btn-light-warning btn-sm '>
                      Update
                  </button>
                  <button className='btn btn-light-danger btn-sm'>
                      Delete
                  </button>
              </Space>
            ),
        },
    ]

    const dataWithVehicleNum = equipModels?.data?.map((item: any, index: any) => ({
        ...item,
        key: index,
    }))

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
              <div className='table-responsive'>
                  <div className='d-flex justify-content-between'>
                      <Space style={{marginBottom: 16}}>
                          <Input
                            placeholder='Search...'
                            type='text'
                          />
                          <Button type='primary'>Search</Button>
                      </Space>
                      <Space style={{marginBottom: 16}}>

                          <button type='button' className='btn btn-light-primary me-3'>
                              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                              Export
                          </button>
                      </Space>
                  </div>
                  <Table columns={columns} dataSource={dataWithVehicleNum} loading={equipModelLoading} rowKey="index"/>
              </div>
          </KTCardBody>
      </div>
    )
}


export default WorkTypePage
