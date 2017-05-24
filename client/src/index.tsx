import {connectableObservableDescriptor} from 'rxjs/observable/ConnectableObservable';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MainComponent} from './components/main/MainComponent';
import {FeedService} from './components/service/FeedService';

let store = createStore((state : any, action : any) => {
    switch (action.type) {
        case 'TRADEINFO':
            let newstate = {
                'tickerCode' : action.item.ticker,
                'title': action.item.title,
                'description': action.item.description,
                'sellValue' : action.item.sellValue, 
                'buyValue' : action.item.buyValue,
                'volume' : action.item.volume,
            };
            return newstate;
        case 'CONNECTIONINFO':
            let connectionState = {
                'description': action.item.description,
                'connectionStatus' : action.item.connectionStatus,
            };
            return connectionState;            
        default:
            return state;
    }
}, {
    title: 'title',
    description: 'Currency Conversion',
    buyValue: "00",
    sellValue: "00"
});

console.log(store);

ReactDOM.render(
    <Provider store={store}>
    <MainComponent/>
</Provider>, document.getElementById("app"));

let feedService = new FeedService(store);
feedService.start();
