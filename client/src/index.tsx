import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MainComponent} from './components/main/MainComponent';

let store = createStore((state : any, action : any) => {
    switch (action.type) {
        case 'INCR':
            console.log('store event here');
            console.log(state);
            return {candidate: action.incr, key: action.key};
        default:
            return state;
    }
}, {
    candidate: 'test',
    key: 'test 2222'
});

ReactDOM.render(
    <Provider store={store}>
    <MainComponent/>
</Provider>, document.getElementById("example"));