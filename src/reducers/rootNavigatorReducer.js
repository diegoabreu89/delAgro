import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigation/AppNavigator';

const { BACK, navigate, back } = NavigationActions;

// Action Types

const NAV_HOME_LOGGED_OUT = 'NAV_HOME_LOGGED_OUT';
const NAV_WELCOME_SCREEN = 'NAV_WELCOME_SCREEN';
const NAV_HOME_LOGGED_IN = 'NAV_HOME_LOGGED_IN';
const NAV_LOGIN = 'NAV_LOGIN';
const NAV_REGISTER = 'NAV_REGISTER';
const CAMERA = 'CAMERA';
const FILTERED_HOME_IN = 'FILTERED_HOME_IN';
const FILTERED_HOME_OUT = 'FILTERED_HOME_OUT';
// Reducer

const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.init(),
);

export default function reducer(state = initialState, action) {
  const newState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case BACK:
      return AppNavigator.router.getStateForAction(back(), state);
    case NAV_WELCOME_SCREEN:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'welcomeScreen' }),
      );
    case NAV_HOME_LOGGED_OUT:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'HomeLoggedOut' }),
      );
    case NAV_HOME_LOGGED_IN:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'HomeLoggedIn' }),
      );
    case CAMERA:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'Camera' }),
      );
    case NAV_LOGIN:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'Login' }),
      );
    case NAV_REGISTER:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'Register' }),
      );
    case FILTERED_HOME_IN:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'FilteredHomeIn' }),
      );
    case FILTERED_HOME_OUT:
      return AppNavigator.router.getStateForAction(
        navigate({ routeName: 'FilteredHomeOut' }),
      );
    default:
      return newState || state;
  }
}

// Action Creators

export function navigateToHomeLoggedOut() {
  return { type: NAV_HOME_LOGGED_OUT };
}

export function navigateToWelcomeScreen() {
  return { type: NAV_HOME_LOGGED_OUT };
}

export function navigateToHomeLoggedIn() {
  return { type: NAV_HOME_LOGGED_IN };
}

export function navigateHome(loggedIn) {
  const action = loggedIn ? NAV_HOME_LOGGED_IN : NAV_HOME_LOGGED_OUT;
  return { type: action };
}

export function navigateToLogin() {
  return { type: NAV_LOGIN };
}

export function navigateToRegister() {
  return { type: NAV_REGISTER };
}

export function navigateToCamera() {
  return { type: CAMERA };
}

export function navigateToFilteredHome(loggedIn) {
  const action = loggedIn ? FILTERED_HOME_IN : FILTERED_HOME_OUT;
  return { type: action };
}
