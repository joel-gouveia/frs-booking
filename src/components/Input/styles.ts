import {StyleSheet} from 'react-native';

export const defaults = (props?: {hasLeftElement: boolean}) =>
  StyleSheet.create({
    wrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: 'lightgrey',
      paddingHorizontal: props?.hasLeftElement ? 80 : 20,
      fontSize: 16,
      color: 'black',
    },
  });

export const variants = {
  filled: StyleSheet.create({
    input: {
      borderColor: 'transparent',
    },
  }),
  outline: StyleSheet.create({
    input: {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
  }),
};