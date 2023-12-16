import React, {createContext, useContext, useEffect, useState} from 'react';
import {login, logout, onUserStateChange} from "../../api/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // 페이지가 로딩되면, onUserStateChange에 콜백을 전달
    useEffect(() => {
        // 사용자 정보를 가져와서 setUser 하도록 등록
        onUserStateChange((user) => {
            console.log(user);
            setUser(user);
        })
    }, []);

    return (
        <AuthContext.Provider value={{user, login: login, logout: logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
