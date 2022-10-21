import {Button, Popconfirm, Table, Modal} from 'antd'
import 'antd/dist/antd.min.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {AddFaultForm} from './AddFaultForm'

const FaultTable = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)

  // Modal functions
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // Modal functions end

  const loadData = async () => {
    setLoading(true)
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi'
    )
    console.log('api REponse', response.data)
    setGridData(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    console.log('Inside use-effect', gridData)
  }, [])

  function handleDelete(element: any) {
    const dataSource = [...gridData]
    const filteredData = dataSource.filter((item: any) => item.txequp !== element.txequp)
    setGridData(filteredData)
  }

  const columns = [
    {
      title: 'FleetId',
      dataIndex: 'txequp',
        key: 'txequp',
    },
    {
      title: 'Model',
      dataIndex: 'modlName',
    },
    {
      title: 'Description',
      dataIndex: 'modlClass',
    },
    {
      title: 'Down Time',
    },
    {
      title: 'Down Type',
    },
    {
      title: 'Custodian',
    },
    {
      title: 'Location',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) =>
        gridData.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
            <Button danger type='primary'>
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <div>
      <Button type='primary' onClick={showModal} className='mb-3'>
        Add
      </Button>
      <Table columns={columns} dataSource={gridData} rowKey='txequp' bordered loading={loading} />
      <Modal title='Add Fault' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddFaultForm />
      </Modal>
    </div>
  )
}

export {FaultTable}