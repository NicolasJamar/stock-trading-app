import { useState } from "react";
import { useEffect } from "react";
import FinnHub from "../apis/FinnHub";


export const StockData = ({symbol}) => {
  const [symbolStock, setSymbolStock] = useState(symbol) 
  let isMounted = true;

  useEffect( () => {
    const fetchData = async() => {
      try {
        const response = await FinnHub.get("/stock/profile2", {
          params: {
            symbol: symbol
          }
        })
        console.log(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return(
    <h2>Stock data</h2>
  )
}