'use client';
import '@/css/settings.css';
import useLocalStorage from "use-local-storage";
import { db } from '@/db';

export default function Settings() {
    const [cash, setCash] = useLocalStorage("cash", 1000.00);
    if (cash == null || Number.isNaN(cash)) {
        setCash(1000.00);
    }
    const [localCurrency, setLocalCurrency] = useLocalStorage("currency", "USD");
    const [calculate, setCalculate] = useLocalStorage("calculate", false);
    if (calculate == null) {
        setCalculate(false);
    }

    function setBalance() {
        // @ts-ignore
        let balance = parseFloat((document.getElementById('balance')).value);
        setCash(balance);
    }
    function resetEverything() {
        if (confirm('Are you sure you want to reset everything?')) {
            setCash(1000.00);
            db.collection('portfolio').delete();
            return window.location.href = '/';
        }
    }
    function enableorDisable() {
        // @ts-ignore
        let cbox = document.getElementById('calculate');
        // @ts-ignore
        if (cbox.checked) {
            setCalculate(true)
        } else {
            setCalculate(false)
        }
    }
    return (
        <div className='container'>
            <a href='/'>Home</a>
            <h1>Stockr Client Settings</h1>
            <p>These settings are stored locally and affect the client.</p>
            <div className='settings'>
                <div className='setting'>
                    <div className='smor'>
                        <h2>Set Balance</h2>
                        <p>Set your starting balance.</p>
                    </div>
                    <p>Your current balance is {cash} {localCurrency}.</p>
                    <div className='smodifier'>
                        <input type='number' id='balance' />
                        <button onClick={setBalance}>Set</button>
                    </div>
                </div>
                <div className='setting'>
                    <div className='smor'>
                        <h2>Calculate Profits and Losses</h2>
                        <p>(API INTENSIVE), every time you open Stockr, the system will calculate the profits and losses in your portfolio.</p>
                    </div>
                    <div className='smodifier' id='free-width'>
                        <label htmlFor='calculate'>Calculate Profits and Losses<input type='checkbox' id='calculate' name='Calculate' onClick={enableorDisable} defaultChecked={calculate}/>
                        </label>
                    </div>
                </div>
                <div className='setting'>
                    <div className='smor'>
                        <h2>Danger Zone</h2>
                        <p>Reset your balance and portfolio.</p>
                    </div>
                    <div className='smodifier'>
                        <button onClick={resetEverything}>I acknowledge, I would like to reset everything.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}