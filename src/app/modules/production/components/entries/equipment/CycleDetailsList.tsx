import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import {Calendar} from "../../calendar/Calendar";
import {Button, Input, Space} from "antd";
import {Link, useNavigate} from "react-router-dom";

const EquipmentDetail = () => {
  const [vehicle, setVehicle] = useState([])
  const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  const loadData = async () => {
    setLoading(true)
    const response = await axios.get('http://208.117.44.15/SmWebApi/api/VmclasApi')
    setVehicle(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
        <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 0}}>
                <DropDownListComponent
                    id="dropdownlist"
                    placeholder='Equipment Type'
                    data-name='equips'
                    dataSource={vehicle.map((vehi: any) => {
                        return { text: `${vehi.classCode}- ${vehi.classDesc}`, value: `${vehi.classCode}` };
                    })}
                    fields={{ text: "text", value: "value" }}
                />
            </Space>
            <Space style={{marginBottom: 0}}>
                <button type='button' className='btn btn-primary me-3' onClick={() => {navigate('/entries/start-work')}}>
                    <KTSVG path='/media/icons/duotune/technology/teh005.svg' className='svg-icon-2'/>
                    Start Work
                </button>
            </Space>
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
