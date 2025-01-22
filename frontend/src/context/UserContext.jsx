import axios from "axios";
import { createContext,useEffect,useState } from "react";
export const UserContext =createContext({});
export function UserContextProvider({children}){
const [user,setUser] = useState(null);
useEffect(()=>{
  getUser()
},[])
const getUser = async ()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/auth/refetch`,{withCredentials:true})
    setUser(res.data);
    
  } catch (error) {
    
  }
}
return (<UserContext.Provider value={{user,setUser}}>
{children}</UserContext.Provider>)
}