import React, {useState, useContext, useEffect} from 'react';
import FinnHub from "./apis/FinnHub";

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const fetchData = async() => {
    try {
      //For multiple requests uses Promise.all() which tries to resolve all of them at the same time
      //otherwise the requests are in a queue so takes more time for the network
      const responses = await Promise.all(
        watchList.map( symbol => {            
          return FinnHub.get("/quote", {
            params: {
              symbol: symbol
            }
          })
        })
      )         
      const datas = responses.map( resp => {
        return {
          data: resp.data, 
          symbol: resp.config.params.symbol
        }
      })
      console.log(datas);
      
      if(isMounted) {
        setStock(datas);
      }
    } catch(err) {
      console.log(err);
    }
  }  


  useEffect(() => {
    //Possibility to catch the datas from setStock() before the component isMounted 
    // so check if component isMounted
    let isMounted = true
    fetchData()
    return () => (isMounted = false)
  }, [])


  return <AppContext.Provider value={
      { fetchData,
        stock }
      }>
      {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}