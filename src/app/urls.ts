import axios from 'axios';
/*
 Use this file to define your base URLs whether on localhost or on the ENP server
 */
// export const ENP_URL = 'http://localhost:3001'
// export const ENP_URL = 'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api'
export const ENP_URL = 'http://208.117.44.15/SmWebApi/api'
// export const ENP_URL = 'http://localhost:4192'


export const fetchEquips= ()=>{
    return axios.get(`${ENP_URL}/VmequpsApi`)
}
export const fetchModels= ()=>{
    return axios.get(`${ENP_URL}/VmmodlsApi`)
}
export const fetchBrands= ()=>{
    return axios.get(`${ENP_URL}/LubeBrands`)
}
export const fetchHours= ()=>{
    return axios.get(`${ENP_URL}/HoursEntry`)
}
export const fetchCompartments= ()=>{
    return axios.get(`${ENP_URL}/Compartment`)
}
export const fetchLubeBrands= ()=>{
    return axios.get(`${ENP_URL}/LubeBrands`)
}
export const fetchRefillTypes= ()=>{
    return axios.get(`${ENP_URL}/RefillType`)
}
export const fetchLubeConfigs= ()=>{
    return axios.get(`${ENP_URL}/LubeConfigs`)
}
export const fetchLubeGrade= ()=>{
    return axios.get(`${ENP_URL}/LubeGrades`)
}
export const fetchSections= ()=>{
    return axios.get(`${ENP_URL}/Sections`)
}
export const fetchServices= ()=>{
    return axios.get(`${ENP_URL}/Services`)
}
export const fetchGroups= ()=>{
    return axios.get(`${ENP_URL}/Groups`)
}
export const fetchItems= ()=>{
    return axios.get(`${ENP_URL}/Items`)
}
export const fetchItemValue= ()=>{
    return axios.get(`${ENP_URL}/ItemValue`)
}
