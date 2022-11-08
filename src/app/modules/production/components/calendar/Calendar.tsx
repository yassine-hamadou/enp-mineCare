import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  PopupOpenEventArgs,
  EventRenderedArgs,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
} from '@syncfusion/ej2-react-schedule'
import {createElement, extend} from '@syncfusion/ej2-base'
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {Form, Select, TimePicker} from 'antd'
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
  //         const response = await axios.get('http://localhost:3001/FleetSchedulesApi')
  //         setScheduleData(response.data)
  //     } catch (error) {
  //         console.log('LoadSchedule', error)
  //     }
  // }

  const [equipments, setEquipments] = useState([])
  const [dropDownFleet, setDropdownFleet] = useState([])
  const loadEquipments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/vmequpsapi')
      setEquipments(response.data)
    } catch (error) {
      console.log('LoadEquipments', error)
    }
  }

  useEffect(() => {
      loadEquipments()
    console.log('eq', equipments)
  }, [])

  useEffect(() => {
    //@ts-ignore
    const equipmentsArray: any = equipments.map((equipment) => {return `${equipment.fleetID} - ${equipment.modlName} - ${equipment.modlClass}`})
    setDropdownFleet(equipmentsArray)
  }, [equipments])
  // const onActionBegin = (args: any) => {
  //   if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
  //     const data = args.data instanceof Array ? args.data[0] : args.data
  //     args.cancel = !scheduleObj.isSlotAvailable(data.timeStart, data.timeEnd)
  //   }
  // }

  /**
   *  Schedule editor custom fields sample
   */

  const dataSource = [
    {
      entryId: 0,
      fleetId: 'stribng',
      vmModel: 'string',
      vmClass: 'string',
      locationId: 'string',
      description: 'string',
      timeStart: '2022-10-31T17:07:50.735Z',
      timeEnd: '2022-10-31T17:07:50.735Z',
    },
    {
      entryId: 2,
      fleetId: 'strilng',
      vmModel: 'string',
      vmClass: 'string',
      locationId: 'string',
      description: 'string',
      timeStart: '2022-10-31T17:07:50.735Z',
      timeEnd: '2022-10-31T17:07:50.735Z',
    },
    {
      entryId: 1,
      fleetId: 'string',
      vmModel: 'string',
      vmClass: 'string',
      locationId: 'string',
      description: 'string',
      timeStart: '2022-10-31T17:07:50.735Z',
      timeEnd: '2022-10-31T17:07:50.735Z',
    },
  ]
  const onPopupOpen = (args: any) => {
    if (args.type === 'Editor') {
      let statusElement = args.element.querySelector('#EventType')
      statusElement.setAttribute('name', 'EventType')
    }
  }
  const editorTemplate = (props: any) => {
    // @ts-ignore


    return props !== undefined ? (
      //@ts-ignore
      <table className='custom-event-editor' style={{width: '100%', cellpadding: '5'}}>
        <tbody>
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input id="Title" className="e-field e-input" type="text" name="title" style={{ width: '100%' }}/>
          </td>
        </tr>
          <tr>
            <td className='e-textlabel'>FleetID</td>
            <td colSpan={4}>
              <DropDownListComponent
                  id='fleetId'
                  placeholder='Choose a FleetID'
                  data-name='fleetId'
                  className='e-field'
                  style={{width: '100%'}}
                  dataSource={dropDownFleet}
                  value={props.fleetId || null}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>Location</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='EventType'
                placeholder='Choose a location'
                data-name='EventType'
                className='e-field'
                style={{width: '100%'}}
                dataSource={['Tarkwa', 'Takoradi', 'Accra']}
                value={props.EventType || null}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format='dd/MM/yy hh:mm a'
                id='StartTime'
                data-name='StartTime'
                value={new Date(props.startTime || props.StartTime)}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format='dd/MM/yy hh:mm a'
                id='EndTime'
                data-name='EndTime'
                value={new Date(props.endTime || props.EndTime)}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>Description</td>
            <td colSpan={4}>
              <textarea
                id='Description'
                className='e-field e-input'
                name='Description'
                rows={3}
                cols={50}
                style={{width: '100%', height: '60px !important', resize: 'vertical'}}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    )
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            editorTemplate={editorTemplate.bind(this)}
            width='100%'
            firstDayOfWeek={4}
            height='650px'
            selectedDate={new Date()}
            showQuickInfo={false}
            //@ts-ignore
            ref={(t) => (scheduleObj = t)}
            //@ts-ignore
            // eventRendered={onEventRendered.bind(this)}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  )
}
export {Calendar}
