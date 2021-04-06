import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

const type = { post: 'Bài viết', comment: 'Bình luận' }

export const makeGetReports = () => {
  const stateSelect = createSelector(
    state => state.admin.reports,
    reports =>
      reports.map(report => ({
        ...report,
        author: report.userReport.fullName,
        _type: type[report.type],
      }))
  )

  return useSelector(stateSelect)
}

export const makeGetLoading = () => {
  const stateSelect = createSelector(
    state => state.admin,
    admin => admin.loading
  )

  return useSelector(stateSelect)
}

export const makeGetTotal = () => {
  const stateSelect = createSelector(
    state => state.admin,
    admin => admin.total
  )

  return useSelector(stateSelect)
}
