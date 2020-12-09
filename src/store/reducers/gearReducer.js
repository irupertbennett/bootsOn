const initState = {
    docRef: null
}

const gearReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_GEAR':
            console.log("created", action.docRef.id)
            return {
                state, 
                docref: action.docRef.id
            }
        case 'ADD_GEAR_ERROR':
            console.log("Add error", action.error)
            return state;
        case 'DELETE_GEAR':
            console.log("deleted", action.gear)
            return state;
        case 'DELETE_GEAR_ERROR':
            console.log("delete error", action.error)
            return state;
        case 'SUBMIT_GEAR':
            console.log("submitted")
            return state;
        case 'SUBMIT_GEAR_ERROR':
            console.log("submit error")
            return state;
        default:
            return state;
    }
}

export default gearReducer