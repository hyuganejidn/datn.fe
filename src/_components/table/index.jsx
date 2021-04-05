import React from 'react'
import Paper from '@material-ui/core/Paper'
import { SelectionState, PagingState, IntegratedPaging, IntegratedSelection } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow, TableSelection, PagingPanel } from '@devexpress/dx-react-grid-material-ui'
import Cell from './Cell'
import TableRow from './TableRow'

const getRowId = row => row.id

export default props => {
  const { rows, columns, styleColumn, selection, handleSelection } = props
  console.log(rows, columns)

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SelectionState selection={selection || []} onSelectionChange={handleSelection} />
        <PagingState defaultCurrentPage={0} pageSize={6} />
        <IntegratedSelection />
        <IntegratedPaging />
        <Table cellComponent={Cell} rowComponent={TableRow} columnExtensions={styleColumn} />
        <TableHeaderRow />
        <TableSelection showSelectAll />
        <PagingPanel />
      </Grid>
    </Paper>
  )
}
