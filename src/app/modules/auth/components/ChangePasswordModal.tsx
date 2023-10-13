import {Button, message, Modal} from 'antd'
import {useState} from 'react'
import {useAuth} from '../core/Auth'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {USER_URL} from '../../../urls'

const ChangePasswordModal = () => {
  const [loading, setLoading] = useState(false)
  const tenantId = localStorage.getItem('tenant')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {register, reset, handleSubmit} = useForm()
  const {currentUser, logout} = useAuth()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    reset()
    setIsModalOpen(false)
  }

  const OnSUbmit = handleSubmit(async (values: any) => {
    setLoading(true)
    if (values.password !== values.confirmPassword) {
      message.warning('Password and Confirm Password must be the same')
      return
    }

    try {
      const response = axios.patch(
        `${USER_URL}/Users/${currentUser?.id}`,
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

      message.success('Password changed successfully')
      setLoading(false)
      setIsModalOpen(false)
      logout()
    } catch (error) {
      message.error('Error changing password')
    }
  })

  return (
    <>
      <a onClick={showModal} className='menu-link px-5'>
        Change Password
      </a>
      <Modal
        title='Change Password'
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' htmlType='submit' onClick={OnSUbmit}>
            Submit
          </Button>,
        ]}
      >
        <form onSubmit={OnSUbmit}>
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
        </form>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
