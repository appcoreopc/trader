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
            console.log('state');
            console.log(state);
            return newstate;
        default:
            return state;
    }
};