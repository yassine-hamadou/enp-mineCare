import {useListView} from '../../core/ListViewProvider'
import {FaultsListFilter} from './FaultsListFilter'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const FaultsListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddFaultModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-fault-table-toolbar='base'>
      {/*<faultsListFilter />*/}

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr091.svg' className='svg-icon-2' />
        Upload
      </button>
      {/* end::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      <Link
        to='/entries/fault/add'
        className='btn btn-light-primary me-3'
        data-kt-fault-table-toolbar='export'
      >
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-3' />
        Export
      </Link>
      {/* begin::Add fault */}
      <button type='button' className='btn btn-primary' onClick={openAddFaultModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add
      </button>
      {/* end::Add fault */}
    </div>
  )
}

export {FaultsListToolbar}
