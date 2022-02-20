// import { createContext, useReducer } from "react"
// import Cookies from "js-cookie"

// export const Store = createContext()

// const initalState = {
//     userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')): null 
// }

// function reducer(state, action){
//     switch(action.type){
//         case 'LOGIN':{
//             return{...state, userInfo:action.payload}
//         }
//         case 'LOGIN_OUT':{
//             return{...state, userInfo:null}
//         }
//         default:{
//             return state
//         }
//     }
// }

// export function StoreProvider(props){
//     const [state, dispatch] = useReducer(reducer, initalState)
//     const value = {state, dispatch}
//     return <Store.Provider value={value}>{props.children}</Store.Provider>
// }