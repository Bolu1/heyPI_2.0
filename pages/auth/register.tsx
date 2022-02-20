import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from 'axios'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Register = () => {
    const router = useRouter()
  const backUrl: string =
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" 
  const[loading, setLoading] = useState(false)
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const[message, setMessage] = useState(null)

  const registerHandler = async(e):Promise<any> =>{
        e.preventDefault()
        setLoading(true)
        if(password.length >6){

            if(password !== confirmPassword){
                setLoading(false)
                return setMessage("Passwords don't match")
            }else{
                try{

                    const response = await axios.post("http://localhost:8000/addusers", {email, password})
                    setMessage(response.data.message)
                    router.push("/auth/login")
                }catch(e){
                    console.log(e)
                    setMessage("This Email is already in use")

                }
            }
        }else{
            setMessage("Password is too short")
            setLoading(false)
            return
        }
        setLoading(false)

  }


  return (
    <div>
        
      {loading && <div style={{width:"100%", height:"100vh", paddingLeft:"48%"}} className="fixed pt-80 opacity-60 bg-indigo-600">
          <div style={{top:"50vh", left:"50%"}}>
            <div  className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
            </div>}

      <Layout title="Register">
        <div className="bg-white dark:bg-gray-900">
          <div className="flex justify-center h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/3"
              style={{ backgroundImage: `url(${backUrl})` }}
            >
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                
              </div>
            </div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <div className="flex-1">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                    Signup
                  </h2>
                  {message == "User created" && 
                <p className="mt-3 text-green-600 dark:text-green-600">
                    {message}
                  </p>}

                {message && message != "User created"&& 
                <p className="mt-3 text-red-600 dark:text-red-600">
                    {message}
                  </p>}
                  
                </div>

                <div className="mt-8">
                  <form  onSubmit={registerHandler}>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email Address
                      </label>
                      <input
                         required
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-gray-600 dark:text-gray-200">
                          Password
                        </label>
                      </div>

                      <input
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-gray-600 dark:text-gray-200">
                          Confrim Password
                        </label>
                      </div>

                      <input
                         required
                         value={confirmPassword}
                         onChange={(e)=>setConfirmPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Re-enter Password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <button 
                       type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign up
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      Sign in
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });
