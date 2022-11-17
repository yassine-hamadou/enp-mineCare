/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLocation} from 'react-router'

export function AsideMenuMain() {
  const intl = useIntl()
  const {pathname} = useLocation()
  const isDashboardActive = checkIsActive(pathname, '/dashboard')

  return (
    <>
      <div className='menu-item'>
        <Link
          className={clsx('menu-link without-sub ml0', {active: isDashboardActive})}
          to='/dashboard'
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/art/art002.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</span>
        </Link>
      </div>

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
        <AsideMenuItem to='/setup/lube' title='Lube' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='#'
        title='Report'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen028.svg'
      >
        <AsideMenuItem
          to='app/production/components/report/daily'
          title='Daily KPI'
          hasBullet={true}
        />
        <AsideMenuItem
          to='app/production/components/report/downtime'
          title='Down Time'
          hasBullet={true}
        />
        <AsideMenuItem
          to='app/production/components/report/weekly'
          title='Weekly Schedule'
          hasBullet={true}
        />
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
        <AsideMenuItem to='/checkListForm/tabs' title='Tabs' hasBullet={true} />
        <AsideMenuItemWithSub
        to='#'
        title='Lube'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen028.svg'
        >
          <AsideMenuItem to='/setup/compartment' title='Compartment'></AsideMenuItem>
          <AsideMenuItem to='/setup/refill' title='RefillType'></AsideMenuItem>
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>

      <div className='menu-item'>
        <Link
          className={clsx('menu-link without-sub ml0', {active: isDashboardActive})}
          to='/dashboard'
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Configuration</span>
        </Link>
      </div>
    </>
  )
}
