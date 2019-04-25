const blacklist = require('metro-config/src/defaults/blacklist') //eslint-disable-line
module.exports = {
  resolver: {
    blacklistRE: blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]),
  },
};
