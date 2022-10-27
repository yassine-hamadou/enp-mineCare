/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItemWithSub
        to='#'
        title='Entries'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='entries/schedule' hasBullet={true} title='Equipment Schedule' />
        <AsideMenuItem to='entries/fault' hasBullet={true} title='Fault' />
        <AsideMenuItem to='entries/resolution' hasBullet={true} title='Resolution' />
        <AsideMenuItem to='entries/hours' hasBullet={true} title='Hours' />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='#'
        title='Report'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen028.svg'
      >
        <AsideMenuItem to='report/downtime' title='Down Time' hasBullet={true} />
        <AsideMenuItem to='report/daily-kpi' title='Daily KPI' hasBullet={true} />
        <AsideMenuItem to='report/weekly-schedule' title='Weekly Schedule' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='#'
        title='Setup'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/coding/cod009.svg'
      >
        <AsideMenuItem to='/setup/fleet' title='Fleet' hasBullet={true} />
        <AsideMenuItem to='/setup/down-type' title='Down Type' hasBullet={true} />
        <AsideMenuItem to='/setup/custodian' title='Custodian' hasBullet={true} />
        <AsideMenuItem to='/setup/location' title='Location' hasBullet={true} />
        <AsideMenuItem to='/setup/work-type' title='Work Type' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <AsideMenuItem to='#' title='Configuration' icon='/media/icons/duotune/general/gen055.svg' />
    </>
  )
}
