import {createBrowserRouter, BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./features/auth/pages/Register"
import Login from './features/auth/pages/Login'

//~ React Router v6.4+ 
export const routes = createBrowserRouter([
  {
    path:"/",
    element:(<h1>Welcome to the App</h1>)
  },
  {
    path:"/register",
    element:(<Register />)
  },
  {
    path:"/login",
    element:(<Login />)
  }
])

//~ React Router v6 basic 
// export const Approutes = ()=>{
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/login" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }