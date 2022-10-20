/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {User} from '../../core/_models'
import {toAbsoluteUrl} from '../../../../../../../../_metronic/helpers'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {user.title ? (
          <div className='symbol-label'>
            dfdf
            {/* <img src={toAbsoluteUrl(`/media/${user.title}`)} alt={user.title} className='w-100' /> */}
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${user.title}`,
              `text-${user.title}`
            )}
          >
            {user.title}
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.title}
      </a>
      <span>{user.title}</span>
    </div>
  </div>
)

export {UserInfoCell}
