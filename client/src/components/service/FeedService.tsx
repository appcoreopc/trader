import {TradeConnection} from './Connection';

export class FeedService {
    conn : TradeConnection;

    constructor(store : any)
    {
        this.conn = new TradeConnection();
    }

    start() {
        this
            .conn
            .start();
    }
}