import { useContext } from 'react'
import { DayContext } from './context/DayContext';
import './styles.css'


function App() {
  const { days, addDayFunction, delDayFunction } = useContext(DayContext);

  return (
    <>
      <header>
       <h1 className="text-center">Store Simulation</h1>
      </header>

      <div className="flex column center">
        {/* Go to chart button */}
        <div className="section">
          <button id="myButton" onClick={addDayFunction}>Chart</button>
        </div>

        {/* Simulate day button */}
        <div className="section">
          <button id="myButton" onClick={addDayFunction}>Simulate Day</button>
        </div>

        {/* Day statistics container */}
        <div id="scrollable" className="section">
          <table id="day-stats">
            <thead>
              <tr>
                <th style={{width: "5%"}}>Day</th>
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
                  return <tr key={d.dayNum} onClick={() => delDayFunction(d.dayNum)}>
                  <td>{d.dayNum}</td>
                  <td>{d.customers}</td>
                  <td>{d.transactions}</td>
                  <td>{d.items}</td>
                  <td>${d.earnings}</td>
                  <td>{d.ipt}</td>
                  <td>${d.atv}</td>
                  <td>{d.conversion}%</td>
                </tr>
                })
              }
            </tbody>
          </table>
        </div>

        <div className="gap"></div>

        {/* Graph container */}
        <div className="section graph">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  )
}

export default App
