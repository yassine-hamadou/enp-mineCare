import {useQuery} from 'react-query'
import {FaultEditModalForm} from './FaultEditModalForm'
import {useListView} from '../core/ListViewProvider'
import {getFaultById} from '../core/_requests'
import {isNotEmpty, QUERIES} from '../../../../../../../_metronic/helpers'
import {number, string} from 'yup'
import {faultTwoStepsCell} from '../table/columns/FaultTwoStepsCell'

const FaultEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: fault,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-fault-${itemIdForUpdate}`,
    () => {
      return getFaultById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return (
      <FaultEditModalForm
        isFaultLoading={isLoading}
        fault={{
          txfault: '',
          audtdate: 0,
          audttime: 0,
          audtuser: '',
          audtorg: '',
          txdesc: '',
          txcomment: '',
          swwarn: 0,
          swusepic: 0,
          txpicfile: '',
          txmodlgrp: '',
          swfailure: 0,
          txfaultgrp: '',
          nmstat: 0,
        }}
      />
    )
  }

  if (!isLoading && !error && fault) {
    return <FaultEditModalForm isFaultLoading={isLoading} fault={fault} />
  }

  return null
}

export {FaultEditModalFormWrapper}
