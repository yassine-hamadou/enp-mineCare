/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth() // <== this is a jwt token
  console.log('currentUser', currentUser)
  const jwt: any = currentUser
  const parts = jwt.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  const user = {
    first_name: payload.firstName,
    surname: payload.surname,
    email: payload.email,
  }
  
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')}/>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {user?.first_name} {user?.surname}
              {/*<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>*/}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      {/*<div className='menu-item px-5'>*/}
      {/*  <Link to={'/crafted/pages/profile'} className='menu-link px-5'>*/}
      {/*    My Profile*/}
      {/*  </Link>*/}
      {/*</div>*/}

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
