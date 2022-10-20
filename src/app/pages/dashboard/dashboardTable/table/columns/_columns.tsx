// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='Vehicle Type'
        className='border-end min-w-125px'
      />
    ),
    accessor: 'id',
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='Number of Vehicles'
        className='border-end min-w-125px'
      />
    ),
    accessor: 'name',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Down Time' className='border-end min-w-125px' />
    ),
    accessor: 'email',
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='Number of Hours'
        className='border-end min-w-125px'
      />
    ),
    accessor: 'last_login',
  },
]

export {usersColumns}
