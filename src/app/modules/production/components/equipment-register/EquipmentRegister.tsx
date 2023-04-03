import {Button, Form, Input, Modal, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {KTCard, KTCardBody, KTSVG} from "../../../../../_metronic/helpers";
import {useQuery} from "react-query";
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
  const columns = [
    {
      title: 'Equipment ID',
      dataIndex: 'equipmentId',
      width: 200,
      sorter: (a: any, b: any) => a.equipmentId - b.equipmentId,
    },
    {
      title: 'Serial Number',
      dataIndex: 'universalCode',
      width: 200,
      sorter: (a: any, b: any) => a.universalCode - b.universalCode,
    },
    {
      title: 'Model Name',
      dataIndex: 'model',
      width: 200,
      sorter: (a: any, b: any) => a.model - b.model,
      render: (_: any, record: any) => {
        function getModelName(record: any) {
          console.log(models?.data)
          return models?.data?.find((model: any) => model.modelId === record.modelId).name
        }
        return getModelName(record)
      }
    },
    {
      title: 'Model Class',
      // dataIndex: 'modelClass',
      width: 200,
      sorter: (a: any, b: any) => a.modelClass - b.modelClass,
      render: (record: any) => {
        function getModelClass(record: any) {
          const modelClassId = models?.data?.find((model: any) => model.modelId === record.modelId).modelClassId
          console.log('modelClassId', modelClassId)
          return modelClasses?.data.find((modelClass: any) => modelClass.modelClassId === modelClassId).name
        }

        return getModelClass(record)
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      sorter: (a: any, b: any) => a.description - b.description,
    },
    {
      title: 'Manufactured Date',
      dataIndex: 'manufactureDate',
        width: 200,
      sorter: (a: any, b: any) => a.manufactureDate - b.manufactureDate,
    },
    {
        title: 'Fixed Assets Code',
        dataIndex: 'facode',
        width: 200,
        sorter: (a: any, b: any) => a.fixedAssetsCode - b.fixedAssetsCode,
    },
    {
      title: 'Purchase Date',
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
            <Link to={`edit/${record.equipmentId}`}>
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

  useEffect(() => {
    setGridData(listOfEquipments?.data)
  }, [listOfEquipments?.data])

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
