// @ts-nocheck
import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {User} from '../../core/_models'

type Props = {
  row: Row<User>
}

const CustomRow: FC<Props> = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx('text-start min-w-100px border-end')}
        >
          {/*{'text-start min-w-100px': cell.column.id === 'actions'} // if i want to apply a custom class to cell*/}
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}
