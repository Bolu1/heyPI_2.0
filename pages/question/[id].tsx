import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const Question = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [q, setQ] = useState({
    email: null,
    description: null,
    desc: null,
    language: null,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const submitHandler = async (e): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        "https://heypiserver.herokuapp.com/look",
        { search }
      );
      setData(result.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handlePageClick = async (data): Promise<any> => {
    setLoading(true);
    try {
      const { id } = router.query;
      console.log(id);
      const result = await axios.post(
        `https://heypiserver.herokuapp.com//answers?page=${data.selected}`,
        { id }
      );
      setData(result.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect((): void => {
    setLoading(true);
    var quest;
    var result;
    const fetch = async (): Promise<void> => {
      try {
        const { id } = router.query;
        const idd = id;
        console.log(idd);
        quest = await axios.get(
          `https://heypiserver.herokuapp.com/findQuestions?id=${id}`
        );
        result = await axios.post("https://heypiserver.herokuapp.com/answers", {
          id,
        });
        console.log(quest);
        setQ(quest.data);
        setData(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{ width: "100%", height: "100vh", paddingLeft: "48%" }}
          className="fixed pt-80 opacity-60 bg-indigo-600"
        >
          <div style={{ top: "50vh", left: "50%" }}>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
        </div>
      )}

      <Layout title="Search">
        <div style={{ minHeight: "90vh" }} className="dark:bg-gray-900 ">
          <br />
          <div className="p-6 mx-16  sm:p-12 cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left  dark:text-gray-300">
                  {q.email}
                </h4>
                <div className="space-y-6">
                  <p className="text-base text-center mt-0 mb-4 text-gray-300">
                    {q.description}
                  </p>
                  <p className="text-base text-center bg-indigo-600 bg-opacity-25 rounded-md mt-0 mb-4 text-gray-300">
                    {q.language}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-10 space-x-4">
            <h1 className="text-white text-3xl font-medium">Answers</h1>
            <a
              onClick={() => router.push(`/newcode?id=${router.query.id}`)}
              className="ml-8 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              +
            </a>
          </div>
          {/* results */}
          <div>
            {console.log(data)}
            {data.length > 0 ? (
              data.map((d) => (
                <div
                  onClick={() => router.push(`/code/${d._id}`)}
                  key={d._id}
                  className="p-6 mx-16 mt-4 sm:p-12 cursor-pointer bg-gray-100 dark:bg-gray-800 dark:text-coolGray-100"
                >
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
                      <div className="space-y-6">
                        <p className="text-base text-center mt-0 mb-4 text-gray-300">
                          {d.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="dark:text-gray-300  text-3xl fount-medium flex align-center justify-center">
                This question does not have any answer yet
              </div>
            )}
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
            pageLinkClassName={"hidden"}
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

export default dynamic(() => Promise.resolve(Question), { ssr: false });
