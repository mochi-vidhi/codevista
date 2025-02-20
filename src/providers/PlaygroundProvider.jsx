import { createContext,useContext, useEffect, useState } from "react";
import {v4} from 'uuid';
export const PlaygroundContext = createContext();

const initialData = [
    {
        id:v4(),
        title:'Bootstrap',
        files:[
            {
               id:v4(),
               title:'index',
               language:'cpp',
               code:`cout<<"Hello world";`,
            }
        ]
        
    },
    {
        id:v4(),
        title:'Frontend',
        files:[
            {
               id:v4(),
               title:'test',
               language:'javascript',
               code:`console.log("Hello Frontend")`,
            }
        ]
        
    }
]


export const PlaygroundProvider = ({children})=>{
    const [folders,setFolders] = useState(initialData);
    
    
     useEffect(()=>{
        localStorage.setItem('data',JSON.stringify(folders));
     },[])
    
    return( 
      <PlaygroundContext.Provider value={folders}>
          {children}
      </PlaygroundContext.Provider>     
    ); 
}