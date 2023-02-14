import { useState, createContext, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = props => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "AMZN", "MSTF"]
  );

  
  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList])

  const addStock = (stock) => {
    if(watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  }

  const deleteStock = (stockClicked) => {
    setWatchList(watchList.filter( el => {
      return el !== stockClicked
    }))
  }

  return <WatchListContext.Provider value={
    { watchList, addStock, deleteStock }
    }>
    {props.children}
  </WatchListContext.Provider>
}
