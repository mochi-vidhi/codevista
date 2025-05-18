import { useContext } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { ModalContext } from "../ModalProvider"
import { PlaygroundContext } from "../PlaygroundProvider";


export const UpdateFolderTitle = ()=>{
    const {closeModal,modalPayLoad} = useContext(ModalContext);
    const {editFolderTitle} = useContext(PlaygroundContext);
    
    const onSubmitModal = (e)=>{
        e.preventDefault();
        const folderName = e.target.folderName.value;
        editFolderTitle(folderName,modalPayLoad);
        closeModal();
    } 

    return(
          <div className="fixed inset-0 bg-black/40 backdrop-blur-s flex justify-center items-center z-50">
               <form className="bg-white text-[#121212] p-10 shadow-lg rounded-xl flex flex-col gap-6 relative w-[90%] max-w-md" onSubmit={onSubmitModal} >
                   <span className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer" onClick={closeModal} ><IoCloseSharp className="w-7 h-7"/></span>
                   <h1 className="text-2xl font-bold text-center">Update Folder Name</h1>
                     <div className="flex items-center gap-4" >
                    {/* <label>Enter folder Name</label> */}
                    <input name="folderName" className="flex-1 bg-[#B03052] border-2 border-[#fff] text-[#fff] font-semibold text-base px-3 py-2 rounded-md focus:outline-none" required autoComplete="off"/>
                    <button type="submit" className="bg-[#4E1F00] hover:bg-[#034C53] hover:text-[#121212] text-white font-semibold text-base px-6 py-3 rounded-lg transition duration-500 cursor-pointer">Update Folder</button>
                </div>
               </form>
         </div>
    ) 
}