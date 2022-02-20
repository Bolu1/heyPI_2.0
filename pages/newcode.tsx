import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'


const Newcode = () => {
    const router = useRouter()
    const[loading, setLoading] = useState(false)
    const[description, setDescription] = useState("")
    const[language, setLanguage] = useState("")
    const[code, setCode] = useState("")

    const submitHandler = async():Promise<void> =>{
        setLoading(true)
        try{
            const{id} = router.query
            console.log(id)
            await axios.post("http://localhost:8000/addc", {description, code, language, id})
            console.log("added")
            router.back()
        }catch(err){
            console.log(err)
        }
        setLoading(false)
    }
    useEffect(():void => {
        if(!Cookies.get('userInfo')){
            router.push('/auth/login')
        }
    }, [])

  return (

    <div className="dark:bg-gray-900 dark:text-coolGray-100">
        
        {loading && <div style={{width:"100%", height:"100vh", paddingLeft:"48%"}} className="fixed pt-80 opacity-60 bg-indigo-600">
          <div style={{top:"50vh", left:"50%"}}>
            <div  className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
            </div>}
        
        <Layout title="New Code">
            
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">Create a new API</h2>
  
        <div className="mt-6 ">
            <div className="items-center -mx-2 md:flex">
 
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Description</label>

                    <input onChange={(e)=>setDescription(e.target.value)} value={description} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" required placeholder="e.g An Api to get date ad time on mars"/>
                </div>
            </div>

            <div className="items-center -mx-2 md:flex">
 
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Language</label>

                    <input onChange={(e)=>setLanguage(e.target.value)} value={language} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" required placeholder="e.g java"/>
                </div>
            </div>


            <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Code</label>

                <textarea onChange={(e)=>setCode(e.target.value)} value={code} className="block w-full h-60 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="e.g <></>"></textarea>
            </div>

            <div className="flex justify-center mt-6">
                <button onClick={submitHandler} className="px-4 py-2 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-blue-700">Submit</button>
            </div>
        </div>
    </section>
        </Layout>
    </div>
  )
}

export default dynamic(()=> Promise.resolve(Newcode), {ssr:false})