// DEPENDENCIES
import React, { createContext, useEffect, useState } from "react";

interface AppContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  isLogged: false,
  setIsLogged: (isLogged) => isLogged,
});

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return <AppContext.Provider value={{ isLogged, setIsLogged }}>{children}</AppContext.Provider>;
}
