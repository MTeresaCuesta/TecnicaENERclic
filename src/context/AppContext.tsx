// DEPENDENCIES
import React, { createContext, useEffect, useState } from "react";


interface AppContextProps {
  isLogged: boolean; // indica si el usuario está logueado o no
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>; // Función para actualizar la propiedad isLogged
  graphics: {
    data?: any[];
    search?: object;
  }; // Datos de gráficos
  setGraphics: React.Dispatch<React.SetStateAction<object>>; // Función para actualizar los datos de gráficos
}

// Creamos el contexto con valores iniciales
export const AppContext = createContext<AppContextProps>({
  isLogged: false,
  setIsLogged: (isLogged) => isLogged, // Función que no hace nada por defecto, se actualiza luego
  graphics: {}, // Valor inicial para los datos de gráficos
  setGraphics: (graphics) => graphics,
});

// Proveedor  contexto
export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [graphics, setGraphics] = useState({});

  // Comprobamos si hay un token en el localStorage para determinar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true); // Si hay un token, establecemos isLogged en true
    }
  }, []);

  // Devolvemos contexto con los valores actualizados
  return <AppContext.Provider value={{ isLogged, setIsLogged, graphics, setGraphics }}>{children}</AppContext.Provider>;
}
