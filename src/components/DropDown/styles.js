import { StyleSheet } from 'react-native';

import { colors, global } from '../../styles';

export default StyleSheet.create({
  container: {
    height: 70,
    padding: 5,
    marginHorizontal: 40,
    marginBottom: 10,
  },
  doubleContainer: {
    height: 70,
    padding: 5,
    minWidth: 130,
    marginBottom: 10,
  },
  selectedText: {
    borderRadius: global.baseBorderRadius,
    backgroundColor: colors.white,
    height: 35,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    paddingHorizontal: 10,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 5,
  },
});

export { colors };
