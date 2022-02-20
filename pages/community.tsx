import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from 'axios'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const Community = () => {
    const router = useRouter()
    const[search, setSearch] = useState("")
    const[loading, setLoading] = useState(false)
    const[data, setData] = useState([])

    const submitHandler = async(e):Promise<void> =>{
      e.preventDefault()
      setLoading(true)
        try{
          const result = await axios.post('http://localhost:8000/community/search', {search})
          setData(result.data)
    }catch(e){
        console.log(e)
    }
    setLoading(false)
    }

     const handlePageClick = async(data):Promise<any> =>{
        setLoading(true)
        try{
          const result = await axios.post(`http://localhost:8000/community/search?page=${data.selected}`, {search})
          setData(result.data)
        }catch(e){
          console.log(e)
        }
        setLoading(false)
    }

    useEffect(():void => {
        setLoading(true)
        var result
        const fetch  = async():Promise<void> =>{
            try{
                 result = await axios.get('http://localhost:8000/getQuestions')
                 setData(result.data)
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

    <Layout title="Search">
    
        
      <div style={{ minHeight: "90vh" }} className="dark:bg-gray-900 ">
        <div className="flex justify-center py-10">
          <div className="mb-3 xl:w-96">
            <form onSubmit={submitHandler} className="input-group relative flex  items-stretch w-full mb-4 rounded">
              <input
                type="search"
                className="form-control dark:bg-gray-700 dark:text-white relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0   focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <span
                className="input-group-text flex items-center cursor-pointer px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
                id="basic-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4 cursor-pointer"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  onClick={submitHandler}
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </span>
            </form>
          </div>
          
        </div>
        {/* results */}
        <div >
            {console.log(data)}
        {data.length>0 ? data.map( (d) =>(
          <div onClick={()=>router.push(`/question/${d._id}`)} key={d._id} className="p-6 mx-16 mt-4 sm:p-12 cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <div className="flex pl-4 flex-col">
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

export default dynamic(() => Promise.resolve(Community), {ssr: false});
