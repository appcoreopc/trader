import {Session, Connection, IEvent} from 'autobahn';

export class TradeConnection
{
    private tradeConnection : Connection;
    private store : any;
    connectionUrl : string = "ws://127.0.0.1:8080/";
    realm : string = "TradeRealm"
    topic : string = "TradeTopic";

    constructor(reduxStore : any) {
        this.store = reduxStore;
    }

    start() {

        console.log('opening connection');

        this.tradeConnection = new Connection({url: this.connectionUrl, realm: this.realm});
        this
            .tradeConnection
            .open();

        this.tradeConnection.onclose = (reason, details) => {
            console.log('connection closed');
            return true;
        }

        this.tradeConnection.onopen = (session, details) => {
            
            console.log('connection opened');
            
            let store = this.store;

            session.subscribe(this.topic, (argument, argumentKeyword, details) => {
                var tradeInfo = {
                    'type': argumentKeyword.type,
                    'item': {
                        ticker: argumentKeyword.ticker,
                        description: '22222222',
                        buyValue: argumentKeyword.buyValue,
                        sellValue: argumentKeyword.sellValue
                    }
                };
                store.dispatch(tradeInfo);
            });

            console.log('we are calling a service');
            // tries to call a RPC 
            session.call('com.trader.getIndexPrice').then((a ) => 
            {
                console.log(a);
            });










        };
    }
}
