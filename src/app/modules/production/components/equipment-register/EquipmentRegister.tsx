import {Button, Input, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {KTCard, KTCardBody, KTSVG} from "../../../../../_metronic/helpers";
import {useQuery} from "react-query";
import axios from "axios";
import {ENP_URL} from "../../../../urls";
import {useAuth} from "../../../auth";

const EquipmentRegister = () => {
  // const {manufacturerCode} = useParams();
  const {tenant} = useAuth()
  // const tenant = localStorage.getItem('tenant')

  const {data: listOfEquipments, isLoading} = useQuery('equipments',
    () => axios.get(`${ENP_URL}/equipments/tenant/${tenant}`), {
      // refetchOnWindowFocus: false,
      // staleTime: Infinity,
    }
  )

  const {data: models} = useQuery('listOfEquipmentModel', () =>
    axios.get(`${ENP_URL}/models`)
  )

  const {data: modelClasses} = useQuery('listOfModelClass',
    () => axios.get(`${ENP_URL}/modelClasses`)
  )

  const {data: manufacturers, isLoading: manufacturerLoading} = useQuery('listOfEquipmentManufacturer',
    () => axios.get(`${ENP_URL}/manufacturers`)
  )

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
      dataIndex: 'universalCode',
      width: 150,
      sorter: (a: any, b: any) => {
        if (a.universalCode > b.universalCode) {
          return 1
        }
        if (b.universalCode > a.universalCode) {
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
      // render: (_: any, record: any) => {
      //   function getModelName(record: any) {
      //     console.log(models?.data)
      //     return models?.data?.find((model: any) => model.modelId === record.modelId).name
      //   }
      //   return getModelName(record)
      // }
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
      }
      // render: (record: any) => {
      //   function getModelClass(record: any) {
      //     const modelClassId = models?.data?.find((model: any) => model.modelId === record.modelId).modelClassId
      //     console.log('modelClassId', modelClassId)
      //     return modelClasses?.data.find((modelClass: any) => modelClass.modelClassId === modelClassId).name
      //   }
      //
      //   return getModelClass(record)
      // }
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
      }
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
      }
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
      }
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
      }
    },
    {
      title: 'Action',
      width: 200,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space>
          <Link
            state={
              {
                equipmentId: record.equipmentId,
                serialNumber: record.serialNumber,
                description: record.description,
                manufactureDate: record.manufactureDate,
                purchaseDate: record.purchaseDate,
                endOfLifeDate: record.endOfLifeDate,
                fixedAssetsCode: record.facode,
                note: record.note,
                warrantyStartDate: record.warrantyStartDate,
                warrantyEndDate: record.warrantyEndDate,
                universalCode: record.universalCode,
                meterType: record.meterType,
                modelName: record.modelName,
                modelClassName: record.modelClassName,
                manufacturer: record.manufacturer,
              }
            }
            to={`edit/${record.equipmentId}`}>
            <Button type='primary' ghost>
              Update
            </Button>
          </Link>
          <Button type='primary'>
            Details
          </Button>
        </Space>
      )
    }
  ]

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [submitLoading, setSubmitLoading] = useState(false);
  // // const [gridData, setGridData] = useState()
  // const [form] = Form.useForm();
  //
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // }
  //
  // function onFinish() {
  //   setSubmitLoading(true);
  //   setTimeout(() => {
  //     setSubmitLoading(false);
  //     setIsModalOpen(false);
  //   }, 2000);
  // }

  // const data = listOfEquipments?.data?.map((equipment: any) => {
  //   const model = models?.data?.find((model: any) => model.modelId === equipment.modelId)
  //   const {name: modelClassName} = modelClasses?.data?.find((modelClass: any) => modelClass.modelClassId === model.modelClassId)
  //   const {name: manufacturer} = manufacturers?.data?.find((manufacturer: any) => manufacturer.manufacturerId === model.manufacturerId)
  //   // console.log('manufacturer', manufacturer)
  //   // const manufacturer = listOfequipmentManufacturerQueryClient?.getQueryData('listOfequipmentManufacturer')?.data?.find((manufacturer: any) => manufacturer.manufacturerId === manufacturerId)
  //   return {
  //     ...equipment,
  //     modelName: model.name,
  //     modelClassName: modelClassName,
  //     manufacturer: manufacturer
  //   }
  // })
  const [gridData, setGridData] = useState([])
  const [beforeSearch, setBeforeSearch] = useState([])
  useEffect(() => {
    const data = !isLoading ? listOfEquipments?.data?.map((equipment: any) => {
      // const model = models ? models?.data?.find((model: any) => model.modelId === equipment.modelId) : ''
      // console.log('model', model)
      // console.log('equipment', equipment)
      const {name: modelClassName} = modelClasses ? modelClasses?.data?.find((modelClass: any) => modelClass.modelClassId === equipment?.model?.modelClassId) : ''
      // console.log('modelClassName', modelClassName)
      const {name: manufacturer} = !manufacturerLoading ? manufacturers?.data?.find((manufacturer: any) => manufacturer.manufacturerId === equipment?.model?.manufacturerId) : ''
      // console.log('manufacturer', manufacturer)
      // const manufacturer = listOfequipmentManufacturerQueryClient?.getQueryData('listOfequipmentManufacturer')?.data?.find((manufacturer: any) => manufacturer.manufacturerId === manufacturerId)
      return {
        ...equipment,
        modelName: equipment?.model?.name,
        modelClassName: modelClassName,
        manufacturer: manufacturer
      }
    }) : []
    console.log('data', data)
    setGridData(data)
    setBeforeSearch(data)
  }, [listOfEquipments, models, modelClasses, manufacturers, isLoading, manufacturerLoading])

  const globalSearch = (searchValue: string) => {
    //searchValue is the value of the search input
    const searchResult = beforeSearch?.filter((item: any) => {
      console.log('item', item)
      return (
        item.description?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.equipmentId?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.serialNumber?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.manufactureDate?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.purchaseDate?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.endOfLifeDate?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.facode?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item.note?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.warrantyStartDate?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.warrantyEndDate?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.universalCode?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.meterType?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.modelName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.modelClassName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.manufacturer?.toLowerCase().includes(searchValue.toLowerCase())
      )
    })//search the grid data
    console.log('searchResult', searchResult)
    setGridData(searchResult) //set the grid data to the search result
  }
  const handleInputChange = (e: any) => {
    console.log('e.target.value', e.target.value)
    globalSearch(e.target.value)
    if (e.target.value === '') {
      setGridData(beforeSearch)
    }
  }
  return <>
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
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'/>
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
          scroll={
            {x: 1500}
          }
        />
      </KTCardBody>
    </KTCard>
  </>
}

export default EquipmentRegister
