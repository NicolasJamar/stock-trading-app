import { useState, useEffect } from "react";

export const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  return(
    <div>Stock List</div>
  )
}