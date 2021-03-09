import { topics } from '@/_constants/data'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import { FastField, Formik, Form } from 'formik'
import { useLocation } from 'react-router-dom'
import { InputEmoji } from 'Templates/form'
import queryString from 'query-string'

import { getImages, replaceSrcImg } from '@/helpers/common'
import http from '@/helpers/axios'
import SelectTopic from 'Templates/form/SelectTopic'
import { PostAPI } from '@/services'

const S_Editor = styled(ReactQuill)`
  .ql-editor {
    min-height: 200px;
  }
`
const S_InputTitle = styled(FastField)`
  display: flex;
  position: relative;
  border-width: 1px;
  padding: 8px;
  padding-left: 10px;
  background: #fff;
  .textarea {
    outline: none;
    font-family: 'Roboto';
    border: none;
    overflow: hidden;
    text-align: justify;
  }
  .emoji {
    height: 18px;
    margin-left: 5px;
    text-align: end;
    position: relative;
    cursor: pointer;
  }
`

const formats = [
  'bold',
  'italic',
  'underline',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
]
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
  history: {
    delay: 500,
    maxStack: 500,
  },
}

function PostAdd() {
  const location = useLocation()
  const { classify } = queryString.parse(location.search)
  const [content, setContent] = useState('')
  const [topicSelected, setTopicSelected] = useState({})

  const handleChange = value => {
    setContent(value)
  }

  const handleChangeSelect = value => {
    setTopicSelected(value)
  }

  const saveImages = async _content => {
    const imagesContent = getImages(_content)

    const formData = new FormData()
    imagesContent.forEach(img => {
      formData.append('imgs', img)
    })
    const data = await http.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  const replaceImgSrc = (imgs, _content) => {
    if (imgs.length > 0) {
      const doc = replaceSrcImg(_content, imgs)
      return doc.firstChild.outerHTML
    }
    return _content
  }

  const onSubmitPost = async values => {
    const imgs = await saveImages(content)
    // console.log()
    const contentNew = replaceImgSrc(imgs, content)
    const data = {
      classify,
      title: values.title,
      content: contentNew,
      avatar: imgs[0] ? imgs[0].path : '',
    }
    classify === 'forum'
      ? (data.topic = topicSelected.slug)
      : (data.blog = '123')

    const post = await PostAPI.create(data)
    console.log(post)
  }

  return (
    <div className="m-auto md:max-w-3xl">
      <Formik
        initialValues={{ title: '' }}
        onSubmit={(values, action) => onSubmitPost(values, action)}
      >
        {() => (
          <Form>
            <SelectTopic
              topics={topics}
              topicSelected={topicSelected}
              onChange={handleChangeSelect}
            />

            <div className="rounded-lg px-2 md:px-4 mt-2 p-2 border border-gray-200 bg-white rounded-lg border">
              <S_InputTitle
                name="title"
                component={InputEmoji}
                placeholder="Tiêu đề"
              />

              <S_Editor
                value={content}
                modules={modules}
                formats={formats}
                onChange={handleChange}
              >
                {/* <S_EditingArea /> */}
              </S_Editor>
              <div className="flex justify-between">
                <div className="flex mt-2">
                  <button
                    type="button"
                    className="mr-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1 px-2 rounded focus:outline-none"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-sm font-medium text-white py-1 px-2 rounded focus:outline-none"
                  >
                    Đăng bài diễn đàn
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PostAdd
