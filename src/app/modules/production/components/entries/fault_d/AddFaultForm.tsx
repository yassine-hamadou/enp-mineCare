import {Button, Form, Input, Select, TimePicker} from 'antd'
import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {DatePicker} from 'antd/es'
import {v4 as uuidv4} from 'uuid'

const AddFaultForm = () => {
  const [dataSource, setDataSource] = useState([])
  const [faultType, setFaultType] = useState([])
  const [location, setLocation] = useState([])
  const [custodian, setCustodian] = useState([])

  const {Option} = Select
  const [form] = Form.useForm()

  // {/* Start Elements to Post */}
  const url = 'http://208.117.44.15/SmWebApi/api/FaultEntriesApi'
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      fleetId: values.fleetId,
      vmModel: values.model,
      vmClass: values.desc,
      downType: values.dType,
      downtime: values.dDate.toISOString(),
      locationId: values.locationCode,
      custodian: values.custodian,
    }

    try {
      const response = await axios.post(url, data)
      setSubmitLoading(false)
      console.log('response', response.data)
    } catch (error: any) {
      setSubmitLoading(false)
      console.log("POst",error)
    }
  }

  // {/* End Elements to Post */}

  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const loadEqupData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmequpsApi'
      )
      setDataSource(response.data)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      return error.statusText
    }
  }

  const loadFaultType = async () => {
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/vmfaltsapi'
      )
      setFaultType(response.data)
    } catch (error: any) {
      return error.statusText
    }
  }

  const loadLocation = async () => {
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/IclocsApi'
      )
      setLocation(response.data)
    } catch (error: any) {
      return error.statusText
    }
  }

  const loadCustodian = async () => {
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmemplsApi'
    )
    setCustodian(response.data)
  }

  useEffect(() => {
    loadEqupData()
    loadFaultType()
    loadLocation()
    loadCustodian()
  }, [])

  /* 
    Function that gets called whenever a fleetID is selected from the dropdown;
    this function search for the fleetID in the dataSource and returns the fleet object, 
    then set the model and description of the fleet in the form  
  */
  const onFleetIdChange = (fleetChosen: any) => {
    dataSource.map((item: any) =>
      item.fleetID === fleetChosen
        ? form.setFieldsValue({
            model: item.modlName,
            desc: item.modlClass,
          })
        : null
    )
  }

  return (
    <Form
      form={form}
      name='control-hooks'
      labelCol={{span: 5}}
      wrapperCol={{span: 14}}
      title='Add Fault'
      onFinish={onFinish}
    >
      {}
      <Form.Item name='fleetId' label='fleetID' rules={[{required: true}]}>
        <Select placeholder='Select a fleetID' onChange={onFleetIdChange}>
          {dataSource.map((item: any) => (
            <Option key={item.fleetID} value={item.fleetID}>
              {item.fleetID} - {item.modlName} - {item.modlClass}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='model' label='Model' rules={[{required: true}]}>
        <Input readOnly />
      </Form.Item>
      <Form.Item name='desc' label='Description' rules={[{required: true}]}>
        <Input readOnly />
      </Form.Item>
      <Form.Item name='dType' label='Down Type' rules={[{required: true}]}>
        <Select placeholder='Select Down Type'>
          {faultType.map((item: any) => (
            <Option key={uuidv4()} value={item.faultDesc}>
              {item.faultDesc}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='dDate' label='Down Date and Time' rules={[{required: true}]}>
        <DatePicker format='YYYY-MM-DD HH:mm' showTime/>
      </Form.Item>

      <Form.Item label='Custodian' name='custodian' rules={[{required: true}]}>
        <Select>
          {custodian.map((item: any) => (
            <Option
              // @ts-ignore
              value={item.emplCode}
              key={uuidv4()}
            >
              {item.emplCode} - {item.emplName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Location' name='location' rules={[{required: true}]}>
        <Select>
          {location.map((item: any) => (
            <Option
              // @ts-ignore
              value={item.locationCode}
              key={uuidv4()}
            >
              {item.locationCode} - {item.locationDesc}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Button key='submit' type='primary' htmlType='submit' loading={submitLoading}>
        Submit
      </Button>
    </Form>
  )
}

export {AddFaultForm}
