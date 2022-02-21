import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from 'axios'
import dynamic from "next/dynamic";
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const Myapi = () => {
    const router = useRouter()
    const[search, setSearch] = useState(null)
    const[loading, setLoading] = useState(true)
    const[data, setData] = useState([])

    const submitHandler = async(e):Promise<void> =>{
      e.preventDefault()
      setLoading(true)
        try{
          const result = await axios.post('http://localhost:8000/look', {search})
          setData(result.data)
    }catch(e){
        console.log(e)
    }
    setLoading(false)
    }

    const handlePageClick = async(data):Promise<any> =>{
        setLoading(true)
        try{
          const result = await axios.post(`http://localhost:8000/see?page=${data.selected}`, {search})
          setData(result.data)
        }catch(e){
          console.log(e)
        }
        setLoading(false)
    }

    useEffect(():void => {
        if(!Cookies.get('userInfo')){
            router.push('/auth/login')
        }
        setLoading(true)
        var result
        
        const data = JSON.parse(Cookies.get('userInfo'))
        const name = data.email
        const token  = data.token
        const fetch  = async():Promise<void> =>{
            try{
                 result = await axios.post('http://localhost:8000/seeme', {search, name, token})
                 setData(result.data)
                 console.log(result.data)
            }catch(e){
                console.log(e)
            }
        }
        fetch()
        setLoading(false)
    }, [])
    

  return (
      <>
      {loading && <div style={{width:"100%", height:"100vh", paddingLeft:"48%"}} className="fixed pt-80 opacity-60 bg-indigo-600">
          <div style={{top:"50vh", left:"50%"}}>
            <div  className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
            </div>}

    <Layout title="Myapi">
    
        
      <div style={{ minHeight: "90vh" }} className="dark:bg-gray-900 ">
        

        <div className="flex justify-center py-5">
            
    <div className="flex border-b border-gray-200 space-x-4 dark:border-gray-700">
        <button className="h-10 cursor-pointer py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
            Public
        </button>

        <button onClick={()=>router.push('/mypapi')} className="h-10 cursor-pointer py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            Private
        </button>
    </div>
        </div>
        {/* results */}
        <div >
            {console.log(data)}
        {data.length>0 ? data.map( (d) =>(
          <div onClick={()=>router.push(`/code/${d._id}`)} key={d._id} className="p-6 mx-16 mt-4 sm:p-12 cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left  dark:text-gray-300">
                  {d.email}
                  
                </h4>
                <div  className="space-y-6">
                <p className="text-base  mt-0 mb-4 text-gray-300">
                    {d.description}  
                    </p>
                    </div>
              </div>
            </div>
            </div> )): 
            <div className="dark:text-gray-300  text-3xl fount-medium flex align-center justify-center">Opps we could not find that</div>
            }
          </div>
      </div>
      <div className="flex justify-center py-5 dark:bg-gray-900">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            // breakLabel={"---"}
            pageCount={25}
            // marginPageDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex"}
            pageLinkClassName={
              "hidden"
            }
            previousClassName={
              "flex items-center dark:bg-gray-800 font-bold px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600"
            }
            nextClassName={
              "flex items-center dark:bg-gray-800 px-4 font-bold py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600"
            }
            // breakClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
            // breakLinkClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
            activeClassName={"text-indigo-600 "}
          />

          <p className="pt-2 pl-5"></p>
        </div>
    </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Myapi), {ssr: false});
