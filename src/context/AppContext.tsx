// DEPENDENCIES
import React, { createContext, useEffect, useState } from "react";

interface AppContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  graphics: object[];
  setGraphics: React.Dispatch<React.SetStateAction<object[]>>;
}

export const AppContext = createContext<AppContextProps>({
  isLogged: false,
  setIsLogged: (isLogged) => isLogged,
  graphics: [],
  setGraphics: (graphics) => graphics,
});

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [graphics, setGraphics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return <AppContext.Provider value={{ isLogged, setIsLogged, graphics, setGraphics }}>{children}</AppContext.Provider>;
}
