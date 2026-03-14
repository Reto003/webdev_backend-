import FaceExpression from './features/expressions/components/FaceExpression'
import {RouterProvider} from 'react-router-dom'
import {routes} from './app.routes'
import "./features/shared/styles/global.scss"
import { AuthProvider } from './features/auth/auth.context'
import { SongProvider } from './features/home/song.context'

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={routes} />
      </SongProvider>
    </AuthProvider>
  )
}

export default App