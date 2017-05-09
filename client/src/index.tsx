import {connectableObservableDescriptor} from 'rxjs/observable/ConnectableObservable';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MainComponent} from './components/main/MainComponent';
import { FeedStore} from './components/store'
 
let store = createStore(FeedStore, {
    title: 'title',
    description: 'test 2222',
    value : "96"
});

ReactDOM.render(
    <Provider store={store}>
    <MainComponent/>
</Provider>, document.getElementById("example"));