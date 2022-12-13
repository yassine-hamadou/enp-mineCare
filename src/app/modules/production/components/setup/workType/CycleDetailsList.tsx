import {Table} from 'react-bootstrap'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'

const carData = [
  {
    wdtype: 0,
    audtuser: 'ADMIN',
    audtorg: 'TARKWA',
    txdesc: 'Articulated Dump Truck',
  },
  {
    wdtype: 0,
    audtuser: 'ADMIN',
    audtorg: 'TARKWA',
    txdesc: 'Maint Ancillary Group',
  },
]

const WorkTypeNew = () => {
  return (
    <>
      <KTCard>
        <KTCardBody className='py-4'>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table border align-middle table-striped gy-2 gs-0 table-rounded table-hover'
            >
              <thead>
                <tr className='fw-bold fs-7'>
                  <th>wdtype</th>
                  <th>audtuser</th>
                  <th>audtorg</th>
                  <th>txdesc</th>
                </tr>
              </thead>
              <tbody className='text-black'>
                {carData && carData.length > 0 ? (
                  carData.map((car) => (
                    <tr key={car.wdtype}>
                      <td>{car.wdtype}</td>
                      <td>{car.audtuser}</td>
                      <td>{car.audtorg}</td>
                      <td>{car.txdesc}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                        No matching records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>

      <div style={{margin: '10rem'}}>
        <Table striped bordered hover size='md'>
          <thead>
            <tr>
              <th>Wdtype</th>
              <th>Audtuser</th>
              <th>Audtorg</th>
              <th>Txdesc</th>
            </tr>
          </thead>
          <tbody>
            {carData && carData.length > 0 ? (
              carData.map((car) => (
                <tr>
                  <td>{car.wdtype}</td>
                  <td>{car.audtuser}</td>
                  <td>{car.audtorg}</td>
                  <td>{car.txdesc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No cars</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}
export {WorkTypeNew}

// import { ListViewProvider, useListView } from './core/ListViewProvider'
// import {QueryRequestProvider} from './core/QueryRequestProvider'
// import {QueryResponseProvider} from './core/QueryResponseProvider'
// import {DetailsListHeader} from './components/header/UsersListHeader'
// import {DetailsTable} from './table/DetailsTable'
// import {UserEditModal} from './fault-edit-modal/UserEditModal'
// import { KTCard } from '../../../../../../_metronic/helpers'

// const CycleDetailsList = () => {
//   const {itemIdForUpdate} = useListView()
//   return (
//     <>
//       <KTCard>
//         <DetailsListHeader />
//         <DetailsTable />
//       </KTCard>
//       {itemIdForUpdate !== undefined && <UserEditModal />}
//     </>
//   )
// }

// const WorkType = () => (
//   <QueryRequestProvider>
//     <QueryResponseProvider>
//       <ListViewProvider>
//         <CycleDetailsList />
//       </ListViewProvider>
//     </QueryResponseProvider>
//   </QueryRequestProvider>
// )

// export {WorkType}
