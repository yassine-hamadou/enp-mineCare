import {Form, Input, Select, TimePicker} from 'antd'
import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {DatePicker} from 'antd/es'

const AddFaultForm = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi'
      )
      console.log('Api Response from form', response.data)
      setDataSource(response.data)
      setLoading(false)
    } catch (error: any) {
        setLoading(false)
      return error.statusText
    }
  }

  const [fleet, setFleet] = useState({})
  const [fleetToAdd, setFleetToAdd] = useState(null)

  const getEqupId = (id: any) => {
      // get the item to add in the form inputs after dropdown selection is made
    dataSource.map((item: any) => (item.txequp === id ? setFleet(item) : null))
  }

  useEffect(() => {
    loadData()
    console.log('Inside use-effect', dataSource)
  }, [])

  useEffect(() => {
    console.log('Fleet in useefect', fleet)
    // @ts-ignore
    setFleetToAdd({...fleet})
  }, [fleet])

  return (
    <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout='horizontal' title='Add Fault'>
      <Form.Item label='FleetID'>
        <Select onSelect={(e: any) => getEqupId(e)}>
          {dataSource.map((item: any) => (
            <Select.Option
              // @ts-ignore
              value={item.txequp}
            >
              {item.txequp} - {item.modlName} - {item.modlClass}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Model'>
        <Input
          // @ts-ignore
          value={fleetToAdd?.modlName}
          contentEditable={false}
          disabled={true}
        />
      </Form.Item>
      <Form.Item label='Description'>
        <Input
          // @ts-ignore
          value={fleetToAdd?.modlClass}
          contentEditable={false}
          disabled={true}
        />
      </Form.Item>
      <Form.Item label='Down Date'>
        <DatePicker />
      </Form.Item>
      <Form.Item label='Down Time'>
        <TimePicker />
      </Form.Item>

      <Form.Item label='Custodian'>
        <Select>
          <Select.Option value='demo'>David</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Location'>
        <Select>
          <Select.Option value='demo'>Dansoman</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export {AddFaultForm}
