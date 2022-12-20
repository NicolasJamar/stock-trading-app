import { useState, useEffect } from "react";
import FinnHub from "../apis/FinnHub";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");

  useEffect( () => {
    const fetchData = async() => {
      try {
        const response = await FinnHub.get("/search", {
          params: {
            q: search
          }
        })
      } catch(err) {
        console.log(err);
      }
    }
    if(search.length > 0) {
      fetchData()
    }
    }, []);


  return(
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input type="text" style={{ backgroundColor: "rgba(145, 158, 171, 0.04)"}} id="search" className="form-control"
        placeholder="Search" autoComplete="off" value={search} onChange={ e => setSearch(e.target.value)}></input>
        <label htmlFor="search">Search</label>
        <ul className="dropdown-menu">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>  
    </div>
  )
}