import { useState } from "react";
//decaring states
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //transition to the specified mode from appointments
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
  };
  //return to the previous mode
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);

      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}
