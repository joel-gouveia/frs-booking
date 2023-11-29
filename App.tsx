import React from 'react';
import {MainNavigation} from '@navigation/main';
import {AuthContextProvider} from '@context/auth';

export function App() {
  return (
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>
  );
}
