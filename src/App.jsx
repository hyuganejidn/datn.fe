import React from 'react'
import { Provider } from 'react-redux'

import Home from '@/modules/home/Home'
import store from './store'
import 'Assets/sass/main.scss'

const App = () => (
  <Provider store={store}>
    <div className="hung">
      <div>Welcome to React 17 </div>
      <Home />
    </div>
  </Provider>
)

export default App
