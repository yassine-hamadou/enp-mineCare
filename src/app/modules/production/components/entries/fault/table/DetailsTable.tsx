import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {faultsColumns} from './columns/_columns'
import {Fault} from '../core/_models'
import {FaultsListLoading} from '../components/loading/FaultsListLoading'
import {FaultsListPagination} from '../components/pagination/FaultsListPagination'
import {KTCardBody} from '../../../../../../../_metronic/helpers'

const DetailsTable = () => {
  const faults = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = [
    {
      txfault: '1000HRS     ',
      audtdate: 20220721,
      audttime: 18031582,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: '1000 HOUR SERVICE                                           ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: '2000HR      ',
      audtdate: 20220721,
      audttime: 18033633,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: '2000 HOUR SERVICE                                           ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: '250HR       ',
      audtdate: 20220721,
      audttime: 18035533,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: '250 HOUR SERVICE                                            ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: '500HR       ',
      audtdate: 20220721,
      audttime: 18041078,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: '500 HOURS SERVICE                                           ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'BOOM        ',
      audtdate: 20220721,
      audttime: 18042597,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'BOOM                                                        ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'BRAKES      ',
      audtdate: 20220721,
      audttime: 18044209,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'BRAKES                                                      ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'BUCKET      ',
      audtdate: 20220721,
      audttime: 18045833,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'BUCKETS                                                     ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'COMPLETE    ',
      audtdate: 20220721,
      audttime: 18051315,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'COMPLETE OVERHAUL                                           ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'CYLINBOOM   ',
      audtdate: 20220721,
      audttime: 18053619,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'CYLINDER - BOOM                                             ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'CYLINLIFT   ',
      audtdate: 20220721,
      audttime: 18055142,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'CYLINDER - LIFT                                             ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'CYLINSTEER  ',
      audtdate: 20220721,
      audttime: 18060790,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'CYLINDER - STEERING                                         ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'CYLINSUS    ',
      audtdate: 20220721,
      audttime: 18062384,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'CYLINDER - SUSPENSION                                       ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'DIFFERENTIAL',
      audtdate: 20220721,
      audttime: 18064444,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'DIFFERENTIAL                                                ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'ELECTRICALS ',
      audtdate: 20220721,
      audttime: 18070438,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'ELECTRICALS & AIRCON                                        ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'ENGINES     ',
      audtdate: 20220721,
      audttime: 18071873,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'ENGINES                                                     ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'FINALDRIVE  ',
      audtdate: 20220721,
      audttime: 18073712,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'FINAL DRIVES & HUBS                                         ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'FRAMES      ',
      audtdate: 20220721,
      audttime: 18081550,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'FRAMES & STRUCTURAL                                         ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'GEARS       ',
      audtdate: 20220721,
      audttime: 18083328,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'GEARS & TRANSMISSION                                        ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'GET         ',
      audtdate: 20220721,
      audttime: 18084555,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'GET                                                         ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'MIDLIFE     ',
      audtdate: 20220721,
      audttime: 18085969,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'MIDLIFE                                                     ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'PUMPS       ',
      audtdate: 20220721,
      audttime: 18091587,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'PUMPS                                                       ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'RADIATOR    ',
      audtdate: 20220721,
      audttime: 18093441,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'RADIATOR                                                    ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'TRUCKS      ',
      audtdate: 20220721,
      audttime: 18095270,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'TRACKS & UNDERCARRIAGE                                      ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
    {
      txfault: 'TYRES       ',
      audtdate: 20220721,
      audttime: 18100664,
      audtuser: 'ADMIN   ',
      audtorg: 'TARKWA',
      txdesc: 'TYRES                                                       ',
      txcomment:
        '                                                                                                                                                                                                                                                          ',
      swwarn: 0,
      swusepic: 0,
      txpicfile: '                              ',
      txmodlgrp: '      ',
      swfailure: 0,
      txfaultgrp: '      ',
      nmstat: 0,
    },
  ]
  // useMemo(() => faults, [faults])
  const columns = useMemo(() => faultsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_faults'
          className='table align-middle border table-striped gy-1 gs-0 table-rounded table-hover'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start fw-bold fs-7'>
              {headers.map((column: ColumnInstance<Fault>) => (
                <CustomHeaderColumn column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-black' {...getTableBodyProps()}>
            {rows.length > 0 ? ( // TODO: change to < 0
              rows.map((row: Row<Fault>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <FaultsListPagination />
      {isLoading && <FaultsListLoading />}
    </KTCardBody>
  )
}

export {DetailsTable}
