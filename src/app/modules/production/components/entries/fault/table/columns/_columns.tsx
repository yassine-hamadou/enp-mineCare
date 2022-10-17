// @ts-nocheck
import {Column} from 'react-table'
import {FaultsInfoCell} from './FaultsInfoCell'
import {FaultsLastLoginCell} from './FaultsLastLoginCell'
import {FaultsTwoStepsCell} from './FaultsTwoStepsCell'
import {FaultsActionsCell} from './FaultsActionsCell'
// import {FaultsSelectionCell} from './FaultsSelectionCell'
// import {FaultsSelectionHeader} from './FaultsSelectionHeader'
import {Faults} from '../../core/_models'
import {FaultsCustomHeader} from './FaultsCustomHeader'
const faultsColumns: ReadonlyArray<Column<Faults>> = [
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='FleetID' className='border-end min-w-125px' />
    ),
    accessor: 'txfault',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='Model' className='border-end min-w-125px' />
    ),
    accessor: 'txmodlgrp',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader
        tableProps={props}
        title='Description'
        className='border-end min-w-125px'
      />
    ),
    accessor: 'txdesc',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='Down Time' className='border-end min-w-125px' />
    ),
    accessor: 'swfailure',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='Down Type' className='border-end min-w-125px' />
    ),
    accessor: 'txfaultgrp',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='Status' className='border-end min-w-125px' />
    ),
    accessor: 'nmstat',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='Comment' className='min-w-125px' />
    ),
    accessor: 'txcomment',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='swwarn' className='min-w-125px' />
    ),
    accessor: 'swwarn',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='swusepic' className='min-w-125px' />
    ),
    accessor: 'swusepic',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='txpicfile' className='min-w-125px' />
    ),
    accessor: 'txpicfile',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='audtdate' className='min-w-125px' />
    ),
    accessor: 'audtdate',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='audttime' className='min-w-125px' />
    ),
    accessor: 'audttime',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='audtuser' className='min-w-125px' />
    ),
    accessor: 'audtuser',
  },
  {
    Header: (props) => (
      <FaultsCustomHeader tableProps={props} title='audtorg' className='min-w-125px' />
    ),
    accessor: 'audtorg',
  },
  // {
  //   Header: (props) => (
  //     <FaultsCustomHeader tableProps={props} title='Actions' className='min-w-125px' />
  //   ),
  //   accessor: 'actions',
  //   Cell: (props) => <FaultsActionsCell tableProps={props} />,
  // },

  //   Header: (props) => (
  //     <FaultsCustomHeader tableProps={props} title='Custodian' className='border-end min-w-125px' />
  //   ),
  //   accessor: 'initials.label',
  // },
  // {
  //   Header: (props) => (
  //     <FaultsCustomHeader tableProps={props} title='Location' className='border-end min-w-125px' />
  //   ),
  //   accessor: 'joined_day',
  // },
  // {
  //   Header: (props) => (
  //     <FaultsCustomHeader
  //       tableProps={props}
  //       title='Actions'
  //       className='text-start min-w-100px border-end'
  //     />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <FaultsActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {faultsColumns}
