/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Fault} from '../../core/_models'
import {toAbsoluteUrl} from '../../../../../../../../_metronic/helpers'

type Props = {
  Fault: Fault
}

const FaultInfoCell: FC<Props> = ({Fault}) => (
  <div className='d-flex align-items-center'>
    faultinfocell
    {/* begin:: Avatar */}
    {/*<div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>*/}
    {/*  <a href='#'>*/}
    {/*    {Fault.avatar ? (*/}
    {/*      <div className='symbol-label'>*/}
    {/*        <img src={toAbsoluteUrl(`/media/${Fault.avatar}`)} alt={Fault.name} className='w-100' />*/}
    {/*      </div>*/}
    {/*    ) : (*/}
    {/*      <div*/}
    {/*        className={clsx(*/}
    {/*          'symbol-label fs-3',*/}
    {/*          `bg-light-${Fault.initials?.state}`,*/}
    {/*          `text-${Fault.initials?.state}`*/}
    {/*        )}*/}
    {/*      >*/}
    {/*        {Fault.initials?.label}*/}
    {/*      </div>*/}
    {/*    )}*/}
    {/*  </a>*/}
    {/*</div>*/}
    {/*<div className='d-flex flex-column'>*/}
    {/*  <a href='#' className='text-gray-800 text-hover-primary mb-1'>*/}
    {/*    {Fault.name}*/}
    {/*  </a>*/}
    {/*  <span>{Fault.email}</span>*/}
    {/*</div>*/}
  </div>
)

export {FaultInfoCell}
