import { Link } from 'react-router-dom'


const AllReportPage = () => {

  return (
    <div

    >
      <div className='row col-12 mb-10'>
        <div
          style={{
            width:"310px",
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            margin:'0px 10px 0px 10px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color:"GrayText"}}>Lists</h2>
          <hr></hr>

          <h3><span className="bullet me-5"></span><Link to="/report/member-list">Member List</Link></h3>
        </div>
        <div
          style={{
            width:"310px",
            backgroundColor: 'white',
            padding: '20px',
            margin:'0px 10px 0px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color:"GrayText"}}>Equipments</h2>
          <hr></hr>

          <h3><span className="bullet me-5"></span><Link to="/report/CarperManufacturerReport">Equipments Per Manufacturer</Link></h3>

        </div>
        <div
          style={{
            width:"310px",
            backgroundColor: 'white',
            padding: '20px',
            margin:'0px 10px 0px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color:"GrayText"}}>Faults</h2>
          <hr></hr>
          <h3><span className="bullet me-5"></span><Link to="/report/fault-summary-report">Fault Summary</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/fleet-history-report">Fleet History</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/solved-report">Solved</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/pending-report">Pending</Link></h3>
        </div>
        <div
          style={{
            width:"310px",
            backgroundColor: 'white',
            padding: '20px',
            margin:'0px 10px 0px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color:"GrayText"}}>Changeout</h2>
          <hr></hr>
          <h1>No Report</h1>
        </div>

      </div>
      <div className='row col-12 mb-10'>
        <div
          style={{
            width:"310px",
            backgroundColor: 'white',
            padding: '20px',
            margin:'0px 10px 0px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color:"GrayText"}}>Metering</h2>
          <hr></hr>
          <h1>No Report</h1>
          </div>
      </div>
    </div>
  )
}

export {AllReportPage}
