/* eslint-disable react/jsx-no-target-blank */
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLocation} from 'react-router'

export function AsideMenuMain() {
  const {pathname} = useLocation()
  const isDashboardActive = checkIsActive(pathname, '/dashboard')

  return (
    <>
      <div className='menu-item'>
        <Link
          className={clsx('menu-link without-sub', {active: isDashboardActive})}
          to='/dashboard'
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/art/art002.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>{'Dashboard'}</span>
        </Link>
      </div>
      <AsideMenuItem
        to={'equipment-register'}
        title={'Equipment Register'}
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen012.svg'
      />
      <AsideMenuItemWithSub
        to='#'
        title='Entries'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='entries/schedule' hasBullet={true} title='Equipment Schedule' />
        <AsideMenuItem to='entries/fault' hasBullet={true} title='Faults' />
        <AsideMenuItem to='entries/hours' hasBullet={true} title='Hours' />
        <AsideMenuItem to='entries/backlog' hasBullet={true} title='Backlog' />
        <AsideMenuItem to='entries/work-order/all' hasBullet={true} title='Work Order' />
        <AsideMenuItem
          to='/entries/changeout/lube-dispensing'
          title='Lube Dispensing'
          hasBullet={true}
        />
        <AsideMenuItemWithSub to='#' title={'Changeout'} hasBullet={true}>
          <AsideMenuItem
            to='/entries/changeout/lube'
            title='Scheduled Oil Sampling'
            hasBullet={true}
          />

          <AsideMenuItem
            to='/entries/changeout/ground-engaging-tools'
            title='GET'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
        <AsideMenuItem to={'amendments'} title={'Amendments'} hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/report/all'
        title='Report'
        icon='/media/icons/duotune/general/gen028.svg'
      />
      <AsideMenuItemWithSub
        to='#'
        title='Setup'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/coding/cod009.svg'
      >
        <AsideMenuItemWithSub to='#' title='Equipment' hasBullet={true}>
          <AsideMenuItem
            to='/setup/equipment/equipment-type'
            title='Equipment Type'
            hasBullet={true}
          />
          <AsideMenuItem to='/setup/equipment/manufacturer' title='Manufacturer' hasBullet={true} />
          <AsideMenuItem to='/setup/category' title='Category' hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItem to='/setup/system' title='System' hasBullet={true} />
        <AsideMenuItem to='/setup/down-status' title='Down Status' hasBullet={true} />
        <AsideMenuItem to='/setup/custodian' title='Custodian' hasBullet={true} />
        <AsideMenuItem to='/setup/location' title='Location' hasBullet={true} />
        <AsideMenuItem to='/setup/work-type' title='Service Type' hasBullet={true} />
        <AsideMenuItemWithSub to='/setup/lube' title='Lube Dispensing' hasBullet={true}>
          <AsideMenuItem to='/setup/lube-type' title='Lube Type' hasBullet={true} />
          {/*<AsideMenuItem to='/setup/lube-source' title='Source' hasBullet={true} />*/}
          <AsideMenuItem to='/setup/lube-reason' title='Reason' hasBullet={true} />
          <AsideMenuItem to='/setup/compartment' title='Compartment' hasBullet={true} />
          {/*<AsideMenuItem to='/setup/lube-brand' title='Brand' hasBullet={true} />*/}
          {/*<AsideMenuItem to='/setup/lube-config' title='Lube Config' hasBullet={true} />*/}
          {/*<AsideMenuItem to='/setup/refill' title='Refill Type' hasBullet={true} />*/}
        </AsideMenuItemWithSub>
        <AsideMenuItem to='/setup/backlogs/source' title='Source' hasBullet={true} />

        <AsideMenuItemWithSub to='#' title='Backlog' hasBullet={true}>
          <AsideMenuItem to='/setup/backlogs/priority' title='Priority' hasBullet={true} />
          <AsideMenuItem to='/setup/backlogs/status' title='Status' hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub to='#' title='Work Order' hasBullet={true}>
          <AsideMenuItem to='/setup/work-order/type' title='Type' hasBullet={true} />
          <AsideMenuItem to='/setup/work-order/category' title='Category' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='#'
        title='Configuration'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen055.svg'
      >
        <AsideMenuItem to='/configuration/data-integrity' title='Data Integrity' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
