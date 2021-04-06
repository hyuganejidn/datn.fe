import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import DataTable from 'Templates/table'

import * as types from '../store/action_types'
import { makeGetLoading, makeGetReports, makeGetTotal } from '../store/selector'

const columns = [
  { name: 'reason', title: 'Lý do' },
  { name: '_type', title: 'Loại' },
  { name: 'createdAt', title: 'Ngày report' },
  { name: 'author', title: 'Người report' },
]

function Reports() {
  const dispatch = useDispatch()

  const reports = makeGetReports()
  const loading = makeGetLoading()
  const total = makeGetTotal()
  const [selection, setSelection] = useState([])

  const fetchData = params => dispatch({ type: types.S_FETCH_REPORTS, payload: params })

  console.log(selection)

  return (
    <div>
      <DataTable
        rows={reports}
        columns={columns}
        loading={loading}
        totalCount={total}
        selection={selection}
        loadData={fetchData}
        setSelection={setSelection}
      />
    </div>
  )
}

export default Reports
