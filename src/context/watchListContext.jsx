import { useState, createContext } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = props => {
  //const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

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
