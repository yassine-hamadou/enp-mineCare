import {useListView} from '../../core/ListViewProvider'
import {UsersListSearchComponent} from './UsersListSearchComponent'

const DetailsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {/*{selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />}*/}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {DetailsListHeader}
