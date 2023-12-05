import React from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {MainNavigation} from '@navigation/main';
import {AuthContextProvider} from '@context/auth';

import {globals} from '@styles/globals';

export function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={globals.flexContainer}>
        <AuthContextProvider>
          <MainNavigation />
        </AuthContextProvider>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
