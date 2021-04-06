import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import Tooltip from '@material-ui/core/Tooltip'

function Cell(props) {
  // const { column } = props
  // console.log(column)

  return <Table.Cell {...props} />
}

export default Cell

const TooltipFormatter = ({ value }) => (
  <Tooltip title={<span>{value}</span>}>
    <span>{value}</span>
  </Tooltip>
)

const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1')

export const DateTypeProvider = props => <DataTypeProvider formatterComponent={DateFormatter} {...props} />

export const CellTooltip = ({ columns, ...rest }) => (
  <DataTypeProvider for={columns.map(({ name }) => name)} formatterComponent={TooltipFormatter} {...rest} />
)
