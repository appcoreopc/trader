export const FeedStore = (state : any, action : any) => {
    switch (action.type) {
        case 'TRADEINFO':
            console.log('store event here');
            let newstate = {
                'title': action.item.title,
                'description': action.item.description,
                'sellValue' : action.item.sellValue, 
                'buyValue' : action.item.buyValue
            };
            return newstate;
        default:
            return state;
    }
};