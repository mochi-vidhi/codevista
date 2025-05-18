import { useContext } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { ModalContext } from "../ModalProvider"
import {v4} from 'uuid';
import {defaultCodes,PlaygroundContext } from "../PlaygroundProvider";
export const CreateCardModal = ()=>{
    const {closeModal,modalPayLoad} = useContext(ModalContext);
    const {createPlayground} = useContext(PlaygroundContext);
    const onSubmitModal = (e)=>{
        e.preventDefault();
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        const file = {
            id:v4(),
            title:fileName,
            language,
            code:defaultCodes[language]
        }
        createPlayground(modalPayLoad,file);
        closeModal();
    }
    
    return <div className="fixed inset-0 bg-black/40 backdrop-blur-s flex justify-center items-center z-50">
           <form className="bg-white text-[#121212] p-10 shadow-lg rounded-xl flex flex-col gap-6 relative w-[90%] max-w-md" onSubmit={onSubmitModal}>
               <span className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer" onClick={closeModal} ><IoCloseSharp className="w-7 h-7"/></span>
              <h1 className="text-2xl font-bold text-center">Create New Playground</h1>
              
              <div className="flex gap-5 text-xl">
                    <label className="font-bold">Enter card Title</label>
                    <input name="fileName" required autoComplete="off" className="text-white bg-gray-800 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-65"/>
              </div>
                <div className="flex  gap-4 justify-between">
                    <select name="language" required className="text-amber-50 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-red-500">
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
}