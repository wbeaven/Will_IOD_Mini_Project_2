import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_URL = "http://localhost:3000";


function App() {
  const [days, setDays] = useState([])

  const ButtonOnClick = async() => {
    const res = await fetch(`${API_URL}/simulate`, {
      method: "POST",
      });
      const newDay = await res.json();
      // setDays([...days, newDay]);
      console.log(newDay);
      const tempDay = [...days];
      setDays([...tempDay, newDay]);

      // .catch((err) => console.error("Error simulating day:", err));
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={ButtonOnClick}>
          count is {days.length}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div id="scrollable">
        <table id="day-stats">
          <thead>
            <tr>
              <th>Day</th>
              <th>Customers</th>
              <th>Transactions</th>
              <th>Items</th>
              <th>Earnings</th>
              <th>IPT</th>
              <th>ATV</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
            
            {
              days.map((d) => {
                return <tr key={d.dayNum} >
                <td>{d.dayNum}</td>
                <td>{d.customers}</td>
                <td>{d.transactions}</td>
                <td>{d.items}</td>
                <td>{d.earnings}</td>
                <td>{d.ipt}</td>
                <td>{d.atv}</td>
                <td>{d.conversion}</td>
              </tr>
              })
            }
            
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
