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
    Header: (props) => <UserCustomHeader tableProps={props} title='FleetID' className='border-end min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Model' className='border-end min-w-125px' />,
    accessor: 'name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Description' className='border-end min-w-125px' />,
    accessor: 'email',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Previous Reading' className='border-end min-w-125px' />,
    accessor: 'last_login',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Date' className='border-end min-w-125px' />,
    accessor: 'joined_day',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Daily hours worked' className='border-end min-w-125px' />,
    accessor: 'initials.label',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='New reading' className='border-end min-w-125px' />,
    accessor: 'position',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Comment' className='border-end min-w-125px' />,
    accessor: 'initials.state',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Adjust hours' className='text-start min-w-100px border-end' />,
    accessor: 'online',
  },

]

export {usersColumns}
