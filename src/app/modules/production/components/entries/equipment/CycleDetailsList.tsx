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
<<<<<<< HEAD
        'http://208.117.44.15/SmWebApi/api/VmequpsApi'
=======
      'https://cors-anywhere.herokuapp.com/http://208.117.44.15/SmWebApi/api/VmequpsApi'
>>>>>>> master
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
          title='Equipment Type'
          id='dropdown-menu-align-right'
          className='btn bg-white px-3 mb-2'
        >
          {vehicle.map((item: any) => {
            return (
              <Dropdown.Item eventKey={item.fleetID}>
                {item.fleetID} - {item.modlName} - {item.modlClass}
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
