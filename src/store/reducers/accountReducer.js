const initState = {
    activities: [
        {id: '1', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'},
        {id: '2', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'},
        {id: '3', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'}
    ]
}
const accountReducer = (state = initState, action) => {
    switch(action.type){
        case 'UPDATE_DETAILS':
            //console.log("created")
            return state;
        case 'UPDATE_DETAILS_ERROR':
            //console.log("error")
            return state;
        default:
            return state;
    }
}

export default accountReducer