const initState = {
    activities: [
        {id: '1', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'},
        {id: '2', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'},
        {id: '3', activity: 'hiking', location: "Lake District", route: 'Skiddaw', duration: '3', camping: 'yes', bagWeight: '13', date: '10/10/2020', distance: '4'}
    ]
}

const activityReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_ACTIVITY':
            console.log("created", action.activity)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log("error", action.error)
            return state;
        case 'DELETE_LOG':
            console.log("deleted", action.log)
            return state;
        case 'DELETE_LOG_ERROR':
            console.log("delete error", action.error)
            return state;
        case 'UPDATE_LOG':
            console.log("deleted", action.log)
            return state;
        case 'UPDATE_LOG_ERROR':
            console.log("update error", action.error)
            return state;
        case 'ADD_PRODUCT':
            console.log("Added", action.product)
            return state;
        case 'ADD_PRODUCT_ERROR':
            console.log("added error", action.error)
            return state;
        default:
            return state;
    }
}

export default activityReducer