import {Session, Connection, IEvent} from 'autobahn';

export class TradeConnection
{
    private tradeConnection : Connection;
    private store : any;
    connectionUrl : string = "ws://127.0.0.1:8080/";
    realm : string = "TradeRealm"
    topic : string = "TradeTopic";
    connectionInfo : string = "CONNECTIONINFO";

    constructor(reduxStore : any) {
        this.store = reduxStore;
    }

    start() {

        console.log('opening connection');
            let connectionInfo = {
                'type': this.connectionInfo,
                'item': {
                    description: 'Opening connection',
                    connectionStatus: 0
                }
            };
            this.store.dispatch(connectionInfo);

        this.tradeConnection = new Connection({url: this.connectionUrl, realm: this.realm});
        this.tradeConnection.open();

        this.tradeConnection.onclose = (reason, details) => {

            console.log('connection closed');
            let connectionInfo = {
                'type': this.connectionInfo,
                'item': {
                    description: 'Disconnected',
                    connectionStatus: -1
                }
            };
            this.store.dispatch(connectionInfo);
            return true;
        }

        this.tradeConnection.onopen = (session, details) => {

            console.log('connection opened');
            let store = this.store;

            let connectionInfo = {
                'type': this.connectionInfo,
                'item': {
                    description: 'Connected',
                    connectionStatus: 1
                }
            };
            store.dispatch(connectionInfo);

            session.subscribe(this.topic, (argument, argumentKeyword, details) => {
                let tradeInfo = {
                    'type': argumentKeyword.type,
                    'item': {
                        ticker: argumentKeyword.ticker,
                        description: '22222222',
                        buyValue: argumentKeyword.buyValue,
                        sellValue: argumentKeyword.sellValue,
                        volume: argumentKeyword.volume
                    }
                };
                store.dispatch(tradeInfo);
            });

            session
                .call('com.trader.getIndexPrice')
                .then((a) => {
                    console.log(a);
                });
        };
    }
}
