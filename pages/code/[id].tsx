import React, { useEffect, useState } from 'react'
import { Code } from '../../components/Code'
import Layout from '../../components/Layout'
import dynamic from "next/dynamic";
import axios from 'axios'
import { useRouter } from 'next/router';


const Codes = () => {
    const router = useRouter()
    const[loading, setLoading] = useState(true)
    const[data, setData] = useState({
        name: null,
        code: null,
        desc: null,
        language: null
    })
    const { id } = router.query

    useEffect(() => {
        setLoading(true)
        var result  
        const fetch  = async():Promise<void> =>{
                try{
                    result = await axios.get(`http://localhost:8000/page.html/${id}`)
                    setData(result.data)
                    
                }catch(err){
                    console.log(err)
                }
        }
        fetch()
        setLoading(false)
    }, [id])
    
  return (
    <div style={{ minHeight: "90vh" }} className="dark:bg-gray-900 dark:text-coolGray-100">
        
        {loading && <div style={{width:"100%", height:"100vh", paddingLeft:"48%"}} className="fixed pt-80 opacity-60 bg-indigo-600">
          <div style={{top:"50vh", left:"50%"}}>
            <div  className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
            </div>}
        
        <Layout title="code">
            
        {data.code ?
        <>
        <div key="._i" className="p-6 mb-5 mx-16 mt-4 sm:p-12 bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left  dark:text-gray-300">
                 {data.name}
                  
                </h4>
                <div className="space-y-6 dark:text-gray-300">
                <p  className="text-base  mt-0 mb-4 text-gray-300">
                {data.desc}
                </p>
                </div>
              </div>
            </div>
            </div>
            <div style={{overflowY:"hidden", color:"#f8f8f2"}} className=" mx-16 mt-4 bg-zinc-700 cursor-pointer ">
                <Code language={"javascript"} code={data.code}/>
            </div>
            
            </>: 
            <div className="dark:text-gray-300 pt-20 text-3xl fount-medium flex align-center justify-center">Opps we could not find that</div>
           }
               

        </Layout>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Codes), {ssr:false})