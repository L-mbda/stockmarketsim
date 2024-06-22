'use client';
import '@/css/stonk.css'
import useLocalStorage from "use-local-storage";

export default function Home() {
  const [cash, setCash] = useLocalStorage("cash", 1000.00);
  const [localCurrency, setLocalCurrency] = useLocalStorage("currency", "USD");
  const [stocks, setStocks] = useLocalStorage("stocks", [{'ticker': 'Beginner', 'price': 1, 'quantity': 1}]);

  
  function buyStock() {
    // @ts-ignore
    let ticker = document.getElementById('ticker-buy').value;
    // @ts-ignore
    let quantity = document.getElementById('quantity-buy').value;
    let stockInfo;

    fetch('/api/get_stocks', { method: 'POST', body: JSON.stringify({'ticker': ticker}) }).then(r => r.json().then(data => {
      stockInfo = data.stock_information;
      console.log(stockInfo);
      let price = parseFloat(stockInfo['05. price']);
      if ((price * quantity) > cash) {
        alert(`Insufficent funds to buy ${quantity} of ${ticker} at ${price} individually for a total of ${price * quantity}`);
        return;
      }
      setCash(cash - (price * quantity));
      setStocks([stocks].push({'ticker': ticker, 'price': price, 'quantity': quantity}));
      console.log(stocks);
    }))
  }
  function searchStock() {
    // @ts-ignore
    let ticker = document.getElementById('ticker-search').value;
    let stockInfo;
    fetch('/api/get_stocks', { method: 'POST', body: JSON.stringify({'ticker': ticker}) }).then(r => r.json().then(data => {
      stockInfo = data.stock_information;
      console.log(stockInfo);
      // @ts-ignore
      document.getElementById('stock-search-ticker').innerText = stockInfo['01. symbol'];
      // @ts-ignore
      document.getElementById('stock-search-price').innerText = stockInfo['05. price'] + ' ' + localCurrency;
    }))
  }
  return (
    <>
      <div className='container'>
        <div className='summative'>
          <h1>Stock Market Simulator</h1>
          <p>Current balance: {cash} {localCurrency}</p>
        </div>
        <div className='summative'>
          <h2>Stock Market</h2>
          <div className='stocks'>
            <p>Owned Stocks</p>
          </div>
          <div className='buy'>
            <p>Search Stocks</p>
            <input type='text' placeholder='Ticker' id='ticker-search'/>
            <button onClick={searchStock}>Search</button>
            <p>Stock Information</p>
            <div className='stock'>
              <p id="stock-search-ticker">Stock</p>
              <p id="stock-search-price" className='price'>Price</p>
            </div>
          </div>
          <div className='buy'>
            <h1>Buy</h1>
            <input type='text' placeholder='Ticker' id='ticker-buy'/>
            <input type='number' placeholder='Quantity' id='quantity-buy'/>
            <button onClick={buyStock}>Buy</button>
          </div>
          <div className='sell'>
            <h1>Sell</h1>
            <input type='text' placeholder='Ticker' id='ticker-sell'/>
            <input type='number' placeholder='Quantity' id='quantity-sell'/>
            <button>Sell</button>
          </div>
        </div>
      </div>
    </>
  );
}
