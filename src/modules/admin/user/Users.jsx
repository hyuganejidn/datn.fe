import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import DataTable from 'Templates/table'

import * as types from '../store/action_types'
import { makeGetLoading, makeGetTotal, makeGetUsers } from '../store/selector'

const columns = [
  { name: 'fullName', title: 'Họ tên' },
  { name: 'status', title: 'Loại' },
  { name: 'createdAt', title: 'Ngày tạo' },
]

function Users() {
  const dispatch = useDispatch()

  const users = makeGetUsers()
  const loading = makeGetLoading()
  const total = makeGetTotal()
  const [selection, setSelection] = useState([])

  const fetchData = params => dispatch({ type: types.S_FETCH_USERS, payload: params })

  // console.log(selection)

  return (
    <div>
      <DataTable
        rows={users}
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

export default Users
