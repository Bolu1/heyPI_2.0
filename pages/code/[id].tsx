import React from 'react'
import Layout from '../../components/Layout'

const Codes = () => {
  return (
    <div style={{ minHeight: "90vh" }} className="dark:bg-gray-900 dark:text-coolGray-100">
        <Layout title="code">
        <div key="._i" className="p-6 mx-16 mt-4 sm:p-12 cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left  dark:text-gray-300">
                  d.email
                  
                </h4>
                <div className="space-y-6">
                <p style={{maxWidth:"70%", padding:"1em", whiteSpace:"break-spaces"}} className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    description
                    </p></div>
              </div>
            </div>
            </div>
        </Layout>
    </div>
  )
}

export default Codes