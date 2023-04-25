import {Link} from 'react-router-dom'


const AllReportPage = () => {

  return (
    <div

    >
      <div className='row col-12 mb-10'>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            margin: '0px 10px 20px 10px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Lists</h2>
          <hr></hr>
          <h3><span className="bullet me-5"></span><Link to="/report/service-type">Service Type</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/warranty-life">Warranty End</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/CarperManufacturerReport">Manufacturer
            Detail</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/equipment-summary">Equipment
            Summary</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/all-equip-summary">All Equipment Summary</Link>
          </h3>
          {/*<h3><span className="bullet me-5"></span><Link to="/report/CarperManufacturerReport">Equipment Per*/}
          {/*  Manufacturer</Link></h3>*/}
        </div>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            margin: '0px 10px 20px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Equipment</h2>
          <hr></hr>
          <h3><span className="bullet me-5"></span><Link to="#">Defect</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/daily-hme-report">Daily HME</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="#">Transactions</Link></h3>
        </div>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            margin: '0px 10px 20px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Faults</h2>
          <hr></hr>
          <h3><span className="bullet me-5"></span><Link to="/report/fault-summary-report">Details</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/solved-report">Solved</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/pending-report">Pending</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/fleet-history-report">Equipment History</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/faultByModelSummary">Summary By Model</Link>
          </h3>
          <h3><span className="bullet me-5"></span><Link to="/report/FaultByCustodianSummary">Summary By
            Custodian</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/sumBydownType">Summary By Down Type</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/FaultByCustodianDetail">Fault by Custodian
            Details</Link>
          </h3>

        </div>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            margin: '0px 10px 20px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Schedule</h2>
          <hr></hr>
          <h3><span className="bullet me-5"></span><Link to="#">Details</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/schedules/ScheduleByModelSummaryReport">Summary By
            Model</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/schedules/ScheduleByLocationReport">Summary By
            Location</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/schedules/ScheduleByServiceTypeReport">Summary By
            Service Type</Link></h3>
        </div>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            margin: '0px 10px 20px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Changeout</h2>
          <hr></hr>
          {/*<h1>No Report</h1>*/}
          <h3><span className="bullet me-5"></span><Link to="/report/changeout/ChangeOutByModel">Model</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="#">Summary</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="#">Equipment</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/changeout/ChangeoutByRefillTypeModel">
            By Refill Type Model
          </Link></h3>
        </div>
        <div
          style={{
            width: "310px",
            backgroundColor: 'white',
            padding: '20px',
            margin: '0px 10px 20px 10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{color: "GrayText"}}>Metering</h2>
          <hr></hr>
          {/*<h1>No Report</h1>*/}
          <h3><span className="bullet me-5"></span><Link to="/report/metering/MeteringByModelDetail">Model</Link></h3>
          <h3><span className="bullet me-5"></span><Link to="/report/metering/MeteringByModelSummary">Summary</Link>
          </h3>
          <h3><span className="bullet me-5"></span><Link to="/report/metering/MeteringByModelDetail">Equipment</Link>
          </h3>
          <h3><span className="bullet me-5"></span><Link to="/report/meteringbymodelClassSummary">Model Class
            Summary</Link></h3>
        </div>
      </div>
    </div>
  )
}

export {AllReportPage}
