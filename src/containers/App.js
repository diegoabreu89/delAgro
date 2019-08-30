import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { Text, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';

import AppReducer from '../reducers';
import RootContainer from './RootContainer';
import { enhancers } from '../utils/redux';

export const store = createStore(
  AppReducer,
  ...enhancers,
);

const persistor = persistStore(store);

export default class App extends Component {
  state = {
    lotId: null,
  }

  async componentDidMount() {
    if (Platform.OS === 'ios') {
      firebase.messaging().hasPermission().then((enabled) => {
        if (!enabled) {
          firebase.messaging().requestPermission().then(() => {
            firebase.messaging().registerForNotifications();
          });
        }
      });
    }
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
    }
    const channel = new firebase.notifications.Android.Channel('main_channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    // Process your notification as required
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
    // Process your notification as required
      const notification_to_be_displayed = new firebase.notifications.Notification({
        data: notification.data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,
      });

      if (Platform.OS === 'android') {
        notification_to_be_displayed
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setChannelId('main_channel')
          .android.setSmallIcon('ic_notification')
          .android.setVibrate(1000);
      }

      firebase.notifications().displayNotification(notification_to_be_displayed);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      const { _data } = notification;
      if (_data && _data.lot_id) {
        this.setState({ lotId: parseInt(_data.lot_id) });
      }

      /* const { navigation } = this.props;
      const navigateToDetails = NavigationActions.navigate({
        routeName: 'Details',
        params: { selectedLot: this.props.lot },
      });
      this.props.navigation.dispatch(navigateToDetails); */
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer lotId={this.state.lotId} />
        </PersistGate>
      </Provider>
    );
  }
}
