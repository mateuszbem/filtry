const initState = {
    data: [],
    loading: false,
    categories: [],
    colors: [],
    filtered: []
}

export default function filtr(state=initState,action){
    
    switch(action.type){
        case 'SHOW_PRODUCTS': 
            return {...state, data: action.payload}
        case 'SET_CATEGORIES': 
            return{...state, categories: action.payload}
        case 'SET_COLORS': 
            return{...state, colors: action.payload}
        case 'SHOW_PRODUCTS_FILTERED':
            return {...state, filtered: action.payload}
        default:
            return state;
    }
}

