import {Form, Input, InputNumber, Select, TimePicker} from 'antd'
import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {DatePicker} from 'antd/es'

const AddFaultForm = () => {
  const [dataSource, setDataSource] = useState([])
  const [faultType, setFaultType] = useState([])
  const [location, setLocation] = useState([])
  const [custodian, setCustodian] = useState([])

  const [loading, setLoading] = useState(false)

  const [fleet, setFleet] = useState({})
  const [fleetToAdd, setFleetToAdd] = useState(null)

  const loadData = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi')
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

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    console.log('Fleet in useefect', fleet)
    // @ts-ignore
    setFleetToAdd({...fleet})
  }, [fleet])

  return (
    <Form labelCol={{span: 7}} wrapperCol={{span: 14}} layout='horizontal' title='Add Hourly'>
      <Form.Item label='FleetID'>
        <Select onSelect={(e: any) => getEqupId(e)}>
          {dataSource.map((item: any) => (
            <Select.Option
              // @ts-ignore
              value={item.fleetID}
            >
              {item.fleetID} - {item.modlName} - {item.modlClass}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Previous Reading'>
        <Input disabled={true} contentEditable={false}/>
      </Form.Item>
      <Form.Item label='Date'>
        <DatePicker />
      </Form.Item>
      <Form.Item label='Daily Hours Worked'>
        <InputNumber />
      </Form.Item>

      <Form.Item label='New Reading'>
        <InputNumber />
      </Form.Item>
      <Form.Item label='Comment'>
        <Input />
      </Form.Item>
    </Form>
  )
}

export {AddFaultForm}
