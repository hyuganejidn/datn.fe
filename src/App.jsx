import React from 'react'
import { Provider } from 'react-redux'

import Home from './modules/home/Home'

import store from './store'

const App = () => (
  <Provider store={store}>
    <div className="hung">
      <div>Welcome to my-webpack-react</div>
      <Home />
    </div>
  </Provider>
)

export { App }
