import {L10n} from '@syncfusion/ej2-base'
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule'
import axios from 'axios'
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {ENP_URL} from '../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
require('@syncfusion/ej2-base/styles/material.css')
require('@syncfusion/ej2-calendars/styles/material.css')
require('@syncfusion/ej2-dropdowns/styles/material.css')
require('@syncfusion/ej2-inputs/styles/material.css')
require('@syncfusion/ej2-lists/styles/material.css')
require('@syncfusion/ej2-navigations/styles/material.css')
require('@syncfusion/ej2-popups/styles/material.css')
require('@syncfusion/ej2-splitbuttons/styles/material.css')
require('@syncfusion/ej2-react-schedule/styles/material.css')
require('@syncfusion/ej2-buttons/styles/material.css')

/**
 *  Schedule editor custom fields sample
 */

//Editing editor buttons
L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Add',
      cancelButton: 'Close',
      deleteButton: 'Remove',
      newEvent: 'Add Equipment Schedule',
    },
  },
})

const Calendar = () => {
  let scheduleObj
  let scheduleQueryClient = useQueryClient()

  // Functions to perform CRUD operations
  const fetchSchedules = () => {
    return axios.get(`${ENP_URL}/FleetSchedulesApi`)
  }
  const fetchVmequps = () => {
    return axios.get(`${ENP_URL}/VmequpsApi`)
  }
  const fetchLocations = () => {
    return axios.get(`${ENP_URL}/IclocsApi`)
  }
  const fetchCustodians = () => {
    return axios.get(`${ENP_URL}/VmemplsApi`)
  }

  //Add
  const addSchedule = (schedule) => {
    return axios.post(`${ENP_URL}/FleetSchedulesApi`, schedule)
  }

  //delete
  const deleteSchedule = (schedule) => {
    return axios.delete(`${ENP_URL}/FleetSchedulesApi/${schedule.entryId}`)
  }

  //update
  const updateSchedule = (schedule) => {
    return axios.put(`${ENP_URL}/FleetSchedulesApi/${schedule.entryId}`, schedule)
  }

  //Object to inject in the Calendar
  const localData = (dataFromApi) => {
    return {
      dataSource: dataFromApi,
      fields: {
        id: 'entryId',
        subject: {name: 'fleetId', default: 'No Fleet ID'},
        location: {name: 'locationId'},
        startTime: {name: 'timeStart'},
        endTime: {name: 'timeEnd'},
      },
    }
  }

  // React Query
  //Get
  const {data: schedulesData} = useQuery('schedules', fetchSchedules, {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  })
  const {data: vmequps} = useQuery('vmequps', fetchVmequps, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  const {data: locationsData} = useQuery('locations', fetchLocations, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  const {data: custodiansData} = useQuery('custodians', fetchCustodians, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  //Create
  const {mutate: addScheduleMutation} = useMutation(addSchedule, {
    onSuccess: () => {
      scheduleQueryClient.invalidateQueries('schedules')
    },
  })
  //delete
  const {mutate: deleteScheduleMutation} = useMutation(deleteSchedule, {
    onSuccess: () => {
      scheduleQueryClient.invalidateQueries('schedules')
    },
  })
  //put (update)
  const {mutate: updateScheduleMutation} = useMutation(updateSchedule, {
    onSuccess: () => {
      scheduleQueryClient.invalidateQueries('schedules')
    },
  })

  // function onActionBegin(args) {
  //     if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
  //         let data = args.data instanceof Array ? args.data[0] : args.data;
  //         args.cancel = !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime);
  //     }
  // }
  function editorTemplate(props) {
    console.log('props in editorTemmplate', props)
    console.log(scheduleObj)
    return props !== undefined ? (
      <table className='custom-event-editor' style={{width: '100%'}} cellPadding={5}>
        <tbody>
          <tr>
            <td className='e-textlabel'>Fleet ID</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='Summary'
                placeholder='Choose Equipment ID'
                data-name='fleetId'
                className='e-field'
                style={{width: '100%'}}
                dataSource={vmequps?.data.map((Vmequp) => {
                  return {
                    text: `${Vmequp.fleetID}- ${Vmequp.modlName}- ${Vmequp.modlClass}`,
                    value: `${Vmequp.fleetID}`,
                  }
                })}
                fields={{text: 'text', value: 'value'}}
              />
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>Location</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='Location'
                placeholder='Choose location'
                data-name='locationId'
                className='e-field'
                style={{width: '100%'}}
                dataSource={locationsData?.data.map((location) => {
                  return {
                    text: `${location.locationCode} - ${location.locationDesc}`,
                    value: `${location.locationCode}`,
                  }
                })}
                fields={{text: 'text', value: 'value'}}
              />
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>Service Type</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='ServiceType'
                placeholder='Choose Service Type'
                data-name='serviceType'
                className='e-field'
                style={{width: '100%'}}
                dataSource={['Service 1', 'Service 2', 'Service 3']}
              />
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>Responsible</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='responsible'
                placeholder='Responsible'
                data-name='custodian'
                className='e-field'
                style={{width: '100%'}}
                dataSource={custodiansData?.data.map((custodian) => {
                  return {
                    text: `${custodian.emplCode} - ${custodian.emplName}`,
                    value: `${custodian.emplCode}`,
                  }
                })}
                fields={{text: 'text', value: 'value'}}
                value={props.custodian}
              />
            </td>
          </tr>

          <tr>
            <td className='e-textlabel'>From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='StartTime'
                format='dd/MM/yy hh:mm a'
                data-name='timeStart'
                value={new Date(props.timeStart ? props.timeStart : props.startTime)}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='EndTime'
                format='dd/MM/yy hh:mm a'
                data-name='timeEnd'
                value={new Date(props.timeEnd ? props.timeEnd : props.endTime)}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    )
  }
  const onActionBegin = (args) => {
    console.log('args in action begin', args)
    let data = args.data instanceof Array ? args.data[0] : args.data
    if (args.requestType === 'eventCreate') {
      console.log(scheduleObj)
      // make data in array so that I can map though it
      const preparedData = [{...data}]
      console.log('preparedData', preparedData)
      // map through the array and set each field to what the calendar will understand
      const formattedDataToPost = preparedData.map((schedule) => {
        return {
          fleetId: schedule.fleetId,
          locationId: schedule.locationId,
          timeStart: schedule.StartTime,
          timeEnd: schedule.EndTime,
          entryId: 0,
          vmModel: 'null',
          vmClass: 'null',
        }
      })
      //Since format is an array, I need to change it to the format that the API will understand which is an object
      const dataToPost = formattedDataToPost[0]
      addScheduleMutation(dataToPost)
    }
    if (args.requestType === 'eventRemove') {
      args.cancel = true
      deleteScheduleMutation(data)
    }
    if (args.requestType === 'eventChange') {
      args.cancel = true
      console.log('data', data)
      console.log('args in eventChange', args)
      const preparedData = [{...data}]
      const formattedDataToPost = preparedData.map((schedule) => {
        return {
          fleetId: schedule.fleetId,
          locationId: schedule.locationId,
          timeStart: schedule.StartTime,
          timeEnd: schedule.EndTime,
          entryId: schedule.entryId,
          vmModel: 'null',
          vmClass: 'null',
        }
      })
      const dataToPost = formattedDataToPost[0]
      updateScheduleMutation(dataToPost)
    }
  }
  // const headerTemplate = (props) => {
  //     return (
  //         <div>
  //             {props.elementType === "event" ? (<div className="e-cell-header e-popup-header">
  //                 <div className="e-header-icon-wrapper">
  //                     {/*<button id="edit" className="e-edit e-edit-icon e-icons" title="Edit"/>*/}
  //                     <button id="close" className="e-close e-close-icon e-icons" title="Close"/>
  //                 </div>
  //             </div>) : (<div className="e-event-header e-popup-header">
  //                 <div className="e-header-icon-wrapper">
  //                     <button id="close" className="e-close e-close-icon e-icons" title="CLOSE"/>
  //                 </div>
  //             </div>)}
  //         </div>
  //     );
  // }
  // const contentTemplate = (props) => {
  //     return (<div className="quick-info-content">
  //         {props.elementType === 'cell' ?
  //             <div className="e-cell-content">
  //                 <div className="content-area">asdasd
  //                     {/*<TextBoxComponent id="title" ref={(textbox) => titleObj = textbox} placeholder="Title"/>*/}
  //                 </div>
  //                 <div className="content-area">
  //                     {/*<DropDownListComponent id="eventType" ref={(ddl) => eventTypeObj = ddl} dataSource={roomData} fields={{ text: "Name", value: "Id" }} placeholder="Choose Type" index={0} popupHeight="200px"/>*/}
  //                 </div>
  //                 <div className="content-area">
  //                     {/*<TextBoxComponent id="notes" ref={(textbox) => notesObj = textbox} placeholder="Notes"/>*/}
  //                 </div>
  //             </div>
  //             :
  //             <div className="event-content">
  //                 <div className="meeting-type-wrap">
  //                     <label>Subject</label>:
  //                     <span>sdfsdfs</span>
  //                 </div>
  //                 <div className="meeting-subject-wrap">
  //                     <label>Type</label>:sdfsdf
  //                     {/*<span>{getEventType(props)}</span>*/}
  //                 </div>
  //                 <div className="notes-wrap">
  //                     {/*<Link to={"/checkListForm/tabs"}>View Details</Link>*/}
  //                     {/*<span>{props.Description}</span>*/}
  //                 </div>
  //             </div>}
  //     </div>);
  // }
  // const footerTemplate = (props) => {
  //     console.log("props", props);
  //     return (
  //         <div className="quick-info-footer">
  //
  //             {props.elementType === "event" ?
  //                 <div className="cell-footer">
  //                     <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" />
  //                     <ButtonComponent id="add" cssClass='e-flat' content="Add" isPrimary={true} />
  //                 </div>
  //                 :
  //                 <div className="event-footer">
  //                     <ButtonComponent id="delete" cssClass='e-flat' content="Delete" />
  //                     <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" isPrimary={true} />
  //                 </div>
  //             }
  //         </div>
  //     );
  // }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            width='100%'
            height='650px'
            ref={(schedule) => (scheduleObj = schedule)}
            eventSettings={schedulesData && localData(schedulesData.data)}
            editorTemplate={editorTemplate.bind(this)}
            actionBegin={onActionBegin.bind(this)}
            // id='schedule'
            // quickInfoTemplates={{
            //     header: headerTemplate.bind(this),
            //     content: contentTemplate.bind(this),
            //     footer: footerTemplate.bind(this)
            // }}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  )
}
export {Calendar}
