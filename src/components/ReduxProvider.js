import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import GlobalState from '../redux/reducers';
import App from './App';
import Home from "./Home";

const AppNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Home
    },
    App: {
        screen: App
    }
},
    {
        initialRouteName: "Home",
        headerMode: "none"
    }));

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            score: 0,
            finished: false,
            currentQuestion: 0,
            questions: [],
            availableQuestions: [],
            fetching: false,
            fetchError: null,
        };
        this.store = this.configureStore();
    }

    render() {
        return (
            <Provider store={this.store}>
                <AppNavigator />
            </Provider>
        );
    }

    configureStore() {
        return createStore(GlobalState, applyMiddleware(thunkMiddleware));
    }
}