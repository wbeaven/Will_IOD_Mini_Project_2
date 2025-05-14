import { createContext, useState, useEffect } from "react";
const API_URL = "http://localhost:3000";
export const DayContext = createContext();

export const DayProvider = ({children}) => {
      const [days, setDays] = useState([]);

    const addDayFunction = async() => {
        const res = await fetch(`${API_URL}/simulate`, {
          method: "POST",
        });
        const newDay = await res.json();
        const tempDay = [...days];
        setDays([...tempDay, newDay]);
    }
    
    const delDayFunction = async(dayId) => {
        try {
            await fetch(`${API_URL}/days/${dayId}`, {
            method: "DELETE",
            });
            setDays(prevDays => prevDays.filter(d => d.dayNum !== dayId));
        }
        catch (err) {
            console.error("Error deleting day:", err);
        }
    }

    return (
    <DayContext.Provider value={{ days, addDayFunction, delDayFunction }}>
      {children}
    </DayContext.Provider>
  );
}
