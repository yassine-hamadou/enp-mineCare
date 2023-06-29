import axios from 'axios';


/*
 Use this file to define your base URLs whether on localhost or on the ENP server
 */
// export const ENP_URL = 'http://localhost:3001'
// export const ENP_URL = 'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api'
export const USERS_ENDPOINTS = "http://208.117.44.15/userapi/api";
const tenant: string | null = localStorage.getItem('tenant');
export const ENP_URL = 'http://208.117.44.15/SmWebApi/api'
// export const ENP_URL = 'https://localhost:7144/api'
// export const ENP_URL = 'https://app.sipconsult.net/smwebapi/api'

export const fetchEmployee = () => {
  return axios.get(`${ENP_URL}/vmemplsApi`)
}

export const fetchEquips = () => {
  return axios.get(`${ENP_URL}/VmequpsApi`)
}

export const fetchModels = () => {
  return axios.get(`${ENP_URL}/VmmodlsApi`)
}

export const fetchBrands = () => {
  return axios.get(`${ENP_URL}/LubeBrands`)
}

export const fetchHours = (tenant: any) => {
  return axios.get(`${ENP_URL}/HoursEntry/tenant/${tenant}`)
}
export const putHours = (data: any) => {
  return axios.put(`${ENP_URL}/HoursEntry/${data.id}`, data)
}
export const fetchCompartments = () => {
  return axios.get(`${ENP_URL}/Compartment`)
}
export const fetchLubeBrands = () => {
  return axios.get(`${ENP_URL}/LubeBrands`)
}
export const fetchRefillTypes = () => {
  return axios.get(`${ENP_URL}/RefillType`)
}
export const fetchLubeConfigs = () => {
  return axios.get(`${ENP_URL}/LubeConfigs`)
}
export const fetchLubeGrade = () => {
  return axios.get(`${ENP_URL}/LubeGrades`)
}
export const fetchSections = () => {
  return axios.get(`${ENP_URL}/Sections`)
}
export const fetchServices = (tenant: string) => {
  return axios.get(`${ENP_URL}/Services/tenant/${tenant}`)
}
export const postService = (data: any, tenantId: string) => {
  const dataWithTenant = {...data, tenantId};
  return axios.post(`${ENP_URL}/Services`, dataWithTenant)
}

export const deleteService = (id: any) => {
  console.log('id', id)
  return axios.delete(`${ENP_URL}/Services/${id}`)
}
export const fetchGroups = () => {
  return axios.get(`${ENP_URL}/Groups`)
}
export const fetchItems = () => {
  return axios.get(`${ENP_URL}/Items`)
}
export const fetchItemValue = () => {
  return axios.get(`${ENP_URL}/ItemValue`)
}

export const fetchFaults = (tenant: any) => {
  return axios.get(`${ENP_URL}/FaultEntriesApi/tenant/${tenant}`)
}

export function getEquipment(tenant: any) {
  return axios.get(`${ENP_URL}/equipments/tenant/${tenant}`);
}

export function postEquipment(data: any) {
  return axios.post(`${ENP_URL}/equipments`, data);
}

export function getBacklogs(tenant: any) {
  return axios.get(`${ENP_URL}/backlogs/tenant/${tenant}`);
}

export function postBacklogs(data: any, tenantId: any) {
  const dataWithTenant = {...data, tenantId};
  console.info('dataWithTenant', dataWithTenant)
  return axios.post(`${ENP_URL}/Backlogs`, dataWithTenant);
}

export function putBacklog(data: any) {
  console.log("data in put", data)
  return axios.put(`${ENP_URL}/Backlogs/${data.id}`, data);
}

export function deleteBacklog(id: any) {
  return axios.delete(`${ENP_URL}/Backlogs/${id}`);
}

export function getGroundEngagingTools(tenant: any) {
  return axios.get(`${ENP_URL}/groundEngagingTools/tenant/${tenant}`);
}

export function postGroundEngagingTools(data: any) {
  return axios.post(`${ENP_URL}/groundEngagingTools`, data);
}

export function putGroundEngagingTools(data: any) {
  console.log('putttt', data);
  return axios.put(`${ENP_URL}/groundEngagingTools/${data.id}`, data);
}

export function deleteGroundEngagingTools(id: any) {
  return axios.delete(`${ENP_URL}/groundEngagingTools/${id}`);
}

export function getManufacturers() {
  return axios.get(`${ENP_URL}/manufacturers`);
}

export function getModelClasses() {
  return axios.get(`${ENP_URL}/modelClasses`);
}

export function getModels(tenant: any) {
  return axios.get(`${ENP_URL}/models`)
  // return axios.get(`${ENP_URL}/models/tenant/${tenant}`);
}

export function addHours(data: any) {
  return axios.post(`${ENP_URL}/hoursentry`, data);
}


export function postScheduleTransactions(data: any) {
  return axios.post(`${ENP_URL}/ScheduleTransactions`, data);
}


export function getCategories() {
  return axios.get(`${ENP_URL}/categories/tenant/${tenant}`);
}

export function postCategories(data: any) {
  return axios.post(`${ENP_URL}/categories`, data);
}

export function fetchUserApplications() {
  return axios.get(`${USERS_ENDPOINTS}/userApplications`)
}

export const fetchCompanies = () => {
  return axios.get(`${USERS_ENDPOINTS}/Companies`)
}

export const getPriority = (TenantId: any) => {
  return axios.get(`${ENP_URL}/Priorities/tenant/${TenantId}`)
}

export const addPriorities = (data: any, tenantId: any) => {
  return axios.post(`${ENP_URL}/Priorities`, {...data, tenantId})
}

export const putPriority = (data: any) => {
  console.log('data update', data)
  return axios.put(`${ENP_URL}/Priorities/${data.priorityId}`, data)
}

export const deletePriority = (id: any) => {
  return axios.delete(`${ENP_URL}/Priorities/${id}`)
}
export const getSources = (TenantId: any) => {
  return axios.get(`${ENP_URL}/Sources/tenant/${TenantId}`)
}

export const addSources = (data: any, tenantId: any) => {
  return axios.post(`${ENP_URL}/Sources`, {...data, tenantId})
}

export const getDowntypes = (TenantId: any) => {
  return axios.get(`${ENP_URL}/Downtypes/tenant/${TenantId}`)
}

export const putSources = (data: any) => {
  console.log('data update', data)
  return axios.put(`${ENP_URL}/Sources/${data.id}`, data)
}

export const deleteSources = (id: any) => {
  return axios.delete(`${ENP_URL}/Sources/${id}`)
}

export const getSequences = (modelId: any, TenantId: any) => {
  return axios.get(`${ENP_URL}/Sequences/tenant/${TenantId}/equipModel/${modelId}`)
}

export const postSequence = (data: any) => {
  return axios.post(`${ENP_URL}/Sequences`, data)
}

export const deleteSequence = (tenantId: any, model: any) => {
  return axios.delete(`${ENP_URL}/Sequences/tenant/${tenantId}/equipModel/${model}`)
}

export const concatToFaultDetails = (data: any) => {
  return axios.patch(`${ENP_URL}/FaultEntriesApi/${data?.entryId}`,
    [
      {
        "op": "replace",
        "path": "/faultDetails",
        "value": data?.faultDetails
      }
    ]
    , {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    })
}

export const patchSchedule = (entryId: any) => {
  return axios.patch(`${ENP_URL}/FleetSchedulesApi/${entryId}`,
    [
      {
        "op": "replace",
        "path": "/status",
        "value": "Completed"
      }
    ]
    , {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    })
}

export const addComponentToEquipment = (data: any) => {
  console.log('data in from' +
    '', data)
  return axios.post(`${ENP_URL}/Components`, data)
}
