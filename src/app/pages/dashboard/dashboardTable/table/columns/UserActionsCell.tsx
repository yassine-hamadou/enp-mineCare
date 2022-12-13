/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  // @ts-ignore
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <div className='d-flex justify-content-end flex-shrink-0' data-kt-menu='true'>
        <a href='#' className='btn btn-icon btn-light-primary btn-active-color-white btn-sm me-1'>
          <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
        </a>
        <a
          href='#'
          className='btn btn-icon btn-light-warning btn-active-color-white btn-sm me-1'
          onClick={openEditModal}
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
        <a
          href='#'
          data-kt-users-table-filter='delete_row'
          className='btn btn-icon btn-light-danger btn-active-color-white btn-sm'
          onClick={async () => await deleteItem.mutateAsync()}
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a>
      </div>
    </>
  )
}

export {UserActionsCell}
