import axios from 'axios';


//base url for the api
export const SERVER = process.env.REACT_APP_BASE_URL;
// export const SERVER = 'http://208.117.44.15'
// export const SERVER = 'https://app.sipconsult.net'
// export const SERVER = 'https://localhost:7144'


/*
 Use this file to define your base URLs whether on localhost or on the ENP server https://www.logoai.com/logo/1511251
 */
// export const ENP_URL = 'http://localhost:3001'
// export const ENP_URL = 'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api'
export const USERS_ENDPOINTS = `${SERVER}/userapi/api`;
export const USER_URL = `${SERVER}/hrwebapi/api`;
export const ESMS_APP_ID = 3;
// export const USERS_ENDPOINTS = "https://app.sipconsult.net/userapi/api";

const tenant: string | null = localStorage.getItem('tenant');
export const ENP_URL = `${SERVER}/esmsapi/api`
// export const ENP_URL = 'https://localhost:7144/api'
// export const ENP_URL = 'https://app.sipconsult.net/smwebapi/api'


export const fetchEmployee = () => {
    return axios.get(`${ENP_URL}/vmemplsApi`)
}

export const fetchUsers = () => {
    return axios.get(`${USERS_ENDPOINTS}/Users`)
}


export const fetchBrands = () => {
    return axios.get(`${ENP_URL}/LubeBrands`)
}

export const getHours = (tenant: any) => {
    return axios.get(`${ENP_URL}/HoursEntry/tenant/${tenant}`)
}
export const putHours = (data: any) => {
    return axios.put(`${ENP_URL}/HoursEntry/${data.id}`, data)
}
export const fetchCompartments = (tenantId: string) => {
    return axios.get(`${ENP_URL}/Compartment/tenant/${tenantId}`)
}
export const fetchLubeBrands = () => {
    return axios.get(`${ENP_URL}/LubeBrands`)
}
export const fetchRefillTypes = (tenantId: any) => {
    return axios.get(`${ENP_URL}/RefillType/tenant/${tenantId}`)
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

export function getEquipment(tenantId: any) {
    return axios.get(`${ENP_URL}/equipments/tenant/${tenantId}`);
}

export function postEquipment(data: any, tenantId: any) {
    return axios.post(`${ENP_URL}/equipments`, {...data, tenantId});
}

export function patchEquipment(data: any) {
    return axios.patch(`${ENP_URL}/equipments/${data?.id}`, [
        {
            "op": "replace",
            "path": "/equipmentId",
            "value": data?.equipmentId
        },
        {
            "op": "replace",
            "path": "/serialNumber",
            "value": data?.serialNumber
        },
        {
            "op": "replace",
            "path": "/description",
            "value": data?.description
        },
        {
            "op": "replace",
            "path": "/manufactureDate",
            "value": data?.manufactureDate
        },
        {
            "op": "replace",
            "path": "/modelId",
            "value": data?.modelId
        },
        {
            "op": "replace",
            "path": "/purchaseDate",
            "value": data?.purchaseDate
        },
        {
            "op": "replace",
            "path": "/endOfLifeDate",
            "value": data?.endOfLifeDate
        },
        {
            "op": "replace",
            "path": "/facode",
            "value": data?.facode
        }
    ])
}

export function patchEquipmentGeneralInfo(data: any) {
    return axios.patch(`${ENP_URL}/equipments/${data?.id}`, [
          {
              "op": "replace",
              "path": "/adjustment",
              "value": data?.adjustment
          },
          {
              "op": "replace",
              "path": "/meterType",
              "value": data?.meterType
          }, {
              "op": "replace",
              "path": "/note",
              "value": data?.note
          }, {
              "op": "replace",
              "path": "/warrantyStartDate",
              "value": data?.warrantyStartDate
          },
          {
              "op": "replace",
              "path": "/warrantyEndDate",
              "value": data?.warrantyEndDate
          }, {
              "op": "replace",
              "path": "/meterType",
              "value": data?.meterType
          }, {
              "op": "replace",
              "path": "/universalCode",
              "value": data?.universalCode
          }, {
              "op": "replace",
              "path": "/meterType",
              "value": data?.meterType
          }, {
              "op": "replace",
              "path": "/meterType",
              "value": data?.meterType
          },
      ]
    )
}

export function getBacklogs(tenantId: any) {
    return axios.get(`${ENP_URL}/backlogs/tenant/${tenantId}`);
}

export function getCompletedBacklogs(tenantId: any, pageNumber: any, pageSize: any) {
    console.log('pageNumber', pageNumber)
    console.log('pageSize', pageSize)
    return axios.get(`${ENP_URL}/backlogs/tenant/${tenantId}/status/Completed?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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

export function getManufacturers(tenantId: any) {
    return axios.get(`${ENP_URL}/manufacturers/tenant/${tenantId}`);
}

export const postManufacturer = (data: any, tenantId: any) => {
    return axios.post(`${ENP_URL}/Manufacturers`, {...data, tenantId})
}

export const deleteManufacturer = (id: any) => {
    return axios.delete(`${ENP_URL}/Manufacturers/${id}`)
}

export function getModelClasses(tenantId: any) {
    return axios.get(`${ENP_URL}/modelClasses/tenant/${tenantId}`);
}

export function getModels(tenant: any) {
    return axios.get(`${ENP_URL}/models/tenant/${tenant}`);
}

export function addHours(data: any) {
    return axios.post(`${ENP_URL}/hoursentry`, data);
}

export function editHour(data: any) {
    return axios.patch(`${ENP_URL}/hoursentry/${data.id}`, [
        {
            "op": "replace",
            "path": "/currentReading",
            "value": data.readingPatch
        }
    ]);
}

export function getEquipmentHoursEntry(tenant: any, equipmentId: any, readingSource: any) {
    return axios.get(`${ENP_URL}/HoursEntry/${equipmentId}/tenant/${tenant}/${readingSource}`);
}

export function getAllEquipmentsHoursEntryPmReading(tenant: any) {
    return axios.get(`${ENP_URL}/HoursEntry/tenant/${tenant}/allpmreadings`);
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

export const fetchUserCompanies = () => {
    return axios.get(`${USERS_ENDPOINTS}/UserCompanies`)
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

export const patchSchedule = (data: any) => {
    return axios.patch(`${ENP_URL}/FleetSchedulesApi/${data?.entryId}`,
      [
          {
              "op": "replace",
              "path": "/status",
              "value": "Completed"
          },
          {
              "op": "replace",
              "path": "/completedDate",
              "value": data?.completedDate
          },
          {
              "op": "replace",
              "path": "/comment",
              "value": data?.comment
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const addComponentToEquipment = (data: any) => {
    console.log('data in from', data)
    return axios.post(`${ENP_URL}/Components`, data)
}

export const getLocations = (tenantId: any) => {
    return axios.get(`${ENP_URL}/Locations/tenant/${tenantId}`)
}

export const postLocation = (data: any, tenantId: any) => {
    return axios.post(`${ENP_URL}/Locations`, {...data[0], tenantId, id: 0})
}

export const putLocation = (data: any, tenantId: any) => {
    return axios.put(`${ENP_URL}/Locations/${data.id}`, data)
}

export const patchLocation = (data: any) => {
    return axios.patch(`${ENP_URL}/Locations/${data?.id}`,
      [
          {
              "op": "replace",
              "path": "/name",
              "value": data?.name
          },
          {
              "op": "replace",
              "path": "/description",
              "value": data?.description
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const deleteLocation = (id: any) => {
    return axios.delete(`${ENP_URL}/Locations/${id}`)
}

export const getCustodians = (tenantId: any) => {
    return axios.get(`${ENP_URL}/Custodians/tenant/${tenantId}`)
}

export const postCustodian = (data: any, tenantId: any) => {
    // return axios.post(`${ENP_URL}/Custodians`, {...data[0], tenantId, id: 0})
    return axios.post(`${ENP_URL}/Custodians`, {...data, tenantId, id: 0})
}

export const putCustodian = (data: any, tenantId: any) => {
    return axios.put(`${ENP_URL}/Custodians/${data.id}`, {...data, tenantId})
}

export const patchCustodian = (data: any) => {
    return axios.patch(`${ENP_URL}/Custodians/${data?.id}`,
      [
          {
              "op": "replace",
              "path": "/name",
              "value": data?.name
          },
          {
              "op": "replace",
              "path": "/description",
              "value": data?.description
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const deleteCustodian = (id: any) => {
    return axios.delete(`${ENP_URL}/Custodians/${id}`)
}


export const getDownStatuses = (tenantId: any) => {
    return axios.get(`${ENP_URL}/DownStatuses/tenant/${tenantId}`)
}

export const postDownStatus = (data: any, tenantId: any) => {
    // return axios.post(`${ENP_URL}/DownStatuses`, {...data[0], tenantId, id: 0}) // this is for DX react grid
    return axios.post(`${ENP_URL}/DownStatuses`, {...data, tenantId, id: 0})
}

export const putDownStatus = (data: any, tenantId: any) => {
    console.log('data in put', {...data, tenantId})
    return axios.put(`${ENP_URL}/DownStatuses/${data.id}`, {...data, tenantId})
}

export const patchDownStatus = (data: any) => {
    return axios.patch(`${ENP_URL}/DownStatuses/${data?.id}`,
      [
          {
              "op": "replace",
              "path": "/name",
              "value": data?.name
          },
          {
              "op": "replace",
              "path": "/description",
              "value": data?.description
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const deleteDownStatus = (id: any) => {
    return axios.delete(`${ENP_URL}/DownStatuses/${id}`)
}

export const postModel = (data: any, tenantId: any) => {
    console.log('data in post', data)
    const formData = new FormData();
    formData.append('code', data?.code);
    formData.append('name', data?.name);
    formData.append('modelClassId', data?.modelClassId);
    formData.append('manufacturerId', data?.manufacturerId);
    formData.append('tenantId', tenantId);
    return axios.post(`${ENP_URL}/Models`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const putModel = (data: any, tenantId: any) => {
    console.log('data in put', data)
    console.log('tenantId in put', {...data, tenantId})
    return axios.put(`${ENP_URL}/Models/${data.modelId}`, {...data, tenantId})
}

export const patchModel = (data: any) => {
    return axios.patch(`${ENP_URL}/Models/${data?.id}`,
      [
          {
              "op": "replace",
              "path": "/name",
              "value": data?.name
          },
          {
              "op": "replace",
              "path": "/description",
              "value": data?.description
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const deleteModel = (id: any) => {
    return axios.delete(`${ENP_URL}/Models/${id}`)
}


export const postModelClass = (data: any, tenantId: any) => {
    console.log('data in post', {...data, tenantId, id: 0})
    return axios.post(`${ENP_URL}/ModelClasses`, {...data, tenantId, id: 0})
}

export const putModelClass = (data: any, tenantId: any) => {
    return axios.put(`${ENP_URL}/ModelClasses/${data.modelClassId}`, {...data, tenantId})
}

export const patchModelClass = (data: any) => {
    return axios.patch(`${ENP_URL}/ModelClasses/${data?.id}`,
      [
          {
              "op": "replace",
              "path": "/name",
              "value": data?.name
          },
          {
              "op": "replace",
              "path": "/description",
              "value": data?.description
          }
      ]
      , {
          headers: {
              'Content-Type': 'application/json-patch+json'
          }
      })
}

export const deleteModelClass = (id: any) => {
    return axios.delete(`${ENP_URL}/ModelClasses/${id}`)
}
