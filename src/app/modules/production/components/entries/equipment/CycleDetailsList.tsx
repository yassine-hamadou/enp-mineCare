import {Calendar} from '../../calendar/Calendar'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";

const EquipmentDetail = () => {
  const [vehicle, setVehicle] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:3001/VmclasApi')
    setVehicle(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div style={{width: "250px"}}>
        <DropDownListComponent
            id="dropdownlist"
            placeholder='Equipment Type'
            data-name='equips'
            dataSource={vehicle.map((vehi: any) => {
              return { text: `${vehi.classCode}- ${vehi.classDesc}`, value: `${vehi.classCode}` };
            })}
            fields={{ text: "text", value: "value" }}
        />
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
