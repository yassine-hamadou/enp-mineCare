import {Response} from '../../../../../../../_metronic/helpers'
// export type fault = {
//   id?: ID
//   name?: string
//   avatar?: string
//   email?: string
//   position?: string
//   role?: string
//   last_login?: string
//   two_steps?: boolean
//   joined_day?: string
//   online?: boolean
//   initials?: {
//     label: string
//     state: string
//   }
// }

export type Fault = {
  txfault: string,
  audtdate: number,
  audttime: number,
  audtuser: string,
  audtorg: string,
  txdesc: string,
  txcomment: string,
  swwarn: number,
  swusepic: number,
  txpicfile: string,
  txmodlgrp: string,
  swfailure: number,
  txfaultgrp: string,
  nmstat: number,
}

export const initialFault: Fault = {
  txfault: '',
  audtdate: 0,
  audttime: 0,
  audtuser: '',
  audtorg: '',
  txdesc: '',
  txcomment: '',
  swwarn: 0,
  swusepic: 0,
  txpicfile: '',
  txmodlgrp: '',
  swfailure: 0,
  txfaultgrp: '',
  nmstat: 0,
}



export type FaultsQueryResponse = Response<Array<Fault>>
