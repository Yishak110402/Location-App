const { createContext } = require("react");

export const GeneralContext = createContext()

export function GeneralProvider({children}){
    const localIp = "http://192.168.0.110:6969"
    const value={
        localIp
    }
    return(
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    )
}
