import {Button, Form, Input, Modal, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {KTCard, KTCardBody, KTSVG} from "../../../../../_metronic/helpers";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {ENP_URL} from "../../../../urls";

const EquipmentRegister = () => {
  const {manufacturerCode} = useParams();

  const {data: listOfEquipments, isLoading} = useQuery('equipments', () =>
    axios.get(`${ENP_URL}/equipments`)
  )

  const {data: models} = useQuery('listOfEquipmentModel', () =>
    axios.get(`${ENP_URL}/models`)
  )

  const {data: modelClasses} = useQuery('listOfModelClass', () => axios.get(`${ENP_URL}/modelClasses`))
  const  columns = [
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
      dataIndex: '',
      width: 135,
      sorter: (a: any, b: any) => a.equipmentId - b.equipmentId,
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      width: 150,
      sorter: (a: any, b: any) => {
        if (a.model > b.model) {
          return 1
        }
        if (b.model > a.model) {
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
      sorter: (a: any, b: any) => a.modelClass - b.modelClass,
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
      sorter: (a: any, b: any) => a.manufactureDate - b.manufactureDate,
    },
    {
      title: 'Purchased Date',
      dataIndex: 'purchaseDate',
      width: 200,
      sorter: (a: any, b: any) => a.purchaseDate - b.purchaseDate,
    },
    {
      title: 'End Of Life Date',
      dataIndex: 'endOfLifeDate',
      width: 200
    },
    {
        title: 'Fixed Assets Code',
        dataIndex: 'facode',
        width: 200,
        sorter: (a: any, b: any) => a.fixedAssetsCode - b.fixedAssetsCode,
    },


    {
      title: 'Note',
      dataIndex: 'note',
      width: 200
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 200,
      render: (_: any, record: any) => (
        <Space size='middle'>
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [gridData, setGridData] = useState()
  const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    }

  function onFinish() {
    setSubmitLoading(true);
    setTimeout(() => {
      setSubmitLoading(false);
      setIsModalOpen(false);
    }, 2000);
  }
  const listOfequipmentManufacturerQueryClient: any = useQueryClient()
  useEffect(() => {
    const data = listOfEquipments?.data?.map((equipment: any) => {
        const {name, manufacturerId, modelClassId} = models?.data?.find((model: any) => model.modelId === equipment.modelId)
        const {name: modelClassName} = modelClasses?.data?.find((modelClass: any) => modelClass.modelClassId === modelClassId)
      // const manufacturer = listOfequipmentManufacturerQueryClient?.getQueryData('listOfequipmentManufacturer')?.data?.find((manufacturer: any) => manufacturer.manufacturerId === manufacturerId)
        return {
            ...equipment,
            modelName: name,
            modelClassName: modelClassName,
        }
    })
    console.log('data', data)
    setGridData(data)
  }, [listOfEquipments?.data, models?.data, modelClasses?.data])

  return <>
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
            <Button type='primary'>
                Search
            </Button>
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
          // @ts-ignore
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
}

export default EquipmentRegister
