import { useState, createContext } from "react";

export const WatchListContext = createContext();

const getWatchListFromLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");
  if(favorites) {
    favorites = JSON.parse(localStorage.getItem("favorites"))
  } else {
    favorites = null
  }
  return favorites
} 

export const WatchListContextProvider = props => {
  //const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(getWatchListFromLocalStorage);

  localStorage.setItem("watchList", JSON.stringify(watchList));

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
