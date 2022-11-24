// @ts-nocheck
import { Column } from "react-table";
// import {UserSelectionCell} from './UserSelectionCell'
import { UserCustomHeader } from "./UserCustomHeader";
// import {UserSelectionHeader} from './UserSelectionHeader'
import { User } from "../../core/_models";

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
    Header: (props) => <UserCustomHeader tableProps={props} title='Description' className='text-start min-w-100px border-end' />,
    accessor: 'email',
  },
]

export {usersColumns}
