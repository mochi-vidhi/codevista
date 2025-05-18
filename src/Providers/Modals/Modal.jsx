import { useContext } from "react"
import { ModalContext,modalConstants } from "../ModalProvider"
import { CreatePlaygroundModal } from "./CreatePlaygroundModal";
import { CreateFolderModal } from "./CreateFolderModal";
import { UpdateFolderTitle } from "./UpdateFolderTitle";
import { UpdateFileTitle } from "./UpdateFileTitle";
import { CreateCardModal } from "./CreateCardModal";

export const Modal = ()=>{
    const modalFeatures = useContext(ModalContext);
    
    return <>
           {modalFeatures.activeModal === modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal/>}
           {modalFeatures.activeModal === modalConstants.CREATE_FOLDER && <CreateFolderModal/>}
           {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitle/>}
           {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && <UpdateFileTitle/>}
           {modalFeatures.activeModal === modalConstants.CREATE_CARD && <CreateCardModal/>}
        </>
}