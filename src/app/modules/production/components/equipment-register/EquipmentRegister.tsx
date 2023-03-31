import {Button, Form, Input, Modal, Space, Table} from "antd";
import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {KTCard, KTCardBody, KTSVG} from "../../../../../_metronic/helpers";



const data = [
    {
        key: '001',
        fleetId: '001',
        manufacturer: 'Toyota',
        model: '14HM',
        serial: 'AXT334d',
        modelClass: '14HM',
        description: '14HM',
    },
    {
        key: '002',
        fleetId: '002',
        manufacturer: 'Toyota',
        model: '12HM',
        serial: 'AX3FG',
        modelClass: '12HM',
        description: '12HM',
    },
    {
        key: '003',
        fleetId: '003',
        manufacturer: 'Mercedes',
        model: '14HM',
        serial: 'GGDT3',
        modelClass: '14HM',
        description: '14HM',
    }
]
const EquipmentRegister = () => {
  const {manufacturerCode} = useParams();
  const columns = [
    {
      title: 'Equipment ID',
      dataIndex: 'fleetId',
      sorter: (a: any, b: any) => a.fleetId - b.fleetId,
    },
    {
      title: 'Serial Number',
      dataIndex: 'serial',
      sorter: (a: any, b: any) => a.serial - b.serial,
    },
    {
      title: 'Manufactured Date',
      dataIndex: 'manufacturer',
      sorter: (a: any, b: any) => a.manufacturer - b.manufacturer,
    },
    {
        title: 'Model',
        dataIndex: 'model',
        sorter: (a: any, b: any) => a.model - b.model,
    },
    {
        title: 'Model Class',
        dataIndex: 'modelClass',
        sorter: (a: any, b: any) => a.modelClass - b.modelClass,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        sorter: (a: any, b: any) => a.description - b.description,
    },
    {
        title: 'Fixed Assets Code',
        sorter: (a: any, b: any) => a.fixedAssetsCode - b.fixedAssetsCode,
    },
    {
        title: 'Purchase Date',
        sorter: (a: any, b: any) => a.purchaseDate - b.purchaseDate,
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button type='primary' ghost>
            Update
          </Button>
          <Button type='primary'>
            Details
          </Button>
        </Space>
      )
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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
          columns={columns}
          bordered
          dataSource={data}
        />
      </KTCardBody>
    </KTCard>
    </>
}

export default EquipmentRegister
