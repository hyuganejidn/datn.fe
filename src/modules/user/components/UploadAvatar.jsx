import React from 'react'

function UploadAvatar() {
  return (
    <div className="py-5 px-5">
      <div
        className="relative flex items-center mt-3 rounded-sm border border-gray-400 border-dashed"
        id="dragImageToUpload"
        style={{ minHeight: 160 }}
      >
        <input
          type="file"
          id="filePhoto"
          title="Kéo thả hình ảnh vào đây"
          className="absolute bg-gray-300 w-full h-full opacity-0"
        />
        <div className="flex items-center mx-auto">
          <div className="text-gray-600 text-sm">Kéo thả hình ảnh vào đây hoặc &nbsp;</div>
          <button
            type="button"
            className=" px-2 py-1 border focus:outline-none border-green-500 text-green-600 rounded-lg z-30 hover:bg-gray-200"
          >
            Chọn ảnh
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3"
        >
          Hủy
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none font-sans"
        >
          Lưu
        </button>
      </div>
    </div>
  )
}

export default UploadAvatar
