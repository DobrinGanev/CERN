import App from './containers/App'
import Home from './components/Home'
import Foo from './components/Foo'
import Grid from './baseComponents/Grid'
/**
 * The React Routes for both the server and the client.
 */
const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/foo',
        component: Foo
      }
    ]
  }
]
const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }
];

export default routes

