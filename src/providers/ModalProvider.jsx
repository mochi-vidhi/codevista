import { createContext, useState } from "react";


export const ModalContext = createContext();

export const ModalProvider = ({children})=>{
   const [modalTypes,setModalType] = useState(null);
   const closeModal = ()=>{
      setModalType(null);
   }
   console.log({modalTypes});
    const modalFeatures ={
        openModal:setModalType,
        closeModal,
        activeModal:modalTypes
    }
    return(
        <ModalContext.Provider value={modalFeatures}>
             {children}
            
        </ModalContext.Provider>
    );
}