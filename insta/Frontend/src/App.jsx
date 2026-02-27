import {RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import './style.scss'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/post/post.context'


function App() {
  
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
