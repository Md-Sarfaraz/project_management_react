import { createContext, useState } from "react";

export const DisplayContext = createContext();


const DisplayProvider = (props) => {
    const [display, setDisplay] = useState({
        fullscreen: false,
    });


    return (<DisplayContext.Provider value={{ display, setDisplay }}>
        {props.children}
    </DisplayContext.Provider>)
}

export default DisplayProvider;