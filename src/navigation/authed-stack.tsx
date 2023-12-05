import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationSreens, RootStackParamList} from '@types/navigation';

import FlexWaysLogo from '@assets/images/logo.svg';
import Icon from 'react-native-vector-icons/Ionicons';

import {VStack} from '@components/index';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <FlexWaysLogo width={100} height={40} fill={'white'} />
        ),
        headerRight: () => <Icon name="menu" size={30} color="white" />, // TODO: Just as a placeholder. When functionality is added, this will be extracted to a component
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#1d2362', // TODO: This will come from the theme
        },
      }}>
      <Stack.Screen name={NavigationSreens.HOME} component={VStack} />
    </Stack.Navigator>
  );
}
