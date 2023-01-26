import { useState, useEffect } from "react";
import FinnHub from "../apis/FinnHub";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    let dropdownMenu= search ? "show" : null;
    return(
      <ul className={`dropdown-menu ${dropdownMenu}`}>
        {results.map( res => {
          console.log(res.symbol)
        })}
        <li>Stock 1</li>
        <li>Stock 2</li>
        <li>Stock 2</li>
      </ul>
    )
  }

  useEffect( () => {
    let isMounted = true
    const fetchData = async() => {
      try {
        const response = await FinnHub.get("/search", {
          params: {
            q: search
          }
        })
        if(isMounted) {
          setResults(response.data.result)
        }
      } catch(err) {
        console.log(err);
      }
    }

    if(search.length > 0) {
      fetchData()
    } else {
      setResults([])
    }

    return ( () => isMounted=false )
  }, [search]);


  return(
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input  type="text" 
                style={{ backgroundColor: "rgba(145, 158, 171, 0.04)"}} 
                id="search" 
                className="form-control"
                placeholder="Search" 
                autoComplete="off" 
                value={search} 
                onChange={ e => setSearch(e.target.value)}>
         </input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>  
    </div>
  )
}