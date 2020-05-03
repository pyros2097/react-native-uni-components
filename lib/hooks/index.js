import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import useMedia from 'use-media';

const ThemeContext = React.createContext();
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ value, children }) => {
  const [theme, setTheme] = useState(value);
  const change = (obj) => {
    setTheme({ ...obj, change: change });
  };
  return <ThemeContext.Provider value={{ ...theme, change: change }}>{children}</ThemeContext.Provider>;
};

export const useMobile = () => {
  //   if (Platform.OS === 'web') {
  return useMedia({ maxWidth: '500px' });
  //   }
  //   return true;
};

const GlobalContext = React.createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalProvider = ({ value, children }) => {
  const [data, setData] = useState(value);
  return <GlobalContext.Provider value={{ data: data, setData: setData }}>{children}</GlobalContext.Provider>;
};
