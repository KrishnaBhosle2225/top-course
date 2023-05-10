import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Spinner from "./components/Spinner";
import { apiUrl, filterData } from "./data";
import Cards from "./components/Cards";
import { toast } from "react-toastify";

const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      let res = await fetch(apiUrl);
      let sampleData = await res.json();
      // console.log(data);
      setCourses(sampleData.data);
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div > 
        <div>
          <Filter filterData={filterData} 
          category={category} 
          setCategory ={setCategory} ></Filter>
        </div>

        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? <Spinner /> : <Cards courses={courses} category={category}/>}
        </div>
        
      </div>
    </div>
  );
};

export default App;
