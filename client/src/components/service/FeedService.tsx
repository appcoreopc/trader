import {TradeConnection} from './Connection';

export class FeedService {

    conn : TradeConnection;
    store : any;

    constructor(reduxStore : any)
    {
        this.store = reduxStore;
        this.conn = new TradeConnection(this.store);
    }

    start() {
        this.conn.start();
    }
}