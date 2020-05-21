import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { MenuProvider } from 'react-native-popup-menu';
import ErrorBoundary from './ErrorBoundary';
import { WebNavigationContainer } from './navigation';

const App = ({ configure, children }) => {
  useEffect(() => {
    configure();
  }, []);
  // TODO: this error bounday should reload the app instead of goback
  return (
    <ErrorBoundary>
      <MenuProvider>
        <RecoilRoot>
          <WebNavigationContainer>{children}</WebNavigationContainer>
        </RecoilRoot>
      </MenuProvider>
    </ErrorBoundary>
  );
};

export default App;
