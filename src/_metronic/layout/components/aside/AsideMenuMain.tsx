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
            <KTSVG path='/media/icons/duotune/art/art002.svg' className='svg-icon-2'/>
          </span>
          <span className='menu-title'>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</span>
        </Link>
      </div>
      <AsideMenuItem to={'equipment-register'} title={'Equipment Register'} fontIcon='bi-archive'
                     icon='/media/icons/duotune/general/gen012.svg'/>
      <AsideMenuItemWithSub
        to='#'
        title='Entries'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='entries/schedule' hasBullet={true} title='Equipment Schedule'/>
        <AsideMenuItem to='entries/fault' hasBullet={true} title='Fault'/>
        <AsideMenuItem to='entries/hours' hasBullet={true} title='Hours'/>
        <AsideMenuItemWithSub to='#' title={'Changeout'} hasBullet={true}>
          <AsideMenuItem to='/entries/changeout/lube' title='Lube' hasBullet={true}/>
          <AsideMenuItem to='/entries/changeout/ground-engaging-tools' title='GET' hasBullet={true}/>
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      {/*<AsideMenuItemWithSub*/}
      {/*  to='#'*/}
      {/*  title='Report'*/}
      {/*  fontIcon='bi-archive'*/}
      {/*  icon='/media/icons/duotune/general/gen028.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItemWithSub to='#' title='Fault' hasBullet={true}>*/}
      {/*      */}
      {/*      <AsideMenuItem*/}
      {/*        to='/report/fault-summary-report'*/}
      {/*        title='Summary'*/}
      {/*        hasBullet={true}*/}
      {/*      />*/}
      {/*      <AsideMenuItem*/}
      {/*        to='/report/fleet-history-report'*/}
      {/*        title='Fleet History'*/}
      {/*        hasBullet={true}*/}
      {/*      />*/}
      {/*      <AsideMenuItem*/}
      {/*        to='/report/solved-report'*/}
      {/*        title='Solved'*/}
      {/*        hasBullet={true}*/}
      {/*      />*/}
      {/*      <AsideMenuItem*/}
      {/*        to='/report/pending-report'*/}
      {/*        title='Pending'*/}
      {/*        hasBullet={true}*/}
      {/*      />*/}
      {/*      */}
      {/*    </AsideMenuItemWithSub>*/}
      {/*  <AsideMenuItem*/}
      {/*    to='/report/'*/}
      {/*    title='Fleet Schedule'*/}
      {/*    hasBullet={true}*/}
      {/*  />*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/report/daily-hme'*/}
      {/*      title='Daily HME'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*  <AsideMenuItem*/}
      {/*      to='/report/member-list'*/}
      {/*      title='Member List'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/report/CarperManufacturerReport'*/}
      {/*      title='Number Of Carper Manufacturer'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*   */}
      {/*</AsideMenuItemWithSub>*/}
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
          <AsideMenuItem to='/setup/equipment/model-class' title='Model Class' hasBullet={true}/>
          <AsideMenuItem to='/setup/equipment/manufacturer' title='Manufacturer' hasBullet={true}/>
          <AsideMenuItem to='/setup/category' title='Category' hasBullet={true}/>
        </AsideMenuItemWithSub>
        {/*<AsideMenuItem to='/setup/fleet' title='Fleet' hasBullet={true} />*/}
        <AsideMenuItem to='/setup/down-type' title='Down Type' hasBullet={true}/>
        <AsideMenuItem to='/setup/custodian' title='Custodian' hasBullet={true}/>
        <AsideMenuItem to='/setup/location' title='Location' hasBullet={true}/>
        <AsideMenuItem to='/setup/work-type' title='Service Type' hasBullet={true}/>
        {/*<AsideMenuItem to='/setup/category' title='Category' hasBullet={true}/>*/}
        <AsideMenuItemWithSub to='/setup/lube' title='Lube' hasBullet={true}>
          <AsideMenuItem to='/setup/compartment' title='Compartment' hasBullet={true}/>
          <AsideMenuItem to='/setup/lube-brand' title='Brand' hasBullet={true}/>
          <AsideMenuItem to='/setup/lube-config' title='Lube Config' hasBullet={true}/>
          <AsideMenuItem to='/setup/refill' title='Refill Type' hasBullet={true}/>
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
            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-2'/>
          </span>
          <span className='menu-title'>Configuration</span>
        </Link>
      </div>
    </>
  )
}
