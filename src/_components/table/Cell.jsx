import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'

function Cell(props) {
  const { column } = props
  console.log(column)

  return <Table.Cell {...props} />
}

export default Cell
