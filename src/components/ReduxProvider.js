import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import GlobalState from '../redux/reducers';
import App from './App';


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
                <App />
            </Provider>
        );
    }

    configureStore() {
        return createStore(GlobalState, applyMiddleware(thunkMiddleware));
    }
}