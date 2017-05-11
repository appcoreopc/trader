import {Session, Connection, IEvent} from 'autobahn';
import "rxjs";

export class TradeConnection
{
    tradeConnection : Connection;
    constructor() {}

    start() {
        console.log('opening connection ...');

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
            session.subscribe("TradeTopic", this.tradeEventHandler)
        };

    }

    tradeEventHandler(event : any, evt2 : any,  details : IEvent) {
        console.log('firing events');
        console.log(event);
    }
}
