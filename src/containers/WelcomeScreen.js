import { connect } from 'react-redux';

import WelcomeScreen from '../components/WelcomeScreen';
import { getStaticData } from '../reducers/staticData';
import { removeRedirect } from '../reducers/lots';

function mapStateToProps({ session: { loggedIn }, lots }) {
  return { loggedIn, lots };
}

export default connect(mapStateToProps, { getStaticData, removeRedirect })(WelcomeScreen);
