import React,{useEffect,useState} from 'react'
import { apiUrl,filterData } from "../components/FilterData"
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import axios from 'axios';
import Filter from '../components/Filter';
import ContenttTable from './ContenttTable';
const Contentt = () => {
  const [featuredata,setfeaturedata]=useState([]);
  const[loading,setloading]=useState(true);
  const [category,setcategory]=useState(filterData[0].title);
  async function fetchdata(){
    setloading(true);
    try{
      const result = await axios.get(apiUrl);
      console.log(result.data);
      setfeaturedata(result.data.data);
    }
    catch(error){
    toast.error("Something went wrong");
    }
    setloading(false);
  }
  useEffect(()=>{
    fetchdata();
  },[]);
  return (
    <>
    <div className="main-content">
    
    <div>
    
    <Filter filterData={filterData} category={category} setcategory={setcategory}></Filter>
    </div>
    <div className="table-main">
      {
        loading ? (<Spinner></Spinner>):(<ContenttTable setfeaturedata={setfeaturedata} featuredata={featuredata} category={category}></ContenttTable>)
      }
    </div>
    
    
    </div>
    
    </>
  )
}

export default Contentt
