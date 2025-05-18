import { useContext } from "react";
import "./createPlaygroundModal.scss"
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
export const CreatePlaygroundModal = ()=>{
    const modalFeatures = useContext(ModalContext);
    const playGroundFeatures = useContext(PlaygroundContext)
    const closeModal = ()=>{
        modalFeatures.closeModal();
    };
    
    const onSubmitModal = (e)=>{
       e.preventDefault();
       const folderName = e.target.folderName.value;
       const fileName = e.target.fileName.value;
       const language = e.target.language.value;
       playGroundFeatures.createNewPlayground({
         folderName,
         fileName,
         language
       })
       closeModal();
    }
    
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-s flex justify-center items-center z-50" onSubmit={onSubmitModal}>
            <form className="relative bg-white text-black p-5 rounded-lg shadow-xl w-full max-w-lg flex flex-col gap-6">
                <span className="absolute top-4 right-4 text-gray-700 hover:text-black cursor-pointer" onClick={closeModal}><IoCloseSharp className="h-6 w-6"/></span>
                <h1 className="text-2xl font-bold text-center">Create New Playground</h1>
                <div className="flex  gap-3 text-xl">
                    <label className="font-bold ">Enter folder Name</label>
                    <input name="folderName" required autoComplete="off" className="text-white bg-blue-950 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-70"/>
                </div>
                <div className="flex gap-5 text-xl">
                    <label className="font-bold">Enter card Name</label>
                    <input name="fileName" required autoComplete="off" className="text-white bg-blue-950 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-73"/>
                </div>
                <div className="flex  gap-4 justify-between">
                    <select name="language" required className="text-amber-50 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-700">
                        <option value="cpp">CPP</option>
                        <option value="java">java</option>
                        <option value="javascript">javascript</option>
                        <option value="python">python</option>
                    </select>

                    <button type="submit" className="bg-[#640D5F] hover:bg-[#D91656] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                        Create Playground
                    </button>
                </div>

            </form>
        </div>
    )
}