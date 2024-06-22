'use client';
import '@/css/settings.css';
import useLocalStorage from "use-local-storage";
import { db } from '@/db';

export default function Settings() {
    const [cash, setCash] = useLocalStorage("cash", 1000.00);
    const [fee, setFee] = useLocalStorage("fee", 2.5)
    if (fee == undefined) {
        setFee(2.5);
    }

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
    function setFeePercentage() {
        // @ts-ignore
        let p = parseFloat((document.getElementById('percent')).value);
        if (p > 100 || p < 0) {
            alert('The percentage that you entered is not a valid percentage.');
            return;
        } else {
            setFee(p)
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
                        <h2>Fees</h2>
                        <p>Simulate a percentage fee cut from all sales 💪<br/>Cut is {fee}%</p>
                    </div>
                    <div className='smodifier' id='free-width'>
                        <label htmlFor='calculate'>Simulate Cut <input type='checkbox' id='calculate' name='Calculate' onClick={enableorDisable} defaultChecked={calculate}/>
                        </label>
                    </div>
                </div>
                {calculate ? <>
                    <div className='setting'>
                    <div className='smor'>
                        <h2>Set Fee</h2>
                        <p>Customize the fee assessed, in percent.</p>
                    </div>
                    <div className='smodifier'>
                        <input type='number' id='percent' />
                        <button onClick={setFeePercentage}>Set</button>
                    </div>
                </div>

                </> : <></>}
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