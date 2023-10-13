import {Button, message, Modal} from 'antd'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useQuery} from 'react-query'
import {fetchUsers, USER_URL} from '../../../urls'

const ForgotPasswordModal = () => {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {register, reset, handleSubmit} = useForm()
  const secretKey = 'philkey'

  const {data: users} = useQuery('users', fetchUsers, {cacheTime: 5000})

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    reset()
    setIsModalOpen(false)
  }

  const OnSUbmit = handleSubmit(async (values: any) => {
    setLoading(true)
    // find the user with the email
    const user = users?.data?.find((user: any) => user.email === values.email)

    if (values.email === '' || values.email === undefined) {
      message.warning('Enter an email')
      return
    }

    if (!user) {
      message.warning(`User with this email: ${values.email}  does not exist`)
      return
    }

    // encrypt user id

    const link = `${USER_URL}/Users/PasswordRequest`
    const data = {
      email: values.email,
      formLink: `${window.location.origin}/esms/auth/request-password/${user.id}`,
      username: user.username,
      employeeId: user.employeeId,
    }

    console.log('data', data)

    try {
      const response = axios.post(link, data)
      message.success(`A link has been sent to your email ${data.email}`)
      setLoading(false)
      setIsModalOpen(false)
    } catch (error) {
      message.error('Error changing password')
    }
  })

  return (
    <>
      <a onClick={showModal} style={{cursor: 'pointer'}} className='menu-link px-5'>
        Forgot Password?
      </a>
      <Modal
        title='Request password reset'
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
          <p>Enter your email to reset your password</p>
          <hr></hr>
          <div style={{padding: '20px 20px 20px 20px'}}>
            <div className=' mb-7'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                {...register('email')}
                className='form-control form-control-solid'
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ForgotPasswordModal
