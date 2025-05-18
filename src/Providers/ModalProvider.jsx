import { createContext, useState } from "react";


export const ModalContext = createContext();
export const modalConstants = {
    CREATE_PLAYGROUND:'CREATE_PLAYGROUND',
    CREATE_FOLDER:'CREATE_FOLDER',
    UPDATE_FOLDER_TITLE:'UPDATE_FOLDER_TITLE',
    UPDATE_FILE_TITLE:'UPDATE_FILE_TITLE',
    CREATE_CARD:'CREATE_CARD'
}
export const ModalProvider = ({children})=>{
   const [modalTypes,setModalType] = useState(null);
   const [modalPayLoad,setModalPayLoad] = useState(null);
   const closeModal = ()=>{
      setModalType(null);
      setModalPayLoad(null);
   }
   console.log({modalTypes});
    const modalFeatures ={
        openModal:setModalType,
        closeModal,
        activeModal:modalTypes,
        modalPayLoad,
        setModalPayLoad
    }
    return(
        <ModalContext.Provider value={modalFeatures}>
             {children}     
        </ModalContext.Provider>
    );
}