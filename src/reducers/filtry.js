const initState = {
    dane: [],
    loading: false,
    error: null
}

export default function prac(state=initState,action){
    switch(action.type){
        // case 'SHOW_PRAC': 
        //     return {...state}
        // case 'SHOW_PRAC_FULFILLED': 
        //     return {...state, dane: action.payload.data}
        // case 'ADD_EMPLOYE_FULFILLED': return {...state, dane: action.payload.data}
        // case 'DELETE_EMPLOYE_FULFILLED': return {...state, dane: action.payload.data}
        // case 'EDIT_EMPLOYE_FULFILLED': return {...state,dane: action.payload.data}
        // case 'onSuccess': console.log (action.payload)
        default:
            return state;
    }
}

