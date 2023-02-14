import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";


function StockOverviewPage() {
  return(
    <div>
      <h1>Trading App</h1>
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default StockOverviewPage;