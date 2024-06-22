'use client';
import '@/css/stonk.css'
import useLocalStorage from "use-local-storage";

export default function Home() {
  const [cash, setCash] = useLocalStorage("cash", 1000.00);
  const [localCurrency, setLocalCurrency] = useLocalStorage("currency", "USD");
  const [stocks, setStocks] = useLocalStorage("stocks", []);

  fetch('/api/get_stocks', { method: 'POST', body: JSON.stringify({'ticker': 'AAPL'}) }).then(r => r.json().then(data => console.log(data)))
  return (
    <>
      <div className='container'>
        <div className='summative'>
          <h1>Stock Market Simulator</h1>
          <p>Current balance: {cash} {localCurrency}</p>
        </div>
        <div className='summative'>
          <h2>Stock Market</h2>
          <p>Querying</p>
        </div>
      </div>
    </>
  );
}
