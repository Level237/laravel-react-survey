import { createBrowserRouter } from "react-router-dom";
import Surveys from "./views/Surveys.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<Dashboard/>
    },

    {
      path:"/surveys",
      element:<Surveys/>
    },

    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    },

  ]

)

export default router;
