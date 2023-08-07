/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import { RequestPassword } from './components/NewPassword'

const AuthLayout = () => {
  const location = useLocation()
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      // style={{
      //   backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      // }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <h1 className='mb-12'>Sign in to Equipment Service and Maintenance</h1>

        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet/>
        </div>
      </div>

    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout/>}>
      <Route path='login' element={<Login/>}/>
      <Route path='registration' element={<Registration/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='request-password/:id' element={<RequestPassword />} />
      <Route index element={<Login/>}/>
    </Route>
  </Routes>
)

export {AuthPage}
