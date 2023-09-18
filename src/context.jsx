import React, { createContext, useContext, useState } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to access the context
export function useAppContext() {
  return useContext(AppContext);
}
