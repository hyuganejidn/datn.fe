import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Layout from '@/_layouts'
import PrivateRoute from 'Templates/commons/PrivateRoute'
import PublicRoute from 'Templates/commons/PublicRoute'

import store from './store'
import routes from './routes'

import 'Assets/sass/main.scss'
import { SocketWrapper } from './_layouts/Socket'
// import 'Assets/sass/index.scss'

const App = () => (
  <Provider store={store}>
    <SocketWrapper>
      <Router>
        <Layout>
          <Switch>
            {routes.map((route, i) =>
              route.auth ? <PrivateRoute key={i} {...route} /> : <PublicRoute key={i} {...route} />
            )}
          </Switch>
        </Layout>
      </Router>
    </SocketWrapper>
  </Provider>
)

export default App
