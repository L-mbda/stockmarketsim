'use client';
import '@/css/stonk.css'
import useLocalStorage from "use-local-storage";

export default function Home() {
  const [cash, setCash] = useLocalStorage("cash", 1000.00);
  const [localCurrency, setLocalCurrency] = useLocalStorage("currency", "USD");
  return (
    <>
      <div className='container'>
        <h1>Stock Market Simulator</h1>
        <p>Current balance: {cash} {localCurrency}</p>
      </div>
    </>
  );
}
