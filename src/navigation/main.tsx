import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UnauthedStack} from './unauthed-stack';
import {AuthedStack} from './authed-stack';
import {useAuth} from '@hooks/useAuth';

export function MainNavigation() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated && <AuthedStack />}
      {!isAuthenticated && <UnauthedStack />}
    </NavigationContainer>
  );
}
