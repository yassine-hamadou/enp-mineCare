import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DetailsListHeader} from './components/header/FaultsListHeader'
import {DetailsTable} from './table/DetailsTable'
import {FaultEditModal} from './fault-edit-modal/FaultEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'

const CycleDetailsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <DetailsListHeader />
        <DetailsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <FaultEditModal />}
    </>
  )
}

const Fault = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CycleDetailsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {Fault}
