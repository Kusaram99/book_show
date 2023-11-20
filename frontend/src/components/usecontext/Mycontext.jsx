import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context and provide a default value
const MyContext = createContext();

// Create a custom hook to consume the context
export function useMyContext() {
    return useContext(MyContext);
}

// Create a provider component to wrap your application
function MyContextProvider({ children }) {
    const [movieData, setMovieData] = useState({});
    const [navContext, setNavContext] = useState([]);
    const [alertData, setAlertData] = useState({ alert: false });  

    useEffect(() => {
        const local = localStorage.getItem('user');                
        if (local) {
            const { data } = JSON.parse(local); 
            setNavContext(e => ([{ ...data }]));
        } else {
            setNavContext([]);
        }
    }, [])

    return (
        <MyContext.Provider value={{ movieData, setMovieData, navContext, setNavContext, alertData, setAlertData }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;
