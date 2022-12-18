// Functions to perform CRUD operations
import axios from 'axios'
import {ENP_URL} from '../../../../../../urls'

export const fetchSchedules = () => {
  return axios.get(`${ENP_URL}/FleetSchedulesApi`)
}
export const fetchVmequps = () => {
  return axios.get(`${ENP_URL}/VmequpsApi`)
}
export const fetchLocations = () => {
  return axios.get(`${ENP_URL}/IclocsApi`)
}
export const fetchCustodians = () => {
  return axios.get(`${ENP_URL}/VmemplsApi`)
}
export const fetchServiceTypes = () => {
  return axios.get(`${ENP_URL}/Services`)
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
    },
  }
}
