import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import axios from 'axios'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {Calendar} from './calendar/Calendar'
import {Button, Space} from 'antd'
import {useNavigate} from 'react-router-dom'
import {ENP_URL} from '../../../../../urls'
import {useQuery} from 'react-query'
import {useState} from 'react'

const EquipmentDetail = () => {
  let dropDownListObj: any
  const [chosenLocationIdFromDropdown, setChosenLocationIdFromDropdown] = useState(null)
  const navigate = useNavigate()
  const {data: locations} = useQuery('Locations', () => axios.get(`${ENP_URL}/IclocsApi`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  //set the data to dataSource property

  console.log('chosenLocationIdFromDropdown', chosenLocationIdFromDropdown)
  return (
    <>
      <div className='d-flex justify-content-between'>
        <Space style={{marginBottom: 0}}>
          <DropDownListComponent
            id='dropdownlist'
            placeholder='Select a location'
            onChange={(e: any) => setChosenLocationIdFromDropdown(e.value)}
            ref={(scope) => {
              dropDownListObj = scope
            }}
            dataSource={locations?.data.map((location: any) => {
              return {
                text: `${location.locationCode}- ${location.locationDesc}`,
                value: `${location.locationCode}`,
              }
            })}
            fields={{text: 'text', value: 'value'}}
          />
          <Button
            type='primary'
            onClick={() => {
              setChosenLocationIdFromDropdown(null)
              dropDownListObj.value = null
            }}
          >
            Reset
          </Button>
        </Space>
        <Space style={{marginBottom: 0}}>
          <button
            type='button'
            className='btn btn-primary me-3'
            onClick={() => {
              navigate('/entries/start-work')
            }}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Upload
          </button>
          <button
            type='button'
            className='btn btn-primary me-3'
            onClick={() => {
              navigate('/entries/start-work')
            }}
          >
            <KTSVG path='/media/icons/duotune/technology/teh005.svg' className='svg-icon-2' />
            PM
          </button>
        </Space>
      </div>

      {/*Todo: Add a calendar component that takes a vehicle type as a prop and displays the vehicle's schedule*/}
      <KTCard>
        <KTCardBody className='py-5 px-2'>
          <Calendar chosenLocationIdFromDropdown={chosenLocationIdFromDropdown} />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export {EquipmentDetail}
