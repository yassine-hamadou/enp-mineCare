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

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // Modal functions end

  const loadData = async () => {
    setLoading(true)
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmequpsApi'
    )
    console.log('api REponse', response.data)
    setGridData(response.data)
    setLoading(false)
  }

  // useEffect(() => {
  //   loadData()
  //   console.log('Inside use-effect', gridData)
  // }, [])

  function handleDelete(element: any) {
    const dataSource = [...gridData]
    const filteredData = dataSource.filter((item: any) => item.fleetID !== element.fleetID)
    setGridData(filteredData)
  }

  const columns = [
    {
      title: 'FleetId',
      dataIndex: 'fleetID',
      key: 'fleetID',
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
      title: 'Down Type',
    },
    {
      title: 'Down Date',
    },
    {
      title: 'Down Time',
    },
    {
      title: 'Custodian',
    },
    {
      title: 'Location',
    },
    {
      title: 'Duration',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) =>
        gridData.length >= 1 ? (
          <>
            <Popconfirm title='Sure to solve'>
              <Button type='primary' className='mx-3 mb-3'>
                Solve
              </Button>
            </Popconfirm>
            <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record)}>
              <Button danger type='primary'>
                Delete
              </Button>
            </Popconfirm>
          </>
        ) : null,
    },
  ]
  const handleOk = () => {}

  return (
    <div>
      <Button type='primary' onClick={showModal} className='mb-3'>
        Add
      </Button>
      <Table columns={columns} dataSource={gridData} bordered loading={loading} />
      <Modal title='Add Fault' open={isModalOpen}>
        <AddFaultForm />
      </Modal>
    </div>
  )
}

export {FaultTable}
