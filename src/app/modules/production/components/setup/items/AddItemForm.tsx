import {Form, Input, InputNumber, Radio, RadioChangeEvent, Select, TimePicker} from 'antd'
import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {DatePicker} from 'antd/es'

const AddItemForm = () => {
  const [dataSource, setDataSource] = useState([])
  const [faultType, setFaultType] = useState([])
  const [location, setLocation] = useState([])
  const [custodian, setCustodian] = useState([])
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false)

  const [fleet, setFleet] = useState({})
  const [fleetToAdd, setFleetToAdd] = useState(null)

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
      const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmequpsApi')
      setDataSource(response.data)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      return error.statusText
    }
  }

  const getEqupId = (id: any) => {
    dataSource.map((item: any) => (item.fleetID === id ? setFleet(item) : null))
  }
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    console.log('Fleet in useefect', fleet)
    // @ts-ignore
    setFleetToAdd({...fleet})
  }, [fleet])

  return (
    <Form labelCol={{span: 7}} wrapperCol={{span: 14}} layout='horizontal' title='Add Item'>
      {/* <Form.Item label='FleetID'>
        <Select onSelect={(e: any) => getEqupId(e)}>
          {dataSource.map((item: any) => (
            <Select.Option
              // @ts-ignore
              value={item.fleetID}
            >
              {item.fleetID }- {item.modlName} - {item.modlClass}
              
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}
       <Form.Item label='Code'>
        <Input/>
      </Form.Item>
       <Form.Item label='Name'>
        <Input/>
      </Form.Item>
      <Form.Item label='Status'>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Active</Radio>
          <Radio value={2}>InActive</Radio>
     
        </Radio.Group>
      </Form.Item>
    </Form>
  )
}

export {AddItemForm}
