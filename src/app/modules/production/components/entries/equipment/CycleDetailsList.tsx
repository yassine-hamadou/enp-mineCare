import {Calendar} from '../../calendar/Calendar'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useEffect, useState} from 'react'
import axios from 'axios'

const EquipmentDetail = () => {
  const [vehicle, setVehicle] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://app.sipconsult.net/SmWebApi/api/VmequpsApi'
    )
    setVehicle(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div>
        <DropdownButton
          title='Vehicles'
          id='dropdown-menu-align-right'
          className='btn bg-white px-3 mb-2'
        >
          {vehicle.map((item: any) => {
            return (
              <Dropdown.Item eventKey={item.txequp}>
                {item.txequp} - {item.modlName}
              </Dropdown.Item>
            )
          })}
        </DropdownButton>
      </div>
      {/*Todo: Add a calendar component that takes a vehicle type as a prop and displays the vehicle's schedule*/}
      <KTCard>
        <KTCardBody className='py-5 px-2'>
          <Calendar />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {EquipmentDetail}

// const [vehicle, setVehicle] = useState([
//   {
//     txequp: '000001      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000001      ',
//     modlName: 'Dump Truck_AD060                                            ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '320003                                  ',
//     dtwarrst: 20220606,
//     dtwarren: 20230606,
//     swtrkmaint: 1,
//     dtlastmain: 0,
//     dtlastserv: 20220727,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 1,
//   },
//   {
//     txequp: '000002      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000002      ',
//     modlName: 'AD065_Articulated Dump Truck                                ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '012506                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20230607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 20220714,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   {
//     txequp: '000003      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000003      ',
//     modlName: 'Dump Truck                                                  ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '320343                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20230607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 0,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 20210101,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   {
//     txequp: '000004      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000004      ',
//     modlName: 'Dump Truck                                                  ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '320364                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20220607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 20220727,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   {
//     txequp: '000005      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000005      ',
//     modlName: 'Dump TruckTD                                                ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '320366                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20230607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 0,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   {
//     txequp: '000006      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000006      ',
//     modlName: 'Dump Truck                                                  ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '320367                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20230607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 0,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   {
//     txequp: '000007      ',
//     audtuser: 'ADMIN   ',
//     audtorg: 'TARKWA',
//     wdtype: 1,
//     swactive: 1,
//     txsite: '000002      ',
//     txmodl: '000007      ',
//     modlName: 'Dump Truck                                                  ',
//     modlClass: 'VOLVO                                                       ',
//     classID: 'VOLVO ',
//     txunformsn: '322064                                  ',
//     dtwarrst: 20220607,
//     dtwarren: 20230607,
//     swtrkmaint: 0,
//     dtlastmain: 0,
//     dtlastserv: 0,
//     swtrkmtr: 1,
//     txinv: '                      ',
//     dtinv: 0,
//     mninvprice: 0,
//     mninvcost: 0,
//     wdtrkmaint: 0,
//   },
//   ]
