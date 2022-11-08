/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong ID')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('ID is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  option: Yup.string().required('Company is required'),
})

const initialValues = {
  email: 'User ID',
  password: 'admin',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.email, values.password)
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/*/!* begin::Heading *!/*/}
      {/*<div className='text-center mb-10'>*/}
      {/*  <h1 className='text-dark mb-3'>Sign In to Metronic</h1>*/}
      {/*  <div className='text-gray-400 fw-bold fs-4'>*/}
      {/*    New Here?{' '}*/}
      {/*    <Link to='/auth/registration' className='link-primary fw-bolder'>*/}
      {/*      Create an Account*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!* begin::Heading *!/*/}

      {formik.status ?
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
        : null}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>USER ID</label>
        <input
          placeholder='User ID'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='text'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-10'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>Company:</label>
          <div>
            <select
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              defaultValue={''}
              {...formik.getFieldProps('option')}
            >
              <option></option>
              <option value='damangDivision'>Engineers and Planners - DAMANG DIVISION</option>
              <option value='dzataDivision'>Engineers and Planners - DZATA DIVISION</option>
              <option value='mpohorDivision'>Engineers and Planners - MPOHOR DIVISION</option>
              <option value='headOffice'>Engineers and Planners - HEAD OFFICE</option>
              <option value='salagaDivision'>Engineers and Planners - SALAGA DIVISION</option>
              <option value='tarkwaDivision'>Engineers and Planners - TARKWA DIVISION</option>
            </select>
          </div>
        </div>



      </div>

      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
        {/*<div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>*/}
        {/* end::Separator */}

        {/*/!* begin::Google link *!/*/}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>*/}
        {/*  <img*/}
        {/*    alt='Logo'*/}
        {/*    src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}*/}
        {/*    className='h-20px me-3'*/}
        {/*  />*/}
        {/*  Continue with Google*/}
        {/*</a>*/}
        {/*/!* end::Google link *!/*/}

        {/*/!* begin::Google link *!/*/}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>*/}
        {/*  <img*/}
        {/*    alt='Logo'*/}
        {/*    src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}*/}
        {/*    className='h-20px me-3'*/}
        {/*  />*/}
        {/*  Continue with Facebook*/}
        {/*</a>*/}
        {/*/!* end::Google link *!/*/}

        {/*/!* begin::Google link *!/*/}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>*/}
        {/*  <img*/}
        {/*    alt='Logo'*/}
        {/*    src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}*/}
        {/*    className='h-20px me-3'*/}
        {/*  />*/}
        {/*  Continue with Apple*/}
        {/*</a>*/}
        {/*/!* end::Google link *!/*/}
      </div>
       {/*end::Action */}
    </form>
  )
}
