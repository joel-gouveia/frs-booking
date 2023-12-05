import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationSreens, RootStackParamList} from '@types/navigation';

import FlexWaysLogo from '@assets/images/logo.svg';

import {LoginScreen} from '@screens/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function UnauthedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <FlexWaysLogo width={100} height={40} fill={'white'} />
        ),
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#1d2362', // TODO: This will come from the theme
        },
      }}>
      <Stack.Screen name={NavigationSreens.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}
