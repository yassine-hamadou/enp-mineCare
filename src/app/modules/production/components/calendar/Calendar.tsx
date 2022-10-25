import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
} from '@syncfusion/ej2-react-schedule'
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {Form, Input, Select, TimePicker} from 'antd'
import {useEffect, useState} from 'react'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-calendars/styles/material.css'
import '@syncfusion/ej2-dropdowns/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-lists/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-splitbuttons/styles/material.css'
import '@syncfusion/ej2-react-schedule/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import axios from 'axios'
import {DatePicker} from 'antd/es'

const Calendar = () => {
  let scheduleObj: ScheduleComponent
  // const [scheduleData, setScheduleData] = useState([]);
  // const loadSchedule = async () => {
  //     try {
  //         const response = await axios.get('http://208.117.44.15/SmWebApi/api/FleetSchedulesApi')
  //         setScheduleData(response.data)
  //     } catch (error) {
  //         console.log('LoadSchedule', error)
  //     }
  // }

  // const [equipments, setEquipments] = useState([])
  // const loadEquipments = async () => {
  //   try {
  //     const response = await axios.get('http://208.117.44.15/SmWebApi/api/vmequpsapi')
  //     setEquipments(response.data)
  //   } catch (error) {
  //     console.log('LoadEquipments', error)
  //   }
  // }

  // useEffect(() => {
  //     loadSchedule()
  // }, [])

  const equipments = [
    {
      fleetID: 'AN-001',
      modlName: 'VOLVO A25D',
      modlClass: 'VOLVO',
    },
    {
      fleetID: 'AN-002',
      modlName: 'Mercedes A25D',
      modlClass: 'Mercedes',
    },
    {
      fleetID: 'AN-003',
      modlName: 'Toyota A25D',
      modlClass: 'Toyota',
    },
    {
      fleetID: 'AN-004',
      modlName: 'VOLVO A254D',
      modlClass: 'VOLVO',
    },
  ]

  const createSchedule = async (data: any) => {
    try {
      const response = await axios.post('http://208.117.44.15/SmWebApi/api/FleetSchedulesApi', data)
      console.log(response)
    } catch (error) {
      console.log('CreateSchedule', error)
    }
  }

  const scheduleData = [
    {
      entryId: 0,
      fleetId: 'string',
      vmModel: 'string',
      vmClass: 'string',
      locationId: 'string',
      description: 'string',
      timeStart: '2022-10-25T15:55:35.626Z',
      timeEnd: '2022-10-25T15:55:35.626Z',
    },
  ]

  const onActionBegin = (args: any) => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data = args.data instanceof Array ? args.data[0] : args.data
      args.cancel = !scheduleObj.isSlotAvailable(data.timeStart, data.timeEnd)
    }
  }

  const editorTemplate = (props: any) => {
    return props !== undefined ? (
      <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout='horizontal'>
        <Form.Item label='FleetID'>
          <DropDownListComponent
            style={{width: '100%'}}
            id='fleetId'
            placeholder='Choose Equipment'
            data-name='fleetId'
            dataSource={equipments.map((item) => item.fleetID)}
          ></DropDownListComponent>
        </Form.Item>

        <Form.Item label='Location'>
          <Input />
        </Form.Item>

        <Form.Item label='Description'>sd</Form.Item>
        <Form.Item label='Down Type'>sd</Form.Item>
        <Form.Item label='Down Date'>sd</Form.Item>
        <Form.Item label='Down Time'>sd</Form.Item>
      </Form>
    ) : (
      <div></div>
    )
  }

  // @ts-ignore
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            width='100%'
            height='650px'
            selectedDate={new Date(2021, 1, 15)}
            // @ts-ignore
            ref={(schedule) => (scheduleObj = schedule)}
            eventSettings={{dataSource: scheduleData}}
            editorTemplate={editorTemplate.bind(this)}
            actionBegin={onActionBegin.bind(this)}
            showQuickInfo={false}
          >
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  )
}
export {Calendar}
