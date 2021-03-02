// import '@babel/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Layout from '@/_layouts'
import PrivateRoute from 'Templates/commons/PrivateRoute'
import PublicRoute from 'Templates/commons/PublicRoute'

import store from './store'
import routes from './routes'

import 'Assets/sass/main.scss'
// import 'Assets/sass/tailwind.scss'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          {routes.map((route, i) =>
            route.auth ? (
              <PrivateRoute key={i} {...route} />
            ) : (
              <PublicRoute key={i} {...route} />
            )
          )}
        </Switch>
      </Layout>
    </Router>
  </Provider>
)

export default App
