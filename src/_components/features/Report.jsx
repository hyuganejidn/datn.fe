import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const reports = [
  { value: '1', label: 'Nhảm nhí hoặc không đáng tin' },
  { value: '2', label: 'Spam hoặc quảng cáo' },
  { value: '3', label: 'Vi phạm nội quy' },
  { value: '4', label: 'Tuyên truyền xấu' },
  { value: '5', label: 'Chửi bới hoặc xúc phạm' },
  { value: '6', label: 'Khiêu dâm hoặc bạo lực' },
  { value: '7', label: 'Lý do khác' },
]

function Report() {
  const [value, setValue] = React.useState(0)

  const handleChange = event => {
    setValue(event.target.value)
  }
  return (
    <div className="py-3 px-5">
      <div>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            {reports.map((report, i) => (
              <FormControlLabel key={i} value={report.value} control={<Radio />} label={report.label} />
            ))}
          </RadioGroup>
        </FormControl>
        {/* <div className="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer">
              <i className="far fa-circle" />
              <div className="ml-3">Nhảm nhí hoặc không đáng tin</div>
            </div>
          */}
        {/* <div className="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer">
          <i className="far fa-circle" />
          <div className="ml-3">Lý do khác</div>
        </div> */}
        <div className="ml-6">
          <textarea
            className="w-full p-1 border border-gray-400 rounded outline-none"
            disabled
            placeholder="Vui lòng nhập lý do báo xấu..."
            defaultValue=""
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {/* <button className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3">
              Hủy
            </button> */}
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none font-sans"
        >
          Báo xấu
        </button>
      </div>
    </div>
  )
}

export default Report
