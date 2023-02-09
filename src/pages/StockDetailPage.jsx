import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import { StockChart } from "../components/StockChart";


const formatData = (data) => {
  return data.t.map( (el, index) => {
    return {
     x: el * 1000, // time
     y: Math.floor(data.c[index]) // closure
   }
  })
}


function StockDetailPage() {
  //To use the symbol in url
  const [chartData, setChartData] = useState();
  const {symbol} = useParams();

  useEffect( () => {
    const fetchData = async() => {

      const date = new Date()
      // convert time stamp to seconds
      const currentTime = Math.floor(date.getTime()/1000)
      let oneDay;
      if(date.getDay() === 6) { //if Saturday
        oneDay = currentTime - 2*60*60*24
      } else if(date.getDay() === 0) { //if Sunday
        oneDay = currentTime - 3*60*60*24
      } else {
        oneDay = currentTime - 60*60*24
      }
      const oneWeek = currentTime - 7*60*60*24
      const oneYear = currentTime - 365*60*60*24

      try {
        const responses = await Promise.all([
          FinnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 30,
              from: oneDay,
              to: currentTime
            }
          }),
          FinnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 60,
              from: oneWeek,
              to: currentTime
            }
          }),
          FinnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: "W",
              from: oneYear,
              to: currentTime
            }
          })
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
        
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [symbol])



  return(
    <div>
      <h1>Stock Detail Page {symbol}</h1>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
        </div>
      )}
    </div>
  )
}

export default StockDetailPage;