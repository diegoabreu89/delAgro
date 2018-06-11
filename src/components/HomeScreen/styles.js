import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  bar: {
    backgroundColor: colors.creamBackground,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
  },
  spinner: {
    color: colors.lightGrey,
  },
});
