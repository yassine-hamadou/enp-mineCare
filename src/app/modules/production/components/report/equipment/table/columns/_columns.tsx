// @ts-nocheck
import {Column} from 'react-table'
// import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Destination' className='border-end min-w-125px' />
    ),
    accessor: 'Destination',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Activity' className='border-end min-w-125px' />
    ),
    accessor: 'Activity',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Quantity' className='min-w-125px' />
    ),
    accessor: 'Quantity',
  },
]

export {usersColumns}
