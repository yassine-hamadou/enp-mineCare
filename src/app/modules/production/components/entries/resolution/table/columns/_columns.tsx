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
    Header: (props) => <UserCustomHeader tableProps={props} title='userID' className='border-end min-w-125px' />,
    accessor: 'userId',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='id' className='border-end min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='post title' className='border-end min-w-125px' />,
    accessor: 'title',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='post body' className='border-end min-w-125px' />,
    accessor: 'body',
  },
]

export {usersColumns}
