import {Button, Input, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {AddItemForm} from './AddItemForm'
import {Link} from 'react-router-dom'

const ItemsPage = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])

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

  const columns: any = [
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => a.key - b.key,
    // },
    // {
    //   title: 'Code',
    //   dataIndex: 'faultCode',
    //   defaultSortOrder: 'descend',
    //   sorter: (a: any, b: any) => {
    //     if (a.faultCode > b.faultCode) {
    //       return 1
    //     }
    //     if (b.faultCode > a.faultCode) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },

    {
      title: 'Group Items',
      dataIndex: 'itemName',
      sorter: (a: any, b: any) => {
        if (a.itemName > b.itemName) {
          return 1
        }
        if (b.itemName > a.itemName) {
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
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a href='#' className='btn btn-light-danger btn-sm'>
            Delete
          </a>
          {/* <a>Edit </a> */}
        </Space>
      ),
    },
    //console
  ]
  const dataSource: any = [
    {
      service: 'PM-A',
      itemName: 'Cut Open Filter (Show to Supervisor) ',
    },
    {
      service: 'PM-A',
      itemName: 'Clean Primary Fuel filter ',
    },
    {
      service: 'PM-A',
      itemName: 'Check condition of battery cables ',
    },
    {
      service: 'PM-A',
      itemName: 'Check condition of engine mounts ',
    },
    {
      service: 'PM-A',
      itemName: 'Check cooling fan for cracks or damage',
    },
    {
      service: 'PM-A',
      itemName: 'Check Cooling system clamps & hoses ',
    },
    {
      service: 'PM-A',
      itemName: 'Check pulleys for excess bearing noise  ',
    },
    {
      service: 'PM-A',
      itemName: 'Clean Engine crankcase breather ',
    },
    {
      service: 'PM-A',
      itemName: 'Condition & tension of all drive belts ',
    },
    {
      service: 'PM-A',
      itemName: 'Check for cracks on fan belts & tighten Bolts ',
    },
    {
      service: 'PM-A',
      itemName: 'Drain fuel tank water trap ',
    },
    {
      service: 'PM-A',
      itemName: 'Inspect radiator core. (Clean if needed) ',
    },
    {
      service: 'PM-A',
      itemName: 'Jump start receptacle cables if fitted ',
    },
    {
      service: 'PM-A',
      itemName: 'Lubricate Fan hub & jockey pulley ',
    },
    {
      service: 'PM-A',
      itemName: 'Test Air con system ',
    },
    {
      service: 'PM-A',
      itemName: 'Test Charging system ',
    },
    {
      service: 'PM-A',
      itemName: 'Replace Secondary fuel filter ',
    },
    {
      service: 'PM-A',
      itemName: 'Replace Primary Fuel filter',
    },
    {
      service: 'PM-A',
      itemName: 'Replace Fuel Filter (ORS)',
    },
    {
      service: 'PM-A',
      itemName: 'Replace Engine oil filter',
    },
    {
      service: 'PM-A',
      itemName: 'Remove & clean starter silenser ',
    },
    {
      service: 'PM-A',
      itemName: 'Inspect pulleys for cracks & dirt build-up  ',
    },
    {
      service: 'PM-A',
      itemName: 'Inspect Fuel lines for leaks & damage ',
    },
    {
      service: 'PM-A',
      itemName: 'Inspect Exhaust manifolds & lines for leaks ',
    },
    {
      service: 'PM-A',
      itemName: 'Inspect Air induction system clamps & hoses ',
    },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmfaltsApi')
      // setGridData(response.data)
      setGridData(dataSource)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const dataWithVehicleNum = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithVehicleNum.filter((value) => {
      return (
        value.faultCode.toLowerCase().includes(searchText.toLowerCase()) ||
        value.itemName.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  return (
    <KTCard>
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
          <Link to={'/setup/groups'}>
            <span className='mb-3 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
              Back to Groups
            </span>
          </Link>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder='Enter Search Text'
                onChange={handleInputChange}
                type='text'
                allowClear
                value={searchText}
              />
              <Button type='primary' onClick={globalSearch}>
                Search
              </Button>
            </Space>
            <Space style={{marginBottom: 16}}>
              <button type='button' className='btn btn-primary me-3' onClick={showModal}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Upload
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={dataWithVehicleNum} loading={loading} />
          <Modal title='Add Item' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <AddItemForm />
          </Modal>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export {ItemsPage}
