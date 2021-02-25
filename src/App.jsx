import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Layout from '@/_layouts'
import routes from './routes'
import store from './store'
import PrivateRoute from './_components/commons/PrivateRoute'
import PublicRoute from './_components/commons/PublicRoute'
import 'Assets/sass/main.scss'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          {routes.map((route, i) => {
            if (route.auth) {
              return <PrivateRoute key={i} {...route} />
            }

            return <PublicRoute key={i} {...route} />
          })}
        </Switch>
      </Layout>
    </Router>
  </Provider>
)

export default App
