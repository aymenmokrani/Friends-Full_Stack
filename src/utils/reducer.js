export const initialState = {
    isAuth : false,
}



const reducer = (state, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return ({
                ...state, 
                isAuth: action.payload
            });

        default: 
            return state
    }
}

export default reducer