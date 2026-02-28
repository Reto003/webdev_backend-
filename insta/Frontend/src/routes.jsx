import {createBrowserRouter, BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Home from "./features/post/pages/Home";
import CreatePost from "./features/post/pages/CreatePost";
import Feed from "./features/post/components/Feed";
import LikedPosts from "./features/post/components/LikedPosts";

//~ React Router v6.4+
export const routes = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
    children: [
      {
        index: true,      // this is default "/" {thankgod}
        element: <Feed />,
      },
      {
        path: "/likedPost",
        element: <LikedPosts />,
      },
      {
        path: "/createPost",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

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
