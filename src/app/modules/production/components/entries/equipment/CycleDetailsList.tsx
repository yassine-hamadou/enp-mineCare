import { Calendar } from "../../calendar/Calendar";
import { KTCard, KTCardBody } from "../../../../../../_metronic/helpers";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const EquipmentDetail = () => (
  <>
    <div>
      <DropdownButton
        title="Vehicles"
        id="dropdown-menu-align-right"
        className="btn bg-white px-3 mb-2"
      >
        <Dropdown.Item eventKey="option-1">Vehicle-1</Dropdown.Item>
        <Dropdown.Item eventKey="option-2">Vehicle-2</Dropdown.Item>
        <Dropdown.Item eventKey="option-3">Vehicle 3</Dropdown.Item>
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

export {EquipmentDetail}
