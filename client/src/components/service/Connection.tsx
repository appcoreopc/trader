import {Session, Connection, IEvent} from 'autobahn';

export class TradeConnection
{
    private tradeConnection : Connection;
    private store : any;

    constructor(reduxStore : any) {
        this.store = reduxStore;
        console.log('passed redux data store!!');
        console.log(this.store);
    }

    start() {

        console.log('opening connection ...');
        console.log(this.store);

        this.tradeConnection = new Connection({url: 'ws://127.0.0.1:8080/', realm: 'TradeRealm'});
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
            session.subscribe("TradeTopic", (argument, argumentKeyword, details) => {

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
        };
    }

    relayMessage(data : any)
    {
        console.log('logging store info');
        //console.log(data);
        this
            .store
            .dispatch(data);
        console.log(this.store);
        console.log('-----------------');
    }

    tradeEventHandler(argument : any, argumentKeyword : any, details : IEvent) {
        var tradeInfo = {
            'type': argumentKeyword.type,
            'item': {
                ticker: argumentKeyword.ticker,
                description: '22222222',
                buyValue: argumentKeyword.buyValue,
                sellValue: argumentKeyword.sellValue
            }
        };

        console.log('relaying');
        console.log(this.store);
        console.log('-----------------');
        this
            .store
            .dispatch(tradeInfo);
    }
}
