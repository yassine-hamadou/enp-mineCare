import {L10n} from '@syncfusion/ej2-base';
import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject
} from '@syncfusion/ej2-react-schedule';
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
import {useEffect, useState} from "react";
import axios from "axios";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";

/**
 *  Schedule editor custom fields sample
 */

//Editing editor buttons
L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Add Equipment Schedule',
        }
    }
});

const Calendar = () => {
    const [Vmequps, setVmequps] = useState([]);
    const [locations, setLocations] = useState([]);
    const [dataFromAPI, setDataFromApi] = useState({});
    const [upToDateLocalData, setUpToDateLocalData] = useState({});


    // load fleet IDs
    const loadVmequps = async () => {
        try {
            const VmequpsResponse = await axios.get("http://208.117.44.15/SmWebApi/api/VmequpsApi");
            setVmequps(VmequpsResponse.data);
        } catch (e) {
            console.log(e);
        }
    };

    const loadLocations = async () => {
        try {
            const locationsResponse = await axios.get("http://208.117.44.15/SmWebApi/api/IclocsApi");
            setLocations(locationsResponse.data);
        } catch (e) {
            console.log(e);
        }
    };

    //Loading schedule data
    const loadData = async () => {
        try {
            const dataResponse = await axios.get("http://208.117.44.15/SmWebApi/api/FleetSchedulesApi");
            setDataFromApi([...dataResponse.data]);
        } catch (e) {
            console.log(e);
        }
    }
    const localData = (dataFromApi) => {
        return {
            dataSource: dataFromApi,
            fields: {
                id: 'entryId',
                subject: {name: 'fleetId', default: "No fleet ID"},
                location: {name: 'locationId'},
                startTime: {name: 'timeStart'},
                endTime: {name: 'timeEnd'}
            }
        }
    }

    useEffect(() => {
        setUpToDateLocalData(localData(dataFromAPI));
    }, [dataFromAPI])
    useEffect(() => {
        loadVmequps();
        loadLocations();
        loadData();
    }, []);

    let scheduleObj;
    // function onActionBegin(args) {
    //     if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
    //         let data = args.data instanceof Array ? args.data[0] : args.data;
    //         args.cancel = !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime);
    //     }
    // }

    function editorTemplate(props) {
        return ((props !== undefined) ?
                <table className="custom-event-editor" style={{width: '100%'}} cellPadding={5}>
                    <tbody>
                    <tr>
                        <td className="e-textlabel">Fleet ID</td>
                        <td colSpan={4}>
                            <DropDownListComponent
                                id="Summary"
                                placeholder='Choose Equipment ID'
                                data-name='fleetId'
                                className="e-field"
                                style={{width: '100%'}}
                                dataSource={Vmequps.map((Vmequp) => {
                                    return {
                                        text: `${Vmequp.fleetID}- ${Vmequp.modlName}- ${Vmequp.modlClass}`,
                                        value: `${Vmequp.fleetID}`
                                    };
                                })}
                                fields={{text: "text", value: "value"}}
                            >
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Location</td>
                        <td colSpan={4}>
                            <DropDownListComponent
                                id="Location"
                                placeholder='Choose location'
                                data-name='locationId'
                                className="e-field"
                                style={{width: '100%'}}
                                dataSource={locations.map((location) => {
                                    return {
                                        text: `${location.locationCode} - ${location.locationDesc}`,
                                        value: `${location.locationCode}`
                                    };
                                })}
                                fields={{text: "text", value: "value"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Service Type</td>
                        <td colSpan={4}>
                            <DropDownListComponent
                                id="ServiceType"
                                placeholder='Choose Service Type'
                                data-name='serviceType'
                                className="e-field"
                                style={{width: '100%'}}
                                dataSource={["Service 1", "Service 2", "Service 3"]}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">From</td>
                        <td colSpan={4}>
                            <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="timeStart"
                                                     value={new Date(props.startTime || props.StartTime)}
                                                     className="e-field"></DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">To</td>
                        <td colSpan={4}>
                            <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="timeEnd"
                                                     value={new Date(props.endTime || props.EndTime)}
                                                     className="e-field"></DateTimePickerComponent>
                        </td>
                    </tr>
                    </tbody>
                </table> : <div></div>
        );
    }

    const onActionBegin = (args) => {
        let data = args.data instanceof Array ? args.data[0] : args.data;
        if (args.requestType === 'eventCreate') {
            args.cancel = true;
            console.log("args.data", data);

            // make data in array so that I can map though it
            const preparedData = [{...data}];
            console.log("preparedData", preparedData);
            // map through the array and set each field to what the calendar will understand
            const formattedDataToPost = preparedData.map((schedule) => {
                return {
                    fleetId: schedule.fleetId,
                    locationId: schedule.locationId,
                    timeStart: schedule.StartTime,
                    timeEnd: schedule.EndTime,
                    entryId: 0,
                    vmModel: "null",
                    vmClass: "null"
                }
            });
            console.log("formattedDataToPost", formattedDataToPost);

            //Since format is an array, I need to change it to the format that the API will understand which is an object
            const dataToPost = formattedDataToPost[0];
            axios.post("http://208.117.44.15/SmWebApi/api/FleetSchedulesApi", dataToPost)
            // axios.post("http://localhost:3001/FleetSchedulesApi", dataToPost)
                .then(res => {
                    console.log("res", res);
                    console.log("res.data", res.data);
                    loadData()
                    setUpToDateLocalData(localData([...dataFromAPI, res.data]));
                })
                .catch(err => {
                    console.log("err", err);
                });
        }
        if (args.requestType === 'eventRemove') {
            args.cancel = true;
            axios.delete("http://208.117.44.15/SmWebApi/api/FleetSchedulesApi/" + data.entryId)
                .then(res => {
                    loadData()
                    setUpToDateLocalData(localData(dataFromAPI.filter((schedule) => schedule.entryId !== data.entryId)));
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if (args.requestType === 'eventChange') {
            args.cancel = true;
            console.log("args.data", data);
            const preparedData = [{...data}];
            console.log("preparedData", preparedData);
            const formattedDataToPost = preparedData.map((schedule) => {
                return {
                    fleetId: schedule.fleetId,
                    locationId: schedule.locationId,
                    timeStart: schedule.StartTime,
                    timeEnd: schedule.EndTime,
                    entryId: 0,
                    vmModel: "null",
                    vmClass: "null"
                }
            });
            // console.log("formattedDataToPost", formattedDataToPost);
            const dataToPost = formattedDataToPost[0];
            axios.put("http://208.117.44.15/SmWebApi/api/FleetSchedulesApi/" + data.entryId, dataToPost)
                .then(res => {
                    console.log("res", res);
                    console.log("res.data", res.data);
                    loadData()
                    setUpToDateLocalData(localData([...dataFromAPI, res.data]));
                })
                .catch(err => {
                    console.log("err", err);
                });
        }
    }
    // const quickInfoTemplates = {
    //     content: contentTemplate.bind(this),
    // }
    // const contentTemplate = (props) => {
    //     return (
    //         <div className="content-template">
    //             <div className="e-text-content">
    //                 <div className="e-subject">{props.Subject}</div>
    //                 {/*<div className="e-location">{props.Location}</div>*/}
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent
                        width='100%' height='650px'
                        ref={schedule => scheduleObj = schedule}
                        eventSettings={upToDateLocalData}
                        editorTemplate={editorTemplate.bind(this)}
                        actionBegin={onActionBegin.bind(this)}
                    >
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                    </ScheduleComponent>
                </div>
            </div>
        </div>
    );
};
export {Calendar}