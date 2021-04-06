import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  SelectionState,
  PagingState,
  CustomPaging,
  IntegratedSelection,
  SortingState,
  SearchState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  Toolbar,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui'

import { useHistory, useLocation } from 'react-router-dom'
import { parseQuery, queryWith } from '@/helpers/api'
import { useDebounce } from '@/hooks/useDebounce'
import Cell, { CellTooltip } from './Cell'
import TableRow from './TableRow'

const getRowId = row => row.id

export default props => {
  const { rows, columns, totalCount, styleColumn, selection, setSelection, sorting, loading, loadData } = props
  const location = useLocation()
  const history = useHistory()
  const params = parseQuery(location.search)

  const [pageSizes] = useState([5, 10, 20, 50, 100])
  const [searchValue, setSearchState] = useState(params.q)
  const debouncedValue = useDebounce(searchValue, 700)

  useEffect(() => {
    loadData(params)
  }, [location.search])

  useEffect(() => {
    params.q = debouncedValue
    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }, [debouncedValue])

  const handlePageSizeChange = limit => {
    params.limit = limit
    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }

  const handlePageChange = page => {
    params.page = page + 1
    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <SortingState sorting={sorting || []} defaultSorting={[{ columnName: 'updatedAt', direction: 'desc' }]} />
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <PagingState
          defaultCurrentPage={0}
          pageSize={+params.limit}
          currentPage={+params.page - 1}
          onPageSizeChange={handlePageSizeChange}
          onCurrentPageChange={handlePageChange}
        />

        <CustomPaging totalCount={totalCount} />
        <IntegratedSorting />
        <IntegratedSelection />
        {/* <IntegratedFiltering /> */}
        {/* <DateTypeProvider for={['createdAt', 'updatedAt']} /> */}
        <CellTooltip columns={columns} />

        <Table cellComponent={Cell} rowComponent={TableRow} columnExtensions={styleColumn} />
        <TableHeaderRow showSortingControls />

        <Toolbar />
        <SearchPanel />
        <TableSelection showSelectAll />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
      {loading && <div>loading</div>}
    </Paper>
  )
}
