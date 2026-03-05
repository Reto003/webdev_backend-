import FaceExpression from './features/expressions/components/FaceExpression'
import {RouterProvider} from 'react-router-dom'
import {routes} from './app.routes'
import "./features/shared/styles/global.scss"


const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App