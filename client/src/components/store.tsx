export const FeedStore = (state : any, action : any) => {
    switch (action.type) {
        case 'INCR':
            console.log('store event here');
            let newstate = {
                'title': action.item.title,
                'description': action.item.description,
                'sellValue' : action.item.sellValue, 
                'buyValue' : action.item.buyValue
            };
            return newstate;
        case 'FEED':
            let feedstate = {
                'title': action.item.title,
                'description': action.item.description,
                'sellValue' : action.item.sellValue, 
                'buyValue' : action.item.buyValue
        };
            return feedstate;
        default:
            return state;
    }
};