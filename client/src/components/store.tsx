export const FeedStore = (state : any, action : any) => {
    switch (action.type) {
        case 'INCR':
            console.log('store event here');
            let newstate = {
                'candidate': action.st.candidate,
                'description': action.st.description
            };
            console.log('state');
            console.log(state);
            return newstate;
        default:
            return state;
    }
};