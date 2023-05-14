import axios from 'axios';


/*
 Use this file to define your base URLs whether on localhost or on the ENP server
 */
// export const ENP_URL = 'http://localhost:3001'
// export const ENP_URL = 'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api'
export const USERS_ENDPOINTS = "http://208.117.44.15/userapi/api";
const tenant: string | null = localStorage.getItem('tenant');
console.log('tenantfromurl', tenant)
export const ENP_URL = 'http://208.117.44.15/SmWebApi/api'
// export const ENP_URL = 'https://localhost:7144/api'

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

export const fetchHours = () => {
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
export const fetchServices = () => {
  return axios.get(`${ENP_URL}/Services`)
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
  const url = axios.get(`${ENP_URL}/FaultEntriesApi/tenant/${tenant}`)
  console.log('url', url)
  return url
}

export function getEquipment(tenant: any) {
  return axios.get(`${ENP_URL}/equipments/tenant/${tenant}`);
}

export function getGroundEngagingTools() {
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

export function getModels() {
  return axios.get(`${ENP_URL}/models`)
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

