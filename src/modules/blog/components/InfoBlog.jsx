import { formatDate } from '@/helpers/common'
import React from 'react'

function InfoBlog({ blog }) {
  return (
    <div className="py-3 px-5 font-light">
      <div>Ngày tạo: {formatDate(blog.createdAt)}</div>
      <div className="mt-2">Bài viết: {blog.postNum}</div>
      <div className="mt-5">Liên hệ</div>
      <div className="h-px bg-gray-300" />
      <div className="mt-3">
        <i className="fas fa-envelope text-red-400" />
        <span className="ml-3" />
      </div>
      <div className="mt-3">
        <i className="fab fa-facebook-square text-blue-700" />
        <span className="ml-3" />
      </div>
      <div className="mt-3">
        <i className="fab fa-twitter text-blue-400" />
        <span className="ml-3" />
      </div>
    </div>
  )
}

export default InfoBlog
