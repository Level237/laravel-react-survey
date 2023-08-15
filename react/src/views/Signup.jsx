import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

  const { setCurrentUser,setUserToken }=useStateContext();
  const [fullName,setFullName] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [passwordConfirmation,setPasswordConfirmation] =useState("");
  const [error,setError] =useState({__html:""});

  const onSubmit=(ev)=>{
    ev.preventDefault();
    setError({__html:''})

    axiosClient.post('/signup',{
      name:fullName,
      email,
      password,
      password_confirmation:passwordConfirmation,
      method:"POST",
        mode: 'no-cors',

    })
    .then(({data})=>{
      setCurrentUser(data.user);
      setUserToken(data.token);
    })
.catch((error)=>{
  if(error.response){
    const finalErrors=Object.values(error.response.data.errors).reduce((accum,next)=>[...next,...accum],[])
    console.log(finalErrors);
    setError({__html:finalErrors.join('<br>')});

  }
  console.error(error)
  console.log(error);
})

    }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup  For Free
          </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}
          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
              <label htmlFor="Full Name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={fullName}
                  onChange={ev=>setFullName(ev.target.value)}
                  placeholder="Enter Your Name"
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={ev=>setEmail(ev.target.value)}
                  autoComplete="email"
                  placeholder="Email Adress"
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={ev=>setPassword(ev.target.value)}
                  placeholder="PassWord"
                  autoComplete="current-password"
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                  Password Confirmation
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password-confirmation"
                  name="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={ev=>setPasswordConfirmation(ev.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="PassWord Confirmation"
                  className="block w-full rounded-md p-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login with your Account
            </Link>
          </p>
        </div>
    </>
  )
}
