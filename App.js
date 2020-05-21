import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { MenuProvider } from 'react-native-popup-menu';
import ErrorBoundary from './ErrorBoundary';
import { Router } from './react-router';

const App = ({ configure, children }) => {
  useEffect(() => {
    if (configure) {
      configure();
    }
  }, []);
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <MenuProvider>
          <Router>{children}</Router>
        </MenuProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

export default App;
