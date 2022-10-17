import {useListView} from '../../core/ListViewProvider'
import {FaultsListToolbar} from './FaultListToolbar'
import {FaultsListGrouping} from './FaultsListGrouping'
import {FaultsListSearchComponent} from './FaultsListSearchComponent'

const DetailsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <FaultsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <FaultsListGrouping /> : <FaultsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {DetailsListHeader}
