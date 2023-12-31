import { Navigate, createBrowserRouter } from "react-router-dom";
import Surveys from "./views/Surveys.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import SurveyView from "./views/SurveyView.jsx";

const router=createBrowserRouter(
  [

    {
      path:"/",
      element:<DefaultLayout/>,
      children:[
        {
          path:"/dashboard",
          element:<Navigate to="/"/>
        },
        {
          path:"/",
          element:<Dashboard/>
        },

        {
          path:"/surveys/create",
          element:<SurveyView/>
        },
        {
          path:"/surveys",
          element:<Surveys/>
        },
      ]
    },

    {
      path:"/",
      element:<GuestLayout/>,
      children:[
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
      ]
    },

    {
      path:"/dashboard",
      element:<Dashboard/>
    },

  ]

)

export default router;
