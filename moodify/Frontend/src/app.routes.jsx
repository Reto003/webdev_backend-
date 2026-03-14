import {createBrowserRouter} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/protected'
import Home from './features/home/pages/Home'

export const routes = createBrowserRouter([
  {
    path: "/",
    element:
      <Protected>
        <Home/>
      </Protected>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

export default routes
