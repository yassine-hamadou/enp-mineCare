import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {message} from 'antd'
import {USER_URL} from '../../../urls'

export function RequestPassword() {
  const [loading, setLoading] = useState(false)
  const tenantId = localStorage.getItem('tenant')
  const {register, reset, handleSubmit} = useForm()
  const param = useParams()
  const navigate = useNavigate()

  // en

  console.log(param?.id)

  const OnSUbmit = handleSubmit(async (values: any) => {
    setLoading(true)
    if (values.password !== values.confirmPassword) {
      message.warning('Password and Confirm Password must be the same')
      return setLoading(false)
    }
    if (values.password === '' || values.confirmPassword === '') {
      message.warning('Enter a new password')
      return setLoading(false)
    }

    try {
      const response = axios.patch(
        `${USER_URL}/Users/${param.id}`,
        [
          {
            op: 'replace',
            path: '/password',
            value: values.password,
          },
        ],
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      )

      console.log('response', (await response).data)

      message.success('Password changed successfully')
      setLoading(false)
      reset()
      // redirect to login
      navigate('/auth/login', {replace: true})
    } catch (error) {
      message.error('Error reseting password')
      setLoading(false)
    }
  })

  return (
    <>
      <form onSubmit={OnSUbmit}>
        <p>
          <span style={{fontWeight: 'bold'}}>Recommended: </span>Your new password should include{' '}
          <br />
          (Uppercase, LowerCase, Numbers and Symbols)
        </p>
        <hr></hr>
        <div style={{padding: '20px 20px 20px 20px'}}>
          <div className=' mb-7'>
            <label htmlFor='password' className='form-label'>
              New Password
            </label>
            <input
              type='password'
              {...register('password')}
              className='form-control form-control-solid'
            />
          </div>
          <div className=' mb-7'>
            <label htmlFor='confirm-password' className='form-label'>
              Confirm Password{' '}
            </label>
            <input
              type='password'
              {...register('confirmPassword')}
              className='form-control form-control-solid'
            />
          </div>
        </div>
        <div className='text-center'>
          <button
            type='submit'
            // id='kt_sign_in_submit'
            onClick={OnSUbmit}
            className='btn btn-lg btn-primary w-100 mb-5'
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
