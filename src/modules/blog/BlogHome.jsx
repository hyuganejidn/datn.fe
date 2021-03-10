import { BlogAPI } from '@/services'
import { AppBar, Box, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Blogs from './Blogs'
import PostsBlogs from './PostsBlogs'

function LinkTab(props) {
  return <Tab component={Link} {...props} />
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

const convertLocationToIndex = search => {
  switch (search) {
    case '?tab=news':
      return 0
    case '?tab=top':
      return 1
    case '?tab=follow':
      return 2
    case '?tab=me':
      return 3
    default:
      return 0
  }
}

function BlogHome() {
  const location = useLocation()
  const [tabValue, setTabValue] = useState(convertLocationToIndex(location.search))

  const [postsNew, setPostsNew] = useState([])
  const [blogsTop, setBlogsTop] = useState([])
  const [blogsMe, setBlogsMe] = useState([])
  const [postsUserFollowed, setPostsUserFollowed] = useState([])

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const fetchPostNew = async () => {
    try {
      const postsNewData = await BlogAPI.getPostsOfBLogs()
      setPostsNew(postsNewData)
    } catch (error) {
      throw new Error(error)
    }
  }

  const fetchBlogs = async () => {
    try {
      const blogsData = await BlogAPI.getBlogs()
      setBlogsTop(blogsData)
    } catch (error) {
      throw new Error(error)
    }
  }

  const fetchPostsUserFollowed = async () => {
    try {
      const postData = await BlogAPI.getPostsUserFollowed()
      setPostsUserFollowed(postData)
    } catch (error) {
      throw new Error(error)
    }
  }

  const fetchBlogsMe = async () => {
    try {
      const blogsData = await BlogAPI.getBlogsMe()
      setBlogsMe(blogsData)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      switch (location.search) {
        case '?tab=news':
          return fetchPostNew()
        case '?tab=top':
          return fetchBlogs()
        case '?tab=follow':
          return fetchPostsUserFollowed()
        case '?tab=me':
          return fetchBlogsMe()
        default:
          return fetchPostNew()
      }
    }
    fetchData()
  }, [location])

  return (
    <div className="nav-blogs">
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={handleChange}
          className="md:max-w-2xl m-auto"
          aria-label="nav tabs example"
        >
          <LinkTab label="Bài mới" to="?tab=news" {...a11yProps(0)} />
          <LinkTab label="Top blogs" to="?tab=top" {...a11yProps(1)} />
          <LinkTab label="Theo dõi" to="?tab=follow" {...a11yProps(2)} />
          <LinkTab label="Blogs của tôi" to="?tab=me" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <div className="md:max-w-2xl m-auto">
        <TabPanel value={tabValue} index={0}>
          <PostsBlogs posts={postsNew} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Blogs blogs={blogsTop} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <PostsBlogs posts={postsUserFollowed} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Blogs blogs={blogsMe} />
        </TabPanel>
      </div>
    </div>
  )
}

export default BlogHome
