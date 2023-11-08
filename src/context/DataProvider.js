import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({children}) => {
const [accountData, setAccountData] = useState({
    username:'',name:''
})
    return (
   <DataContext.Provider value ={{
    accountData,
    setAccountData
   }}>
    {children}
   </DataContext.Provider>
)
}

export default DataProvider