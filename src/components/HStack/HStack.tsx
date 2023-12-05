import React from 'react';
import {Stack, StackProps} from '@components/Stack/Stack';

interface Props extends StackProps {}

export const HStack = (props: Props) => {
  return (
    <Stack {...props} direction="row">
      {props.children}
    </Stack>
  );
};
