import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../../_metronic/helpers'
import {Fault, FaultsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const Fault_URL = `${API_URL}/Fault`
const GET_Faults_URL = `${API_URL}/Faults/query`

const getFaults = async (): Promise<FaultsQueryResponse> => {
  
  const res = await axios.get('http://208.117.44.15/SmWebApi/api/VmfaltsApi')
  console.log(res.data)
  return res.data
}

const getFaultById = (id: ID): Promise<Fault | undefined> => {
  return axios
    .get(`${Fault_URL}/${id}`)
    .then((response: AxiosResponse<Response<Fault>>) => response.data)
    .then((response: Response<Fault>) => response.data)
}

const createFault = (Fault: Fault): Promise<Fault | undefined> => {
  return axios
    .put(Fault_URL, Fault)
    .then((response: AxiosResponse<Response<Fault>>) => response.data)
    .then((response: Response<Fault>) => response.data)
}

const updateFault = (Fault: Fault): Promise<Fault | undefined> => {
  return axios
    .post(`${Fault_URL}/${Fault.txfault}`, Fault)
    .then((response: AxiosResponse<Response<Fault>>) => response.data)
    .then((response: Response<Fault>) => response.data)
}

const deleteFault = (FaultId: ID): Promise<void> => {
  return axios.delete(`${Fault_URL}/${FaultId}`).then(() => {})
}

const deleteSelectedFaults = (FaultIds: Array<ID>): Promise<void> => {
  const requests = FaultIds.map((id) => axios.delete(`${Fault_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getFaults, deleteFault, deleteSelectedFaults, getFaultById, createFault, updateFault}
