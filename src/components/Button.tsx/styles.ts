import {StyleSheet} from 'react-native';

export const defaults = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export const variants = {
  solid: StyleSheet.create({
    button: {
      borderColor: 'transparent',
      backgroundColor: 'gray',
    },
    buttonText: {
      color: 'white',
    },
    loader: {
      color: 'white',
    },
  }),
  outline: StyleSheet.create({
    button: {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
    buttonText: {
      color: 'black',
    },
    loader: {
      color: 'black',
    },
  }),
  ghost: StyleSheet.create({
    button: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
    buttonText: {
      color: 'black',
    },
    loader: {
      color: 'black',
    },
  }),
};
