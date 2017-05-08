import {connectableObservableDescriptor} from 'rxjs/observable/ConnectableObservable';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MainComponent} from './components/main/MainComponent';

let store = createStore((state : any, action : any) => {
    switch (action.type) {
        case 'INCR':
            console.log('store event here');
            let newstate = {
                'candidate': action.st.candidate,
                'description': action.st.description
            };
            console.log('state');
            console.log(state);
            return newstate;
        default:
            return state;
    }
}, {
    candidate: 'title',
    description: 'test 2222'
});

ReactDOM.render(
    <Provider store={store}>
    <MainComponent/>
</Provider>, document.getElementById("example"));