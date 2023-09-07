// Functions to perform CRUD operations
import axios from 'axios'
import {ENP_URL} from '../../../../../../urls'

export const fetchSchedules = (tenant: any) => {
    return axios.get(`${ENP_URL}/FleetSchedulesApi/tenant/${tenant}`)
}

export const pendingSchedule = (tenant: any) => {
    return axios.get(`${ENP_URL}/FleetSchedulesApi/pending/tenant/${tenant}`)
}

export const fetchServiceTypes = (tenant: any) => {
    return axios.get(`${ENP_URL}/Services/tenant/${tenant}`)
}

//Add
export const addSchedule = (schedule: any) => {
    return axios.post(`${ENP_URL}/FleetSchedulesApi`, schedule)
}

//delete
export const deleteSchedule = (schedule: any) => {
    return axios.delete(`${ENP_URL}/FleetSchedulesApi/${schedule.entryId}`)
}

//update
export const updateSchedule = (schedule: any) => {
    return axios.put(`${ENP_URL}/FleetSchedulesApi/${schedule.entryId}`, schedule)
}

//Object to inject in the Calendar
export const localData = (dataFromApi: any) => {
    return {
        dataSource: dataFromApi,
        fields: {
            id: 'entryId',
            subject: {name: 'fleetId', default: 'No Fleet ID'},
            location: {name: 'locationId'},
            startTime: {name: 'timeStart'},
            endTime: {name: 'timeEnd'},
            status: {name: 'status'},
        },
    }
}
