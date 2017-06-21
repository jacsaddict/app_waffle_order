import React from 'react';
import {BackHandler,Image,View} from 'react-native';

import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {search} from './states/search';
import {toast} from './states/toast';
import {post, postForm, postItem} from './states/post-reducers';

import {order, order2, record, Intro, ShoppingCartIcon} from './states/order-reducers';



import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';

import WaffleScreen from './components/WaffleScreen';
import MenuScreen from './components/MenuScreen';
import ShoppingCartScreen from './components/ShoppingCartScreen';
import RecordScreen from './components/RecordScreen';
import ContactScreen from './components/ContactScreen'

const AppNavigator = StackNavigator({
    Waffle: {screen: WaffleScreen},
    Menu: {screen: MenuScreen},
    ShoppingCart: {screen: ShoppingCartScreen},
    Record: {screen: RecordScreen},
    Contact: {screen: ContactScreen},
}, {
    headerMode: 'none'
});

class AppWithStyleAndNavigator extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}/>
            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Waffle'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Create Redux store
const store = createStore(combineReducers({
    nav, search, toast,
    post, postForm, postItem,
    order,order2,record,Intro,ShoppingCartIcon
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}
