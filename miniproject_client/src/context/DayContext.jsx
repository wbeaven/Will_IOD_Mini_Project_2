import { createContext, useReducer } from "react";
const API_URL = "http://localhost:3000";
export const DayContext = createContext();

const actions = {
  set_days: 'set_days',
  add_day: 'add_day',
  delete_day: 'delete_day',
};

const dayReducer = (state, action) => {
  switch (action.type) {
    case actions.add_day:
      return [...state, action.payload];
    case actions.delete_day:
      return state.filter(day => day.dayNum !== action.payload);
    default:
      return state;
  }
};

export const DayProvider = ({children}) => {
    const [days, dispatch] = useReducer(dayReducer, []);

    const addDayFunction = async() => {
        const res = await fetch(`${API_URL}/simulate`, {
          method: "POST",
        });
        const newDay = await res.json();
        dispatch({ type: actions.add_day, payload: newDay });
    }
    
    const delDayFunction = async(dayId) => {
        try {
            await fetch(`${API_URL}/days/${dayId}`, {
            method: "DELETE",
            });
        dispatch({ type: actions.delete_day, payload: dayId });
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
