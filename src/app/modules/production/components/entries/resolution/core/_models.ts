import {ID, Response} from '../../../../../../../_metronic/helpers'
export type User = { 
  // Following
  userId: number,
  id: ID,
  title: string
  body: string,
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  userId: 0,
  id: 0,
  title: '',
  body: '',
}
