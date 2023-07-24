// DEPENDENCIES
import React, { createContext, useEffect, useState } from "react";

// interface AppContextProps {
//   isLogged: boolean;
//   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const AppContext = createContext({
  isLogged: false,
  setIsLogged: () => { },
});

export function AppContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return <AppContext.Provider value={{ isLogged, setIsLogged }}>{children}</AppContext.Provider>;
}
