// @ts-nocheck
import {Column} from 'react-table'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='FleetID' className='min-w-125px border-end' />
    ),
    accessor: 'date',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Model' className='min-w-125px border-end' />
    ),
    accessor: 'shift',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Description' className='min-w-125px border-end' />
    ),
    accessor: 'time',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Location' className='min-w-125px border-end' />
    ),
    accessor: 'loader',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Time Start' className='min-w-125px border-end' />
    ),
    accessor: 'Hauler',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Time End' className='min-w-125px border-end' />
    ),
    accessor: 'Origin',
  },
]

export {usersColumns}
