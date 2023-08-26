import DevexpressDashboardComponent from "../DevexpressDashboardComponent";

const DashboardTable = () => {
    return (
      <>
          <div className='row gy-5 g-xl-8'>
              <div className='col-xl-6'>
                  <DevexpressDashboardComponent dashboardId={'dashboard4'}/>
              </div>
              <div className='col-xl-6'>
                  <DevexpressDashboardComponent dashboardId={'faultCount'}/>
              </div>
          </div>
      </>
    )
}

export default DashboardTable
