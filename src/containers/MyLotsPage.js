import { connect } from 'react-redux';
import { changeVisibleItemsChange } from '../actions/homeScreen';

import MyLotsPage from '../components/MyLotsPage';
import { fetchMyLots } from '../reducers/lots';

function mapStateToProps({ lots: { myLots }, session: { token } }) {
  return { myLots, token };
}

export default connect(mapStateToProps, { fetchMyLots, changeVisibleItemsChange })(MyLotsPage);
