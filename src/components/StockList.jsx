import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import FinnHub from "../apis/FinnHub";
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  const navigate = useNavigate();

  const changeColor = change => {
    return change >= 0 ? "success" : "danger"
  }

  const renderIcon = change => {
    return change >= 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  useEffect(() => {
    //Possibility to catch the datas from setStock() before the component isMounted 
    // so check if component isMounted
    let isMounted = true
    const fetchData = async () => {
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
        
        if(isMounted) {
          setStock(datas);
        }
      } catch(err) {
        console.log(err);
      }
    }
    
    fetchData()

    return () => (isMounted = false)
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  }

  return(
    <table className="table hover mt-5">
      <thead style={{color: "rgb(79,89,102)"}}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {stock.map( stockData => {
          return (
            <tr onClick={() => handleStockSelect(stockData.symbol)} 
                className="table-row" 
                key={stockData.symbol}
                style={{cursor: "pointer"}}
            >
              <th scope="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>
                {stockData.data.d} {renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>
                {stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc}</td>
              <td>
                <button className="btn btn-danger btn-sm d-inline-block delete-button" 
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteStock(stockData.symbol)
                        }}>
                  Remove
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}