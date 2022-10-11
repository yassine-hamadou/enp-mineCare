import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DetailsListHeader} from './components/header/UsersListHeader'
import {DetailsTable} from './table/DetailsTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import { KTCard } from '../../../../../../_metronic/helpers'

const CycleDetailsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <DetailsListHeader />
        <DetailsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const FuelReportTable = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        {/*<CycleDetailsList />*/}
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {FuelReportTable}
