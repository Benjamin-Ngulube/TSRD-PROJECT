import { createContext, useState } from "react";

export const MyContextCont = createContext()



export const ContextCont = ({children}) => {
    const [datastate, setDatastate] = useState(null)
    const [MainObj, setMainObj] = useState([-12.804936763990627, 28.240294429780192])

    return(
        <MyContextCont.Provider
        value={{
            datastate,
            setDatastate,
            MainObj,
            setMainObj
        }}
        >
            {children}
        </MyContextCont.Provider>
    )
}