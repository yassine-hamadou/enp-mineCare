import {Button, Input, Space, Table} from 'antd'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import {useQuery} from 'react-query'
import {getEquipment} from '../../../../urls'
import {useAuth} from '../../../auth'

const EquipmentRegister = () => {
  const {tenant} = useAuth()

  const {data: listOfEquipments, isLoading} = useQuery('equipments', () => getEquipment(tenant))

  const columns: any = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      width: 135,
      sorter: (a: any, b: any) => {
        if (a.equipmentId > b.equipmentId) {
          return 1
        }
        if (b.equipmentId > a.equipmentId) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Serial/Part Number',
      dataIndex: 'serialNumber',
      width: 150,
      sorter: (a: any, b: any) => {
        if (a.serialNumber > b.serialNumber) {
          return 1
        }
        if (b.serialNumber > a.serialNumber) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.description > b.description) {
          return 1
        }
        if (b.description > a.description) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      width: 135,
      sorter: (a: any, b: any) => {
        if (a.manufacturer > b.manufacturer) {
          return 1
        }
        if (b.manufacturer > a.manufacturer) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      width: 150,
      sorter: (a: any, b: any) => {
        if (a.modelName > b.modelName) {
          return 1
        }
        if (b.modelName > a.modelName) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Model Class',
      dataIndex: 'modelClassName',
      // dataIndex: 'modelClass',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.modelClassName > b.modelClassName) {
          return 1
        }
        if (b.modelClassName > a.modelClassName) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Manufactured Date',
      dataIndex: 'manufactureDate',
      width: 200,
      render: (record: any) => {
        return new Date(record).toDateString()
      },
      sorter: (a: any, b: any) => {
        if (a.manufactureDate > b.manufactureDate) {
          return 1
        }
        if (b.manufactureDate > a.manufactureDate) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Purchased Date',
      dataIndex: 'purchaseDate',
      render: (record: any) => {
        return new Date(record).toDateString()
      },
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.purchaseDate > b.purchaseDate) {
          return 1
        }
        if (b.purchaseDate > a.purchaseDate) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'End Of Life Date',
      dataIndex: 'endOfLifeDate',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.endOfLifeDate > b.endOfLifeDate) {
          return 1
        }
        if (b.endOfLifeDate > a.endOfLifeDate) {
          return -1
        }
        return 0
      },
      render: (record: any) => {
        return new Date(record).toDateString()
      },
    },
    {
      title: 'Fixed Assets Code',
      dataIndex: 'facode',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.facode > b.facode) {
          return 1
        }
        if (b.facode > a.facode) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 200,
      sorter: (a: any, b: any) => {
        if (a.note > b.note) {
          return 1
        }
        if (b.note > a.note) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Action',
      width: 200,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space>
          <Link
            state={{
              ...record,
              fixedAssetsCode: record?.facode,
            }}
            to={`edit/${record.equipmentId}`}
          >
            <Button type='primary' ghost>
              Update
            </Button>
          </Link>
          <Button type='primary'>Details</Button>
        </Space>
      ),
    },
  ]

  const [gridData, setGridData] = useState([])
  const [beforeSearch, setBeforeSearch] = useState([])
  useEffect(() => {
    const data = listOfEquipments?.data
      ? listOfEquipments?.data?.map((equipment: any) => {
          return {
            ...equipment,
            modelName: equipment?.model?.name,
            modelClassName: equipment?.model?.modelClass?.name,
            manufacturer: equipment?.model?.manufacturer?.name,
          }
        })
      : []
    setGridData(data)
    setBeforeSearch(data)
  }, [listOfEquipments?.data])

  const globalSearch = (searchValue: string) => {
    //searchValue is the value of the search input
    const searchResult = beforeSearch?.filter((item: any) => {
      return Object.values(item).join('').toLowerCase().includes(searchValue?.toLowerCase())
    }) //search the grid data
    setGridData(searchResult) //set the grid data to the search result
  }
  const handleInputChange = (e: any) => {
    globalSearch(e.target.value)
    if (e.target.value === '') {
      setGridData(beforeSearch)
    }
  }
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder='Enter Search Text'
                onChange={handleInputChange}
                type='text'
                allowClear
              />
            </Space>
            <Space style={{marginBottom: 16}}>
              <Link to={'add'}>
                <button type='button' className='btn btn-primary me-3'>
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add
                </button>
              </Link>
            </Space>
          </div>
          <Table
            columns={columns}
            rowKey={(record: any) => record.equipmentId}
            bordered
            dataSource={gridData}
            loading={isLoading}
            scroll={{x: 1500}}
          />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default EquipmentRegister
