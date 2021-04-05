import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'

function TableRow({ row, ...restProps }) {
  return (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => console.log(row)}
      style={{
        cursor: 'pointer',
      }}
    />
  )
}

export default TableRow
