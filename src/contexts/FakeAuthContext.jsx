/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch(action.type) {
        case "login": 
          return {
            ...state,
            user: action.payload,
            isAuthenticated: true
          }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default: 
          throw new Error("Unknown action");
    }
}

const FAKE_USER = {
  name: '',
  email: '@gmail.com',
  password: 'test1234',
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email, password,name) {
      if(email.endsWith('@gmail.com') && password === FAKE_USER.password) {
        const userWithName = { ...FAKE_USER, name, email };
        dispatch({ type: 'login', payload: userWithName})
      }
    }

    function logout() {
        dispatch({type: 'logout'});
    }
   
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>{children}</AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("AuthContext was used outside AuthProvider");
    }
    return context;
}

export {AuthProvider, useAuth};